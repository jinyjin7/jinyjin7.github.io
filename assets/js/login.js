import { BACK_BASE_URL, handleLogin, handlegoogleLogin } from "./user-api.js";

document.getElementById("login-submit").onclick = function () {
  // 회원가입 요청
  handleLogin();
};

document.getElementById("google-login").onclick = function () {
  // 회원가입 요청
  window.location.href = 'https://lucedude.link/google/login/'
};
