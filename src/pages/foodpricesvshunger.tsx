import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import {
    Box, Heading, Text, Center, Spinner, Flex, HStack, Select,
    FormControl, FormLabel, Table, Thead, Tbody, Tr, Th, Td
} from "@chakra-ui/react";
import Papa from "papaparse";
import React, { ReactNode } from "react";

// Dynamically import Plotly (disabling SSR)
const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });

// Type definition for the data
type FoodPriceData = {
    Latitude: number;
    Longitude: number;
    Price: number;
    Country: string;
    Region: string;
    City: string;
    market: string;
    commodity: string;
    [key: string]: any; // For other potential fields
};

export default function Foodpricesvshunger() {
    const [data, setData] = useState<FoodPriceData[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
    const [priceFilter, setPriceFilter] = useState<string>("all");
    const [limitFilter, setLimitFilter] = useState<number>(100);
    const [filteredData, setFilteredData] = useState<FoodPriceData[]>([]);
    const [countryData, setCountryData] = useState<FoodPriceData[]>([]);

    // Fetch the CSV data
    useEffect(() => {
        fetch("/data/combined_country_food_prices.csv")
            .then((res) => res.text())
            .then((csvText) => {
                const parsed = Papa.parse(csvText, { header: true });

                // Clean and prepare data similar to Python code
                const rawData = parsed.data as any[];
                const cleanedData = rawData
                    .filter(item => {
                        // Filter out non-food items
                        const nonFoodKeywords = ["wage", "fuel", "diesel", "labour", "labor"];
                        const commodity = String(item.commodity || "").toLowerCase();
                        return !nonFoodKeywords.some(keyword => commodity.includes(keyword));
                    })
                    .map(item => ({
                        Latitude: parseFloat(item.latitude),
                        Longitude: parseFloat(item.longitude),
                        Price: parseFloat(item.usdprice),
                        Country: item.Source_Country,
                        Region: item.admin1,
                        City: item.admin2,
                        market: item.market,
                        commodity: item.commodity,
                        unit: item.unit,
                        date: item.date,
                        year: item.date ? new Date(item.date).getFullYear() : null,


                    }))
                    .filter(item => !isNaN(item.Price) && item.Price < 50);

                setData(cleanedData);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error loading food price data:", error);
                setLoading(false);
            });
    }, []);

    // Apply filters when data, priceFilter, or limitFilter changes
    // Inside the existing component, replace the following useEffect block
    // (this replaces how `countryData` is set when a country is selected)

    useEffect(() => {
        if (data.length === 0) return;

        let filtered = [...data];

        if (priceFilter === "low") {
            filtered = filtered.filter(item => item.Price >= 0.5 && item.Price <= 10);
        } else if (priceFilter === "high") {
            filtered = filtered.filter(item => item.Price > 10);
        }

        // Sort filtered data by year DESC before applying country limit
        filtered.sort((a, b) => (b.year || 0) - (a.year || 0));

        const countryGroups: Record<string, FoodPriceData[]> = {};
        for (const item of filtered) {
            if (!countryGroups[item.Country]) {
                countryGroups[item.Country] = [];
            }
            if (countryGroups[item.Country].length < limitFilter) {
                countryGroups[item.Country].push(item);
            }
        }

        filtered = Object.values(countryGroups).flat();
        setFilteredData(filtered);

        if (selectedCountry) {
            const selected = filtered
                .filter(item => item.Country === selectedCountry)
                .sort((a, b) => {
                    const yearA = a.year || 0;
                    const yearB = b.year || 0;
                    return yearB - yearA;
                });

            setCountryData(selected);
        }
    }, [data, priceFilter, limitFilter, selectedCountry]);

    const handleCountryClick = (event: any) => {
        const country = event.points?.[0]?.hovertext;
        if (country) {
            setSelectedCountry(country);
            setCountryData(filteredData.filter(item => item.Country === country));
        }
    };

    if (loading) {
        return (
            <Center h="100vh" bg="gray.100" flexDirection="column">
                <Spinner size="xl" color="yellow.400" />
                <Box ml={4}>Loading Food Price Data...</Box>
            </Center>
        );
    }

    return (
        <Flex direction="column" align="center" p={4} bg="gray.50" minH="100vh">
            {/* Header */}
            <Heading mb={4} color="teal.600" textAlign="center" fontSize={{ base: "3xl", md: "4xl" }}>
                Global Food Prices Dashboard (USD)
            </Heading>

            {/* Filters Section */}
            <Flex
                direction={{ base: "column", md: "row" }}
                gap={4}
                mb={6}
                w="100%"
                maxW="1200px"
                justify="center"
            >
                <FormControl maxW="300px">
                    <FormLabel>Filter by Price Range:</FormLabel>
                    <Select
                        value={priceFilter}
                        onChange={(e) => setPriceFilter(e.target.value)}
                        bg="white"
                    >
                        <option value="all">All Prices</option>
                        <option value="low">$0.5 - $10</option>
                        <option value="high">$10 - $50</option>
                    </Select>
                </FormControl>

                <FormControl maxW="300px">
                    <FormLabel>Limit Market Entries per Country:</FormLabel>
                    <Select
                        value={limitFilter}
                        onChange={(e) => setLimitFilter(parseInt(e.target.value))}
                        bg="white"
                    >
                        <option value="10">10 markets per country</option>
                        <option value="50">50 markets per country</option>
                        <option value="100">100 markets per country</option>
                        <option value="200">200 markets per country</option>
                    </Select>
                </FormControl>
            </Flex>

            {/* Map Section */}
            <Box
                bg="white"
                p={6}
                borderRadius="lg"
                boxShadow="lg"
                width="100%"
                maxW="1200px"
                mb={6}
            >
                <Plot
                    data={[{
                        type: "scattergeo",
                        lat: filteredData.map(d => d.Latitude),
                        lon: filteredData.map(d => d.Longitude),
                        text: filteredData.map(d => d.Country),
                        hovertext: filteredData.map(d => d.Country),
                        hovertemplate:
                            "<b>%{text}</b><br>" +
                            "Region: %{customdata[0]}<br>" +
                            "City: %{customdata[1]}<br>" +
                            "Market: %{customdata[2]}<br>" +
                            "Price: $%{customdata[3]:.2f}<extra></extra>",
                        customdata: filteredData.map(d => [
                            d.Region || "N/A",
                            d.City || "N/A",
                            d.market || "N/A",
                            d.Price
                        ]),
                        marker: {
                            size: 8,
                            opacity: 0.8,
                            color: filteredData.map(d => d.Price),
                            colorscale: [
                                [0, "#009688"],     // Teal for low prices
                                [0.5, "#FFEB3B"],   // Yellow midrange
                                [1, "#F44336"],     // Red for high prices
                            ],

                            colorbar: {
                                title: "Price (USD)",
                                thickness: 15
                            }
                        }
                    }]}
                    layout={{
                        autosize: true,
                        title: "Global Food Prices (USD) at Market Locations",
                        geo: {
                            projection: { type: "natural earth" },
                            showland: true,
                            landcolor: "whitesmoke",
                            showocean: true,
                            oceancolor: "lightblue",
                            showcoastlines: true,
                            coastlinecolor: "gray",
                        },
                        margin: { r: 10, t: 50, l: 10, b: 10 },
                    }}
                    onClick={handleCountryClick}
                    style={{ width: "100%", height: "600px" }}
                    useResizeHandler
                />
            </Box>

            {/* Country Data Table Section */}
            <Box
                bg="white"
                p={6}
                borderRadius="lg"
                boxShadow="lg"
                width="100%"
                maxW="1200px"
            >
                <Heading size="md" color="teal.600" mb={4}>
                    {selectedCountry ? `Market Details for ${selectedCountry}` : "Click on a country to view market details"}
                </Heading>

                {countryData.length > 0 ? (
                    <Box overflowX="auto">
                        <Table variant="simple" size="sm">
                            <Thead>
                                <Tr>
                                    <Th>Commodity (Year)</Th>
                                    <Th>Market</Th>
                                    <Th>Region</Th>
                                    <Th>City</Th>
                                    <Th isNumeric>Price (USD)</Th>
                                    <Th>Unit</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {countryData.slice(0, 20).map((item, index) => {
                                    const year = item.yearmonth?.slice(0, 4) || "N/A";
                                    return (
                                        <Tr key={index}>
                                            <Td>{`${item.commodity} (${item.year || "N/A"})`}</Td>
                                            <Td>{item.market}</Td>
                                            <Td>{item.Region || "N/A"}</Td>
                                            <Td>{item.City || "N/A"}</Td>
                                            <Td isNumeric>${item.Price.toFixed(2)}</Td>
                                            <Td>{item.unit}</Td>
                                        </Tr>
                                    );
                                })}
                            </Tbody>

                        </Table>
                        {countryData.length > 20 && (
                            <Text mt={2} color="gray.500" fontSize="sm" textAlign="center">
                                Showing 20 of {countryData.length} market entries. Apply filters to narrow results.
                            </Text>
                        )}
                    </Box>
                ) : selectedCountry ? (
                    <Text>No data available for the selected country.</Text>
                ) : (
                    <Text>Select a country on the map to view market details.</Text>
                )}
            </Box>
        </Flex>
    );
}