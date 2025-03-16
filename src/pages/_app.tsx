import type { AppProps } from "next/app";
import { ChakraProvider, Box, Flex } from "@chakra-ui/react";
import Sidebar from "../components/sidebar";
import "../styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <Flex>
        <Sidebar />

        <Box flex="1" p={4}>
          <Component {...pageProps} />
        </Box>
      </Flex>
    </ChakraProvider>
  );
}
