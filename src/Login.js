import React from "react";

const Login = () => {
  const query = new URLSearchParams(window.location.search);

  const handleKakaoLogin = async () => {
    try {
      // 로그인 상태 확인
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/auth/me`, { withCredentials: true });
      if (response.data) {
        navigate("/lobby"); // 이미 로그인 상태라면 로비로 이동
        return;
      }
    } catch {
      // 로그인되지 않은 상태라면 로그인 진행
    }

    // 서버 로그인 URL로 리다이렉트
    window.location.href = `${process.env.REACT_APP_API_URL}/auth/kakao?redirect=${window.location.origin + (query.get("redirect") || "/")}`;
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
