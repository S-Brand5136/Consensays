import { ChakraProvider } from "@chakra-ui/react";
import theme from "../styles/theme";
("use client");

export default function App({ Component, pageProps }) {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}
