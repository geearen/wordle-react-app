import { WIN_STATUS } from "../actionTypes/actionTypes";

const winStatus = (state = false, action: TwinStatus) => {
  switch (action.type) {
    case WIN_STATUS:
      return action.payload;
    default:
      return state;
  }
};

export default winStatus;
