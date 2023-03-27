import Head from "next/head";
import MainLayout from "../components/Layouts/main-layout";
import {
  Button,
  Flex,
  FormControl,
  HStack,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Tooltip,
  useColorModeValue,
} from "@chakra-ui/react";
import prisma from "../lib/prisma";
import usePollState from "../store/poll-state.store";
import { FiChevronDown, FiRefreshCcw } from "react-icons/fi";
import PollsTable from "../components/polls-table";
import { usePagination } from "../hooks/usePagination.hook";

export async function getStaticProps({}) {
  const polls = JSON.stringify(await prisma.poll.findMany());

  return {
    props: {
      polls,
    },
  };
}

function Explore({ polls }) {
  const { colorScheme } = usePollState();
  const {
    next,
    prev,
    searchByTitle,
    reset,
    currentItems,
    maxPage,
    currentPage,
    filterBy,
    setFilterBy,
  } = usePagination(JSON.parse(polls), 10, 1);

  return (
    <>
      <Head>
        <title>Explore</title>
      </Head>
      <MainLayout>
        <Flex
          flexDir={"column"}
          minH={"90%"}
          minWidth={"90%"}
          borderRadius={8}
          boxShadow={"1px 2px 5px gray"}
          bg={useColorModeValue("white", "initial")}
        >
          <Flex
            paddingY={5}
            paddingX={10}
            borderX={"none"}
            borderTop={"none"}
            borderBottom={"solid"}
            borderWidth={"1px"}
            borderColor={useColorModeValue("#aaa", "initial")}
            justifyContent={"space-between"}
          >
            <Menu>
              <MenuButton
                as={Button}
                colorScheme={colorScheme}
                rightIcon={<FiChevronDown />}
              >
                Filter by: {filterBy}
              </MenuButton>
              <MenuList
                color={useColorModeValue("initial", "gray.200")}
                onClick={(e) => setFilterBy(e.target.textContent)}
              >
                <MenuItem>Newest</MenuItem>
                <MenuItem>Hidden Votes</MenuItem>
                <MenuItem>Oldest</MenuItem>
              </MenuList>
            </Menu>
            <HStack
              direction={{ base: "column", md: "row" }}
              as={"form"}
              spacing={"12px"}
              onSubmit={(e) => {
                e.preventDefault();
                searchByTitle(e.target.search.value);
                e.target.search.value = "";
              }}
            >
              <FormControl>
                <Input
                  variant={"solid"}
                  borderWidth={1}
                  color={useColorModeValue("initial", "white")}
                  _placeholder={{
                    color: "gray.400",
                  }}
                  borderColor={useColorModeValue("gray.300", "gray.700")}
                  id={"search"}
                  type={"text"}
                  required
                  placeholder={"Search By Title"}
                  aria-label={"Search By Poll Title"}
                />
              </FormControl>
              <FormControl w={{ base: "100%", md: "40%" }}>
                <Button colorScheme={colorScheme} w="100%" type={"submit"}>
                  Search
                </Button>
              </FormControl>
              <Tooltip label={"Reset Polls"} aria-label={"Reset Polls"}>
                <Button
                  type={"button"}
                  colorScheme={colorScheme}
                  fontSize={24}
                  onClick={reset}
                >
                  <FiRefreshCcw />
                </Button>
              </Tooltip>
            </HStack>
          </Flex>
          <PollsTable polls={currentItems} />
          <HStack
            paddingRight={10}
            marginTop={10}
            justifyContent={"end"}
            width={"100%"}
          >
            <Button
              isDisabled={maxPage <= currentPage}
              onClick={prev}
              colorScheme={colorScheme}
            >
              Prev
            </Button>
            <Button
              isDisabled={maxPage === currentPage}
              onClick={next}
              colorScheme={colorScheme}
            >
              Next
            </Button>
          </HStack>
        </Flex>
      </MainLayout>
    </>
  );
}

export default Explore;
