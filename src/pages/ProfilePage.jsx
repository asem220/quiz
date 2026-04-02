import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { User, Award, Clock, LogOut, ClipboardList, Calendar } from 'lucide-react';

export default function ProfilePage() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [longPressActive, setLongPressActive] = useState(false);
  const [longPressTimer, setLongPressTimer] = useState(null);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const response = await fetch('/api/auth/profile', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          setUserData(data);
        } else {
          const errorData = await response.json().catch(() => ({ error: 'Неизвестная ошибка' }));
          setError(errorData.error || `Ошибка сервера: ${response.status}`);
          localStorage.removeItem('token');
          localStorage.removeItem('username');
          navigate('/login');
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
        setError('Ошибка сети. Проверьте соединение и попробуйте еще раз.');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  const bestScores = React.useMemo(() => {
    if (!userData?.scores || userData.scores.length === 0) return [];

    const bestByQuiz = new Map();
    userData.scores.forEach((item) => {
      const existing = bestByQuiz.get(item.quizId);
      if (!existing || item.score > existing.score) {
        bestByQuiz.set(item.quizId, { ...item });
      }
    });

    return Array.from(bestByQuiz.values()).sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [userData]);

  const totalQuizzes = bestScores.length;
  const averageScore = totalQuizzes > 0
    ? Math.round(bestScores.reduce((acc, curr) => acc + (curr.score / curr.totalQuestions) * 100, 0) / totalQuizzes)
    : 0;

  const getStatus = (score) => {
    if (score >= 90) return "Мастер";
    if (score >= 70) return "Профи";
    if (score >= 50) return "Студент";
    return "Новичок";
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    navigate('/login');
  };

  const openFilePicker = () => {
    if (!uploading && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleLongPressStart = () => {
    if (uploading) return;

    const timer = setTimeout(() => {
      setLongPressActive(true);
      setIsPreviewOpen(true);
    }, 700); // 700ms long press threshold

    setLongPressTimer(timer);
  };

  const clearLongPress = () => {
    if (longPressTimer) {
      clearTimeout(longPressTimer);
      setLongPressTimer(null);
    }
  };

  const handleAvatarClick = () => {
    if (longPressActive) {
      setLongPressActive(false);
      return;
    }
    openFilePicker();
  };

  const handleAvatarUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Проверка размера файла
    if (file.size > 5 * 1024 * 1024) {
      setError("Файл слишком большой (максимум 5MB)");
      return;
    }

    // Проверка типа файла
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      setError("Допускаются только изображения (JPG, PNG, WebP, GIF)");
      return;
    }

    setUploading(true);
    setError(null);
    const token = localStorage.getItem('token');
    const formData = new FormData();
    formData.append('avatar', file);

    try {
      const response = await fetch('/api/auth/upload-avatar', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      if (response.ok) {
        const data = await response.json();
        setUserData(prev => ({ ...prev, avatar: data.avatar }));
        setError(null);
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Ошибка при загрузке аватара');
      }
    } catch (err) {
      console.error('Error uploading avatar:', err);
      setError('Ошибка сети. Проверьте соединение и попробуйте еще раз');
    } finally {
      setUploading(false);
    }
  };

  if (loading) {
    return (
      <div className="profile-page">
        <div className="container text-center">
          <p>Загрузка профиля...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="profile-page">
        <div className="container text-center">
          <div className="error-message" style={{ marginBottom: '2rem' }}>
            {error}
          </div>
          <button onClick={() => window.location.reload()} className="btn-primary">
            Попробовать снова
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <div className="container">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="profile-card"
        >
          {/* Header Section */}
          <div className="profile-header">
            <div className="profile-logout-container">
              <button 
                onClick={handleLogout}
                className="btn-logout"
              >
                <LogOut className="w-4 h-4" />
                Выйти
              </button>
            </div>
            
            <div
              className="profile-avatar-wrapper"
              onClick={handleAvatarClick}
              onMouseDown={handleLongPressStart}
              onMouseUp={clearLongPress}
              onMouseLeave={clearLongPress}
              onTouchStart={handleLongPressStart}
              onTouchEnd={() => {
                clearLongPress();
                if (!longPressActive) openFilePicker();
                setLongPressActive(false);
              }}
              title="Кликните для изменения; долгое нажатие чтобы просмотреть"
            >
              {userData?.avatar ? (
                <img
                  src={userData.avatar.startsWith('http') ? userData.avatar : `${window.location.origin}${userData.avatar}`}
                  alt="Avatar"
                  className="profile-avatar-img"
                />
              ) : (
                <User className="profile-avatar-icon" />
              )}
              {uploading && <div className="uploading-overlay">Загрузка...</div>}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleAvatarUpload}
              style={{ display: 'none' }}
              disabled={uploading}
            />
            <h2 className="profile-username">{userData?.username}</h2>
            <p className="profile-status-text">Личный кабинет QuizMaster</p>
            {error && <div className="avatar-error-message">{error}</div>}

            {isPreviewOpen && userData?.avatar && (
              <div className="avatar-preview-overlay" onClick={() => setIsPreviewOpen(false)}>
                <div className="avatar-preview-modal" onClick={(event) => event.stopPropagation()}>
                  <button className="avatar-preview-close" onClick={() => setIsPreviewOpen(false)}>
                    Закрыть
                  </button>
                  <img
                    src={userData.avatar.startsWith('http') ? userData.avatar : `${window.location.origin}${userData.avatar}`}
                    alt="Предварительный просмотр аватара"
                    className="avatar-preview-image"
                  />
                </div>
              </div>
            )}
          </div>

          <div className="profile-content">
            <div className="profile-stats-grid">
              <div className="stat-card">
                <Clock className="stat-icon" />
                <div className="stat-value">{totalQuizzes}</div>
                <div className="stat-label">Тестов пройдено</div>
              </div>
              <div className="stat-card">
                <Award className="stat-icon" />
                <div className="stat-value">{averageScore}%</div>
                <div className="stat-label">Средний балл</div>
              </div>
              <div className="stat-card">
                <User className="stat-icon" />
                <div className="stat-value">{getStatus(averageScore)}</div>
                <div className="stat-label">Ваш статус</div>
              </div>
            </div>

            {/* History Section */}
            <div className="profile-history">
              <h3 className="history-title">История тестов</h3>
              {totalQuizzes > 0 ? (
                <div className="history-list">
                  {bestScores.map((item, index) => (
                    <div key={`${item.quizId}-${index}`} className="history-item">
                      <div className="history-info">
                        <div className="history-quiz-name">{item.quizId}</div>
                        <div className="history-date">
                          <Calendar className="w-3 h-3 inline mr-1" />
                          {new Date(item.date).toLocaleDateString()}
                        </div>
                      </div>
                      <div className="history-score">
                        {item.score} / {item.totalQuestions} ({Math.round((item.score / item.totalQuestions) * 100)}%)
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="profile-empty-state">
                  <ClipboardList className="empty-state-icon" />
                  <h3 className="empty-state-title">История тестов пуста</h3>
                  <p className="empty-state-description">Пройдите свой первый тест, чтобы увидеть результаты здесь!</p>
                  <button 
                    onClick={() => navigate('/tests')}
                    className="btn-primary"
                  >
                    Начать обучение
                  </button>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
