import {
    Box,
    VStack,
    Button,
    Icon,
    Text,
    Input,
    InputGroup,
    InputLeftElement,
    Collapse,
    Divider,
  } from "@chakra-ui/react";
  import { IoHome } from "react-icons/io5";
  import { FaGlobe, FaChartBar } from "react-icons/fa";
  import { BiSearch, BiLineChart, BiBulb } from "react-icons/bi";
  import { MdTrendingUp } from "react-icons/md";
  import { useState } from "react";
  import { useRouter } from "next/router";
  
  const Sidebar = () => {
    const router = useRouter();
    const [showInsights, setShowInsights] = useState(false);
  
    const buttonStyles = {
      variant: "ghost",
      justifyContent: "flex-start",
      borderRadius: "none",
      boxShadow: "none",
      _hover: {
        bg: "#F4D03F",
        boxShadow: "md",
        transform: "translateY(-2px)",
      },
      _active: {
        bg: "#F4D03F",
        boxShadow: "lg",
        transform: "translateY(0)",
      },
    };
  
    return (
      <Box
        bgColor="#FFC000"
        width="300px"
        minHeight="100vh"
        p={4}
        display="flex"
        flexDirection="column"
        boxShadow="md"
      >
        <Text fontSize="xl" fontWeight="bold" color="white" textAlign="center">
          HungerLens
        </Text>
        <Text fontSize="xs" color="white" textAlign="center">
          by Ma Ano Ulam
        </Text>
  
        <InputGroup mt={4} size="sm">
          <InputLeftElement pointerEvents="none">
            <Icon as={BiSearch} color="gray.600" />
          </InputLeftElement>
          <Input placeholder="Search for..." bg="white" />
        </InputGroup>
  
        <VStack spacing={2} align="stretch" mt={4}>
          <Button {...buttonStyles} onClick={() => router.push("/")} leftIcon={<Icon as={IoHome} />}>
            Home
          </Button>
          <Divider borderColor="#CC9900" />
  
          <Button {...buttonStyles} onClick={() => router.push("/worldmap")}leftIcon={<Icon as={FaGlobe} />}>
            World Map
          </Button>
          <Divider borderColor="#CC9900" />
  
          <Button {...buttonStyles} onClick={() => router.push("/foodpricesvshunger")} leftIcon={<Icon as={FaChartBar} />}>
            Food Prices Vs Hunger
          </Button>
          <Divider borderColor="#CC9900" />
  
          <Button {...buttonStyles} onClick={() => router.push("/worstaffectedcountries")} leftIcon={<Icon as={MdTrendingUp} />}>
            Worst-Affected Countries
          </Button>
          <Divider borderColor="#CC9900" />
  
          <Button {...buttonStyles} onClick={() => router.push("/hungertrendsovertime")} leftIcon={<Icon as={BiLineChart} />}>
            Hunger Trends Over Time
          </Button>
          <Divider borderColor="#CC9900" />
  
          <Button
            {...buttonStyles}
            leftIcon={<Icon as={BiBulb} />}
            justifyContent="space-between"
            onClick={() => setShowInsights(!showInsights)}
          >
            Correlation Insights
            <Icon as={showInsights ? MdTrendingUp : BiLineChart} />
          </Button>
          <Divider borderColor="#CC9900" />
  
          <Collapse in={showInsights} animateOpacity>
            <VStack pl={6} align="stretch">
              <Button {...buttonStyles}>Insight 1</Button>
              <Divider borderColor="#CC9900" />
              <Button {...buttonStyles}>Insight 2</Button>
              <Divider borderColor="#CC9900" />
            </VStack>
          </Collapse>
        </VStack>
      </Box>
    );
  };
  
  export default Sidebar;
  