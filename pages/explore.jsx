import Head from "next/head";
import MainLayout from "../components/Layouts/main-layout";
import {
  Box,
  Button,
  Flex,
  FormControl,
  HStack,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import prisma from "../lib/prisma";
import usePollState from "../store/poll-state.store";
import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import PollsTable from "../components/polls-table";

export async function getStaticProps({}) {
  const polls = JSON.stringify(await prisma.poll.findMany());

  return {
    props: {
      polls,
    },
  };
}

const Explore = ({ polls }) => {
  const { colorScheme } = usePollState();
  const [filterBy, setFilterBy] = useState("Newest");

  return (
    <>
      <Head>
        <title>Explore</title>
      </Head>
      <MainLayout>
        <Box
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
                <MenuItem>Oldest - On Going</MenuItem>
                <MenuItem>Recently Ended</MenuItem>
                <MenuItem>Oldest - Ended</MenuItem>
              </MenuList>
            </Menu>
            <HStack
              direction={{ base: "column", md: "row" }}
              as={"form"}
              spacing={"12px"}
              onSubmit={(e) => {
                e.preventDefault();
                // setError(false);
                // setState('submitting');

                // remove this code and implement your submit logic right here
                // setTimeout(() => {
                //     if (email === 'fail@example.com') {
                //         setError(true);
                //         setState('initial');
                //         return;
                //     }
                //
                //     setState('success');
                // }, 1000);
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
            </HStack>
          </Flex>
          <PollsTable />
        </Box>
      </MainLayout>
    </>
  );
};

export default Explore;
