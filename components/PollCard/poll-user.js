import {
  Button,
  Collapse,
  Flex,
  Heading,
  SimpleGrid,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import PollOptionItem from "./poll-option-item";
import useStore from "../../store/store";
import { VOTE_PENDING, VOTE_SENT } from "../../constants/index";
import { useState, useMemo } from "react";
import PollLoading from "./poll-loading";
import PollConfirmation from "./poll-confirmation";
import Moment from "react-moment";
import { compareDates } from "../../lib/compareDates";

const PollUser = () => {
  const [voteStatus, setVoteStatus] = useState(VOTE_PENDING);
  const [loading, setLoading] = useState(false);
  const { options, pollTitle, colorScheme, settings } = useStore();
  const { isOpen, onToggle } = useDisclosure();
  const totalVotes = useMemo(
    () => options.reduce((acc, curr) => acc + curr.votes, 0),
    [options]
  );

  const voteHandler = (id) => {
    if (voteStatus === VOTE_SENT) {
      return;
    }

    if (!compareDates(settings.startDate)) {
      return;
    }

    setLoading(true);

    // simulate post request wait time
    setTimeout(() => {
      setLoading(false);
      setVoteStatus(VOTE_SENT);
    }, 1000);
  };

  const getOptionList = () => {
    return (
      <SimpleGrid gap={10} paddingX={4} paddingBottom={6}>
        {options.map((option) => (
          <PollOptionItem
            colorScheme={colorScheme}
            key={option.id}
            question={option.question}
            totalVotes={totalVotes}
            votes={option.votes}
            onClick={() => voteHandler(option.id)}
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
            {!compareDates(settings.startDate) ? (
              <Text>
                Poll ends on:{" "}
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
          <Collapse style={{ width: "100%" }} in={isOpen} animateOpacity>
            {getOptionList()}
          </Collapse>
        </PollConfirmation>
      )}
    </>
  );
};

export default PollUser;
