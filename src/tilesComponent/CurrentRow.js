const CurrentRow = ({ shakeAnimate, word }) => {
  return (
    <div
      className={`user-input row flex justify-start current-row ${
        shakeAnimate ? "animate-shake" : "animate-none"
      }`}
    >
      {word.map((char, index) => (
        <p
          data-testid={`${char}-${index}`}
          data-cy={`${char}-${index}`}
          key={index}
          className="entered-tile border-2 border-solid border-black w-14 h-14 md:w-20 md:h-20 md:p-5 p-3 m-1 text-center md:text-4xl z-10"
        >
          {char}
        </p>
      ))}
    </div>
  );
};

export default CurrentRow;
