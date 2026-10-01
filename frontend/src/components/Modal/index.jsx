const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex  items-center justify-center bg-black/50">
      <div className="flex flex-col justify-between  bg-white rounded-2xl shadow-lg w-full max-w-md p-6 h-[500px] overflow-y-scroll">
        <p className="text-[18px]">{children}</p>
        <div className="text-center">
          <button
            onClick={onClose}
            className="px-8 py-2 mt-2 border-1 bg-blue-400 text-white"
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
