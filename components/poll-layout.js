import { Flex } from "@chakra-ui/react";
import React from "react";

const PollLayout = ({ children }) => {
  return (
    <Flex
      flexDirection={"column"}
      boxShadow={"1px 2px 5px gray"}
      minH={"sm"}
      minW={"sm"}
      borderRadius={8}
      paddingY={5}
      paddingX={8}
      gap={3}
    >
      {children}
    </Flex>
  );
};

export default PollLayout;
