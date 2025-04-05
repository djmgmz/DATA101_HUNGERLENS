import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import {
  Box,
  Flex,
  Heading,
  Text,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  VStack,
  HStack,
  Divider,
  Progress,
  CircularProgress,
  CircularProgressLabel,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  SimpleGrid,
  Icon,
  Card,
  CardHeader,
  CardBody,
  Link
} from "@chakra-ui/react";
import { ArrowForwardIcon, ChevronDownIcon } from "@chakra-ui/icons";
import NextLink from "next/link";
import Papa from "papaparse";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";

// Register Chart.js components
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

// Dynamically import Plotly (disabling SSR)
const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [hungerData, setHungerData] = useState([]);
  const [worstAffectedCountries, setWorstAffectedCountries] = useState([]);
  const [foodPriceData, setFoodPriceData] = useState([]);
  const [recentReports, setRecentReports] = useState([]);
  const [lastYearRate, setLastYearRate] = useState(null);

  // Add to state initialization
  const [globalStats, setGlobalStats] = useState({
    undernourishmentRate: 0,
    changePercent: -3.2,
    progressPercent: 67,
    targetYear: 2030
  });

// Add the calculateAndSetGlobalStats function
  const calculateAndSetGlobalStats = (ghiScores, ghiIndicators, foodPrices) => {
    // Calculate global average undernourishment rate from the most recent period
    const recentUndernourishmentData = ghiIndicators.filter(
        item => item["Undernourishment (% of population) '21-'23"] &&
            item["Undernourishment (% of population) '21-'23"] !== "—" &&
            item["Undernourishment (% of population) '21-'23"] !== "<5"
    );

    const globalUndernourishmentRate = recentUndernourishmentData.length > 0
        ? recentUndernourishmentData.reduce((sum, item) => {
      const rate = parseFloat(item["Undernourishment (% of population) '21-'23"]) || 0;
      return sum + rate;
    }, 0) / recentUndernourishmentData.length
        : 0;

    // Calculate average change in hunger since 2016
    const validChanges = ghiScores.filter(item => !isNaN(item.percentChange));
    const changePercent = validChanges.length > 0
        ? validChanges.reduce((sum, item) => sum + item.percentChange, 0) / validChanges.length
        : 0;

    // Calculate progress toward SDG Zero Hunger
    const baseline2015 = calculateGlobalAverage(ghiScores, "ghi2016");
    const current = calculateGlobalAverage(ghiScores, "ghi2024");
    const progressPercent = baseline2015 > 0 ? ((baseline2015 - current) / baseline2015) * 100 : 0;

    setGlobalStats({
      undernourishmentRate: parseFloat(globalUndernourishmentRate.toFixed(1)),
      changePercent: parseFloat(changePercent.toFixed(1)),
      progressPercent: Math.round(Math.max(0, progressPercent)),
      targetYear: 2030
    });
  };

  // Fetch data
  useEffect(() => {
    const loadCSVData = async () => {
      try {
        // Load GHI Scores
        const ghiScoresResponse = await fetch('/ghi_scores_cleaned.csv');
        const ghiScoresText = await ghiScoresResponse.text();
        Papa.parse(ghiScoresText, {
          header: true,
          skipEmptyLines: true,
          transformHeader: (header) => header.trim().replace(/\s+/g, " "),
          complete: (results) => {
            const parsedData = results.data.filter(row =>
                row["Country with data from"] &&
                row["2024 '19-'23"] &&
                row["2024 '19-'23"] !== "—" &&
                row["2024 '19-'23"] !== "<5"
            );

            // Process GHI scores data
            const processedData = parsedData.map(row => {
              const ghi2024 = parseFloat(row["2024 '19-'23"]) || 0;
              const ghi2016 = parseFloat(row["2016 '14-'18"]) || 0;
              const change = parseFloat(row["Absolute change since 2016"]) || 0;
              const percentChange = parseFloat(row["% change since 2016"]) || 0;

              // Determine severity based on GHI score
              let severity = "Low";
              if (ghi2024 >= 50) severity = "Extremely Alarming";
              else if (ghi2024 >= 35) severity = "Alarming";
              else if (ghi2024 >= 20) severity = "Serious";
              else if (ghi2024 >= 10) severity = "Moderate";

              return {
                country: row["Country with data from"],
                ghi2024,
                ghi2016,
                change,
                percentChange,
                severity
              };
            });

            // Sort by GHI score (descending)
            processedData.sort((a, b) => b.ghi2024 - a.ghi2024);
            setHungerData(processedData);

            // Get worst affected countries
            setWorstAffectedCountries(processedData.slice(0, 7));

            const loadGhiIndicators = async () => {
              try {
                const ghiIndicatorsResponse = await fetch('/ghi_indicators_cleaned.csv');
                const ghiIndicatorsText = await ghiIndicatorsResponse.text();
                Papa.parse(ghiIndicatorsText, {
                  header: true,
                  skipEmptyLines: true,
                  transformHeader: (header) => header.trim().replace(/\s+/g, " "),
                  complete: (results) => {
                    const ghiIndicators = results.data;
                    // Call the new function to calculate global stats
                    calculateAndSetGlobalStats(processedData, ghiIndicators, foodPriceData);
                  }
                });
              } catch (error) {
                console.error("Error loading GHI indicators:", error);
                // Call with only the data we have
                calculateAndSetGlobalStats(processedData, [], foodPriceData);
              }
            };

            loadGhiIndicators();

          }
        });

        // Load Food Price Data (simplified)
        const foodPriceResponse = await fetch('data/combined_country_food_prices.csv');
        const foodPriceText = await foodPriceResponse.text();
        Papa.parse(foodPriceText, {  // Change from foodPriceResponse to foodPriceText
          header: true,
          skipEmptyLines: true,
          transformHeader: header => header.replace(/#/g, ''), // Remove hash symbols from headers
          complete: (results) => {
            // Filter for valid price data
            const validPriceData = results.data.filter(row =>
                row.usdprice &&
                !isNaN(parseFloat(row.usdprice)) &&
                row.date
            );

            // Group by year to see price trends over time
            const pricesByYear = groupPricesByYear(validPriceData);

            setFoodPriceData(validPriceData);
            setLastYearRate(calculateLastYearAnnualRate(validPriceData));

            // Calculate price increase - fix the function call
            const increase = calculatePriceIncrease(validPriceData);

            setLoading(false);
          },
          error: (error) => {
            console.error("Error parsing CSV:", error);
            setLoading(false);
          }
        });

        // Sample recent reports
        setRecentReports([
          {
            title: "Global Food Security Report 2025",
            date: "March 15, 2025",
            summary: "Analysis of current food security challenges with recommendations for policy action.",
            source: "Food and Agriculture Organization"
          },
          {
            title: "Climate Change Effects on Food Production",
            date: "February 28, 2025",
            summary: "Study on how extreme weather events affected crop production and food prices in 2024.",
            source: "World Food Programme"
          },
          {
            title: "Progress Report: Zero Hunger Initiative",
            date: "January 20, 2025",
            summary: "Midterm assessment of global goals to end hunger by 2030.",
            source: "United Nations"
          },
          {
            title: "Regional Food Price Index Q1 2025",
            date: "April 2, 2025",
            summary: "Analysis of food price trends across different regions.",
            source: "World Bank"
          }
        ]);

        setLoading(false);
      } catch (error) {
        console.error("Error loading data:", error);
        setLoading(false);
      }
    };

    loadCSVData();
  }, []);

  // Group prices by year to see trends
  const groupPricesByYear = (data) => {
    const pricesByYear = {};

    data.forEach(item => {
      if (!item.date) return;

      // Extract year from date
      const date = new Date(item.date);
      if (isNaN(date.getTime())) return; // Skip invalid dates

      const year = date.getFullYear();
      const price = parseFloat(item.usdprice);

      if (!pricesByYear[year]) {
        pricesByYear[year] = {
          count: 0,
          total: 0,
          prices: []
        };
      }

      pricesByYear[year].count++;
      pricesByYear[year].total += price;
      pricesByYear[year].prices.push({
        commodity: item.commodity,
        price: price
      });
    });

    // Calculate average for each year
    Object.keys(pricesByYear).forEach(year => {
      pricesByYear[year].average = pricesByYear[year].total / pricesByYear[year].count;
    });

    return pricesByYear;
  };

  // Calculate price increase between specific years (e.g., 2015 to latest)
  const calculatePriceIncrease = (data) => {
    const pricesByYear = groupPricesByYear(data);
    const years = Object.keys(pricesByYear).sort();

    // Focus on recent years (2015 to latest)
    const recentYears = years.filter(year => parseInt(year) >= 2015);
    if (recentYears.length < 2) return 0;

    const startYear = recentYears[0]; // 2015 or earliest available after 2015
    const endYear = recentYears[recentYears.length - 1]; // Most recent year

    const startAvg = pricesByYear[startYear].average;
    const endAvg = pricesByYear[endYear].average;

    if (startAvg <= 0) return 0;

    const percentIncrease = ((endAvg - startAvg) / startAvg) * 100;
    return parseFloat(percentIncrease.toFixed(1));
  };

// Calculate annual growth rate over a long period (CAGR)
  const calculateAnnualizedIncrease = (data) => {
    const pricesByYear = groupPricesByYear(data);
    const years = Object.keys(pricesByYear).sort();

    // We need at least 2 years to calculate
    if (years.length < 2) return 0;

    const earliestYear = parseInt(years[0]);
    const latestYear = parseInt(years[years.length - 1]);

    const earliestAvg = pricesByYear[earliestYear.toString()].average;
    const latestAvg = pricesByYear[latestYear.toString()].average;

    if (earliestAvg <= 0) return 0;

    // Calculate years between
    const yearDiff = latestYear - earliestYear;
    if (yearDiff === 0) return 0;

    // CAGR formula: (final/initial)^(1/years) - 1
    const annualRate = (Math.pow(latestAvg/earliestAvg, 1/yearDiff) - 1) * 100;

    return parseFloat(annualRate.toFixed(1));
  };
// Helper function to calculate global average for a specific property
  const calculateGlobalAverage = (data, property) => {
    const validData = data.filter(item => !isNaN(item[property]));
    return validData.length > 0
        ? validData.reduce((sum, item) => sum + item[property], 0) / validData.length
        : 0;
  };
  // Calculate annual rate for the previous year
  const calculateLastYearAnnualRate = (data) => {
    const pricesByYear = groupPricesByYear(data);
    const years = Object.keys(pricesByYear).sort();

    // We need at least 3 years of data to calculate last year's annual rate
    if (years.length < 3) return null;

    // Get the current year and previous year
    const latestYear = parseInt(years[years.length - 1]);
    const previousYear = latestYear - 1;
    const twoYearsAgo = latestYear - 2;

    // Check if we have data for these years
    if (!pricesByYear[previousYear.toString()] || !pricesByYear[twoYearsAgo.toString()]) {
      return null;
    }

    const previousYearAvg = pricesByYear[previousYear.toString()].average;
    const twoYearsAgoAvg = pricesByYear[twoYearsAgo.toString()].average;

    if (twoYearsAgoAvg <= 0) return 0;

    // Calculate the annual rate for the previous year
    const lastYearRate = ((previousYearAvg - twoYearsAgoAvg) / twoYearsAgoAvg) * 100;

    return parseFloat(lastYearRate.toFixed(1));
  };
// Calculate year-over-year change (previous complete year vs year before that)
  const calculateYearOverYearChange = (data) => {
    const pricesByYear = groupPricesByYear(data);
    const years = Object.keys(pricesByYear)
        .map(year => parseInt(year))
        .filter(year => !isNaN(year))
        .sort((a, b) => a - b);

    // Need at least 2 recent years
    if (years.length < 2) return null;

    // Get the last complete year and the year before
    const lastYear = years[years.length - 1];
    const prevYear = years[years.length - 2];

    const lastYearAvg = pricesByYear[lastYear.toString()].average;
    const prevYearAvg = pricesByYear[prevYear.toString()].average;

    if (prevYearAvg <= 0) return 0;

    const percentChange = ((lastYearAvg - prevYearAvg) / prevYearAvg) * 100;

    return {
      rate: parseFloat(percentChange.toFixed(1)),
      lastYear: lastYear,
      prevYear: prevYear
    };
  };

  // Severity color mapping
  const severityColors = {
    "Extremely Alarming": "red.500",
    "Alarming": "orange.500",
    "Serious": "yellow.500",
    "Moderate": "green.400",
    "Low": "green.300"
  };

  // Create map data for choropleth
  const getMapData = () => {
    return {
      type: "choropleth",
      locations: hungerData.map(country => country.country),
      locationmode: "country names",
      z: hungerData.map(country => country.ghi2024),
      text: hungerData.map(country =>
          `${country.country}<br>GHI Score: ${country.ghi2024.toFixed(1)}<br>Status: ${country.severity}`
      ),
      colorscale: [
        [0, "#2c7bb6"],     // Low
        [0.2, "#abd9e9"],   // Moderate
        [0.4, "#ffffbf"],   // Serious
        [0.7, "#fdae61"],   // Alarming
        [1, "#d7191c"]      // Extremely Alarming
      ],
      colorbar: {
        title: "GHI Score",
        thickness: 15
      },
      hoverinfo: "text"
    };
  };

  // Progress data for chart
  const getProgressChartData = () => {
    // Find countries with complete data from 2000 to 2024
    const countriesWithTrend = hungerData.filter(c =>
        c.ghi2016 && c.ghi2024
    ).slice(0, 10); // Limit to top 10 for clarity

    return {
      labels: ["2016", "2024"],
      datasets: countriesWithTrend.map((country, index) => ({
        label: country.country,
        data: [country.ghi2016, country.ghi2024],
        borderColor: `hsl(${index * 36}, 70%, 50%)`,
        backgroundColor: `hsla(${index * 36}, 70%, 50%, 0.1)`,
        tension: 0.3
      }))
    };
  };

  // Show loading state
  if (loading) {
    return (
        <Flex height="100vh" align="center" justify="center">
          <CircularProgress isIndeterminate color="yellow.400" size="100px" />
          <Text ml={4}>Loading hunger data...</Text>
        </Flex>
    );
  }

  return (
      <Box p={4} bg="gray.100" minHeight="100vh">
        <Heading textAlign="center" color="goldenrod" mb={6}>
          Global Hunger Dashboard
        </Heading>

        {/* Key Stats Row */}
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4} mb={6}>
          {/*<Stat p={4} bg="white" shadow="md" borderRadius="md" position="relative" overflow="hidden">*/}
          {/*  <Box position="absolute" top={0} right={0} bg="red.400" p={2} borderBottomLeftRadius="md">*/}
          {/*    <Text fontSize="xs" color="white">Global</Text>*/}
          {/*  </Box>*/}
          {/*  <StatLabel>People in Food Crisis</StatLabel>*/}
          {/*  <StatNumber fontSize="2xl">{globalStats.totalAffected}M</StatNumber>*/}
          {/*  <StatHelpText>*/}
          {/*    <StatArrow type={globalStats.changePercent > 0 ? "increase" : "decrease"} />*/}
          {/*    {Math.abs(globalStats.changePercent)}% since 2016*/}
          {/*  </StatHelpText>*/}
          {/*  <Progress value={70} colorScheme="red" size="sm" mt={2} />*/}
          {/*</Stat>*/}

          {/* Replace the existing People in Food Crisis stat with this */}
          <Stat p={4} bg="white" shadow="md" borderRadius="md" position="relative" overflow="hidden">
            <Box position="absolute" top={0} right={0} bg="red.400" p={2} borderBottomLeftRadius="md">
              <Text fontSize="xs" color="white">Global</Text>
            </Box>
            <StatLabel>Global Undernourishment</StatLabel>
            <StatNumber fontSize="2xl">{globalStats.undernourishmentRate}%</StatNumber>
            <StatHelpText>
              <StatArrow type={globalStats.changePercent > 0 ? "increase" : "decrease"} />
              {Math.abs(globalStats.changePercent)}% since 2016
            </StatHelpText>
            <Progress
                value={Math.min(globalStats.undernourishmentRate * 2, 100)}
                colorScheme="red"
                size="sm"
                mt={2}
            />
          </Stat>

          <Stat p={4} bg="white" shadow="md" borderRadius="md" flex="1">
            <Box position="absolute" top={0} right={0} bg="orange.400" p={2} borderBottomLeftRadius="md">
              <Text fontSize="xs" color="white">Global</Text>
            </Box>
            <StatLabel>Annual Food Price Growth</StatLabel>
            <StatNumber>{calculateAnnualizedIncrease(foodPriceData)}%</StatNumber>

                <StatHelpText>
                  <StatArrow
                      type={calculateAnnualizedIncrease(foodPriceData) > lastYearRate ? "increase" : "decrease"}
                  />
                  {calculateAnnualizedIncrease(foodPriceData) > lastYearRate
                      ? `Up from ${lastYearRate}% last year`
                      : `Down from ${lastYearRate}% last year`}
                </StatHelpText>

            <StatHelpText>Annual average (1990-2025)</StatHelpText>
            <Progress
                value={Math.min(calculateAnnualizedIncrease(foodPriceData) * 5, 100)}
                colorScheme="orange"
                size="sm"
                mt={2}
            />
          </Stat>

          <Stat p={4} bg="white" shadow="md" borderRadius="md" flex="1">
            <Box position="absolute" top={0} right={0} bg="orange.400" p={2} borderBottomLeftRadius="md">
              <Text fontSize="xs" color="white">Global</Text>
            </Box>
            <StatLabel>Total Price Increase</StatLabel>
            <StatNumber>{calculatePriceIncrease(foodPriceData)}%</StatNumber>
            <StatHelpText>
              Global increase since 2015
              <Box as="span" ml={2} fontWeight="bold" color="gray.500">
                (${(100 * (1 + calculatePriceIncrease(foodPriceData)/100)).toFixed(0)} per $100)
              </Box>
            </StatHelpText>
            <Progress value={Math.min(calculatePriceIncrease(foodPriceData), 100)} colorScheme="orange" size="sm" mt={2} />
          </Stat>


          {/*/!*commented sdg zero hunger progress since it seems wrong*!/*/}
          {/*<Stat p={4} bg="white" shadow="md" borderRadius="md" flex="1">*/}
          {/*  <Box position="absolute" top={0} right={0} bg="green.400" p={2} borderBottomLeftRadius="md">*/}
          {/*    <Text fontSize="xs" color="white">Global</Text>*/}
          {/*  </Box>*/}
          {/*  <StatLabel>SDG Zero Hunger Progress</StatLabel>*/}
          {/*  <StatNumber>{globalStats.progressPercent}%</StatNumber>*/}
          {/*  <StatHelpText>Target by {globalStats.targetYear}</StatHelpText>*/}
          {/*  <Progress value={globalStats.progressPercent} colorScheme="green" size="sm" mt={2} />*/}
          {/*</Stat>*/}
        </SimpleGrid>

        {/* Map Section */}
        <Box bg="white" shadow="md" borderRadius="md" p={4} mb={6}>
          <Heading as="h3" size="md" mb={4}>
            Global Hunger Severity Map
          </Heading>
          <Box height="400px">
            {hungerData.length > 0 && (
                <Plot
                    data={[getMapData()]}
                    layout={{
                      autosize: true,
                      geo: {
                        showframe: false,
                        showcoastlines: true,
                        projection: {
                          type: 'mercator'
                        }
                      },
                      margin: { t: 0, b: 0, l: 0, r: 0 }
                    }}
                    style={{ width: '100%', height: '100%' }}
                    config={{ responsive: true }}
                />
            )}
          </Box>
        </Box>

        {/* Bottom Row */}
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
          {/* Worst Affected Countries */}
          <Box bg="white" shadow="md" borderRadius="md" p={4}>
            <Heading as="h3" size="md" mb={4}>
              Worst Hunger-Affected Countries
            </Heading>
            <VStack spacing={3} align="stretch">
              {worstAffectedCountries.map((country, index) => (
                  <Box key={index}>
                    <HStack justify="space-between">
                      <Text>{country.country}</Text>
                      <HStack>
                        <Text fontWeight="bold" color={severityColors[country.severity]}>
                          {country.severity}
                        </Text>
                        <Text>{country.ghi2024.toFixed(1)}</Text>
                      </HStack>
                    </HStack>
                    {index < worstAffectedCountries.length - 1 && <Divider mt={2} />}
                  </Box>
              ))}
            </VStack>

            <NextLink href="/worstaffectedcountries" passHref>
              <Button rightIcon={<ArrowForwardIcon />} colorScheme="yellow" variant="ghost" mt={4}>
                See detailed analysis
              </Button>
            </NextLink>
          </Box>

          <Flex gap={4}>
            <Box bg="white" width="900px" shadow="md" borderRadius="md" p={4} flex="1">
              <VStack align="stretch" spacing={4}>
                <Heading as="h3" size="md">
                  Hunger Reduction Progress
                </Heading>
                <HStack justifyContent="space-between">
                  <Box
                      height="150px"
                      width="100%"
                      bg="gray.200"
                      borderRadius="md"
                      mb={4}
                      textAlign="center"
                      pt="60px"
                  >
                    [Line Chart Placeholder]
                  </Box>

                  <CircularProgress value={67} color="green.400" size="100px">
                    <CircularProgressLabel>67%</CircularProgressLabel>
                  </CircularProgress>
                </HStack>

                <Divider />

                <Heading as="h3" size="md">
                  Recent Reports
                </Heading>
                <VStack
                    align="stretch"
                    spacing={3}
                    maxHeight="150px"
                    overflowY="auto"
                    pr={2}
                >
                  <Box bg="gray.100" p={2} borderRadius="md">
                    [Placeholder]
                  </Box>
                  <Box bg="gray.100" p={2} borderRadius="md">
                    [Placeholder]
                  </Box>
                  <Box bg="gray.100" p={2} borderRadius="md">
                    [Placeholder]
                  </Box>
                  <Box bg="gray.100" p={2} borderRadius="md">
                    [Placeholder]
                  </Box>
                  <Box bg="gray.100" p={2} borderRadius="md">
                    [Placeholder]
                  </Box>
                </VStack>
              </VStack>
            </Box>
          </Flex>
        </SimpleGrid>
      </Box>
  );
}
