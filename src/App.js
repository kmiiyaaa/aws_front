import "./App.css";
import { useState } from "react";
import api from "./axiosConfig.js";

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  //회원 가입
  const signUp = async (e) => {
    //e.preventDefault();

    try {
      await api.post(
        "/api/auth/signup",
        new URLSearchParams({ username, password })
      );
    } catch (err) {
      console.error();
      alert("회원가입 실패");
    }

    // try {
    //   await api.post(
    //     "/api/auth/signup",
    //     new URLSearchParams({ username, password })
    //     //파라미터 넘기기
    //   );
    //   setMessage(username + "님 회원가입 성공 :)");
    // } catch (err) {
    //   console.error(err);
    //   alert("회원 가입 실패");
    // }
  };

  //로그인
  const login = async (e) => {
    try {
      await api.post(
        "/api/auth/login",
        new URLSearchParams({ username, password })
      );
      setMessage(username + "☆ 로그인 성공 :)");
    } catch (err) {
      console.error(err);
      alert("로그인 실패");
    }
  };

  //로그아웃
  const logout = async (e) => {
    await api.post("/api/auth/logout");
    setMessage("★" + username + "★ 로그아웃");
  };

  //로그인한 사용자 확인
  const userloginCheck = async () => {
    const res = await api.get("/api/auth/me");
    setMessage("현재 로그인한 사용자는 " + res.data.username + "님♡");
  };

  return (
    <div className="App">
      <h2>회원 로그인</h2>
      <input
        placeholder="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <br />
      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <button onClick={signUp}>회원가입</button>
      <hr />
      <button onClick={login}>로그인</button>
      <button onClick={logout}>로그아웃</button>
      <hr />
      <button onClick={userloginCheck}>로그인 사용자 확인</button>
      <hr />
      <h3>백엔드 응답 : {message} </h3>
    </div>
  );
}

export default App;
