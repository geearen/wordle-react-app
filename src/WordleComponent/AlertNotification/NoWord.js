const NoWord = ({ children }) => {
  return (
    <div className="word-check p-2 m-2 bg-black rounded-md w-36 self-center">
      <h1 className="text-center text-md text-white"> {children}</h1>
    </div>
  );
};
export default NoWord;
