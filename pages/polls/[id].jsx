"use client";
import {useEffect} from "react";
import Head from "next/head";
import dynamic from "next/dynamic";
import prisma from "../../lib/prisma";
import {getPollById} from "../../lib/polls";
import usePollState from "../../store/poll-state.store";
import MainLayout from "../../components/Layouts/main-layout";

// lazy imports
const PollLayout = dynamic(
  () => import("../../components/Layouts/poll-layout"),
  {ssr: false}
);
const PollUser = dynamic(() => import("../../components/PollCard/poll-user"), {
  ssr: false,
});

export async function getStaticPaths() {
  try {
    // Return a list of possible value for id
    const polls = await prisma.poll.findMany();

    // Map through all polls to get eah ID
    const paths = polls.map((poll) => ({
      params: {
        id: poll.id.toString(),
      },
    }));

    return {
      paths,
      fallback: false,
    };
  } catch (error) {
    console.log(error);
  }
}

export async function getStaticProps({params}) {
  // will be passed to the page component as props
  return await getPollById(params.id);
}

/*
Poll prop:
  id: Number
  title: String
  colorScheme: String
  hideVotes: boolean
  startDate: isoString
  endDate: isoString
  backgroundURL: String
  queststions: [
    { 
      id: number, 
      question: string, 
      votes: number, 
      pollId: number 
    }
  ]
*/
const Poll = ({poll}) => {
  useEffect(() => {
    usePollState.setState({
      settings: {
        hideVotes: poll.hideVotes,
        startDate: new Date(poll.startDate).getTime(),
        endDate: new Date(poll.endDate).getTime(),
      },
      colorScheme: poll.colorScheme,
      pollTitle: poll.title,
      background: poll.backgroundURL,
      options: [...poll.questions],
      pollId: poll.id,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Head>
        <title>Consensays</title>
        <meta name='description' content='Generated by create next app'/>
        <meta name='viewport' content='width=device-width, initial-scale=1'/>
        <link rel='icon' href='/favicon.ico'/>
      </Head>
      <MainLayout
        backgroundURL={poll.backgroundURL}
      >
        <PollLayout>
          <PollUser/>
        </PollLayout>
      </MainLayout>
    </>
  );
};

export default Poll;