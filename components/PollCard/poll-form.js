import {
  Box,
  Button,
  Checkbox,
  Divider,
  Flex,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  Text,
  Tooltip,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import {
  AiOutlineBgColors,
  AiOutlineCopy,
  AiOutlinePlus,
} from "react-icons/ai";
import { colorSchemes } from "../../constants/colorSchemes";
import usePollState from "../../store/poll-state.store";
import AccordionLayout from "../Layouts/accordion-layout";
import PollBackgroundCard from "./poll-background-card";
import { VOTE_FORM_VIEW, VOTE_POSTED } from "../../constants/index";
import PollLoading from "./poll-loading";
import PollConfirmation from "./poll-confirmation";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getMinEndDate } from "../../lib/getMinEndDate";
import { useAxios } from "../../hooks/useAxios.hook";
import { OptionsList } from "../Lists/options-list";
import { OptionListItem } from "../Lists/options-list-item";
import Link from "next/link";

const PollForm = ({ setPollView }) => {
  // State
  const {
    options,
    pollTitle,
    settings,
    colorScheme,
    background,
    addOption,
    deleteOption,
    setColorScheme,
    pollId,
  } = usePollState();
  const [formState, setFormState] = useState(VOTE_FORM_VIEW);
  const { fetchData, loading, error } = useAxios();
  const toast = useToast();

  // Handlers
  const inputHandler = (val, index) => {
    const item = options[index];
    const arrCopy = [...options];

    item.question = val;

    arrCopy[index] = item;

    usePollState.setState({ options: arrCopy });
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

    const { poll, questions } = await fetchData({
      method: "POST",
      url: "/api/poll",
      data: {
        title: pollTitle,
        options,
        colorScheme,
        hideVotes: settings.hideVotes,
        startDate: settings.startDate,
        endDate: settings.endDate,
        background,
      },
    });

    if (!error) {
      usePollState.setState({
        settings: {
          hideVotes: poll.hideVotes,
          startDate: new Date(poll.startDate).getTime(),
          endDate: new Date(poll.endDate).getTime(),
        },
        colorScheme: poll.colorScheme,
        pollTitle: poll.title,
        background: poll.backgroundURL,
        options: [...questions],
        pollId: poll.id,
      });
      setFormState(VOTE_POSTED);
    } else {
      toast({
        title: error,
        duration: 9000,
        isClosable: true,
        colorScheme: "error",
      });
    }
  };

  return (
    <>
      {formState === VOTE_FORM_VIEW && !loading && (
        <>
          {/* header */}
          <Input
            type={"text"}
            variant={"flushed"}
            placeholder={"Insert title"}
            value={pollTitle}
            onChange={(e) => {
              usePollState.setState({ pollTitle: e.target.value });
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
          <OptionsList
            options={options}
            callbackfn={({ question, id }, index) => (
              <OptionListItem
                key={id}
                index={index}
                id={id}
                value={question}
                onChange={(e) => inputHandler(e.target.value, index)}
                borderColor={colorScheme}
                options={options}
                onClick={() => {
                  deleteOption(id);
                }}
              />
            )}
          />
          {/* add option */}
          <Button variant={"iconLeft"} id={"option-btn"} onClick={addOption}>
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
                  usePollState.setState({
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
                      return usePollState.setState({
                        settings: {
                          ...settings,
                          startDate: date.getTime(),
                          endDate: getMinEndDate(date),
                        },
                      });
                    }

                    usePollState.setState({
                      settings: { ...settings, startDate: date.getTime() },
                    });
                  }}
                />
              </Box>
              <Box paddingLeft={0.5} paddingBottom={0.5}>
                <Text fontSize={"sm"} fontWeight={"bold"}>
                  End Date
                </Text>
                <DatePicker
                  onSelect={(d) => console.log(d.getTime())}
                  minDate={getMinEndDate(settings.startDate)}
                  selected={settings.endDate}
                  onChange={(date) =>
                    usePollState.setState({
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
              onClick={() => setPollView()}
            >
              View Poll
            </Button>

            {/* Save button */}
            <Button
              width={"100%"}
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

      {loading && (
        <PollLoading
          colorScheme={colorScheme}
          heading={"Constructing your new poll..."}
        />
      )}

      {formState === VOTE_POSTED && (
        <PollConfirmation colorScheme={colorScheme} title={"Poll Created"}>
          <Flex justifyContent={"center"} alignItems={"center"}>
            <Box
              padding={2}
              borderRadius={8}
              _hover={{ background: colorScheme + ".500", color: "white" }}
            >
              <Link fontSize={"1.2em"} href={`/polls/${pollId}`}>
                View Live Poll
              </Link>
            </Box>
            <Tooltip label={"Copy to Clipboard"}>
              <Button
                background={"transparent"}
                marginLeft={10}
                fontSize={"1.25em"}
                _hover={{ background: colorScheme + ".500", color: "white" }}
                onClick={() => {
                  navigator.clipboard.writeText(
                    `localhost:3000/polls/${pollId}`
                  );
                  toast({
                    title: "Copied link to clipboard",
                    duration: 9000,
                    isClosable: true,
                    colorScheme: colorScheme,
                  });
                }}
              >
                <AiOutlineCopy _hover={{ color: "white" }} />
              </Button>
            </Tooltip>
          </Flex>
        </PollConfirmation>
      )}
    </>
  );
};

export default PollForm;
