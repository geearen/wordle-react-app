import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const GameStatsModal = ({
  children,
  prevNumGuess,
  guessDistribution,
  numLoses,
}) => {
  const [winRate, setWinRate] = useState(0);

  const numWins = useSelector((state) => state.wins);

  const calculateWinRate = (numWins, numLoses) => {
    const totalGames = numWins + numLoses;
    return (numWins / totalGames) * 100;
  };

  useEffect(() => {
    setWinRate(calculateWinRate(numWins, numLoses));
  }, [numWins, numLoses]);

  return (
    <div className="game-stats-modal fixed inset-0 top-0 flex justify-center items-center bg-opacity-70 bg-slate-500 z-40">
      <div className="bg-red-100 border-solid rounded-md border-red-400 relative h-96 w-96">
        {children}
        <div className="flex justify-center items-center flex-col">
          <div className="top-stats flex justify-center items-center mx-10">
            <section className="statistic mx-5">
              <div className="text-center text-2xl mb-1 ">{numWins}</div>
              <div>Wins</div>
            </section>
            <section className="statistic mx-5">
              <div className="text-center text-2xl mb-1">{winRate}</div>
              <div>Win %</div>
            </section>
            <section className="statistic mx-5">
              <div className="text-center text-2xl mb-1">{prevNumGuess}</div>
              <div># Tries</div>
            </section>
          </div>
          <section className="statistic-distribution mt-5 w-56">
            <h1 className="text-center text-lg text-b font-semibold ">
              {" "}
              Guess Distribution{" "}
            </h1>
            <div className="distriution flex flex-col">
              {guessDistribution.map((guess, index) => (
                <div className="flex justify-start" key={`${index + 1}-no`}>
                  <p className="mr-10 w-10">{index + 1}</p>
                  <p className="ml-2"> {guess} </p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default GameStatsModal;
