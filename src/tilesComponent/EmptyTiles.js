const EmptyTiles = () => {
  const emptyRow = new Array(5).fill("");
  const emptyTile = new Array(6).fill(emptyRow); // the waffle
  return (
    <div className="empty-waffle flex flex-col absolute">
      {emptyTile.map((row, rowIndex) => (
        <div key={`${rowIndex}-row`} className="row flex">
          {row.map((tile, index) => (
            <div
              key={`${index}-empty`}
              className="empty-tile border-2 border-solid border-slate-400 w-14 h-14 md:w-20 md:h-20 md:p-5 p-3 m-1"
            >
              {tile}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default EmptyTiles;
