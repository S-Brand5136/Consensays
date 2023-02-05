import { Box, Flex, Progress, Text } from "@chakra-ui/react";
import { useMemo } from "react";

const PollOptionItem = ({
  colorScheme,
  question,
  totalVotes,
  votes,
  onClick,
  settings,
}) => {
  const progressValue = useMemo(
    () => (votes / totalVotes) * 100,
    [votes, totalVotes]
  );

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
        onClick={onClick}
      >
        <Flex
          flexDir={"column"}
          alignItems={"start"}
          justifyContent={"space-between"}
        >
          <Text fontWeight={"semibold"} letterSpacing={0.5}>
            {question}
          </Text>
          {!settings.hideVotes && (
            <Text marginBottom={3} fontSize={"xs"}>
              votes {votes}
            </Text>
          )}
        </Flex>
        <Progress
          colorScheme={colorScheme}
          borderRadius={10}
          value={progressValue}
        />
      </Box>
    </>
  );
};

export default PollOptionItem;
