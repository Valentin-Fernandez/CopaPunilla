const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-secundary p-6 rounded-lg shadow-lg mx-8 relative">
                <button onClick={onClose} className="absolute top-2 right-2 text-terciary text-lg font-bold">
                    ✖
                </button>
                {children}
            </div>
        </div>
    );
};

export default Modal;
