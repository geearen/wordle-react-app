/// <reference types="cypress" />

describe("Wordle App test suite", () => {
  beforeEach("Open Application", () => {
    cy.openWordleApp();
  });

  it("Check Wordle has empty tiles", () => {
    cy.get(".empty-waffle")
      .find(".empty-tile")
      .then((tile) => {
        cy.wrap(tile).should("have.length", 30).and("be.empty");
      });
  });

  it("Game Stats Test", () => {
    cy.contains("Game Status").click();
    cy.get(".game-stats-modal").find("button").click();
  });

  it("entered word DO exist", () => {
    const guessWord: string[] = ["F", "A", "R", "A", "D"];
    guessWord.forEach((letter, index) => {
      cy.get(".hg-row")
        .find(`[data-skbtn=${letter}]`)
        .find("span")
        .click({ force: true });

      cy.get(".current-row")
        .find(`[data-cy="${letter}-${index}"]`)
        .should("contain", `${letter}`);
      cy.get(".hg-row").find(".hg-button-enter").click({ force: true });
    });
    cy.get(".word-check").find("h1").should("contain", "Guess");
  });

  it("entered word DOESNT exist", () => {
    const guessWord: string[] = ["B", "O", "R", "E", "D"];
    guessWord.forEach((letter, index) => {
      cy.get(".hg-row")
        .find(`[data-skbtn=${letter}]`)
        .find("span")
        .click({ force: true });

      cy.get(".current-row")
        .find(`[data-cy="${letter}-${index}"]`)
        .should("contain", `${letter}`);
      cy.get(".hg-row").find(".hg-button-enter").click({ force: true });
    });
    cy.get(".word-check")
      .find("h1")
      .then((h1) => {
        cy.wrap(h1).should("contain", "Not in Word List");
        for (let i = 0; i < guessWord.length; i++) {
          cy.get(".hg-row").find(".hg-button-backspace").click();
        }
      });
  });

  it("plays the game and guess the word of the day", () => {
    const guessWord: string[][] = [
      ["R", "E", "A", "C", "H"],
      ["E", "D", "I", "C", "T"],
      ["A", "D", "I", "O", "S"],
      ["A", "D", "I", "E", "U"],
    ];

    guessWord.forEach((word) => {
      word.forEach((letter, index) => {
        cy.get(".hg-row")
          .find(`[data-skbtn=${letter}]`)
          .find("span")
          .click({ force: true });

        cy.get(".current-row")
          .find(`[data-cy="${letter}-${index}"]`)
          .should("contain", `${letter}`);
      });
      cy.get(".hg-row").find(".hg-button-enter").click({ force: true });
    });

    // cy.get(".win-modal").find("h1").should("contains", "Nicely Done!");
  });

  it("plays the game and inputed six guesses", () => {
    const guessWord: string[][] = [
      ["H", "E", "A", "R", "D"],
      ["W", "H", "E", "R", "E"],
      ["T", "H", "E", "R", "E"],
      ["Y", "I", "E", "L", "D"],
      ["S", "K", "A", "T", "E"],
      ["S", "T", "E", "A", "D"],
    ];

    guessWord.forEach((word) => {
      word.forEach((letter, index) => {
        cy.get(".hg-row")
          .find(`[data-skbtn=${letter}]`)
          .find("span")
          .click({ force: true });

        cy.get(".current-row")
          .find(`[data-cy="${letter}-${index}"]`)
          .should("contain", `${letter}`);
        cy.get(".hg-row").find(".hg-button-enter").click({ force: true });
      });
    });
  });

  it("Wordle Test Game with an word is not on the list", () => {
    const guessWord: string[][] = [
      ["H", "E", "A", "R", "D"],
      ["W", "H", "E", "R", "E"],
      ["B", "O", "R", "E", "D"],
      ["T", "H", "E", "R", "E"],
      ["B", "E", "A", "T", "S"],
      ["Y", "I", "E", "L", "D"],
      ["S", "K", "A", "T", "E"],
      ["S", "T", "E", "A", "D"],
    ];

    guessWord.forEach((word, index) => {
      word.forEach((letter, index) => {
        cy.get(".hg-row")
          .find(`[data-skbtn=${letter}]`)
          .find("span")
          .click({ force: true });

        cy.get(".current-row")
          .find(`[data-cy="${letter}-${index}"]`)
          .should("contain", `${letter}`);
      });
      cy.get(".hg-row").find(".hg-button-enter").click({ force: true });
      cy.get(".word-check")
        .find("h1")
        .then(($h1) => {
          // const checkWord = message.find("h1").text();
          // expect(checkWord).to.equal("Guess");

          if ($h1.text().trim() === "Not in Word List") {
            // expect($h1).to.have.text(" Not in Word List");
            cy.wrap($h1).should("contain", "Not in Word List");

            for (let i = 0; i <= 5; i++) {
              cy.get(".hg-row").find(".hg-button-backspace").click();
            }
          } else {
            cy.wrap($h1).should("contain", "Guess");
          }
        });
    });
  });
});
