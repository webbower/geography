import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import styles from "./styles.module.scss";

const propTypes = {
  mapData: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
    })
  ).isRequired,
  handleGuess: PropTypes.func.isRequired,
  handleReset: PropTypes.func.isRequired,
  currentQuestionName: PropTypes.string,
  guessChecker: PropTypes.shape({
    isCorrect: PropTypes.func.isRequired,
  }).isRequired,
  incorrectGuessCount: PropTypes.number,
  remainingCount: PropTypes.number,
  isCompleted: PropTypes.bool,
};

const defaultProps = {
  incorrectGuessCount: 0,
  remainingCount: 0,
  isCompleted: false,
};

const UnitedStatesPage = ({
  mapData,
  handleGuess,
  handleReset,
  currentQuestionName,
  guessChecker,
  incorrectGuessCount,
  remainingCount,
  isCompleted,
}) => {
  return (
    <div className={styles.root}>
      <h2>United States</h2>

      <p className="js-hint">
        Find: <b>{currentQuestionName || "N/A"}</b>
      </p>

      <p className="js-remaining">
        Remaining: <b>{remainingCount}</b>
      </p>

      <p className="js-incorrect">
        Incorrect guesses: <b>{incorrectGuessCount}</b>
      </p>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        style={{ strokeLinejoin: "round", stroke: "#000", fill: "none" }}
        version="1.1"
        viewBox="0 0 1000 589"
        height="589px"
        width="1000px"
      >
        {mapData.map(({ id, name, path }) => (
          <path
            key={id}
            id={id}
            data-name={name}
            d={path}
            className={classNames(styles.mapItem, {
              [styles.isCorrect]: guessChecker.isCorrect(id),
            })}
            onClick={
              guessChecker.isCorrect(id)
                ? undefined
                : () => {
                    handleGuess(id);
                  }
            }
          />
        ))}
      </svg>

      {isCompleted && (
        <div className={classNames("js-completed", styles.completedMessage)}>
          <h2>Completed!</h2>
          <p>{incorrectGuessCount} incorrect guesses.</p>
          <button type="button" onClick={handleReset}>
            Start Over
          </button>
        </div>
      )}
    </div>
  );
};

UnitedStatesPage.propTypes = propTypes;
UnitedStatesPage.defaultProps = defaultProps;

export default UnitedStatesPage;
