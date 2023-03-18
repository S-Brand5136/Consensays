import { Flex } from "@chakra-ui/react";
import React from "react";

const PollLayout = ({ children, pollSaved }) => {
  return (
    <Flex
      flexDirection={"column"}
      boxShadow={"1px 2px 5px gray"}
      background={"white"}
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
