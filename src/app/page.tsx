'use client';

import Image from "next/image";
import styles from "./page.module.css";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { runChat } from "./services/gemini";
import { Button } from "react-bootstrap";
import { useState } from "react";
import MySpinner from "./components/Spinner";
import Question from "./components/Pergunta";
import ModalShowAnswer from "./components/Modal";
import ModalFinishQuestion from "./components/ModalFinishQuestion";
import ModalCredentials from "./components/ModalCredencial";


export default function Home() {
  
  const [loading, setLoading] = useState(false);
  
  const [finish, setFinish] = useState(false);
  
  const [acertos, setAcertos] = useState(0);

  const [rounds, setRounds] = useState(0);

  const [dontHaveQuestion, setdontHaveQuestion] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [question, setQuestion] = useState({
    pergunta: null,
    alternativaCorreta: null,
    justificativa: '',
    index: null,
    alternativas: []
  });

  const [answer, setAnswer] = useState({
    result: '',
    justification: '',    
  });

  async function gerarPergunta() {
    let typeQuestions = ["acentuação", "vírgula", 'crase', 'classe gramatical'];

    let randomIndex = Math.floor(Math.random() * typeQuestions.length)
    
    setFinish(false);
    setLoading(true);
    
    const text = await runChat(typeQuestions[randomIndex])
    setRounds(rounds + 1);

    setQuestion(text);
    
    setLoading(false);
    setdontHaveQuestion(false);
  }

  function checkAnswer(label, index) {
    console.log(label, index);

    let isCorrect = question.index == index ? "Parabéns, você acertou!" : "Você errou!";

    if (question.index == index) {
      setAcertos(acertos+1);
    }

    setAnswer({
      result: isCorrect,
      justification: question.justificativa
    })
        
    setShowModal(true);
    console.log(isCorrect);
  }

  function nextQuestion() {
    setShowModal(false);
    gerarPergunta();
  }

  function finishQuiz() {
    setShowModal(false)
    setFinish(true);
    setdontHaveQuestion(true);
    setRounds(0);
  }

  
  return (
    <main className={styles.main}>
      <Container>
        <Row>
          <Col md={12}>
            <h1 className="display-3 text-white">Gramatize</h1>
            <p className="text-white display-6">Pratique seu conhecimento de gramática com o Gemini</p>

            {
              dontHaveQuestion
              && <Button variant="outline-success" size="lg" onClick={() => gerarPergunta()}>
              Gerar pergunta
            </Button>}

            {
              !dontHaveQuestion
              && <h3 className="display-6 text-white"> {acertos} acertos!</h3>
            }
          </Col>
        </Row>
        
        <Row className="mt-3">
          {question.pergunta !== null && !dontHaveQuestion
            &&
            <Question myQuestion={question} check={checkAnswer} round={rounds} />
          }
        </Row>

        <Row>
          <MySpinner loading={loading} />
          
          <ModalShowAnswer showModal={showModal} changeModal={setShowModal} answer={answer} nextQuestion={nextQuestion} finishQuiz={finishQuiz} />
          
          {finish && <ModalFinishQuestion acertos={acertos} />}

          <ModalCredentials />

        </Row>
      </Container>

    </main>
  );
}
