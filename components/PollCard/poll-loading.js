import { Flex, Heading, Spinner } from "@chakra-ui/react";
import React from "react";

const PollLoading = ({ colorScheme, heading }) => {
  return (
    <>
      <Flex
        flexDir={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        padding={10}
        gap={5}
      >
        <Spinner
          thickness='4px'
          speed='0.65s'
          emptyColor='gray.200'
          color={colorScheme}
          size='xl'
        />
        <Heading>{heading}</Heading>
      </Flex>
    </>
  );
};

export default PollLoading;
