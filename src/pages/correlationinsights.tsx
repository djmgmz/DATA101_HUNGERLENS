import { Box, Heading, Text, Grid, Flex, Icon, Divider, Image, Button, Link } from '@chakra-ui/react';
import { FaChartLine, FaGlobeAfrica, FaMoneyBillWave, FaChartBar, FaExclamationTriangle, FaFileAlt, FaLightbulb } from 'react-icons/fa';

const CorrelationInsights = () => {
  return (
      <Box p={6} bg="gray.50" minHeight="100vh">
        <Box maxWidth="1200px" mx="auto">
          <Heading as="h1" textAlign="center" color="goldenrod" mb={4} fontSize="3xl">
            Global Hunger & Poverty: Key Insights and Analysis
          </Heading>

          <Text textAlign="center" fontSize="md" color="gray.600" mb={8}>
            Using data visualization to inform policy decisions and humanitarian interventions
          </Text>

          {/* Introduction Section */}
          <Box p={6} bg="white" borderRadius="lg" boxShadow="md" mb={8}>
            <Text fontSize="lg" lineHeight="1.8" color="gray.700">
              These visualizations help policymakers, researchers, NGOs, and advocacy groups identify hunger and poverty trends globally and regionally. By understanding these patterns, they can prioritize humanitarian aid and policy changes to address the most pressing needs. The insights derived from the data enable targeted interventions to alleviate hunger, reduce poverty, and improve food security, ultimately shaping more effective and sustainable solutions to global hunger crises.
            </Text>
          </Box>

          {/* Dashboard Overview */}
          <Box p={6} bg="white" borderRadius="lg" boxShadow="md" mb={8}>
            <Flex align="center" mb={4}>
              <Icon as={FaFileAlt} color="goldenrod" boxSize={5} mr={3} />
              <Heading as="h2" size="md" color="gray.700">Dashboard Overview & Methodology</Heading>
            </Flex>
            <Divider mb={4} />
            <Text fontSize="md" lineHeight="1.7" color="gray.700" mb={4}>
              Our dashboard integrates multiple data sources to provide a comprehensive view of global hunger and poverty. The Global Hunger Dashboard displays key metrics including global undernourishment (11.7%), annual food price growth (13.5%), and total price increases (105.6%) since 2015. These indicators serve as early warning systems for emerging food security crises.
            </Text>
            <Text fontSize="md" lineHeight="1.7" color="gray.700" mb={4}>
              The visualizations employ color-coded maps to represent hunger severity and poverty rates across countries, with heat maps highlighting areas of concern. Time-series data allows for trend analysis, while country-specific breakdowns enable targeted policy recommendations.
            </Text>
            <Text fontSize="md" lineHeight="1.7" color="gray.700" mb={4}>
              Our color choices are deliberate and meaningful: red for undernourishment metrics conveys urgency and direct human impact, creating immediate visual understanding of how current levels compare to targets. Orange for economic indicators like food price growth and total price increases signals caution without crisis, establishing a visual hierarchy that helps users prioritize attention while recognizing these factors as dynamic and interrelated contributors to hunger conditions.
            </Text>
            <Text fontSize="md" lineHeight="1.7" color="gray.700">
              By analyzing correlations between these datasets, we can identify causal relationships between economic indicators, food prices, and hunger metrics, informing both short-term humanitarian responses and long-term development strategies.
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
              <Text fontSize="md" lineHeight="1.7" color="gray.700" mb={4}>
                When poverty increases due to economic instability, conflict, or climate-related disruptions, hunger levels tend to rise alongside. Conversely, progress in poverty reduction often accompanies improvements in food security and nutritional outcomes.
              </Text>
              <Text fontSize="md" lineHeight="1.7" color="gray.700" fontWeight="bold">
                Visualization Insight: The Poverty Rates Over Time map shows how countries with persistent high poverty rates (red areas) directly correlate with high hunger index scores seen in the Global Hunger Index map.
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
              <Text fontSize="md" lineHeight="1.7" color="gray.700" mb={4}>
                The situation is particularly dire in countries affected by both economic poverty and conflict or extreme climatic events such as droughts or floods, creating complex humanitarian emergencies.
              </Text>
              <Text fontSize="md" lineHeight="1.7" color="gray.700" fontWeight="bold">
                Visualization Insight: The Global Hunger Severity Map clearly shows concentration of high-severity hunger in African nations, with countries like Somalia (44.1), Chad (36.4), and Madagascar (36.3) facing alarming hunger levels according to the worst-affected countries list.
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
              <Text fontSize="md" lineHeight="1.7" color="gray.700" mb={4}>
                This quickly leads to increased undernourishment in nations where public food assistance programs are lacking or underfunded. Hunger spikes have been observed during periods of global food price inflation or local agricultural disruption.
              </Text>
              <Text fontSize="md" lineHeight="1.7" color="gray.700" fontWeight="bold">
                Visualization Insight: The Global Food Prices Dashboard reveals hotspots where food prices are highest (orange-red dots), predominantly in East Africa and parts of West Africa, correlating with regions showing "High" hunger scores in the Global Hunger Index.
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
              <Text fontSize="md" lineHeight="1.7" color="gray.700" mb={4}>
                While regions like East Asia and Latin America have made significant strides, Sub-Saharan Africa and parts of South Asia still face high to extremely alarming hunger levels, highlighting uneven global progress.
              </Text>
              <Text fontSize="md" lineHeight="1.7" color="gray.700" fontWeight="bold">
                Visualization Insight: The Global Hunger Index map shows progress over time, with Russia's GHI score improving from 10.4 in 2000 to 5.4 in 2016, demonstrating how economic development can positively impact hunger metrics when properly managed.
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
              <Text fontSize="md" lineHeight="1.7" color="gray.700" mb={4}>
                The correlation between poverty and hunger is critical for understanding how to effectively address food insecurity. While global hunger has generally improved over past decades, progress is fragile and highly dependent on stable governance, poverty alleviation, and resilience to economic and environmental shocks.
              </Text>
              <Text fontSize="md" lineHeight="1.7" color="gray.700" fontWeight="bold">
                Visualization Insight: The Worst-Affected Countries bar chart shows the severity spectrum from "Serious" to "Alarming" hunger levels, with countries like Chad, DRC, Haiti, and Central African Republic requiring urgent intervention based on their consistently high rankings.
              </Text>
            </Box>
          </Grid>

          {/* Policy Application Section */}
          <Box p={6} bg="white" borderRadius="lg" boxShadow="md" mt={8}>
            <Flex align="center" mb={4}>
              <Icon as={FaLightbulb} color="goldenrod" boxSize={5} mr={3} />
              <Heading as="h2" size="md" color="gray.700">From Data to Policy: Practical Applications</Heading>
            </Flex>
            <Divider mb={4} />

            <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={6} mb={4}>
              <Box p={4} bg="gray.50" borderRadius="md">
                <Heading as="h3" size="sm" mb={3} color="goldenrod">Short-term Interventions</Heading>
                <Text fontSize="sm" lineHeight="1.6">
                  • Target emergency food aid to countries with "Alarming" hunger scores (Somalia, Yemen, Chad)
                </Text>
                <Text fontSize="sm" lineHeight="1.6">
                  • Implement price controls and subsidies in areas with highest food prices (red areas)
                </Text>
                <Text fontSize="sm" lineHeight="1.6">
                  • Create nutrition programs for children in regions with highest wasting percentages
                </Text>
                <Text fontSize="sm" lineHeight="1.6">
                  • Deploy agricultural extension services to boost food production in high-risk areas
                </Text>
              </Box>

              <Box p={4} bg="gray.50" borderRadius="md">
                <Heading as="h3" size="sm" mb={3} color="goldenrod">Long-term Development</Heading>
                <Text fontSize="sm" lineHeight="1.6">
                  • Invest in infrastructure and education in areas with persistent poverty-hunger correlation
                </Text>
                <Text fontSize="sm" lineHeight="1.6">
                  • Develop climate resilience programs in drought/flood-prone regions showing hunger volatility
                </Text>
                <Text fontSize="sm" lineHeight="1.6">
                  • Create social protection systems in countries transitioning from "Serious" to "Moderate" hunger
                </Text>
                <Text fontSize="sm" lineHeight="1.6">
                  • Implement sustainable agriculture initiatives in regions with improving but fragile food security
                </Text>
              </Box>
            </Grid>

            <Text fontSize="md" lineHeight="1.7" color="gray.700" mt={4}>
              These visualizations enable evidence-based policymaking by identifying specific regions for intervention, measuring the effectiveness of past interventions, and projecting future risk areas. By tracking correlations between economic indicators, food prices, and hunger metrics, policymakers can design comprehensive programs that address both immediate needs and underlying causes of food insecurity.
            </Text>

            <Text fontSize="md" lineHeight="1.7" color="gray.700" mt={4}>
              Organizations can use this data to allocate resources efficiently across competing priorities, measure program impact over time, and build more targeted partnerships with local stakeholders. The time-series data allows for evaluation of which policy approaches have been most effective in similar contexts, creating a valuable knowledge base for future interventions.
            </Text>
          </Box>

        </Box>
      </Box>
  );
};

export default CorrelationInsights;