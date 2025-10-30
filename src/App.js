import "./App.css";
import { useState } from "react";
import api from "./axiosConfig.js";

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [token, setToken] = useState("" || localStorage.getItem("token")); //토큰값이 있으면 토큰값넣고 없으면 ""
  // localStorage → 웹브라우저에서 기본적으로 가지고 있는 저장소

  //회원 가입
  const signUp = async (e) => {
    try {
      await api.post(
        "/api/auth/signup",
        { username, password } // @requestbody로 보냄 -> Json타입으로
        //new URLSearchParams({ username, password }) //백엔드에서 @requestParam -> 파라미터 넘기기
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
      const res = await api.post(
        "/api/auth/login",
        { username, password }
        //new URLSearchParams({ username, password })
      );
      setToken(res.data.token); // 로그인 성공 후 받은 토큰값 저장
      localStorage.setItem("token", res.data.token);
      setMessage(username + " 로그인 성공 :)");
    } catch (err) {
      console.error(err);
      alert("로그인 실패");
    }
  };

  //로그아웃
  const logout = async () => {
    //await api.post("/api/auth/logout");
    localStorage.removeItem("token"); // 토큰삭제 → 로그아웃
    setToken(""); // 토큰값 초기화
    setMessage("★ " + username + " 로그아웃 ★");
  };

  //로그인한 사용자 확인
  const userloginCheck = async () => {
    // const res = await api.get("/api/auth/me");
    // setMessage("현재 로그인한 사용자는 " + res.data.username + "님♡");

    //JWT 적용시
    try {
      if (!token) {
        // 참이면 로그인 x
        alert("로그인 후 정보확인 가능합니다.");
      }

      const res = await api.get("/api/auth/me", {
        headers: { Authorization: `Bearer {token}` },
      });

      setMessage("현재 로그인한 사용자는 " + res.data.username + "님♡");
    } catch (err) {
      console.error(err);
      alert("로그인 중인 사용자 정보를 가져올 수 없습니다.");
    }
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
