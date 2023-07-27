import { WIN_STATUS } from "../actionTypes/actionTypes";

const changeWinStatus = (winStatus:TwinStatus) => {
  return { type: WIN_STATUS, payload: winStatus };
};

export default changeWinStatus;
