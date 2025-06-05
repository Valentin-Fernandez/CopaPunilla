import Button from '../../../components/Button.js';
import Modal from '../../../components/Modal.js';

const AjustesTorneo = ({ isOpen, onClose, openPlayoffs, activePlayoffs }) => {
    const openPlayoffsSelect = () => {
        onClose();
        openPlayoffs();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="flex flex-col items-center justify-center p-4 gap-6">
                <h2 className="text-xl text-primary">Ajustes</h2>
                {activePlayoffs ? (
                    <p className="font-semibold text-terciary">Los playoffs ya estan en curso!</p>
                ) : (
                    <Button label={'Activar Playoffs'} color={'bg-terciary'} textColor={'text-primary'} onClick={openPlayoffsSelect} />
                )}
            </div>
        </Modal>
    );
};

export default AjustesTorneo;
