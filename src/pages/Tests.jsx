import React from 'react';
import { Link } from 'react-router-dom';
import { quizzes } from '../data/quizzes.js';
import { Code, Atom, Layout, RefreshCcw, Server, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

const iconMap = {
  Code: Code,
  Atom: Atom,
  Layout: Layout,
  RefreshCcw: RefreshCcw,
  Server: Server,
};

export default function Tests() {
  return (
    <div className="tests-page">
      <div className="container">
        <div className="tests-header">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="tests-title"
          >
            Выберите свой тест
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="tests-subtitle"
          >
            Выберите тему, чтобы проверить свои навыки и узнать что-то новое.
          </motion.p>
        </div>

        <div className="tests-grid">
          {quizzes.map((quiz, index) => {
            const Icon = iconMap[quiz.icon];
            return (
              <motion.div
                key={quiz.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="quiz-card"
              >
                <div className="quiz-card-content">
                  <div className="quiz-icon-wrapper">
                    <Icon className="quiz-icon" />
                  </div>
                  <h3 className="quiz-title">{quiz.title}</h3>
                  <p className="quiz-description">{quiz.description}</p>
                  
                  <Link
                    to={`/quiz/${quiz.id}`}
                    className="quiz-start-btn"
                  >
                    Начать тест
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
