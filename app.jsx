import React, { useState } from 'react';
import questions from './questions.json';
import './styles.css';

function App() {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [finished, setFinished] = useState(false);

  const question = questions[current];

  const handleAnswer = (value) => {
    setSelected(value);
    setShowFeedback(true);
    if (value === question.correct) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    setSelected(null);
    setShowFeedback(false);
    if (current + 1 < questions.length) {
      setCurrent(current + 1);
    } else {
      setFinished(true);
    }
  };

  return (
    <div className="container">
      <h1>Simulado ABT1 de Câmbio</h1>
      {finished ? (
        <div className="result">
          <h2>Resultado final</h2>
          <p>Você acertou {score} de {questions.length} questões.</p>
        </div>
      ) : (
        <div className="quiz">
          <h2>{question.text}</h2>
          <ul>
            {question.options.map((opt) => (
              <li key={opt.value}>
                <button
                  className={selected === opt.value ? 'selected' : ''}
                  onClick={() => handleAnswer(opt.value)}
                  disabled={showFeedback}
                >
                  {opt.label}
                </button>
              </li>
            ))}
          </ul>
          {showFeedback && (
            <div className="feedback">
              <p>
                {selected === question.correct
                  ? '✅ Resposta correta!'
                  : `❌ Resposta incorreta. ${question.feedback}`}
              </p>
              <button onClick={nextQuestion}>Próxima</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
