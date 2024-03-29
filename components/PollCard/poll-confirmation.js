import {Flex, Heading} from "@chakra-ui/react";
import {AiFillCheckCircle} from "react-icons/ai";
import usePollState from "../../store/poll-state.store";

const PollConfirmation = ({children, title}) => {
  const {colorScheme} = usePollState();
  return (
    <>
      <Flex flexDir={"column"} alignItems={"center"} justifyContent={"center"}>
        <AiFillCheckCircle color={colorScheme} fontSize={"3em"}/>
        <Heading textAlign={"center"} marginTop={5} paddingX={4}>
          {title}
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
        {children}
      </Flex>
    </>
  );
};

export default PollConfirmation;
