import { Col, Container, Row } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';

function MySpinner({loading}) {
    return (
        loading &&
        <Container style={{
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 1000,
            width: '100vw',
            height: '100vh',
            position: 'fixed',
            top: 0,
            left: 0
        }}>
            <Container fluid className="vh-100 d-flex align-items-center justify-content-center">
                <Row>
                    <Col xs md lg={12}>
                        <Spinner animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                    </Col>
                </Row>    
            </Container>
        </Container>                
    );
}

export default MySpinner;