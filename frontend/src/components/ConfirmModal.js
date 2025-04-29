import Modal from './Modal.js';

const ConfirmModal = ({ isOpen, onClose, onConfirm, message, onSuccess }) => {
    const handleConfirm = () => {
        onConfirm();
        onSuccess();
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="flex flex-col p-2 justify-center items-center">
                <p className="text-primary text-lg text-center">{message}</p>
                <div className="flex justify-center items-center mt-4">
                    <button className="bg-secundaryDark text-primary p-2 rounded-md mr-2" onClick={handleConfirm}>
                        Confirmar
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export default ConfirmModal;
