const changeGuessExceed = (guessExceeded) => {
  return { type: "WIN_STATUS", payload: guessExceeded };
};

export default changeGuessExceed;
