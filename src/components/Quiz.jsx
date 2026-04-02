import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { quizzes } from '../data/quizzes.js';
import { CheckCircle2, XCircle, ArrowLeft, ArrowRight, RotateCcw, Trophy } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Quiz() {
  const { id } = useParams();
  const navigate = useNavigate();
  const quiz = quizzes.find((q) => q.id === id);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [finalScore, setFinalScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [isAnswered, setIsAnswered] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState(null);

  if (!quiz) {
    return (
      <div className="quiz-page">
        <div className="text-center">
          <h2 className="results-title">Тест не найден</h2>
          <button
            onClick={() => navigate('/tests')}
            className="btn-secondary mt-4"
          >
            Назад к тестам
          </button>
        </div>
      </div>
    );
  }

  const handleOptionSelect = (index) => {
    if (isAnswered) return;
    setSelectedOption(index);
    setIsAnswered(true);
    if (index === quiz.questions[currentQuestion].answer) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = async () => {
    if (currentQuestion + 1 < quiz.questions.length) {
      setCurrentQuestion((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      // Последний вопрос - сохранить результаты
      const token = localStorage.getItem('token');
      const scoreToSave = score;
      setFinalScore(scoreToSave);
      if (token) {
        setSaving(true);
        setSaveError(null);
        try {
          const response = await fetch('/api/quiz/save', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
              quizId: quiz.title,
              score: scoreToSave,
              totalQuestions: quiz.questions.length
            })
          });

          if (!response.ok) {
            const error = await response.json();
            setSaveError(error.error || 'Ошибка при сохранении результата');
          }
        } catch (error) {
          console.error("Failed to save quiz result:", error);
          setSaveError('Ошибка сети при сохранении результата. Результат может не быть сохранен.');
        } finally {
          setSaving(false);
        }
      }
      setShowResults(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedOption(null);
    setScore(0);
    setShowResults(false);
    setIsAnswered(false);
  };

  if (showResults) {
    const percentage = Math.round((finalScore / quiz.questions.length) * 100);
    return (
      <div className="quiz-page">
        <div className="container">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="results-card"
          >
            <div className="results-icon-wrapper">
              <Trophy className="results-icon" style={{ width: '3rem', height: '3rem', color: 'var(--color-purple)' }} />
            </div>
            <h2 className="results-title">Тест завершен!</h2>
            <p className="results-subtitle">Вы завершили тест "{quiz.title}".</p>
            
            {saving && <p style={{ textAlign: 'center', color: 'var(--color-purple)', marginBottom: '1rem' }}>Сохранение результата...</p>}
            {saveError && <div style={{ background: 'rgba(255, 107, 107, 0.1)', border: '1px solid rgba(255, 107, 107, 0.3)', borderRadius: '0.5rem', padding: '0.75rem', marginBottom: '1rem', color: '#ff6b6b', textAlign: 'center', fontSize: '0.875rem' }}>{saveError}</div>}
            
            <div className="results-score-big">
              {percentage}%
            </div>
            
            <p className="results-text mb-8">
              Правильных ответов: <strong>{finalScore}</strong> из <strong>{quiz.questions.length}</strong>
            </p>

            <div className="results-actions" style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
              <button onClick={handleRestart} className="btn-secondary" disabled={saving}>
                <RotateCcw className="w-4 h-4" />
                Заново
              </button>
              <button onClick={() => navigate('/tests')} className="btn-primary" disabled={saving}>
                К списку тестов
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  const currentQ = quiz.questions[currentQuestion];

  return (
    <div className="quiz-page">
      <div className="quiz-container">
        <div className="quiz-nav" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem', alignItems: 'center' }}>
          <button onClick={() => navigate('/tests')} className="btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}>
            <ArrowLeft className="w-4 h-4" />
            Выйти
          </button>
          <div className="quiz-progress" style={{ fontWeight: 800, color: 'var(--color-gray-500)' }}>
            Вопрос {currentQuestion + 1} из {quiz.questions.length}
          </div>
        </div>

        <motion.div 
          key={currentQuestion}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="quiz-card"
        >
          <h3 className="quiz-question">{currentQ.question}</h3>
          
          <div className="options-list">
            {currentQ.options.map((option, index) => {
              const isCorrect = index === currentQ.answer;
              const isSelected = index === selectedOption;
              
              let buttonClass = "option-btn ";
              if (isAnswered) {
                if (isCorrect) buttonClass += "correct";
                else if (isSelected) buttonClass += "incorrect";
              }

              return (
                <button
                  key={index}
                  onClick={() => handleOptionSelect(index)}
                  disabled={isAnswered}
                  className={buttonClass}
                >
                  <span>{option}</span>
                  {isAnswered && isCorrect && <CheckCircle2 className="w-6 h-6" />}
                  {isAnswered && isSelected && !isCorrect && <XCircle className="w-6 h-6" />}
                </button>
              );
            })}
          </div>

          <AnimatePresence>
            {isAnswered && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ marginTop: '2.5rem', display: 'flex', justifyContent: 'flex-end' }}
              >
                <button onClick={handleNext} className="btn-primary">
                  {currentQuestion + 1 === quiz.questions.length ? 'Посмотреть результат' : 'Дальше'}
                  <ArrowRight className="w-5 h-5" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}