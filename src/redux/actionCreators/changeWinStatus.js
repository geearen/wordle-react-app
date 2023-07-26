const changeWinStatus = (winStatus) => {
  return { type: "WIN_STATUS", payload: winStatus };
};

export default changeWinStatus;
