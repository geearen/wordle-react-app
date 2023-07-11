const EnteredRow = ({ currentWord, colorSpot }) => {
  return (
    <div className="entered-row flex flex-col ">
      {currentWord.map((row, rowIndex) => (
        <div
          key={`${rowIndex}-row`}
          data-cy={`${rowIndex}st-word`}
          className="flex"
        >
          {row.map((wordChar, index) => (
            <p
              // style={{ background: colorSpot[rowIndex] }}
              data-testid={wordChar}
              key={index}
              className={`${
                colorSpot[rowIndex] !== undefined
                  ? `${colorSpot[rowIndex][index]}`
                  : ""
              } border-2 border-solid border-black w-14 h-14 md:w-20 md:h-20 m-1 p-3 text-center md:p-5 md:text-4xl z-10 animate-flip`}
            >
              {wordChar}
            </p>
          ))}
        </div>
      ))}
    </div>
  );
};

export default EnteredRow;
