import { Heading, SimpleGrid, Text } from "@chakra-ui/react";
import React from "react";
import PollOptionItem from "./poll-option-item";

const PollUser = ({ colorScheme }) => {
  return (
    <>
      <Heading
        paddingX={4}
        fontWeight={"semibold"}
        letterSpacing={0.25}
        paddingBottom={6}
      >
        asdasd
      </Heading>
      <SimpleGrid gap={10} paddingX={2} paddingBottom={6}>
        <PollOptionItem colorScheme={colorScheme} text={"asd"} />
        <PollOptionItem colorScheme={colorScheme} text={"asd"} />
      </SimpleGrid>
      <Text paddingX={4}>1 vote</Text>
    </>
  );
};

export default PollUser;
