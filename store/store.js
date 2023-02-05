import { create } from "zustand";

const startingEndDate = () => {
  var date = new Date();
  date.setDate(date.getDate() + 1);

  return date;
};

const useStore = create((set) => ({
  settings: {
    hideVotes: false,
    startDate: new Date().getTime(),
    endDate: startingEndDate(),
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
