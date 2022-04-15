const removesDuplicates = (arr: [], arr2: []) => {
  let combined: string[] = [...arr, ...arr2];
  let uniqueChar: string[] = [...new Set(combined)];
  return uniqueChar;
};

export default removesDuplicates;
