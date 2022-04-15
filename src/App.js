import GameContainer from "./GameContainer";

const App = () => {
  return (
    <div className=" h-screen w-screen bg-gradient-to-b  from-slate-500  to-white p-1">
      <h1 className="text-3xl font-bold text-center animate-pulse mb-2">
        Definitely <span className="text-orange-400"> Not </span>{" "}
        <span className="text-green-400"> Wordle </span>
      </h1>
      <GameContainer />
    </div>
  );
};
export default App;
