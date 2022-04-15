const numWin = parseInt(localStorage.getItem("won") ?? 0, 10);

const wins = (state = numWin, action) => {
  switch (action.type) {
    case "WIN":
      return action.payload;
    default:
      return state;
  }
};

export default wins;
