import {
  Button,
  Collapse,
  Flex,
  Heading,
  SimpleGrid,
  Spinner,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import PollOptionItem from "./poll-option-item";
import useStore from "../../store/store";
import { VOTE_PENDING, VOTE_SENT } from "../../constants/index";
import { useState } from "react";
import { AiFillCheckCircle } from "react-icons/ai";

const PollUser = () => {
  const [voteStatus, setVoteStatus] = useState(VOTE_PENDING);
  const [loading, setLoading] = useState(false);
  const { options, pollTitle, colorScheme } = useStore();
  const { isOpen, onToggle } = useDisclosure();

  const voteHandler = (id) => {
    setLoading(true);

    // simulate post request wait time
    setTimeout(() => {
      setLoading(false);
      setVoteStatus(VOTE_SENT);
    }, 1000);
  };

  const votes = Math.floor(Math.random() * (100 - 0 + 1) + 1);

  return (
    <>
      {voteStatus === VOTE_PENDING && !loading && (
        <>
          <Heading
            paddingX={7}
            fontWeight={"semibold"}
            letterSpacing={0.25}
            paddingBottom={6}
          >
            {pollTitle}
          </Heading>
          <SimpleGrid gap={10} paddingX={4} paddingBottom={6}>
            {options.map((option) => (
              <PollOptionItem
                colorScheme={colorScheme}
                key={option.id}
                text={option.question}
                totalVotes={100}
                votes={Math.floor(Math.random() * (100 - 0 + 1) + 1)}
                onClick={() => voteHandler(option.id)}
              />
            ))}
          </SimpleGrid>
          <Text paddingX={7}>
            {votes} {votes <= 1 ? "vote" : "votes"}
          </Text>
        </>
      )}

      {loading && (
        <>
          <Flex
            flexDir={"column"}
            justifyContent={"center"}
            alignItems={"center"}
            padding={10}
            gap={5}
          >
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color={colorScheme}
              size="xl"
            />
            <Heading>Casting your vote...</Heading>
          </Flex>
        </>
      )}

      {voteStatus === VOTE_SENT && (
        <>
          <Flex
            flexDir={"column"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <AiFillCheckCircle color={colorScheme} fontSize={"3em"} />
            <Heading textAlign={"center"} paddingX={4}>
              Thanks for voting!
            </Heading>
          </Flex>
          <Flex
            paddingTop={5}
            flexDir={"column"}
            justifyContent={"center"}
            alignItems={"center"}
            width={"100%"}
            gap={3}
          >
            <Button
              width={"85%"}
              paddingX={6}
              colorScheme={colorScheme}
              onClick={onToggle}
            >
              View Results
            </Button>
            <Collapse style={{ width: "100%" }} in={isOpen} animateOpacity>
              <SimpleGrid gap={10} paddingX={4} paddingBottom={6}>
                {options.map((option) => (
                  <PollOptionItem
                    colorScheme={colorScheme}
                    key={option.id}
                    text={option.question}
                    totalVotes={100}
                    votes={Math.floor(Math.random() * (100 - 0 + 1) + 1)}
                  />
                ))}
              </SimpleGrid>
            </Collapse>
          </Flex>
        </>
      )}
    </>
  );
};

export default PollUser;
