import { create } from "zustand";

const useStore = create((set) => ({
  settings: {
    hideVotes: false,
    anonymousVotes: false,
  },
  options: [
    {
      id: 0,
      question: "",
    },
    {
      id: 1,
      question: "",
    },
  ],
  pollTitle: "Poll Title",
  colorScheme: "purple",
  background: null,
}));

export default useStore;
