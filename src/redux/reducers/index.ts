import { combineReducers } from "redux";
import wins from "./wins";
import winStatus from "./winStatus";
import guessExceeded from "./guessExceeded";

const allReducers = combineReducers({
  wins,
  winStatus,
  guessExceeded,
});

export default allReducers;
