import {
  Box,
  Button,
  Checkbox,
  Divider,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  Text,
  Tooltip,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import {
  AiOutlinePlus,
  AiOutlineClose,
  AiOutlineBgColors,
  AiOutlineCopy,
} from "react-icons/ai";
import { colorSchemes } from "../../constants/colorSchemes";
import useStore from "../../store/app-state-store.hook";
import AccordionLayout from "../accordion-layout";
import PollBackgroundCard from "./poll-background-card";
import { VOTE_POSTED, VOTE_FORM_VIEW } from "../../constants/index";
import PollLoading from "./poll-loading";
import PollConfirmation from "./poll-confirmation";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getMinEndDate } from "../../lib/getMinEndDate";

// todo: refactor to use useReducer
const PollForm = ({ setPollView }) => {
  // State
  const { options, pollTitle, settings, colorScheme, background } = useStore();
  const [saveDisabled, setSaveDisabled] = useState(true);
  const [formState, setFormState] = useState(VOTE_FORM_VIEW);
  const [isLoading, setIsLoading] = useState(false);
  const [poll, setPoll] = useState(null);
  const toast = useToast();

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

    useStore.setState({ options: newArr });
  };

  const deleteOptionHandler = (id) => {
    const newOptionsArr = options.reduce((acc, curr) => {
      if (curr.id !== id) acc.push(curr);
      return acc;
    }, []);

    useStore.setState({ options: newOptionsArr });
  };

  const inputHandler = (e, index) => {
    const val = e.target.value;
    const item = options[index];
    const arrCopy = [...options];

    item.question = val;

    arrCopy[index] = item;

    useStore.setState({ options: arrCopy });
  };

  const saveHandler = async () => {
    for (const item of options) {
      if (item?.question?.length === 0) {
        return toast({
          title: "Questions Cannot be empty",
          duration: 9000,
          isClosable: true,
          colorScheme: "error",
        });
      }
    }

    try {
      setIsLoading(true);

      const { data } = await axios.post("/api/poll", {
        title: pollTitle,
        options,
        colorScheme,
        hideVotes: settings.hideVotes,
        startDate: settings.startDate,
        endDate: settings.endDate,
        background,
      });

      setPoll({ ...data });

      setFormState(VOTE_POSTED);
    } catch (error) {
      toast({
        title: error.message,
        duration: 9000,
        isClosable: true,
        colorScheme: "error",
      });
    }

    setIsLoading(false);
  };

  const viewPollHandler = () => {
    setPollView();
  };

  const setColorScheme = (colorScheme) => {
    useStore.setState({ colorScheme: colorScheme });
  };

  return (
    <>
      {formState === VOTE_FORM_VIEW && !isLoading && (
        <>
          {/* header */}
          <Input
            type={"text"}
            variant={"flushed"}
            placeholder={"Insert title"}
            value={pollTitle}
            onChange={(e) => {
              useStore.setState({ pollTitle: e.target.value });
            }}
            fontWeight={"semibold"}
            fontSize={"xl"}
            letterSpacing={"0.05em"}
            marginBottom={5}
            colorScheme={"yellow"}
            _focus={{ borderColor: colorScheme, outline: "none" }}
            _focusVisible={{ boxShadow: `0px 1px 0px 0px ${colorScheme}` }}
            id={"poll-title"}
          />
          {/* options */}
          <Flex
            w={"100%"}
            as={"section"}
            flexDir={"column"}
            justifyContent={"center"}
            alignItems={"center"}
            gap={3}
            id={"options-container"}
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
          <Button
            variant={"iconLeft"}
            id={"option-btn"}
            onClick={addOptionHandler}
          >
            <AiOutlinePlus fontSize={"1.25em"} />
            Add option
          </Button>
          {/* settings */}
          <AccordionLayout title={"Settings"}>
            <Stack spacing={3} paddingTop={2}>
              <Checkbox
                colorScheme={colorScheme}
                isChecked={settings.hideVotes}
                onChange={(e) =>
                  useStore.setState({
                    settings: { ...settings, hideVotes: e.target.checked },
                  })
                }
              >
                Hide votes until poll ends
              </Checkbox>
              <Box paddingLeft={0.5}>
                <Text fontSize={"sm"} fontWeight={"bold"}>
                  Start Date
                </Text>
                <DatePicker
                  showIcon
                  allowSameDay
                  minDate={new Date()}
                  selected={settings.startDate}
                  onChange={(date) => {
                    if (date.getTime() > settings.endDate) {
                      return useStore.setState({
                        settings: {
                          ...settings,
                          startDate: date.getTime(),
                          endDate: getMinEndDate(date),
                        },
                      });
                    }

                    useStore.setState({
                      settings: { ...settings, startDate: date.getTime() },
                    });
                  }}
                />
              </Box>
              <Box paddingLeft={0.5}>
                <Text fontSize={"sm"} fontWeight={"bold"}>
                  End Date
                </Text>
                <DatePicker
                  onSelect={(d) => console.log(d.getTime())}
                  minDate={getMinEndDate(settings.startDate)}
                  selected={settings.endDate}
                  onChange={(date) =>
                    useStore.setState({
                      settings: { ...settings, endDate: date.getTime() },
                    })
                  }
                />
              </Box>
            </Stack>
          </AccordionLayout>
          <Divider borderWidth={"1px"} />
          {/* color scheme */}
          <Menu>
            <MenuButton
              padding={0}
              background={"transparent"}
              _hover={{ background: "transparent", opacity: 1 }}
              _active={{ background: "transparent", opacity: 0.75 }}
              opacity={0.5}
              textAlign={"left"}
              as={Button}
            >
              <Flex gap={3}>
                <AiOutlineBgColors fontSize={"1.25em"} /> Color Scheme
              </Flex>
            </MenuButton>
            <MenuList>
              {colorSchemes.map((color, index) => (
                <MenuItem
                  icon={
                    <Box
                      borderRadius={"50%"}
                      height={4}
                      width={4}
                      background={`${color}`}
                    ></Box>
                  }
                  key={index}
                  onClick={() => setColorScheme(color.toLowerCase())}
                >
                  {color}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
          {/* Background */}
          <PollBackgroundCard />
          {/* View user view button */}
          <Flex justifyContent={"space-between"} gap={5}>
            <Button
              mt={4}
              width={"100%"}
              paddingY={"1.5rem"}
              id={"user-view-btn"}
              variant={"ghost"}
              onClick={viewPollHandler}
            >
              View Poll
            </Button>

            {/* Save button */}
            <Button
              width={"100%"}
              isDisabled={saveDisabled}
              paddingY={"1.5rem"}
              colorScheme={colorScheme}
              mt={4}
              onClick={saveHandler}
              id={"save-btn"}
            >
              Save
            </Button>
          </Flex>
        </>
      )}

      {isLoading && (
        <PollLoading
          colorScheme={colorScheme}
          heading={"Constructing your new poll..."}
        />
      )}

      {formState === VOTE_POSTED && (
        <PollConfirmation colorScheme={colorScheme} title={"Poll Created"}>
          <>
            <Text fontSize={"1.2em"}>
              <Link href={`/polls/${poll.poll.id}`}>View Live Poll</Link>
              <Tooltip label={"Copy to Clipboard"}>
                <Button
                  background={"transparent"}
                  marginLeft={10}
                  fontSize={"1.25em"}
                  onClick={() => {
                    navigator.clipboard.writeText(
                      `localhost:3000/polls/${poll.id}`
                    );
                    toast({
                      title: "Copied link to clipboard",
                      duration: 9000,
                      isClosable: true,
                      colorScheme: colorScheme,
                    });
                  }}
                >
                  <AiOutlineCopy color={colorScheme} />
                </Button>
              </Tooltip>
            </Text>
          </>
        </PollConfirmation>
      )}
    </>
  );
};

export default PollForm;
