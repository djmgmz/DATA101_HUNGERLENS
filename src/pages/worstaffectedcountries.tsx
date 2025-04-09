import {
  Box,
  Heading,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Flex,
  VStack,
  Text,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { Bar, Line } from "react-chartjs-2";
import Papa from "papaparse";
import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  LineElement,
  BarElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  LineElement,
  PointElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

export default function WorstAffectedCountries() {
  const [view, setView] = useState("Global Hunger Index");
  type YearKey = "'98-02" | "'06-10" | "'14-18" | "'19-23";
  const [yearRange, setYearRange] = useState<YearKey>("'19-23");
  const [data, setData] = useState<any[]>([]);
  const [indicatorData, setIndicatorData] = useState<any[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);

  const yearOptions: { label: string; key: YearKey }[] = [
    { label: "2024 '19-23", key: "'19-23" },
    { label: "2016 '14-18", key: "'14-18" },
    { label: "2008 '06-10", key: "'06-10" },
    { label: "2000 '98-02", key: "'98-02" },
  ];  

  useEffect(() => {
    if (view === "Global Hunger Index") {
      Papa.parse("/ghi_scores_cleaned.csv", {
        header: true,
        download: true,
        skipEmptyLines: true,
        transformHeader: (header) => header.trim().replace(/\s+/g, " "),
        complete: (results) => {
          setData(results.data);
        },
      });            
    }
  }, [view]);

  const columnMapping: Record<YearKey, string> = {
    "'98-02": "2000 '98-'02",
    "'06-10": "2008 '06-'10",
    "'14-18": "2016 '14-'18",
    "'19-23": "2024 '19-'23",
  };  

  const severityColorScale = [
    { label: "Low Hunger (≤ 9.9)", color: "#2c7bb6", min: -Infinity, max: 9.9 },
    { label: "Moderate Hunger (10.0 – 19.9)", color: "#abd9e9", min: 10.0, max: 19.9 },
    { label: "Serious Hunger (20.0 – 34.9)", color: "#ffffbf", min: 20.0, max: 34.9 },
    { label: "Alarming Hunger (35.0 – 49.9)", color: "#fdae61", min: 35.0, max: 49.9 },
    { label: "Extremely Alarming Hunger (≥ 50.0)", color: "#d7191c", min: 50.0, max: Infinity },
  ];
  
  const getSeverityColor = (value: number | null): string => {
    if (value === null || isNaN(value)) return "#ccc";
    return severityColorScale.find(s => value >= s.min && value <= s.max)?.color ?? "#ccc";
  };  

  const ghiDataPoints = data
  .map((d) => {
    const value = d[columnMapping[yearRange]];
    const numericValue = value && value !== "<5" && value !== "—" ? parseFloat(value) : null;
    return { country: d["Country with data from"], value: numericValue };
  })
  .filter((d) => d.value !== null)
  .sort((a, b) => (b.value ?? 0) - (a.value ?? 0))
  .slice(0, 5);

const ghiData = {
  labels: ghiDataPoints.map((d) => d.country),
  datasets: [
    {
      label: "",
      data: ghiDataPoints.map((d) => d.value),
      backgroundColor: ghiDataPoints.map((d) => getSeverityColor(d.value)),
    },
  ],
};

  const indicatorOptions = [
    {
      label: "Undernourishment (% of population)",
      years: ["'21-'23", "'15-'17", "'07-'09", "'00-'02"]
    },
    {
      label: "Child wasting (% of children under five years old)",
      years: ["'19-'23", "'14-'18", "'06-'10", "'98-'02"]
    },
    {
      label: "Child mortality (% of children under five years old)",
      years: ["2022", "2016", "2008", "2000"]
    }
  ];  

  const indicatorColumnMap: Record<string, Record<string, string>> = {
    "Undernourishment (% of population)": {
      "'00-'02": "Undernourishment (% of population) '00-'02",
      "'07-'09": "Undernourishment (% of population) '07-'09",
      "'15-'17": "Undernourishment (% of population) '15-'17",
      "'21-'23": "Undernourishment (% of population) '21-'23",
    },
    "Child wasting (% of children under five years old)": {
      "'98-'02": "Child wasting (% of children under five years old) '98-'02",
      "'06-'10": "Child wasting (% of children under five years old) '06-'10",
      "'14-'18": "Child wasting (% of children under five years old) '14-'18",
      "'19-'23": "Child wasting (% of children under five years old) '19-'23",
    },
    "Child mortality (% of children under five years old)": {
      "2000": "Child mortality (% of children under five years old) 2000",
      "2008": "Child mortality (% of children under five years old) 2008",
      "2016": "Child mortality (% of children under five years old) 2016",
      "2022": "Child mortality (% of children under five years old) 2022",
    }
  };  

  const [indicator, setIndicator] = useState(indicatorOptions[0]);
  const [indicatorYear, setIndicatorYear] = useState(indicatorOptions[0].years[0]);
  const selectedColumn = indicatorColumnMap[indicator.label][indicatorYear];

  useEffect(() => {
    setIndicatorYear(indicator.years[0]);
  }, [indicator]);
  
  
  const indicatorYearOptions = indicator.years.map((year) => ({
    label: year,
    key: year,
  }));  

  useEffect(() => {
    if (view === "Indicators") {
      Papa.parse("/ghi_indicators_cleaned.csv", {
        header: true,
        download: true,
        skipEmptyLines: true,
        transformHeader: (header) => header.trim().replace(/\s+/g, " "),
        complete: (results: Papa.ParseResult<unknown>) => {
          const typedData = results.data as { [key: string]: string }[];
        
          console.log("Indicator CSV headers:", Object.keys(typedData[0]));
          console.log("Looking for column:", selectedColumn);
        
          setIndicatorData(typedData);
        }        
      });
    }
  }, [view, selectedColumn]);  
  
  const validIndicatorData = indicatorData.filter((row, index) => {
    if (index === 0) return false;
  
    const rawValue = row[selectedColumn];
    return rawValue &&
      !rawValue.includes("<") &&
      rawValue !== "�" &&
      rawValue !== "—" &&
      !isNaN(parseFloat(rawValue));
  });

  const selectedIndicatorData = validIndicatorData.map(row =>
    parseFloat(row[selectedColumn])
  );  

  const getIndicatorColorScale = () => {
    if (indicator.label === "Undernourishment (% of population)") {
      return [
        { label: "Low (≤ 9.9)", color: "#ffffd4", min: -Infinity, max: 9.9 },
        { label: "Moderate (10.0–19.9)", color: "#fed98e", min: 10.0, max: 19.9 },
        { label: "Serious (20.0–34.9)", color: "#fe9929", min: 20.0, max: 34.9 },
        { label: "Alarming (35.0–49.9)", color: "#d95f0e", min: 35.0, max: 49.9 },
        { label: "Extremely Alarming (≥ 50.0)", color: "#993404", min: 50.0, max: Infinity },
      ];
    } else {
      return [
        { label: "Very Low (< 2.5%)", color: "#ffffd4", min: -Infinity, max: 2.5 },
        { label: "Low (2.5%–< 5%)", color: "#fed98e", min: 2.5, max: 5.0 },
        { label: "Medium (5%–< 10%)", color: "#fe9929", min: 5.0, max: 10.0 },
        { label: "High (10%–< 15%)", color: "#d95f0e", min: 10.0, max: 15.0 },
        { label: "Very High (≥ 15%)", color: "#993404", min: 15.0, max: Infinity },
      ];
    }
  };

  const indicatorColorScale = getIndicatorColorScale();
  
  const getIndicatorColor = (value: number | null): string => {
    if (value === null || isNaN(value)) return "#ccc";
    return indicatorColorScale.find(s => value >= s.min && value <= s.max)?.color ?? "#ccc";
  };

  const indicatorDataPoints = validIndicatorData
  .map((row) => {
    const value = parseFloat(row[selectedColumn]);
    return { country: row.Country, value };
  })
  .sort((a, b) => b.value - a.value)
  .slice(0, 5);

const indicatorChartData = {
  labels: indicatorDataPoints.map((d) => d.country),
  datasets: [
    {
      label: "",
      data: indicatorDataPoints.map((d) => d.value),
      backgroundColor: indicatorDataPoints.map((d) => getIndicatorColor(d.value)),
    },
  ],
};

const lineChartData = {
  labels: indicator.years.slice().reverse(),
  datasets: [
    {
      label: `${selectedCountry} (${indicator.label})`,
      data: indicator.years
        .slice()
        .reverse()
        .map((year) => {
          const col = indicatorColumnMap[indicator.label][year];
          const countryRow = indicatorData.find((row) => row.Country === selectedCountry);
          const val = countryRow?.[col];
          return val && !val.includes("<") && !isNaN(parseFloat(val)) ? parseFloat(val) : null;
        }),
      borderColor: "teal",
      backgroundColor: "rgba(0, 128, 128, 0.3)",
    },
  ],
};


const horizontalBarOptions = {
  indexAxis: "y" as const,
  plugins: {
    legend: { display: false },
  },
  onClick: (_: any, elements: any) => {
    if (elements.length > 0) {
      const index = elements[0].index;
      const clickedCountry = indicatorDataPoints[index]?.country;
      console.log("Clicked on country:", clickedCountry);
      setSelectedCountry(clickedCountry);
    }
  },
  scales: {
    x: {
      beginAtZero: true,
      title: { display: true, text: "Value" },
    },
    y: {
      title: { display: true, text: "Country" },
    },
  },
};


return (
  <Box p={4} bg="gray.100" minHeight="100vh">
    <Heading textAlign="center" color="goldenrod" mb={6}>
      WORST-AFFECTED COUNTRIES
    </Heading>

    <Flex justify="center" gap={4} mb={6}>
      <Menu>
        <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
          {view}
        </MenuButton>
        <MenuList>
          <MenuItem onClick={() => setView("Global Hunger Index")}>
            Global Hunger Index
          </MenuItem>
          <MenuItem onClick={() => setView("Indicators")}>Indicators</MenuItem>
        </MenuList>
      </Menu>

      {view === "Global Hunger Index" && (
        <Menu>
          <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
            {yearRange}
          </MenuButton>
          <MenuList>
            {yearOptions.map((yr) => (
              <MenuItem key={yr.key} onClick={() => setYearRange(yr.key)}>
                {yr.label}
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
      )}
    </Flex>

    {view === "Global Hunger Index" && (
      <Box px={[2, 10]}>
        <Flex justify="center" wrap="wrap" gap={4} mb={4}>
          {severityColorScale.map((severity) => (
            <Flex align="center" key={severity.label}>
              <Box w="16px" h="16px" bg={severity.color} borderRadius="sm" mr={2} />
              <Text fontSize="sm">{severity.label}</Text>
            </Flex>
          ))}
        </Flex>
        <Bar data={ghiData} options={horizontalBarOptions} />
        
        {selectedCountry && (
          <Box mt={10} px={[2, 10]}>
            <Heading size="md" mb={4} color="teal.700">
              {selectedCountry} Trend Over Time
            </Heading>
            <Line data={lineChartData} />
          </Box>
        )}
      </Box>
    )}

    {view === "Indicators" && (
      <>
        <Flex justify="center" gap={4} mb={4}>
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
              {indicator.label}
            </MenuButton>
            <MenuList>
              {indicatorOptions.map((opt) => (
                <MenuItem key={opt.label} onClick={() => setIndicator(opt)}>
                  {opt.label}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>

          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
              {indicatorYear}
            </MenuButton>
            <MenuList>
              {indicatorYearOptions.map((opt) => (
                <MenuItem key={opt.key} onClick={() => setIndicatorYear(opt.key)}>
                  {opt.label}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
        </Flex>

        <Box px={[2, 10]} mt={4}>
          <Flex justify="center" wrap="wrap" gap={4} mb={4}>
            {indicatorColorScale.map((scale, i) => (
              <Flex align="center" key={i}>
                <Box w="16px" h="16px" bg={scale.color} borderRadius="sm" mr={2} />
                <Text fontSize="sm">{scale.label}</Text>
              </Flex>
            ))}
          </Flex>
          <Bar data={indicatorChartData} options={horizontalBarOptions} />

          {selectedCountry && (
            <Box mt={10} px={[2, 10]}>
              <Heading size="md" mb={4} color="teal.700">
                {selectedCountry} Trend Over Time
              </Heading>
              <Line data={lineChartData} />
            </Box>
          )}
        </Box>
      </>
    )}
  </Box>
);
}
