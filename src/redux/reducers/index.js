import { combineReducers } from "redux";
import wins from "./wins";
import winStatus from "./winStatus";
import guessExceeded from "./guessExceeded";

export default combineReducers({
  wins,
  winStatus,
  guessExceeded,
});
