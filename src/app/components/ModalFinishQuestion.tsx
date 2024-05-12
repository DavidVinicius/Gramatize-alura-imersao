import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ModalFinishQuestion({acertos}) {
    
    return (
        <>            
            <Modal show={true}>
                
                <Modal.Header>
                    <Modal.Title>Fim de jogo!</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    Parabéns! Você teve um total de {acertos}
                </Modal.Body>                                

            </Modal>
        </>
    );
}

export default ModalFinishQuestion;