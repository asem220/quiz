import React from 'react';
import { motion } from 'motion/react';
import { Info, HelpCircle, ShieldCheck } from 'lucide-react';

export default function About() {
  return (
    <div className="about-page">
      <div className="container">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="about-card"
        >
          <div className="about-header">
            <div className="about-icon-wrapper">
              <Info className="about-icon" />
            </div>
            <h1 className="about-title">О QuizMaster</h1>
          </div>
          
          <div className="about-content">
            <p className="about-text">
              QuizMaster — это ведущая платформа для интерактивного обучения. Мы верим, что проверка знаний — самый эффективный способ освоения новых навыков.
            </p>
            
            <div className="about-grid">
              <div className="about-feature-card yellow">
                <HelpCircle className="about-feature-icon" />
                <h3 className="about-feature-title">Интерактивные тесты</h3>
                <p className="about-feature-description">Обратная связь в реальном времени и подробные результаты для каждого теста.</p>
              </div>
              <div className="about-feature-card purple">
                <ShieldCheck className="about-feature-icon" />
                <h3 className="about-feature-title">Проверенный контент</h3>
                <p className="about-feature-description">Наши вопросы курируются экспертами в соответствующих областях.</p>
              </div>
            </div>
            
            <p className="about-text">
              Готовитесь ли вы к собеседованию или просто интересуетесь новой темой, QuizMaster предоставляет инструменты, необходимые для успеха.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
