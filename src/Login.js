import React from "react";

const Login = () => {
  const query = new URLSearchParams(window.location.search);

  const handleKakaoLogin = () => {
    // 서버 로그인 URL로 리다이렉트
    window.location.href = `http://localhost:5000/auth/kakao?redirect=${
      window.location.origin + (query.get("redirect") || "/")
    }`;
  };

  return (
      <div className="login-container">
        <h2>Login</h2>
        {/* Kakao Login */}
        <button onClick={handleKakaoLogin}>Login with Kakao</button>
      </div>
  );
};

export default Login;
