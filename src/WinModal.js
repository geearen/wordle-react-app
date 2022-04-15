const WinModal = ({ children }) => {
  return (
    <div className="fixed inset-0 top-0 flex justify-center items-center bg-opacity-30 bg-black z-40">
      <div className="win-modal bg-white border-solid rounded-md border-2 border-red-400 relative h-40  w-96 flex justify-center items-center animate-bounce">
        {children}
      </div>
    </div>
  );
};

export default WinModal;
