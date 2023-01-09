import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Checkbox,
  Divider,
  Flex,
  Input,
  Stack,
} from "@chakra-ui/react";
import { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { IoMdArrowDropright, IoMdArrowDropdown } from "react-icons/io";

const PollForm = ({ colorScheme }) => {
  // TODO: REMOVE QUESTIONS TO SERVER
  const [questions, setQuestions] = useState([
    {
      id: 0,
      question: "asd",
    },
    {
      id: 1,
      question: "asd",
    },
  ]);

  const [settings, setSettings] = useState({
    hideVotes: false,
    anonymousVotes: false,
  });

  const submitHandler = () => {};

  const addOptionHandler = () => {};

  return (
    <>
      {/* header */}
      <Input
        type={"text"}
        variant={"unstyled"}
        placeholder={"Insert title"}
        value={"asdasd"}
        fontWeight={"semibold"}
        fontSize={"xl"}
        letterSpacing={"0.05em"}
        marginBottom={5}
        colorScheme={colorScheme}
      />
      {/* options */}
      <Flex
        w={"100%"}
        as={"section"}
        flexDir={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        gap={3}
      >
        {questions.map(({ question, id }) => (
          <Input
            key={id}
            value={question}
            type={"text"}
            colorScheme={colorScheme}
            variant={"outline"}
          />
        ))}
      </Flex>
      {/* add option */}
      <Button
        _hover={{ background: "transparent", opacity: 1 }}
        display={"flex"}
        justifyContent={"flex-start"}
        gap={2}
        padding={0}
        opacity={"0.5"}
        variant={"ghost"}
      >
        <AiOutlinePlus fontSize={"1.25em"} /> Add option
      </Button>
      <Divider borderWidth={"1px"} />
      {/* settings */}
      <Accordion allowToggle>
        <AccordionItem
          _after={{ borderStyle: "hidden" }}
          _before={{ borderStyle: "hidden" }}
          borderStyle={"hidden"}
        >
          {({ isExpanded }) => (
            <>
              <h2>
                <AccordionButton
                  _hover={{ opacity: 1 }}
                  opacity={!isExpanded ? "0.5" : 1}
                  padding={0}
                  fontWeight={"semibold"}
                >
                  {isExpanded ? (
                    <IoMdArrowDropdown fontSize="1.25em" />
                  ) : (
                    <IoMdArrowDropright fontSize="1.25em" />
                  )}
                  <Box
                    as="span"
                    marginLeft={3}
                    fontSize={"1.1em"}
                    flex="1"
                    textAlign="left"
                  >
                    Settings{" "}
                  </Box>
                </AccordionButton>
              </h2>
              <AccordionPanel padding={0}>
                <Stack spacing={2} paddingTop={2}>
                  <Checkbox>Hide votes until poll ends</Checkbox>
                  <Checkbox>Anonymous votes</Checkbox>
                </Stack>
              </AccordionPanel>
            </>
          )}
        </AccordionItem>
      </Accordion>
      {/* Save button */}
      <Button paddingY={"1.5rem"} colorScheme={colorScheme} mt={4}>
        Save
      </Button>
    </>
  );
};

export default PollForm;
