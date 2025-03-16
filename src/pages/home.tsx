import {
    Box,
    Flex,
    Heading,
    Text,
    Stat,
    StatLabel,
    StatNumber,
    StatHelpText,
    VStack,
    HStack,
    Divider,
    Progress,
    CircularProgress,
    CircularProgressLabel,
  } from "@chakra-ui/react";
  
  export default function Home() {
    return (
      <Box p={4} bg="gray.100" minHeight="100vh">
        <Heading textAlign="center" color="goldenrod" mb={6}>
          Home
        </Heading>
  
        <Flex gap={4} mb={6}>
          <Stat p={4} bg="white" shadow="md" borderRadius="md" flex="1">
            <StatLabel>Total People in Food Crisis</StatLabel>
            <StatNumber>[Placeholder]</StatNumber>
            <StatHelpText>+[Placeholder]%</StatHelpText>
          </Stat>
  
          <Stat p={4} bg="white" shadow="md" borderRadius="md" flex="1">
            <StatLabel>Hunger Rate Change (vs. Last Year)</StatLabel>
            <StatNumber>[Placeholder]</StatNumber>
            <StatHelpText>+[Placeholder]%</StatHelpText>
          </Stat>
        </Flex>
  
        <Box bg="white" shadow="md" borderRadius="md" p={4} mb={6}>
          <Heading as="h3" size="md" mb={4}>
            Global Hunger Severity
          </Heading>
          <Box height="300px" bg="gray.200" borderRadius="md" textAlign="center" pt="120px">
            [Map Visualization Placeholder]
          </Box>
        </Box>
  
        <Flex gap={4}>
          <Box bg="white" shadow="md" borderRadius="md" p={4} flex="1">
            <Heading as="h3" size="md" mb={4}>
              Worst Hunger-Affected Countries
            </Heading>
            <VStack spacing={3} align="stretch">
              <HStack justify="space-between">
                <Text>🇺🇸 United States</Text>
                <Text>Alarming - 4.5M</Text>
              </HStack>
              <Divider />
              <HStack justify="space-between">
                <Text>🇦🇺 Australia</Text>
                <Text>Serious - 2.3M</Text>
              </HStack>
              <Divider />
              <HStack justify="space-between">
                <Text>🇨🇳 China</Text>
                <Text>Alarming - 2M</Text>
              </HStack>
              <Divider />
              <HStack justify="space-between">
                <Text>🇩🇪 Germany</Text>
                <Text>Extreme - 1.7M</Text>
              </HStack>
              <Divider />
              <HStack justify="space-between">
                <Text>🇷🇴 Romania</Text>
                <Text>Alarming - 1.6M</Text>
              </HStack>
              <Divider />
              <HStack justify="space-between">
                <Text>🇯🇵 Japan</Text>
                <Text>Serious - 1.2M</Text>
              </HStack>
              <Divider />
              <HStack justify="space-between">
                <Text>🇳🇱 Netherlands</Text>
                <Text>Alarming - 1M</Text>
              </HStack>
            </VStack>
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
        </Flex>
      </Box>
    );
  }
  