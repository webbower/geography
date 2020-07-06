import React from "react";
import { describe } from "riteway";

import { createTestMapData, reduceActions } from "./testing-utils.js";

import {
  reducer,
  init,
  correctGuess,
  incorrectGuess,
  getCurrentQuestionId,
  getCurrentQuestionName,
  getIncorrectGuessCount,
  getGuessChecker,
  getRemainingCount,
  getIsCompleted,
} from "./united-states-reducer.js";

const createTestState = ({
  remaining = [],
  correct = [],
  incorrectCount = 0,
  completed = false,
} = {}) => ({
  remaining,
  correct,
  incorrectCount,
  completed,
});

describe("United States Map reducer()", async (assert) => {
  assert({
    given: "no arguments",
    should: "should return initial state",
    actual: reducer(),
    expected: createTestState(),
  });
});

describe("United States Map action: init()", async (assert) => {
  assert({
    given: "no arguments",
    should: "should return initial state",
    actual: reduceActions(reducer, [init()]),
    expected: createTestState(),
  });

  assert({
    given: "an array with shuffling disabled",
    should: "should update expected state",
    actual: reduceActions(reducer, [init(createTestMapData(), (x) => x)]),
    expected: createTestState({
      remaining: createTestMapData(),
    }),
  });
});

describe("United States Map action: correctGuess()", async (assert) => {
  {
    const mapData = createTestMapData();
    assert({
      given: "a correct guess",
      should: "denote a new correct guess in state",
      actual: reducer(
        createTestState({
          remaining: mapData,
        }),
        correctGuess()
      ),
      expected: createTestState({
        remaining: mapData.slice(1),
        correct: [mapData[0]],
      }),
    });
  }

  {
    const mapData = createTestMapData();
    assert({
      given: "the last correct guess",
      should: "update state to enter complete mode",
      actual: reduceActions(reducer, [
        init(mapData, (x) => x),
        correctGuess(),
        correctGuess(),
        correctGuess(),
      ]),
      expected: createTestState({
        remaining: [],
        correct: [...mapData].reverse(),
        completed: true,
      }),
    });
  }
});

describe("United States Map action: incorrectGuess()", async (assert) => {
  assert({
    given: "an incorrect guess action",
    should: "should increment the incorrect guess count",
    actual: reducer(createTestState(), incorrectGuess()),
    expected: createTestState({
      incorrectCount: 1,
    }),
  });

  assert({
    given: "multiple incorrect guess actions",
    should: "should increment the incorrect guess count for each action",
    actual: reduceActions(reducer, [
      incorrectGuess(),
      incorrectGuess(),
      incorrectGuess(),
    ]),
    expected: createTestState({
      incorrectCount: 3,
    }),
  });
});

describe("United States Map selector: getCurrentQuestionId()", async (assert) => {
  assert({
    given: "remaining questions",
    should: "return the id of the first one which is the current question",
    actual: getCurrentQuestionId(
      reducer(
        undefined,
        init(createTestMapData(), (x) => x)
      )
    ),
    expected: "IL",
  });
});

describe("United States Map selector: getCurrentQuestionName()", async (assert) => {
  assert({
    given: "remaining questions",
    should:
      "return the display name of the first one which is the current question",
    actual: getCurrentQuestionName(
      reducer(
        undefined,
        init(createTestMapData(), (x) => x)
      )
    ),
    expected: "Illinois",
  });
});

describe("United States Map selector: getGuessChecker()", async (assert) => {
  const guessChecker = getGuessChecker(
    createTestState({
      correct: createTestMapData(),
    })
  );
  assert({
    given: "correct guesses in state",
    should: "return a GuessChecker instance",
    actual: [guessChecker.isCorrect("IL"), guessChecker.isCorrect("CA")],
    expected: [true, false],
  });
});

describe("United States Map selector: getIncorrectGuessCount()", async (assert) => {
  assert({
    given: "incorrect guesses in state",
    should: "return the count of incorrect guesses",
    actual: getIncorrectGuessCount(createTestState({ incorrectCount: 2 })),
    expected: 2,
  });
});

describe("United States Map selector: getRemainingCount()", async (assert) => {
  const mapData = createTestMapData();
  assert({
    given: "incorrect guesses in state",
    should: "return the count of incorrect guesses",
    actual: getRemainingCount(
      createTestState({
        remaining: mapData,
      })
    ),
    expected: mapData.length,
  });
});

describe("United States Map selector: getIsCompleted()", async (assert) => {
  assert({
    given: "initial state",
    should: "return false",
    actual: getIsCompleted(createTestState()),
    expected: false,
  });

  assert({
    given: "completed state",
    should: "return true",
    actual: getIsCompleted(createTestState({ completed: true })),
    expected: true,
  });
});
