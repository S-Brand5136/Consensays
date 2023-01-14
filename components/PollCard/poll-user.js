import { Heading, SimpleGrid, Text } from "@chakra-ui/react";
import PollOptionItem from "./poll-option-item";
import useStore from "../../store/store";

const PollUser = () => {
  const { options, pollTitle, colorScheme } = useStore();

  return (
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
          />
        ))}
      </SimpleGrid>
      <Text paddingX={7}>1 vote</Text>
    </>
  );
};

export default PollUser;
