import { Button, Flex } from "@chakra-ui/react";
import Head from "next/head";
import { useState } from "react";
import PollForm from "../components/PollCard/poll-form";
import PollLayout from "../components/PollCard/poll-layout";
import PollUser from "../components/PollCard/poll-user";
import { AiOutlineArrowLeft } from "react-icons/ai";
import useStore from "../store/store";
import {
  VOTE_USER_VIEW,
  VOTE_FORM_VIEW,
  VOTE_POSTED,
} from "../constants/index";

export default function Home() {
  const [background, setBackground] = useState(null);
  const [pollView, setPollView] = useState(VOTE_FORM_VIEW);
  const { colorScheme } = useStore();

  return (
    <>
      <Head>
        <title>Poller</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Flex
        as={"main"}
        h={"100vh"}
        justifyContent={"center"}
        alignItems={"center"}
        flexDir={"column"}
        gap={5}
        background={`url(${background})`}
        backgroundSize={"cover"}
        backgroundRepeat={"no-repeat"}
        backgroundPosition={"center"}
      >
        {pollView === VOTE_USER_VIEW && (
          <Button
            onClick={() => setPollView(VOTE_FORM_VIEW)}
            display={"flex"}
            boxShadow={"1px 2px 5px gray"}
            gap={2}
            colorScheme={colorScheme}
          >
            <AiOutlineArrowLeft /> Edit Options
          </Button>
        )}
        <PollLayout pollView={pollView}>
          {pollView === VOTE_FORM_VIEW && (
            <PollForm
              setBackground={(path) => setBackground(path)}
              setPollView={() => setPollView(VOTE_USER_VIEW)}
            />
          )}
          {pollView === VOTE_USER_VIEW && (
            <PollUser setPollView={() => setPollView(VOTE_FORM_VIEW)} />
          )}
        </PollLayout>
      </Flex>
    </>
  );
}
