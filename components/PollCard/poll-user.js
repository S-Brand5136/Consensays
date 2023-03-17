import {
  Box,
  Button,
  Collapse,
  Flex,
  Heading,
  SimpleGrid,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import PollOptionItem from "./poll-option-item";
import useStore from "../../store/app-state-store.hook";
import {VOTE_PENDING, VOTE_SENT} from "../../constants/index";
import {useState, useEffect} from "react";
import PollLoading from "./poll-loading";
import PollConfirmation from "./poll-confirmation";
import Moment from "react-moment";
import {usePoll} from "../../hooks/usePoll.hook";

const PollUser = ({previewMode}) => {
  const [voteStatus, setVoteStatus] = useState(VOTE_PENDING);
  const {options, pollTitle, colorScheme, settings, pollId} = useStore();
  const {isOpen, onToggle} = useDisclosure();
  const {castVote, totalVotes, hasPollStarted, hasPollEnded, loading, error} = usePoll(options, settings, pollId);

  useEffect(() => {
    const pollsVotedOn = JSON.parse(localStorage.getItem("pollsVotedOn"));

    if (pollsVotedOn) {
      pollsVotedOn.forEach((id) => {
        if (id === pollId) {
          setVoteStatus(VOTE_SENT);
        }
      });
    }
  }, [pollId]);

  const voteHandler = async (id) => {
    if (voteStatus === VOTE_SENT || previewMode || hasPollEnded) {
      return;
    }

    await castVote(id);
    setVoteStatus(VOTE_SENT);
  }

  const getOptionList = () => {
    return (
      <SimpleGrid gap={10} paddingX={4} paddingBottom={6}>
        {options.map(({id, question, votes}) => (
          <PollOptionItem
            colorScheme={colorScheme}
            key={id}
            question={question}
            totalVotes={totalVotes}
            votes={votes}
            onClick={() => voteHandler(id)}
            settings={settings}
          />
        ))}
      </SimpleGrid>
    );
  };

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
          {getOptionList()}
          <Flex justifyContent={"space-between"}>
            {!settings.hideVotes && (
              <Text paddingX={7}>
                {totalVotes || 0}{" "}
                {totalVotes === 1 ? "Total Vote" : "Total Votes"}
              </Text>
            )}
            {hasPollStarted ? (
              <Text>
                {hasPollEnded ? "Poll ended on " : "Poll ends on: "}
                <Moment format='YY/MM/DD'>{settings.endDate}</Moment>
              </Text>
            ) : (
              <Text>
                Poll starts on:{" "}
                <Moment format='YY/MM/DD'>{settings.startDate}</Moment>
              </Text>
            )}
          </Flex>
        </>
      )}

      {loading && (
        <PollLoading
          colorScheme={colorScheme}
          heading={"Casting your vote..."}
        />
      )}

      {!loading && error && (
        <Flex
          flexDir={"column"}
          justifyContent={"center"}
          alignItems={"center"}
          padding={10}
          gap={5}
        >
          <Box fontSize={'xx-large'}>😔</Box>
          <Heading fontSize={'x-large'}>{error}</Heading>
        </Flex>
      )}

      {voteStatus === VOTE_SENT && (
        <PollConfirmation title={"Thanks for voting!"}>
          <Button
            width={"85%"}
            paddingX={6}
            colorScheme={colorScheme}
            onClick={onToggle}
          >
            View Results
          </Button>
          <Collapse style={{width: "100%"}} in={isOpen} animateOpacity>
            {getOptionList()}
          </Collapse>
        </PollConfirmation>
      )}
    </>
  );
};

export default PollUser;
