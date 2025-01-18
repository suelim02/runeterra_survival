import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./Login";
import Lobby from "./Lobby"
import { authStore } from "./store/AuthStore";
import { getMe } from "./apis/auth";

const App = () => {
  const { user, setUser, loggedIn } = authStore(); // 사용자 상태 관리
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    // 사용자 정보 초기화
    if (!initialized) {
      getMe()
        .then((data) => {
          setUser(data); // 사용자 정보 설정
          setInitialized(true);
          console.log("User Info:", data);
        })
        .catch(() => {
          setInitialized(true); // 초기화 완료
        });
    }
  }, [initialized, setUser]);

  if (!initialized) return null; // 초기화 전 렌더링 방지

  return (
    <Router>
      <Routes>
        {/* 로그인 화면 */}
        <Route
          path="/login"
          element={loggedIn ? <Navigate to="/" replace /> : <Login />}
        />
        {/*Lobby 화면*/}
        <Route
            path = "/lobby"
            element={loggedIn ? <Lobby /> : <Navigate to="/login" replace/>}
        />
        {/* 기본 경로는 로그인 화면으로 */}
        <Route 
            path="/" 
            element={<Navigate to={loggedIn ? "/lobby" : "/login"} replace />}
         />
      </Routes>
    </Router>
  );
};

export default App;
