import {create} from "zustand";
import {getMinEndDate} from "../lib/getMinEndDate";

const usePollState = create((set, get) => ({
  settings: {
    hideVotes: false,
    startDate: new Date(),
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
  background: "",
  pollId: null,
  setColorScheme: (color) => set(() => ({colorScheme: color})),
  deleteOption: (id) => {
    const newOptionsArr = get().options.filter(option =>
      option.id !== id
    );

    set(() => ({options: newOptionsArr}))
  },
  inputHandler: () => {

  },
  addOption: () => set((state) => (
    {
      options: [
        ...state.options,
        {
          id: state.options.length + 1,
          question: "",
        },
      ]
    }
  ))
}));

export default usePollState;
