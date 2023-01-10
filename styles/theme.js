import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  config: {
    initialColorMode: "light",
  },
  colors: {},
  components: {
    Button: {
      variants: {
        iconLeft: {
          _hover: { background: "transparent", opacity: 1 },
          display: "flex",
          justifyContent: "flex-start",
          gap: 2,
          padding: 0,
          opacity: 0.5,
          variant: "ghost",
        },
      },
    },
  },
});

export default theme;
