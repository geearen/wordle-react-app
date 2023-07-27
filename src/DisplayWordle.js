import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

import getLocalStorageKey from "./utils/getLocalStorageKey.ts";
import WinModal from "./WordleComponent/AlertNotification/WinModal.js";
import NoWord from "./WordleComponent/AlertNotification/NoWord.js";

import changeWin from "./redux/actionCreators/changeWin.ts";
import changeWinStatus from "./redux/actionCreators/changeWinStatus.ts";
import changeGuessExceed from "./redux/actionCreators/changeGuessExceed.ts";

import CurrentRow from "./WordleComponent/TilesComponent/CurrentRow.js";
import EnteredRow from "./WordleComponent/TilesComponent/EnteredRow.js";
import EmptyTiles from "./WordleComponent/TilesComponent/EmptyTiles.js";

const DisplayWordle = ({
  input,
  userWord,
  numGuess,
  wordOfDay,
  hasWordExist,
  pressEnter,
  prevEntries,
  prevNumGuess,
  prevColors,
  positionChecked,
}) => {
  const word = [...input];
  const [currentRowPos, setCurrentRowPos] = useState(0);
  const [currentWord, setCurrentWord] = useState([]);
  const [colorSpot, setColorSpot] = useState([]);
  const [shakeAnimate, setShakeAnimate] = useState(false);
  const [notWordList, setNotWordList] = useState(true);
  const [winModal, setWinModal] = useState(false);

  const numWins = useSelector((state) => state.wins);
  const winStatus = useSelector((state) => state.winStatus);
  const guessExceeded = useSelector((state) => state.guessExceeded);

  const dispatch = useDispatch();
  const enter = useRef(false);
  const isAWord = useRef(true);
  const numWinsRef = useRef(numWins);

  useEffect(() => {
    if (userWord.length === 5 && !winStatus) {
      const enteredWord = [...userWord];
      setCurrentWord((oldArray) => [...oldArray, enteredWord]);
    }
  }, [userWord]);

  useEffect(() => {
    enter.current = pressEnter;
    isAWord.current = notWordList;
    if (enter.current && notWordList) {
      setShakeAnimate(true);
    } else {
      setShakeAnimate(false);
    }
  }, [pressEnter, notWordList]);

  useEffect(() => {
    if (!hasWordExist) {
      setNotWordList(true);
    } else {
      setNotWordList(false);
    }
  }, [hasWordExist]);

  useEffect(() => {
    if (prevEntries && prevColors) {
      setCurrentWord(prevEntries);
      setColorSpot(prevColors);
    }
  }, [prevEntries, prevColors]);

  useEffect(() => {
    localStorage.setItem("won", numWins);
  }, [numWins]);

  useEffect(() => {
    if (currentWord[currentRowPos]) {
      const currWord = currentWord[currentRowPos].join("");

      if (wordOfDay === currWord.toLowerCase() && numGuess !== 0) {
        const hasWon = getLocalStorageKey("hasWon");
        const hasGuess = getLocalStorageKey("hasGuess");

        localStorage.setItem(hasWon, JSON.stringify(currentWord));
        localStorage.setItem(hasGuess, JSON.stringify(numGuess));

        dispatch(changeWinStatus(true));
        dispatch(changeWin(numWinsRef.current + 1));
        setWinModal(true);
      }
    } else if (currentWord.length === 6) {
      dispatch(changeGuessExceed(true));

      const hasPrevColors = getLocalStorageKey("hasPrevColors");
      const hasGuess = getLocalStorageKey("hasGuess");
      const hasGuessExceed = getLocalStorageKey("hasGuessExceed");

      localStorage.setItem(hasPrevColors, JSON.stringify(colorSpot));
      localStorage.setItem(hasGuessExceed, JSON.stringify(currentWord));
      localStorage.setItem(hasGuess, JSON.stringify(numGuess));
    }
  }, [currentWord, currentRowPos, winStatus]);

  useEffect(() => {
    if (positionChecked.length > 0) {
      const colorArr = colorTiles();
      console.log(colorArr);
      setColorSpot((prevColorArr) => [...prevColorArr, colorArr]);
    }
  }, [positionChecked]);

  // const compareUserToWordle = () => {
  //   let colorArr = [];
  //   [...wordOfDay.toUpperCase()].forEachA((char, index) => {
  //     if (char === currentWord[currentRowPos][index]) {
  //       colorArr.push("bg-green-500");
  //     } else if (
  //       [...wordOfDay.toUpperCase()].includes(currentWord[currentRowPos][index])
  //     ) {
  //       colorArr.push("bg-yellow-500");
  //     } else {
  //       colorArr.push("bg-gray-500");
  //     }
  //   });

  //   setCurrentRowPos(currentRowPos + 1);
  //   return colorArr;
  // };

  const colorTiles = () => {
    let colorArr = [];
    positionChecked.forEach((item, index) => {
      if (item === "correct") {
        colorArr.push("bg-green-500");
      } else if (item === "present") {
        colorArr.push("bg-yellow-500");
      } else if (item === "absent") {
        colorArr.push("bg-gray-500");
      }
    });
    setCurrentRowPos(currentRowPos + 1);
    return colorArr;
  };

  const toggleWinModal = () => {
    setWinModal(false);
  };

  return (
    <div className="h-[74vh] w-5/6 mx-auto">
      <div className="flex justify-center relative flex-col">
        {notWordList ? (
          <NoWord>Not in Word List</NoWord>
        ) : (
          <NoWord> Guess </NoWord>
        )}
        <div className="game-container md:w-4/6 md:mx-auto flex justify-center">
          <div className=" flex justify-center items-center m-8 relative">
            <div className="game-waffle flex flex-col p-5 mx-auto ">
              <EnteredRow currentWord={currentWord} colorSpot={colorSpot} />
              <CurrentRow shakeAnimate={shakeAnimate} word={word} />
              <EmptyTiles />
            </div>
          </div>
        </div>
      </div>
      {winModal ? (
        <WinModal>
          <div className="absolute top-0 right-0">
            <button
              onClick={toggleWinModal}
              className="m-2 bg-red-500 rounded-full w-6 h-6 text-center text-white"
            >
              X
            </button>
          </div>
          <h1 className="text-5xl text-center m-3 pt-5 pb-5">Nicely Done!</h1>
        </WinModal>
      ) : null}
    </div>
  );
};

export default DisplayWordle;
