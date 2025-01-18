require("dotenv").config();
const express = require("express");
const cookieSession = require("cookie-session");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth");
const corsMiddleware = require("./middleware/cors.middleware");
const User = require("./models/User");

const app = express();

connectDB();

// 미들웨어 설정
app.use(corsMiddleware);
app.use(express.json());
app.use(cookieParser());
app.use(
  cookieSession({
    name: "session",
    keys: ["secretKey"],
    maxAge: 24 * 60 * 60 * 1000,
  })
);

// 라우트 설정
app.use("/auth", authRoutes);

// 기본 라우트 추가
// app.get('/', (req, res) => {
//     res.send('Hello, World! This is the home page.');
// });
// 기본 라우트 추가
app.get("/", async (req, res) => {
    // MongoDB 테스트: User 컬렉션에 새 사용자 추가
    try {
      const newUser = new User({
        social_id: "12345",
        nickname: "TestUser",
        email: "test@example.com",
      });
      await newUser.save(); // 데이터베이스에 저장
      res.send("Hello, World! New user added.");
    } catch (err) {
      console.error(err);
      res.status(500).send("An error occurred.");
    }
  });
  app.get('/api/message', (req, res) => {
    res.json({ message: 'Welcome to Runeterra Survival!' });
  });
  

// 서버 실행
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});