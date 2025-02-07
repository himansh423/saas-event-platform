import { createSlice } from "@reduxjs/toolkit";

interface ImportantQuestionState {
  currTab: number;
  tabOneAnswer: {
    optionNumber: number | null;
    value: string;
  };
  tabTwoAnswer: {
    optionNumber: number | null;
    value: string;
  };
  tabThreeAnswer: {
    optionNumber: number | null;
    value: string;
  };
}

const initialState: ImportantQuestionState = {
  currTab: 1,
  tabOneAnswer: {
    optionNumber: null,
    value: "",
  },
  tabTwoAnswer: {
    optionNumber: null,
    value: "",
  },
  tabThreeAnswer: {
    optionNumber: null,
    value: "",
  },
};

const importantQuestionsSlice = createSlice({
  name: "importantQuestions",
  initialState,
  reducers: {
    setTab: (state, actions) => {
      const { data } = actions.payload;
      state.currTab = data;
    },
    setTabOneAnswer: (state, actions) => {
      const { data } = actions.payload;
      state.tabOneAnswer.optionNumber = data.optionNumber;
      state.tabOneAnswer.value = data.value;
    },
    setTabTwoAnswer: (state, actions) => {
      const { data } = actions.payload;
      state.tabTwoAnswer.optionNumber = data.optionNumber;
      state.tabTwoAnswer.value = data.value;
    },
    setTabThreeAnswer: (state, actions) => {
      const { data } = actions.payload;
      state.tabThreeAnswer.optionNumber = data.optionNumber;
      state.tabThreeAnswer.value = data.value;
    },
  },
});

export const importantQuestionsAction = importantQuestionsSlice.actions;
export default importantQuestionsSlice;
