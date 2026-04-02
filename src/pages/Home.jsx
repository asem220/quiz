import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, Zap, Target, BookOpen } from 'lucide-react';
import { motion } from 'motion/react';
import DotBackground from '../components/DotBackground';

export default function Home() {
  const features = [
    { icon: Zap, title: 'Быстрое обучение', description: 'Динамичные тесты помогут вам учиться быстрее.' },
    { icon: Target, title: 'Отслеживание прогресса', description: 'Следите за своими результатами и улучшайте их.' },
    { icon: BookOpen, title: 'Разнообразные темы', description: 'От программирования до верстки — у нас есть всё.' },
  ];

  return (
    <main>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="text-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="hero-badge"
            >
              <Sparkles className="w-4 h-4" />
              Начните свое обучение прямо сейчас
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="hero-title"
            >
              Прокачайте навыки с <br />
              <span className="gradient-text">
                Интерактивными Тестами
              </span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="hero-description"
            >
              Бросьте себе вызов с нашей коллекцией тестов. 
              Идеально подходит для разработчиков, дизайнеров и всех, кто любит учиться.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="hero-actions"
            >
              <Link
                to="/tests"
                className="btn-primary"
              >
                Все тесты
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link to="/about" className="btn-secondary">
                Узнать больше
              </Link>
            </motion.div>
          </div>
        </div>
        
        <DotBackground />
      </section>

      <section className="features-section">
        <div className="container">
          <div className="features-grid">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="feature-card"
                >
                  <div className="feature-icon-wrapper">
                    <Icon className="feature-icon" />
                  </div>
                  <h3 className="feature-title">{feature.title}</h3>
                  <p className="feature-description">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
