import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Box, Heading, Text, Center, Spinner, Flex, HStack, Select } from "@chakra-ui/react";
import Papa from "papaparse";

const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });

type GHIData = {
  Country: string;
  "2000": string;
  "2008": string;
  "2016": string;
  "2024": string;
  lat: string;
  long: string;
};

const getGHI = (row: GHIData, year: string): number =>
  parseFloat(row[year as keyof GHIData] || "") || 0;

export default function GHIInsights() {
  const [data, setData] = useState<GHIData[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [year, setYear] = useState("2024");

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/data/ghi_scores_lat_long.csv");
      const text = await res.text();
      const parsed = Papa.parse<GHIData>(text, { header: true });
      setData(parsed.data.filter(d => d.Country));
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleCountryClick = (event: any) => {
    const country = event.points?.[0]?.location;
    if (country) {
      setSelectedCountry(country);
    }
  };

  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setYear(event.target.value);
  };

  if (loading) {
    return (
      <Center h="100vh">
        <Spinner size="xl" />
        <Box ml={4}>Loading GHI data...</Box>
      </Center>
    );
  }

  return (
    <Flex direction="column" align="center" p={6} bg="gray.50" minH="100vh">
      <Heading mb={4} color="red.600">
        Global Hunger Index ({year})
      </Heading>

      <Select value={year} onChange={handleYearChange} mb={4} width="200px">
        <option value="2000">2000</option>
        <option value="2008">2008</option>
        <option value="2016">2016</option>
        <option value="2024">2024</option>
      </Select>

      <Plot
        data={[
          {
            type: "choropleth",
            locations: data.map((d) => d.Country),
            locationmode: "country names",
            z: data.map((d) => getGHI(d, year)),
            text: data.map((d) => d.Country),
            colorscale: [
              [0, "#4CAF50"],    // Very Low GHI (Green)
              [0.25, "#8BC34A"], // Low
              [0.5, "#FFEB3B"],  // Moderate
              [0.75, "#FF9800"], // High
              [1, "#F44336"],    // Very High GHI (Red)
            ],
            hovertemplate: "<b>%{text}</b><br>GHI: %{z}<extra></extra>",
            colorbar: { title: "GHI" }
          }
        ]}
        layout={{
          geo: {
            projection: { type: "natural earth" },
            showland: true,
            landcolor: "whitesmoke",
            showocean: true,
            oceancolor: "lightblue",
            showcoastlines: true,
            coastlinecolor: "gray"
          },
          margin: { r: 0, t: 0, l: 0, b: 0 }
        }}
        onClick={handleCountryClick}
        style={{ width: "100%", height: "600px" }}
        useResizeHandler
      />

      <HStack spacing={6} mt={4}>
        <Text fontSize="sm">
          <Box as="span" w="20px" h="20px" bg="red.400" display="inline-block" mr={2} /> High
        </Text>
        <Text fontSize="sm">
          <Box as="span" w="20px" h="20px" bg="yellow.400" display="inline-block" mr={2} /> Medium
        </Text>
        <Text fontSize="sm">
          <Box as="span" w="20px" h="20px" bg="green.400" display="inline-block" mr={2} /> Low
        </Text>
        <Text fontSize="sm">
          <Box as="span" w="20px" h="20px" bg="teal.400" display="inline-block" mr={2} /> Very Low
        </Text>
        <Text fontSize="sm">
          <Box as="span" w="20px" h="20px" bg="gray.400" display="inline-block" mr={2} /> No Data
        </Text>
      </HStack>

      <Box mt={8} p={4} bg="white" w="80%" borderRadius="md" boxShadow="md">
        {selectedCountry ? (
          <CountryDetails country={selectedCountry} data={data} />
        ) : (
          <Text textAlign="center" color="gray.600">
            Click a country to view its GHI history.
          </Text>
        )}
      </Box>
    </Flex>
  );
}

function CountryDetails({ country, data }: { country: string; data: GHIData[] }) {
  const records = data.filter((d) => d.Country === country);

  if (records.length === 0) {
    return (
      <>
        <Heading size="md" color="red.600" mb={2}>
          {country}
        </Heading>
        <Text fontSize="sm" color="gray.500">
          No data found for this country.
        </Text>
      </>
    );
  }

  const countryName = records[0].Country || country;
  const years = ["2000", "2008", "2016", "2024"];

  const renderTableData = (row: GHIData) => {
    return years.map((year) => {
      const ghiValue = parseFloat(row[year] || "") || NaN; // Replace 0 with NaN
      return (
        <td key={year} style={{ padding: "8px", border: "1px solid #ddd" }}>
          {isNaN(ghiValue) ? "NaN" : ghiValue}
        </td>
      );
    });
  };

  return (
    <>
      <Heading size="md" color="red.600" mb={4}>
        {countryName}
      </Heading>

      <Box overflowX="auto" maxWidth="100%">
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ textAlign: "left", padding: "8px", border: "1px solid #ddd" }}>Country</th>
              {years.map((year) => (
                <th key={year} style={{ textAlign: "left", padding: "8px", border: "1px solid #ddd" }}>
                  {year}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {records.map((row) => (
              <tr key={row.Country}>
                <td style={{ padding: "8px", border: "1px solid #ddd" }}>{row.Country}</td>
                {renderTableData(row)}
              </tr>
            ))}
          </tbody>
        </table>
      </Box>
    </>
  );
}
