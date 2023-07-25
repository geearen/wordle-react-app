import React, { useRef, useState, useEffect } from "react";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import DisplayWordle from "./DisplayWordle";
import GameStatsModal from "./WordleComponent/GameStatsModal/GameStatsModal";
import { useSelector } from "react-redux";

import getLocalStorageKey from "./utils/getLocalStorageKey.ts";
import removesSpaces from "./utils/removesSpaces.ts";
import postData from "./utils/postData.ts";
import useEventListener from "./utils/useEventListener";
import removesDuplicates from "./utils/removesDuplicates.ts";
import toLowerCaseMap from "./utils/toLowerCaseMap.ts";

const GameContainer = () => {
  const [input, setInput] = useState("");
  const [userWord, setUserWord] = useState("");
  const [numGuess, setNumGuess] = useState(0);
  const [wordOfDay, setWordOfDay] = useState("");
  const [hasWordExist, setHasWordExist] = useState(true);
  const [pressEnter, setPressEnter] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [positionChecked, setPositionChecked] = useState([]);

  const [layoutName, setLayoutName] = useState("default");

  const [greenChar, setGreenChar] = useState([]);
  const [grayChar, setGrayChar] = useState([]);
  const [yellowChar, setYellowChar] = useState([]);

  const [greenKeys, setGreenKeys] = useState("");
  const [grayKeys, setGrayKeys] = useState("");
  const [yellowKeys, setYellowKeys] = useState("");

  const [numLoses, setNumLoses] = useState(0);
  const [prevNumGuess, setPrevNumGuess] = useState(0);
  const [guessDistribution, setguessDistribution] = useState(
    new Array(6).fill(0)
  );
  const [prevColors, setPrevColors] = useState([]);
  const [prevEntries, setPrevEntries] = useState([]);

  const winStatus = useSelector((state) => state.winStatus);
  const guessExceeded = useSelector((state) => state.guessExceeded);

  const url =
    "https://wordle-api-geearen.onrender.com/api" ||
    "http://localhost:4000/api";
  const keyboard = useRef();

  useEffect(() => {
    // const key = getLocalStorageKey("word");
    fetch(`${url}/word`)
      .then((res) => res.json())
      .then((data) => {
        setWordOfDay(data.data);
        console.log(data.data);
      });
    const hasWonKey = getLocalStorageKey("hasWon");
    const hasGuessKey = getLocalStorageKey("hasGuess");
    const hasGuessExceedKey = getLocalStorageKey("hasGuessExceed");
    const hasPrevColorsKey = getLocalStorageKey("hasPrevColors");

    // const word = localStorage.getItem(key);
    const hasWon = JSON.parse(localStorage.getItem(hasWonKey));
    const hasGuessExceed = JSON.parse(localStorage.getItem(hasGuessExceedKey));
    const hasGuess = JSON.parse(localStorage.getItem(hasGuessKey));
    const hasPrevColors = JSON.parse(localStorage.getItem(hasPrevColorsKey));

    if (hasGuessExceed && hasPrevColors) {
      setPrevEntries(hasGuessExceed);
      setPrevColors(hasPrevColors);
    } else if (hasWon && hasGuess) {
      setPrevEntries(hasWon);
      setPrevNumGuess(hasGuess);
    }
  }, []);

  useEffect(() => {
    handlesKeyboardColor(greenChar, grayChar, yellowChar);
  }, [greenChar, grayChar, yellowChar]);

  const toggleShowModal = () => {
    setShowModal(!showModal);
  };

  const onChange = (input) => {
    if (prevEntries.length === 0 && !winStatus && !guessExceeded) {
      setInput(input);
    }
  };

  const onClear = () => {
    keyboard.current.clearInput();
    setInput("");
  };

  const onChangeInput = (event) => {
    const input = event.target.value.toUpperCase();
    setInput(input);
    keyboard.current.setInput(input);
  };

  const onKeyPress = (button) => {
    if (button === "{shiftleft}" || layoutName === "shiftleft")
      handleShift(button);

    if (button === "{enter}") {
      if (input.length === 5) {
        postData(`${url}/word`, { guess: input.toUpperCase() }).then((data) => {
          let apiResponse = data.message;
          console.log(apiResponse);
          if (apiResponse.wordExist === true) {
            console.log(input, "userInput");
            setUserWord(input);
            setNumGuess(numGuess + 1);
            setGreenChar([
              ...apiResponse.green,
              ...toLowerCaseMap(apiResponse.green),
            ]);
            setGrayChar([
              ...apiResponse.gray,
              ...toLowerCaseMap(apiResponse.gray),
            ]);
            setYellowChar([
              ...apiResponse.yellow,
              ...toLowerCaseMap(apiResponse.yellow),
            ]);
            setPositionChecked(apiResponse.positionChecked);
            setHasWordExist(true);
            onClear();
          } else if (apiResponse.wordExist === false) {
            setHasWordExist(false);
          }
        });
      }
      setPressEnter(true);
    } else {
      setPressEnter(false);
    }
  };

  const handleShift = (button) => {
    if (layoutName === "default" && button === "{shiftleft}")
      setLayoutName("shiftleft");
    if (layoutName === "shiftleft") setLayoutName("default");
  };

  const onKeyReleasedShift = (button) => {
    setLayoutName("default");
  };

  const handlesKeyboardColor = (greenChar, grayChar, yellowChar) => {
    //characters
    const greenUniqueChar = removesDuplicates(greenChar, greenKeys);
    const grayUniqueChar = removesDuplicates(grayChar, grayKeys);
    const yellowUniqueChar = removesDuplicates(yellowChar, yellowKeys);

    updateKeyboardColor();

    const newGreenArr = removesSpaces(greenUniqueChar);
    const newGrayArr = removesSpaces(grayUniqueChar);
    const newYellowArr = removesSpaces(yellowUniqueChar);
    setGrayKeys(newGrayArr.join(" "));
    setYellowKeys(newYellowArr.join(" "));
    setGreenKeys(newGreenArr.join(" "));
  };

  const updateKeyboardColor = () => {
    const correctArr = [...greenKeys];
    const presentArr = [...yellowKeys];
    let newArr = [];

    if (presentArr[0] !== " ") {
      correctArr.forEach((char, index) => {
        newArr = presentArr.filter((item) => item === char);
      });
    }

    setGreenKeys(correctArr.join(" "));
    setYellowKeys(newArr.join(" "));
  };

  return (
    <div className="game-container flex flex-col">
      <input
        value={input.toUpperCase()}
        onChange={onChangeInput}
        onKeyUp={(e) => (e.target.value = e.target.value.toUpperCase())}
        type="hidden"
      />

      <DisplayWordle
        input={input.toUpperCase()}
        userWord={userWord.toUpperCase()}
        numGuess={numGuess}
        wordOfDay={wordOfDay}
        hasWordExist={hasWordExist}
        pressEnter={pressEnter}
        prevEntries={prevEntries}
        prevNumGuess={prevNumGuess}
        prevColors={prevColors}
        positionChecked={positionChecked}
      />
      <div className="flex justify-center">
        <div className="m-3 p-3 w-2/4 bg-neutral-200 rounded-lg  ">
          <Keyboard
            keyboardRef={(r) => (keyboard.current = r)}
            layoutName={layoutName}
            layout={{
              shiftleft: [
                "Q W E R T Y U I O P",
                "{shiftleft} A S D F G H J K L",
                "{enter} Z X C V B N M {backspace}",
              ],
              default: [
                "q w e r t y u i o p",
                "{shiftleft} a s d f g h j k l",
                "{enter} z x c v b n m {backspace}",
              ],
            }}
            onChange={onChange}
            onKeyPress={onKeyPress}
            onKeyReleased={(button) => onKeyReleasedShift(button)}
            useEventListener={useEventListener}
            buttonTheme={[
              {
                class: "btn-green",
                buttons: `${greenKeys} {backspace}`,
              },
              {
                class: "btn-yellow",
                buttons: `${yellowKeys} {enter}`,
              },
              {
                class: "btn-gray",
                buttons: `${grayKeys} {shiftleft}`,
              },
            ]}
            physicalKeyboardHighlight={true}
            physicalKeyboardHighlightPress={true}
            physicalKeyboardHighlightBgColor={"#9AB4D0"}
            maxLength={5}
            disableButtonHold={true}
          />
        </div>
      </div>
      <div className="absolute top-10 right-20">
        <button
          className="border-solid border-2 border-black rounded-lg p-2 m-2 bg-"
          onClick={toggleShowModal}
        >
          Game Status
        </button>
      </div>
      {showModal ? (
        <GameStatsModal
          prevNumGuess={prevNumGuess}
          numLoses={numLoses}
          guessDistribution={guessDistribution}
        >
          <div className="absolute top-0 right-0">
            <button
              onClick={toggleShowModal}
              className="m-2 bg-red-500 rounded-full w-6 h-6 text-center text-white"
            >
              X
            </button>
          </div>
          <h1 className="text-5xl text-center m-3 pt-5 pb-5">Game Status</h1>
        </GameStatsModal>
      ) : null}
    </div>
  );
};

export default GameContainer;
