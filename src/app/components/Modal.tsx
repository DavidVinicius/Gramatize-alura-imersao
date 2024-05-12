import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ModalShowAnswer({ showModal, changeModal, answer, nextQuestion, finishQuiz }) {
    

    const handleClose = () => changeModal(false);
    const handleShow = () => changeModal(true);

    return (
        <>            
            <Modal show={showModal} onHide={finishQuiz}>
                
                <Modal.Header closeButton>
                    <Modal.Title>{answer.result}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    {answer.justification}
                </Modal.Body>                

                <Modal.Footer>
                    <Button variant="secondary" onClick={finishQuiz}>
                        Encerrar
                    </Button>
                    
                    <Button variant="primary" onClick={nextQuestion}>
                        Próxima pergunta
                    </Button>

                </Modal.Footer>

            </Modal>
        </>
    );
}

export default ModalShowAnswer;