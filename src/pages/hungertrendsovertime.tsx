import { useEffect, useState, useMemo } from "react";
import {
  Box,
  Heading,
  Spinner,
  Select,
} from "@chakra-ui/react";
import Papa from "papaparse";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

interface GHIEntry {
  Country: string;
  Region: string;
  Year: number;
  "GHI Score": number;
}

export default function HungerTrendsOvertime() {
  const [loading, setLoading] = useState(true);
  const [ghiData, setGhiData] = useState<GHIEntry[]>([]);
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);

  // Fetch and process CSV
  useEffect(() => {
    fetch("/data/ghi_scores_with_region.csv?v=" + new Date().getTime())
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.blob(); // Fetch as a blob
      })
      .then((blob) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          const csv = event.target?.result as string; // Ensure it's a string
          Papa.parse(csv, {
            header: true,
            dynamicTyping: true,
            complete: (results) => {
              console.log("Parsed CSV Results:", results); // Log the entire results object
              const rawData = results.data as any[];
              console.log("Raw Data:", rawData); // Log the raw data array
              const processedData: GHIEntry[] = [];

              rawData.forEach((row) => {
                const years = [2000, 2008, 2016, 2024];
                years.forEach((year) => {
                  const score = parseFloat(row[year.toString()]);
                  if (!isNaN(score)) {
                    processedData.push({
                      Country: row["Country with data from"], // Ensure this matches the CSV header
                      Region: row["region"], // Ensure this matches the CSV header
                      Year: year,
                      "GHI Score": score,
                    });
                  }
                });
              });

              console.log("Processed Data:", processedData); // Log processed data
              setGhiData(processedData);
              setLoading(false);
            },
          });
        };
        reader.readAsText(blob, 'ISO-8859-1'); // Specify the encoding here
      })
      .catch((error) => {
        console.error("Fetch error:", error); // Debugging line
      });
  }, []);

  // Get unique regions only after data is loaded
  const regions = useMemo(() => {
    return ghiData.length > 0 ? Array.from(new Set(ghiData.map((d) => d.Region))) : [];
  }, [ghiData]);

  // If selectedRegion is null, set it to the first region
  useEffect(() => {
    if (regions.length > 0 && selectedRegion === null) {
      setSelectedRegion(regions[0]);
    }
  }, [regions, selectedRegion]);

  const years = [2000, 2008, 2016, 2024];

  const chartData = useMemo(() => {
    if (!selectedRegion || ghiData.length === 0) return { labels: [], datasets: [] };

    const regionCountries = ghiData
      .filter((d) => d.Region === selectedRegion)
      .map((d) => d.Country);

    const uniqueCountries = Array.from(new Set(regionCountries));

    const datasets = uniqueCountries.map((country) => {
      const countryData = ghiData
        .filter((d) => d.Country === country && d.Region === selectedRegion)
        .sort((a, b) => a.Year - b.Year);

      return {
        label: country,
        data: years.map((year) => {
          const entry = countryData.find((d) => d.Year === year);
          return entry ? entry["GHI Score"] : null;
        }),
        borderColor: getRandomColor(),
        fill: false,
        tension: 0.3,
      };
    });

    return {
      labels: years,
      datasets,
    };
  }, [ghiData, selectedRegion]);

  const chartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: `Hunger Trends for ${selectedRegion}`,
      },
      legend: {
        display: true,
        position: "bottom" as const,
      },
    },
    scales: {
      y: {
        title: {
          display: true,
          text: "GHI Score",
        },
        beginAtZero: true,
      },
      x: {
        title: {
          display: true,
          text: "Year",
        },
      },
    },
  };

  const getRandomColor = () =>
    `hsl(${Math.floor(Math.random() * 360)}, 70%, 50%)`;

  if (loading) {
    return (
      <Box p={4} bg="gray.100" minHeight="100vh">
        <Heading textAlign="center" color="goldenrod" mb={6}>
          HUNGER TRENDS OVER TIME
        </Heading>
        <Spinner size="xl" />
      </Box>
    );
  }

  return (
    <Box p={4} bg="gray.100" minHeight="100vh">
      <Heading textAlign="center" color="goldenrod" mb={6}>
        HUNGER TRENDS OVER TIME
      </Heading>

      <Select
        mb={4}
        maxW="300px"
        mx="auto"
        value={selectedRegion || ""}
        onChange={(e) => setSelectedRegion(e.target.value)}
      >
        {regions.map((region) => (
          <option key={region} value={region}>
            {region}
          </option>
        ))}
      </Select>

      <Box bg="white" p={4} rounded="xl" shadow="md">
        <Line data={chartData} options={chartOptions} />
      </Box>
    </Box>
  );
}
