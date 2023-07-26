import { WINS } from "../actionTypes/actionTypes";

let numWin: number;

(() => {
  let localStorageWon = localStorage.getItem("won")
  if(localStorageWon === null || undefined){
    numWin = 0;
  }
  if(typeof localStorageWon === "string"){
    let numberWins = parseInt(localStorageWon)
    if(typeof numberWins === "number"){
      numWin = numberWins;
    }
  }
})();


const wins = (state = numWin, action: Twins) => {
  switch (action.type) {
    case WINS:
      return action.payload;
    default:
      return state;
  }
};

export default wins;
