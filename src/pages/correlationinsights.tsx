import { Box, Heading, Text } from '@chakra-ui/react';

const CorrelationInsights = () => {
  return (
    <Box p={4} bg="gray.100" minHeight="100vh">
      <Heading textAlign="center" color="goldenrod" mb={6}>
        Overall Insights and Analysis from Data
      </Heading>

      <Box p={4} bg="white" borderRadius="md" boxShadow="sm" mb={6}>
        <Text fontSize="lg" lineHeight="1.8" color="black" mb={4}>
          These visualizations help policymakers, researchers, NGOs, and advocacy groups identify hunger and poverty trends globally and regionally. By understanding these patterns, they can prioritize humanitarian aid and policy changes to address the most pressing needs. The insights derived from the data enable targeted interventions to alleviate hunger, reduce poverty, and improve food security, ultimately shaping more effective and sustainable solutions to global hunger crises.
        </Text>

        <Text fontSize="lg" lineHeight="1.8" color="black">
          The relationship between poverty and hunger is a deeply interconnected cycle that affects many parts of the world, particularly in low-income and conflict-prone regions. Countries such as Chad, Niger, and Somalia demonstrate a strong correlation between poverty levels and hunger severity. In these nations, fluctuations in poverty rates often mirror changes in hunger indicators. When poverty increases due to economic instability, conflict, or climate-related disruptions, hunger levels tend to rise alongside. Conversely, any progress in poverty reduction, however small, is frequently accompanied by slight improvements in food security and nutritional outcomes. For instance, in Chad, periods of drought and political instability have pushed both poverty and hunger indicators to alarming levels, with undernourishment and child wasting becoming widespread. Similarly, Niger, despite efforts to reduce poverty, continues to struggle with high child mortality and undernutrition, particularly in rural communities where food access remains limited. In Somalia, ongoing conflict and displacement have sustained both high poverty and high hunger rates, reinforcing the cycle of food insecurity and malnutrition.
        </Text>
        <Text fontSize="lg" lineHeight="1.8" color="black" mt={4}>
          Furthermore, the entire continent of Africa is grappling with food insecurity on a significant scale. Many African nations, especially those in Sub-Saharan Africa, face persistent challenges related to poverty, political instability, and inadequate infrastructure, all of which exacerbate hunger. The combination of these factors makes it difficult for countries to break the cycle of poverty and hunger. The situation is particularly dire in countries that are both economically poor and affected by conflict or extreme climatic events such as droughts or floods.
        </Text>
        <Text fontSize="lg" lineHeight="1.8" color="black" mt={4}>
          Globally, food prices also have a profound impact on hunger, particularly in countries with weak economic resilience. As food prices rise, lower-income populations who already spend a significant portion of their income on basic food are hit the hardest. This can quickly lead to increased undernourishment, especially in nations where public food assistance programs are lacking or underfunded. The correlation is evident in many developing countries where hunger spikes have been observed during periods of global food price inflation or local agricultural disruption.
        </Text>
        <Text fontSize="lg" lineHeight="1.8" color="black" mt={4}>
          When examining global hunger trends over time, the broader picture offers some optimism. Since the early 2000s, the Global Hunger Index (GHI) has shown a gradual but consistent improvement, indicating that hunger levels have declined across many regions. This progress is largely attributed to targeted policy interventions, improved agricultural practices, economic development, and international aid efforts. Despite occasional setbacks, such as those caused by economic crises, climate change, and global pandemics, the long-term trajectory has been one of steady progress. However, it's crucial to note that this improvement is uneven. While some regions, such as parts of East Asia and Latin America, have made significant strides in reducing hunger, others especially Sub-Saharan Africa and parts of South Asia still face high to extremely alarming hunger levels.
        </Text>
        <Text fontSize="lg" lineHeight="1.8" color="black" mt={4}>
          In identifying the worst-affected countries, GHI data reveals that nations with the highest scores often face overlapping crises: extreme poverty, weak governance, ongoing conflict, and limited infrastructure. These factors compound the effects of food insecurity. In many of these countries, hunger indicators such as undernourishment, child wasting, and child mortality remain persistently high. For example, in Chad and Somalia, undernourishment rates often exceed 40%, reflecting the deep-rooted challenges in ensuring regular and adequate food access.
        </Text>
        <Text fontSize="lg" lineHeight="1.8" color="black" mt={4}>
          In summary, the correlation between poverty and hunger is not only evident but also critical for understanding how to effectively address food insecurity. Countries like Chad, Niger, and Somalia provide clear examples of how poverty trends align with hunger severity. While global hunger has generally improved over the past decades, these case studies highlight that progress is fragile and highly dependent on stable governance, poverty alleviation, and resilience to economic and environmental shocks. Tackling hunger requires a multidimensional approach that addresses both the economic roots of poverty and the systemic barriers to accessing sufficient, nutritious food.
        </Text>
      </Box>
    </Box>
  );
};

export default CorrelationInsights;
