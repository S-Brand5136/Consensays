import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Checkbox,
  color,
  Divider,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { AiOutlinePlus, AiOutlineClose } from "react-icons/ai";
import { IoMdArrowDropright, IoMdArrowDropdown } from "react-icons/io";

const PollForm = ({ colorScheme, setPollSaved }) => {
  // State
  const [options, setOptions] = useState([
    {
      id: 0,
      question: "",
    },
    {
      id: 1,
      question: "",
    },
  ]);
  const [title, setTitle] = useState("Poll Title");
  const [saveDisabled, setSaveDisabled] = useState(true);
  const [settings, setSettings] = useState({
    hideVotes: false,
    anonymousVotes: false,
  });

  // Use Effect
  useEffect(() => {
    const debounce = setTimeout(() => {
      for (const item of options) {
        if (item?.question?.length === 0) {
          return setSaveDisabled(true);
        }
      }

      setSaveDisabled(false);
    }, 1250);

    return () => clearTimeout(debounce);
  }, [options]);

  // Handlers
  const addOptionHandler = () => {
    setSaveDisabled(true);

    const newArr = [
      ...options,
      {
        id: options.length + 1,
        question: "",
      },
    ];

    setOptions(newArr);
  };

  const deleteOptionHandler = (id) => {
    const newoptionsArr = options.reduce((acc, curr) => {
      if (curr.id !== id) acc.push(curr);
      return acc;
    }, []);

    setOptions(newoptionsArr);
  };

  const inputHandler = (e, index) => {
    const val = e.target.value;
    const item = options[index];
    const arrCopy = [...options];

    item.question = val;

    arrCopy[index] = item;

    setOptions(arrCopy);
  };

  const saveHandler = () => {
    setPollSaved();
  };

  return (
    <>
      {/* header */}
      <Input
        type={"text"}
        variant={"flushed"}
        placeholder={"Insert title"}
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
        }}
        onClick={console.log}
        fontWeight={"semibold"}
        fontSize={"xl"}
        letterSpacing={"0.05em"}
        marginBottom={5}
        colorScheme={"yellow"}
        _focus={{ borderColor: colorScheme, outline: "none" }}
        _focusVisible={{ boxShadow: `0px 1px 0px 0px ${colorScheme}` }}
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
        {options.map(({ question, id }, index) => (
          <InputGroup key={id}>
            <Input
              placeholder={"Option " + (index + 1)}
              type={"text"}
              id={"option" + id}
              value={question}
              onChange={(e) => inputHandler(e, index)}
              _focus={{ borderColor: colorScheme, outline: "none" }}
              _focusVisible={{ boxShadow: `0 0 0 1px ${colorScheme}` }}
              variant={"outline"}
            />
            {options.length > 2 && (
              <InputRightElement>
                <Button
                  padding={0}
                  background={"transparent"}
                  _hover={{ background: "transparent", color: "red" }}
                  _active={{ background: "transparent", opacity: 0.75 }}
                  onClick={() => {
                    deleteOptionHandler(id);
                  }}
                >
                  <AiOutlineClose />
                </Button>
              </InputRightElement>
            )}
          </InputGroup>
        ))}
      </Flex>
      {/* add option */}
      <Button variant={"iconLeft"} onClick={addOptionHandler}>
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
                    <IoMdArrowDropdown fontSize='1.25em' />
                  ) : (
                    <IoMdArrowDropright fontSize='1.25em' />
                  )}
                  <Box
                    as='span'
                    marginLeft={3}
                    fontSize={"1.1em"}
                    flex='1'
                    textAlign='left'
                  >
                    Settings{" "}
                  </Box>
                </AccordionButton>
              </h2>
              <AccordionPanel padding={0}>
                <Stack spacing={2} paddingTop={2}>
                  <Checkbox
                    colorScheme={colorScheme}
                    isChecked={settings.hideVotes}
                    onChange={(e) =>
                      setSettings((curr) => {
                        return { ...curr, hideVotes: e.target.checked };
                      })
                    }
                  >
                    Hide votes until poll ends
                  </Checkbox>
                  <Checkbox
                    colorScheme={colorScheme}
                    isChecked={settings.anonymousVotes}
                    onChange={(e) =>
                      setSettings((curr) => {
                        return { ...curr, anonymousVotes: e.target.checked };
                      })
                    }
                  >
                    Anonymous votes
                  </Checkbox>
                </Stack>
              </AccordionPanel>
            </>
          )}
        </AccordionItem>
      </Accordion>
      {/* Save button */}
      <Button
        disabled={saveDisabled}
        paddingY={"1.5rem"}
        colorScheme={colorScheme}
        mt={4}
        onClick={saveHandler}
      >
        Save
      </Button>
    </>
  );
};

export default PollForm;
