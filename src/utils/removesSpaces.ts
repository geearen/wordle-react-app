const removesSpaces = (arr2: string[]) => {
  // const arr = [...arr1, ...arr2];
  const result = arr2.filter((item) => item !== " ");
  return result;
};

export default removesSpaces;
