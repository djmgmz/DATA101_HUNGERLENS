import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Box, Heading, Text, Center, Spinner, Flex, HStack, Fade } from "@chakra-ui/react";
import Papa from "papaparse";

// Dynamically import Plotly (disabling SSR)
const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });

// Type definition for the data
type PovertyData = {
  ISO_Code: string;
  Country: string;
  Year: string;
  Poverty_Rate: string;
};

export default function PovertyInsights() {
  const [data, setData] = useState<PovertyData[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedISO, setSelectedISO] = useState<string | null>(null);
  const [showMessage, setShowMessage] = useState<boolean>(false);

  // Fetch the CSV data
  useEffect(() => {
    fetch("/data/clean_poverty_data.csv")
      .then((res) => res.text())
      .then((csvText) => {
        const parsed = Papa.parse(csvText, { header: true });
        setData(parsed.data as PovertyData[]);
        setLoading(false);
      });
  }, []);

  const handleCountryClick = (event: any) => {
    const iso = event.points?.[0]?.location;
    if (iso) {
      setSelectedISO(iso);
      setShowMessage(true); // Show message when a country is clicked
    }
  };

  if (loading) {
    return (
      <Center h="100vh" bg="gray.100" flexDirection="column">
        <Spinner size="xl" color="yellow.400" />
        <Box ml={4}>Loading Poverty Data...</Box>
      </Center>
    );
  }

  // Extract unique years and sort them
  const uniqueYears = [...new Set(data.map((d) => d.Year))].sort();

  return (
    <Flex direction="column" align="center" p={0} bg="gray.50" minH="100vh" justify="center">
      {/* Map Section */}
      <Box bg="white" p={6} borderRadius="lg" boxShadow="1g" width="100%" mb={6}>
        <Heading mb={0} color="red.600" textAlign="center" fontSize="5xl" ml="-160px">
          Poverty Rates Over Time
        </Heading>

        <Plot
          data={[{
            type: "choropleth",
            locations: data.map((d) => d.ISO_Code),
            z: data.map((d) => parseFloat(d.Poverty_Rate) || 0),
            text: data.map((d) => d.Country),
            colorscale: [
              [0, "#F44336"],  // Poverty is Rising (Red)
              [0.25, "#FFEB3B"],  // Off Track for SDG Target (Yellow)
              [0.5, "#4CAF50"],  // On Track for SDG Target (Green)
              [0.75, "#009688"],  // Poverty Below 3% (Teal)
              [1, "#9E9E9E"],  // No Data (Gray)
            ],
            hovertemplate: "<b>%{text}</b><br>Poverty: %{z}%<extra></extra>",
          }]}
          layout={{
            autosize: true,
            geo: {
              projection: { type: "natural earth" },
              showland: true,
              landcolor: "whitesmoke",
              showocean: true,
              oceancolor: "lightblue",
              showcoastlines: true,
              coastlinecolor: "gray",
            },
            margin: { r: 0, t: 50, l: 0, b: 50 },
            updatemenus: [{
              type: "buttons",
              showactive: false,
              x: 0.09,
              y: -0.12,
              direction: "row",
              buttons: [
                {
                  label: "▶ Play",
                  method: "animate",
                  args: [
                    null,
                    {
                      fromcurrent: true,
                      frame: { duration: 700 },
                      transition: { duration: 300 },
                    },
                  ],
                  style: {
                    backgroundColor: "#ff6f61",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    padding: "10px 20px",
                    cursor: "pointer",
                    fontSize: "16px",
                  },
                },
                {
                  label: "⏸ Pause",
                  method: "animate",
                  args: [
                    [null],
                    {
                      mode: "immediate",
                      frame: { redraw: false },
                      transition: { duration: 300 },
                    },
                  ],
                  style: {
                    backgroundColor: "#4CAF50",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    padding: "10px 20px",
                    cursor: "pointer",
                    fontSize: "16px",
                  },
                },
              ],
            }],
            sliders: [{
              active: 0,
              pad: { t: 50 },
              x: 0.1,
              y: 0,
              steps: uniqueYears.map((year, i) => ({
                label: year,
                method: "animate",
                args: [
                  [String(i)],
                  { mode: "immediate", frame: { duration: 600 }, transition: { duration: 300 } },
                ],
              })),
            }],
          }}
          frames={uniqueYears.map((year, i) => ({
            name: String(i),
            data: [{
              type: "choropleth",
              locations: data.filter((d) => d.Year === year).map((d) => d.ISO_Code),
              z: data.filter((d) => d.Year === year).map((d) => parseFloat(d.Poverty_Rate) || 0),
              text: data.filter((d) => d.Year === year).map((d) => d.Country),
              colorscale: [
                [0, "#F44336"],  // Poverty is Rising (Red)
                [0.25, "#FFEB3B"],  // Off Track for SDG Target (Yellow)
                [0.5, "#4CAF50"],  // On Track for SDG Target (Green)
                [0.75, "#009688"],  // Poverty Below 3% (Teal)
                [1, "#9E9E9E"],  // No Data (Gray)
              ],
              hovertemplate: "<b>%{text}</b><br>Poverty: %{z}%<extra></extra>",
            }],
          }))}
          onClick={handleCountryClick}
          style={{ width: "100%", height: "600px" }}
          useResizeHandler
        />

        {/* Custom Legend Section */}
        <HStack spacing={10} paddingTop="20px" justify="center">
          <Text color="red.400" display="flex" alignItems="center">
            <Box as="span" w="20px" h="20px" bg="red.400" borderRadius="50%" mr={2} />
            Poverty is Rising
          </Text>
          <Text color="yellow.400" display="flex" alignItems="center">
            <Box as="span" w="20px" h="20px" bg="yellow.400" borderRadius="50%" mr={2} />
            Off Track for SDG Target
          </Text>
          <Text color="green.400" display="flex" alignItems="center">
            <Box as="span" w="20px" h="20px" bg="green.400" borderRadius="50%" mr={2} />
            On Track for SDG Target
          </Text>
          <Text color="teal.400" display="flex" alignItems="center">
            <Box as="span" w="20px" h="20px" bg="teal.400" borderRadius="50%" mr={2} />
            Poverty below 3%
          </Text>
          <Text color="gray.400" display="flex" alignItems="center">
            <Box as="span" w="20px" h="20px" bg="gray.400" borderRadius="50%" mr={2} />
            No Data
          </Text>
        </HStack>
      </Box>

      {/* Country Details Section */}
      <Box
        mt={8}
        p={4}
        bg="white"
        w={{ base: selectedISO ? "60%" : "40%", md: selectedISO ? "60%" : "40%" }}
        boxShadow="lg"
        borderRadius="md"
        transition="width 0.5s ease"
      >
        {selectedISO ? (
          <CountryDetails iso={selectedISO} data={data} />
        ) : (
          <Text textAlign="center" color="gray.700" fontSize="md" fontWeight="medium">
            Click on a country to find its poverty history
          </Text>
        )}
      </Box>
    </Flex>
  );
}

/** Component to display a country's poverty history */
function CountryDetails({ iso, data }: { iso: string; data: PovertyData[] }) {
  const records = data.filter((d) => d.ISO_Code === iso);

  if (records.length === 0) {
    return (
      <>
        <Heading size="md" color="red.600" mb={2}>
          {iso}
        </Heading>
        <Text fontSize="sm" color="gray.500">
          No data found for this country.
        </Text>
      </>
    );
  }

  const countryName = records[0].Country || iso;
  const sorted = [...records].sort((a, b) => parseInt(a.Year) - parseInt(b.Year));

  const showScroll = sorted.length > 10;

  return (
    <>
      <Heading size="md" color="red.600" mb={4}>
        {countryName}
      </Heading>
      <Box
        maxH={showScroll ? "250px" : "auto"}
        overflowY={showScroll ? "auto" : "visible"}
        pr={showScroll ? 2 : 0} // small padding on right to avoid scrollbar overlap
      >
        {sorted.map((r) => (
          <Text key={r.Year} fontSize="sm" color="gray.700" mb={1} fontWeight="semibold">
            Year {r.Year}: {r.Poverty_Rate}%
          </Text>
        ))}
      </Box>
    </>
  );
}
