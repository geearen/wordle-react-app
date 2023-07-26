import { WIN_STATUS } from "../actionTypes/actionTypes";

const changeGuessExceed = (guessExceeded: TguessExceeded) => {
  return { type: WIN_STATUS, payload: guessExceeded };
};

export default changeGuessExceed;
