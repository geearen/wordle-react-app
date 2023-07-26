import { GUESS_EXCEEDED } from "../actionTypes/actionTypes";

const guessExceeded = (state = false, action: TguessExceeded) => {
  switch (action.type) {
    case GUESS_EXCEEDED:
      return action.payload;
    default:
      return state;
  }
};

export default guessExceeded;
