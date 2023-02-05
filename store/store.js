import { create } from "zustand";
import { getMinEndDate } from "../lib/getMinEndDate";

const useStore = create((set) => ({
  settings: {
    hideVotes: false,
    startDate: new Date().getTime(),
    endDate: getMinEndDate(new Date()),
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
