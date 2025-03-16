import {
    Box,
    Heading,
    Text,
    VStack,
    HStack,
    Flex,
  } from "@chakra-ui/react";
  
  export default function WorldMap() {
    return (
      <Box p={4} bg="gray.100" minHeight="100vh">
        <Heading textAlign="center" color="goldenrod" mb={6}>
          WORLD MAP
        </Heading>
  
        <Box bg="white" height="1000px" shadow="md" borderRadius="md" p={4}>
          <Heading as="h3" size="md" mb={4}>
            Global Hunger Severity
          </Heading>
  
          <HStack align="start" spacing={4}>
            <Box
              height="900px"
              width="90%"
              bg="gray.200"
              borderRadius="md"
              textAlign="center"
              pt="180px"
            >
              [Map Visualization Placeholder]
            </Box>
  
            <VStack align="start" spacing={3}>
              <Text fontSize="sm" fontWeight="bold">
                Hunger Index
              </Text>
              <HStack>
                <Box width="16px" height="16px" bg="blue.400" borderRadius="md" />
                <Text fontSize="sm">[Placeholder] (10)</Text>
              </HStack>
              <HStack>
                <Box width="16px" height="16px" bg="orange.400" borderRadius="md" />
                <Text fontSize="sm">[Placeholder] (20)</Text>
              </HStack>
              <HStack>
                <Box width="16px" height="16px" bg="red.400" borderRadius="md" />
                <Text fontSize="sm">[Placeholder] (35)</Text>
              </HStack>
            </VStack>
          </HStack>
        </Box>
      </Box>
    );
  }
  