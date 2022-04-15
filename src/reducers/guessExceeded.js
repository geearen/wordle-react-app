const guessExceeded = (state = false, action) => {
  switch (action.type) {
    case "GUESS_EXCEEDED":
      return action.payload;
    default:
      return state;
  }
};

export default guessExceeded;
