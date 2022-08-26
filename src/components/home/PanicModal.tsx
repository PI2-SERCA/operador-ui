import '../styling/modalStyle.css';

import Modal from 'react-modal';
import {useState} from 'react';

Modal.setAppElement('#root');
const modalInformation = {
    description: 'Erro no servidor',
    title: 'Oooops :-(',
};

export const PanicModal = () => {
    const [modalIsOpen, setIsOpen] = useState(true);// Deixa a modal aberta por padrão
    const closeModal = () => { setIsOpen(false); };
    const oṕenModal = () => { setIsOpen(true); };
    const {title, description} = modalInformation;

    return (
        <div className='modalContainer'>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel={title}
                overlayClassName='modal-overlay'
                className='modal-content'
            >
                    <h2>{title}</h2>
                    <hr />
                    <p>{description}</p>
                    <div className='acao'>
                        <button className='restart' type='button'>Restart</button>
                        <button className='panic' type='button'>PANIC</button>
                    </div>
            </Modal>
        </div>
    );
};
