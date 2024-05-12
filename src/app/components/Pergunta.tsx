import { Button, Col, Row } from "react-bootstrap";

interface QuestionInterace {
    pergunta: string;
}

export default function Question({ myQuestion, check, round }) {
    return (
        <>
            <Row>
                <Col md={12} className="text-white">
                    <h3>{round} - {myQuestion.pergunta}</h3>
                </Col>
            </Row>          
            
            {
                myQuestion.alternativas.map((e, index) => {
                    return <Row key={index} className="d-flex align-items-center">
                        <Col md={1} className="text-white"  style={{
                            padding: '5px',   
                            textAlign: 'center'
                        }}>
                            <Button variant="outline-light" size="sm" onClick={() => check(e.label, index)}>
                                {e.label}
                            </Button>
                        </Col>
                        
                        <Col md={3} className="text-white" style={{
                            borderBottom: '1px solid white',
                            padding: '5px',
                            textAlign: 'left'
                        }}>{e.opcao}</Col>
                    </Row>
                })
            }
            
        </>
    )
}