import React from "react";
import { describe } from "riteway";
import render from "riteway/render-component";

import { createTestMapData } from "./testing-utils.js";

import UnitedStatesPage from "./united-states-page.jsx";

const noop = () => {};

const dummyGuessChecker = {
  isCorrect() {
    return false;
  },
};

const renderTestComponent = ({
  mapData = createTestMapData(),
  handleGuess = noop,
  guessChecker = dummyGuessChecker,
  incorrectGuessCount = 0,
  remainingCount = 0,
  isCompleted = false,
  currentQuestionName,
} = {}) =>
  render(
    <UnitedStatesPage
      mapData={mapData}
      handleGuess={handleGuess}
      currentQuestionName={currentQuestionName}
      guessChecker={guessChecker}
      incorrectGuessCount={incorrectGuessCount}
      remainingCount={remainingCount}
      isCompleted={isCompleted}
    />
  );

describe("<UnitedStatesPage> output", async (assert) => {
  {
    const mapData = createTestMapData();
    const $ = renderTestComponent({ mapData });

    assert({
      given: "map data",
      should: "render entries for each map data item",
      actual: $("path").length,
      expected: mapData.length,
    });
  }

  {
    const currentQuestionName = "Illinois";
    const $ = renderTestComponent({
      currentQuestionName,
    });

    assert({
      given: "the current question name",
      should: "display the name as the direction for what to find",
      actual: $(".js-hint > b").text(),
      expected: currentQuestionName,
    });
  }

  {
    const incorrectGuessCount = 5;
    const $ = renderTestComponent({
      incorrectGuessCount,
    });

    assert({
      given: "incorrect guesses",
      should: "display the number of incorrect guesses so far",
      actual: $(".js-incorrect > b").text(),
      expected: String(incorrectGuessCount),
    });
  }

  {
    const remainingCount = 5;
    const $ = renderTestComponent({
      remainingCount,
    });

    assert({
      given: "incorrect guesses",
      should: "display the number of incorrect guesses so far",
      actual: $(".js-remaining > b").text(),
      expected: String(remainingCount),
    });
  }

  {
    const incorrectGuessCount = 10;
    const $ = renderTestComponent({
      isCompleted: true,
      incorrectGuessCount,
    });

    const completedMessage = $(".js-completed").text().trim();

    assert({
      given: "all guesses completed",
      should: "display the completed message with stats",
      actual: [
        completedMessage.includes("Completed!"),
        completedMessage.includes(`${incorrectGuessCount} incorrect guesses.`),
      ],
      expected: [true, true],
    });
  }
});
