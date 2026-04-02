import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import multer from "multer";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

// ИЗМЕНЕНИЕ 1: Динамический порт для Render
const PORT = process.env.PORT || 3000;

// ИЗМЕНЕНИЕ 2: Настройка CORS для работы запросов
app.use(cors());
app.use(express.json());

const uploadDir = path.join(__dirname, 'uploads');
fs.mkdirSync(uploadDir, { recursive: true });
app.use('/uploads', express.static(uploadDir));

const storage = multer.diskStorage({
  destination: uploadDir,
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const ext = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
  }
});

// Фильтр файлов: проверка типа и размера
const fileFilter = (req, file, cb) => {
  const allowedMimes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
  if (!allowedMimes.includes(file.mimetype)) {
    return cb(new Error('Допускаются только изображения (JPG, PNG, WebP, GIF)'));
  }
  cb(null, true);
};

const upload = multer({ 
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB макс
});

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/testify";
const JWT_SECRET = process.env.JWT_SECRET || "asem2026";

mongoose.connect(MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("MongoDB connection error:", err));

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatar: { type: String },
  scores: [{ 
    quizId: String, 
    score: Number, 
    totalQuestions: Number,
    date: { type: Date, default: Date.now } 
  }]
});

const User = mongoose.model("User", userSchema);

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Эндпоинт регистрации
app.post("/api/auth/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ error: "Все поля обязательны для заполнения" });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Пожалуйста, введите корректный email" });
    }
    if (password.length < 6) {
      return res.status(400).json({ error: "Пароль должен быть не менее 6 символов" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword });
    await user.save();
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "1d" });
    res.status(201).json({ token, username: user.username });
  } catch (error) {
    console.error("Registration error:", error);
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      res.status(400).json({ error: `${field === 'email' ? 'Email' : 'Username'} уже зарегистрирован` });
    } else {
      res.status(400).json({ error: "Ошибка регистрации. Попробуйте еще раз" });
    }
  }
});

// Эндпоинт входа
app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Email и пароль обязательны" });
    }
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: "Неверный email или пароль" });
    }
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "1d" });
    res.json({ token, username: user.username });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Ошибка при входе в систему" });
  }
});

// Эндпоинт получения профиля
app.get("/api/auth/profile", authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password");
    if (!user) return res.status(404).json({ error: "Пользователь не найден" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Ошибка при получении данных профиля" });
  }
});

// Эндпоинт загрузки аватара
app.post("/api/auth/upload-avatar", authenticateToken, upload.single('avatar'), async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) return res.status(404).json({ error: "Пользователь не найден" });
    if (req.file) {
      const avatarPath = `/uploads/${req.file.filename}`;
      const avatarUrl = `${req.protocol}://${req.get('host')}${avatarPath}`;
      user.avatar = avatarUrl;
      await user.save();
      res.json({ message: "Аватар успешно загружен", avatar: avatarUrl });
    } else {
      res.status(400).json({ error: "Файл не найден" });
    }
  } catch (error) {
    console.error("Upload avatar error:", error);
    if (error.message.includes('Допускаются только')) {
      res.status(400).json({ error: error.message });
    } else if (error.message.includes('File too large')) {
      res.status(400).json({ error: "Размер файла не должен превышать 5MB" });
    } else {
      res.status(500).json({ error: "Ошибка при загрузке аватара" });
    }
  }
});

// Эндпоинт сохранения результатов
app.post("/api/quiz/save", authenticateToken, async (req, res) => {
  try {
    const { quizId, score, totalQuestions } = req.body;
    if (!quizId || score === undefined || totalQuestions === undefined) {
      return res.status(400).json({ error: "Некорректные данные теста" });
    }
    const parsedScore = Number(score);
    const parsedTotal = Number(totalQuestions);
    if (Number.isNaN(parsedScore) || Number.isNaN(parsedTotal) || parsedTotal <= 0) {
      return res.status(400).json({ error: "Некорректные числовые значения" });
    }
    const user = await User.findById(req.user.userId);
    if (!user) return res.status(404).json({ error: "Пользователь не найден" });

    const existing = user.scores.find((item) => item.quizId === quizId);
    if (existing) {
      if (parsedScore > existing.score) {
        existing.score = parsedScore;
        existing.totalQuestions = parsedTotal;
        existing.date = new Date();
      }
    } else {
      user.scores.push({ quizId, score: parsedScore, totalQuestions: parsedTotal, date: new Date() });
    }
    await user.save();
    return res.status(200).json({ message: "Результат успешно сохранен" });
  } catch (error) {
    console.error("Save result error:", error);
    res.status(500).json({ error: "Ошибка при сохранении результата" });
  }
});

// ИЗМЕНЕНИЕ 3: Исправлен запуск для продакшена (Render)
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // В продакшене отдаем статику из dist
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();