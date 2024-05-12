import { useState } from 'react';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ModalCredentials({  }) {

    const [geminiKey, setGeminiKey] = useState('');
    const [inputValue, setInputValue] = useState('')
    const [showModal, setShowModal] = useState(true);

    const handleChange = (event) => {
        setInputValue(event.target.value);
    };

    function confirmarChanve() {        
        console.log(inputValue)
        setGeminiKey(inputValue);
        global?.window && window.localStorage.setItem("GEMINI_KEY", inputValue);
        setShowModal(false);
    }
    
    return (
        <>            
            <Modal show={showModal}>
                
                <Modal.Header closeButton>
                    <Modal.Title>Preenche a sua Chave da API do Gemini para jogar</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Chave Gemini</Form.Label>
                            
                            <Form.Control
                                type="text"
                                placeholder="XPOPSDOPDOSOPD"
                                autoFocus
                                required={true}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Form>
                    
                </Modal.Body>                

                <Modal.Footer>
                    <Button variant="secondary" onClick={confirmarChanve}>
                        Confirmar
                    </Button>                                        
                </Modal.Footer>

            </Modal>
        </>
    );
}

export default ModalCredentials;