import { Avatar, Box, Flex, Progress, Text } from "@chakra-ui/react";
import React from "react";

const PollOptionItem = ({ colorScheme, text, avatars }) => {
  return (
    <>
      <Box
        _hover={{
          background: "#F8F8F8",
          cursor: "pointer",
          boxShadow: "1px 1px 2px #d9d9d9 inset",
        }}
        borderRadius={10}
        padding={4}
      >
        <Flex alignItems={"center"} justifyContent={"space-between"}>
          <Text marginBottom={3} fontWeight={"semibold"} letterSpacing={0.5}>
            {text}
          </Text>
          <Avatar marginBottom={2} size="sm" bg={"yellow.200"} name="Darius" />
        </Flex>
        <Progress colorScheme={colorScheme} borderRadius={10} value={80} />
      </Box>
    </>
  );
};

export default PollOptionItem;
