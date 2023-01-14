import {
  Button,
  Checkbox,
  Divider,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import {
  AiOutlinePlus,
  AiOutlineClose,
  AiOutlineBgColors,
} from "react-icons/ai";
import useStore from "../../store/store";
import AccordionLayout from "../accordion-layout";
import PollBackgroundCard from "./poll-background-card";

const PollForm = ({ setPollSaved, setBackground }) => {
  // State
  const { options, pollTitle, settings, colorScheme } = useStore();
  const [saveDisabled, setSaveDisabled] = useState(true);

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

  const saveHandler = () => {
    setPollSaved();
  };

  const setColorScheme = (colorScheme) => {
    useStore.setState({ colorScheme: colorScheme });
  };

  return (
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
        <AiOutlinePlus fontSize={"1.25em"} />
        Add option
      </Button>
      {/* settings */}
      <AccordionLayout title={"Settings"}>
        <Stack spacing={2} paddingTop={2}>
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
          <Checkbox
            colorScheme={colorScheme}
            isChecked={settings.anonymousVotes}
            onChange={(e) =>
              useStore.setState({
                settings: { ...settings, anonymousVotes: e.target.checked },
              })
            }
          >
            Anonymous votes
          </Checkbox>
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
        <MenuList zIndex={11}>
          <MenuItem onClick={() => setColorScheme("green")}> Green</MenuItem>
          <MenuItem onClick={() => setColorScheme("purple")}> Purple</MenuItem>
          <MenuItem onClick={() => setColorScheme("blue")}>Blue</MenuItem>
          <MenuItem onClick={() => setColorScheme("yellow")}>Yellow</MenuItem>
          <MenuItem onClick={() => setColorScheme("pink")}>Pink</MenuItem>
        </MenuList>
      </Menu>
      {/* Background */}
      <PollBackgroundCard
        setBackground={(background) => setBackground(background)}
      />
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
