/**
 * @jest-environment jsdom
 */

import { expect, test } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import CurrentRow from "../CurrentRow";
import EnteredRow from "../EnteredRow";

test("renders the first row of word", async () => {
  // const container = document.createElement("div");

  const word = ["S", "M", "A", "L", "L"];
  const shakeAnimate = false;
  render(<CurrentRow word={word} shakeAnimate={shakeAnimate} />);

  // word.forEach(async (char) => {
  // });

  for (const [index, char] of word.entries()) {
    const tile = await screen.findByTestId(`${char}-${index}`);
    expect(tile.textContent).toMatch(char);
  }
});

test("render the all entered row of words", async () => {
  const currentWord = [
    ["S", "M", "A", "L", "L"],
    ["H", "E", "L", "L", "O"],
    ["S", "T", "A", "L", "L"],
    ["G", "O", "O", "S", "E"],
    ["P", "E", "T", "A", "L"],
    ["G", "R", "E", "A", "T"],
  ];

  render(<EnteredRow currentWord={currentWord} colorSpot={[]} />);

  // currentWord.forEach((wordRow) => {
  //   wordRow.forEach(async (char) => {
  //     const tile = await screen.findByTestId(char);
  //     expect( tile.textContent).toMatch(char);
  //   });
  // });

  for (let i; i < currentWord.length; i++) {
    let wordRow = currentWord[i];
    for (let j; j < wordRow.length; j++) {
      const char = wordRow[j];
      const tile = await screen.findAllByTestId(char);
      expect(tile.textContent).toMatch(char);
    }
  }
});
