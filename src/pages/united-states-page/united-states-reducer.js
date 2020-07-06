import shuffle from "lodash.shuffle";
import * as R from "ramda";

// Initial State
export const initialState = {
  incorrectCount: 0,
  remaining: [],
  correct: [],
  completed: false,
};

// Action creators
export const init = (questions = [], shuffler = shuffle) => ({
  type: init.type,
  payload: shuffler(questions),
});
init.type = "united-states/init";

export const correctGuess = () => ({
  type: correctGuess.type,
});
correctGuess.type = "united-states/correctGuess";

export const incorrectGuess = () => ({
  type: incorrectGuess.type,
});
incorrectGuess.type = "united-states/incorrectGuess";

const GuessChecker = (correctGuesses = []) => {
  const guesses = new Set(correctGuesses);

  return {
    isCorrect(id) {
      return guesses.has(id);
    },
  };
};

// Selectors
export const getCurrentQuestionId = R.path(["remaining", 0, "id"]);
export const getCurrentQuestionName = R.path(["remaining", 0, "name"]);
export const getGuessChecker = R.pipe(
  R.prop("correct"),
  R.pluck("id"),
  GuessChecker
);
export const getIncorrectGuessCount = R.prop("incorrectCount");
export const getRemainingCount = R.path(["remaining", "length"]);
export const getIsCompleted = R.prop("completed");

// Reducer
export const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case correctGuess.type: {
      const { remaining, correct } = state;
      // TODO Make sure case is handled when `!guess`
      const nextCorrect = R.compose(
        R.flip(R.prepend)(correct),
        R.head
      )(remaining);
      const nextRemaining = remaining.slice(1);
      return {
        ...state,
        correct: nextCorrect,
        remaining: nextRemaining,
        completed: nextRemaining.length === 0,
      };
    }

    case incorrectGuess.type:
      return { ...state, incorrectCount: state.incorrectCount + 1 };

    case init.type:
      return { ...initialState, remaining: action.payload };

    default:
      return state;
  }
};
