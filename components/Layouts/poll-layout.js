import { Flex, useColorModeValue } from "@chakra-ui/react";

const PollLayout = ({ children, pollSaved }) => {
  return (
    <Flex
      flexDirection={"column"}
      boxShadow={"1px 2px 5px gray"}
      background={useColorModeValue("white", "gray.800")}
      color={useColorModeValue("initial", "white")}
      minW={"sm"}
      borderRadius={8}
      paddingY={5}
      paddingX={!pollSaved && 7}
      gap={3}
    >
      {children}
    </Flex>
  );
};

export default PollLayout;
