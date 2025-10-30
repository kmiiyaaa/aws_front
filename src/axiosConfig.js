import axios from "axios";

const api = axios.create({
  //baseURL: "http://http://43.200.232.87/", //스프링 부트 백엔드 기본 url
  baseURL: "http://localhost:7777",
  //ec2 아이피:포트
  withCredentials: true, //세션 쿠키 전달
});

export default api;
