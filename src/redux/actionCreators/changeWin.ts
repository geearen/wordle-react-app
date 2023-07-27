import { WINS } from "../actionTypes/actionTypes";
const changeWin = (wins: Twins) => {
  return { type: WINS, payload: wins };
};

export default changeWin;
