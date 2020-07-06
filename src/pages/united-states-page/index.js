import React, { useReducer, useEffect } from "react";
import UnitedStatesPage from "./united-states-page.jsx";
import {
  initialState,
  reducer,
  init,
  correctGuess,
  incorrectGuess,
  getCurrentQuestionId,
  getCurrentQuestionName,
  getGuessChecker,
  getIncorrectGuessCount,
  getRemainingCount,
  getIsCompleted,
} from "./united-states-reducer.js";

const Component = ({ mapData }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const currentQuestionId = getCurrentQuestionId(state);

  const handleGuess = (id) => {
    if (currentQuestionId === id) dispatch(correctGuess());
    else dispatch(incorrectGuess());
  };

  const handleReset = () => {
    dispatch(init(mapData));
  };

  useEffect(() => {
    dispatch(init(mapData));
  }, []);

  return (
    <UnitedStatesPage
      mapData={mapData}
      handleGuess={handleGuess}
      handleReset={handleReset}
      currentQuestionId={currentQuestionId}
      currentQuestionName={getCurrentQuestionName(state)}
      guessChecker={getGuessChecker(state)}
      incorrectGuessCount={getIncorrectGuessCount(state)}
      remainingCount={getRemainingCount(state)}
      isCompleted={getIsCompleted(state)}
    />
  );
};

export { Component as UnitedStatesPage };
