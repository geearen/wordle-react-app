const winStatus = (state = false, action) => {
  switch (action.type) {
    case "WIN_STATUS":
      return action.payload;
    default:
      return state;
  }
};

export default winStatus;
