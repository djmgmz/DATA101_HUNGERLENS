import { Box, Heading, Text, Grid, Flex, Icon, Divider } from '@chakra-ui/react';
import { FaChartLine, FaGlobeAfrica, FaMoneyBillWave, FaChartBar, FaExclamationTriangle } from 'react-icons/fa';

const CorrelationInsights = () => {
  return (
      <Box p={6} bg="gray.50" minHeight="100vh">
        <Box maxWidth="1200px" mx="auto">
          <Heading as="h1" textAlign="center" color="goldenrod" mb={8} fontSize="3xl">
            Global Hunger & Poverty: Key Insights and Analysis
          </Heading>

          {/* Introduction Section */}
          <Box p={6} bg="white" borderRadius="lg" boxShadow="md" mb={8}>
            <Text fontSize="lg" lineHeight="1.8" color="gray.700">
              These visualizations help policymakers, researchers, NGOs, and advocacy groups identify hunger and poverty trends globally and regionally. By understanding these patterns, they can prioritize humanitarian aid and policy changes to address the most pressing needs. The insights derived from the data enable targeted interventions to alleviate hunger, reduce poverty, and improve food security, ultimately shaping more effective and sustainable solutions to global hunger crises.
            </Text>
          </Box>

          {/* Main Content Grid */}
          <Grid templateColumns={{ base: "1fr", lg: "repeat(2, 1fr)" }} gap={8}>
            {/* Section 1: Poverty-Hunger Cycle */}
            <Box p={6} bg="white" borderRadius="lg" boxShadow="md">
              <Flex align="center" mb={4}>
                <Icon as={FaChartLine} color="goldenrod" boxSize={5} mr={3} />
                <Heading as="h2" size="md" color="gray.700">The Poverty-Hunger Cycle</Heading>
              </Flex>
              <Divider mb={4} />
              <Text fontSize="md" lineHeight="1.7" color="gray.700" mb={4}>
                The relationship between poverty and hunger forms an interconnected cycle affecting many parts of the world, particularly low-income and conflict-prone regions. Countries such as Chad, Niger, and Somalia demonstrate a strong correlation between poverty levels and hunger severity.
              </Text>
              <Text fontSize="md" lineHeight="1.7" color="gray.700">
                When poverty increases due to economic instability, conflict, or climate-related disruptions, hunger levels tend to rise alongside. Conversely, progress in poverty reduction often accompanies improvements in food security and nutritional outcomes.
              </Text>
            </Box>

            {/* Section 2: Regional Focus - Africa */}
            <Box p={6} bg="white" borderRadius="lg" boxShadow="md">
              <Flex align="center" mb={4}>
                <Icon as={FaGlobeAfrica} color="goldenrod" boxSize={5} mr={3} />
                <Heading as="h2" size="md" color="gray.700">Africa's Food Security Challenge</Heading>
              </Flex>
              <Divider mb={4} />
              <Text fontSize="md" lineHeight="1.7" color="gray.700" mb={4}>
                Africa, especially Sub-Saharan Africa, faces persistent challenges related to poverty, political instability, and inadequate infrastructure, all exacerbating hunger. These factors make it difficult for countries to break the cycle of poverty and hunger.
              </Text>
              <Text fontSize="md" lineHeight="1.7" color="gray.700">
                The situation is particularly dire in countries affected by both economic poverty and conflict or extreme climatic events such as droughts or floods, creating complex humanitarian emergencies.
              </Text>
            </Box>

            {/* Section 3: Food Prices Impact */}
            <Box p={6} bg="white" borderRadius="lg" boxShadow="md">
              <Flex align="center" mb={4}>
                <Icon as={FaMoneyBillWave} color="goldenrod" boxSize={5} mr={3} />
                <Heading as="h2" size="md" color="gray.700">Food Price Vulnerability</Heading>
              </Flex>
              <Divider mb={4} />
              <Text fontSize="md" lineHeight="1.7" color="gray.700" mb={4}>
                Food prices have a profound impact on hunger, particularly in countries with weak economic resilience. As prices rise, lower-income populations who already spend a significant portion of their income on basic food are hit the hardest.
              </Text>
              <Text fontSize="md" lineHeight="1.7" color="gray.700">
                This quickly leads to increased undernourishment in nations where public food assistance programs are lacking or underfunded. Hunger spikes have been observed during periods of global food price inflation or local agricultural disruption.
              </Text>
            </Box>

            {/* Section 4: Global Trends */}
            <Box p={6} bg="white" borderRadius="lg" boxShadow="md">
              <Flex align="center" mb={4}>
                <Icon as={FaChartBar} color="goldenrod" boxSize={5} mr={3} />
                <Heading as="h2" size="md" color="gray.700">Global Hunger Trends</Heading>
              </Flex>
              <Divider mb={4} />
              <Text fontSize="md" lineHeight="1.7" color="gray.700" mb={4}>
                Since the early 2000s, the Global Hunger Index (GHI) has shown gradual but consistent improvement, indicating declining hunger levels across many regions. This progress is attributed to targeted policy interventions, improved agricultural practices, economic development, and international aid efforts.
              </Text>
              <Text fontSize="md" lineHeight="1.7" color="gray.700">
                While regions like East Asia and Latin America have made significant strides, Sub-Saharan Africa and parts of South Asia still face high to extremely alarming hunger levels, highlighting uneven global progress.
              </Text>
            </Box>

            {/* Section 5: Most Affected Countries */}
            <Box p={6} bg="white" borderRadius="lg" boxShadow="md" gridColumn={{ lg: "span 2" }}>
              <Flex align="center" mb={4}>
                <Icon as={FaExclamationTriangle} color="goldenrod" boxSize={5} mr={3} />
                <Heading as="h2" size="md" color="gray.700">Most Affected Countries</Heading>
              </Flex>
              <Divider mb={4} />
              <Text fontSize="md" lineHeight="1.7" color="gray.700" mb={4}>
                GHI data reveals that nations with the highest scores often face overlapping crises: extreme poverty, weak governance, ongoing conflict, and limited infrastructure. These factors compound the effects of food insecurity.
              </Text>
              <Text fontSize="md" lineHeight="1.7" color="gray.700" mb={4}>
                In countries like Chad and Somalia, undernourishment rates often exceed 40%, reflecting deep-rooted challenges in ensuring regular and adequate food access. Child wasting and mortality remain persistently high in these regions.
              </Text>
              <Text fontSize="md" lineHeight="1.7" color="gray.700">
                The correlation between poverty and hunger is critical for understanding how to effectively address food insecurity. While global hunger has generally improved over past decades, progress is fragile and highly dependent on stable governance, poverty alleviation, and resilience to economic and environmental shocks. Tackling hunger requires a multidimensional approach addressing both economic roots of poverty and systemic barriers to accessing sufficient, nutritious food.
              </Text>
            </Box>
          </Grid>
        </Box>
      </Box>
  );
};

export default CorrelationInsights;