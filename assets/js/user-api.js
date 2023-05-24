export const BACK_BASE_URL = "http://127.0.0.1:8000";
export const FRONT_BASE_URL = "http://127.0.0.1:5500";
const token = localStorage.getItem("access");

// 회원가입
export async function handleSignup() {
    const email = document.getElementById("jy-email").value;
    const password1 = document.getElementById("jy-password1").value;
    const password2 = document.getElementById("jy-password2").value;
    const nickname = document.getElementById("jy-nickname").value;
    if (password1 === password2) {
      const response = await fetch(`${BACK_BASE_URL}/user/dj-rest-auth/registration/`, {
        headers: {
          "content-type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          email: email,
          password1: password1,
          password2: password2,
          nickname: nickname,
        }),
      });
      console.log(response)
      // 회원 가입 성공 또는 실패에 따른 처리
      if (response.ok) {
        // 회원 가입 성공
        alert("회원 가입이 완료되었습니다.");
      } else {
        // 회원 가입 실패
        alert("회원 가입에 실패하였습니다.");
      }
    } else {
      // 비밀번호 불일치
      alert("비밀번호가 일치하지 않습니다.");
    }

    // 회원 가입 후 토큰을 로컬스토리지에 저장
    const response_after_signup = await fetch(`${BACK_BASE_URL}/user/dj-rest-auth/login/`, {
      headers: {
          "content-type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
          "email": email,
          "password": password1
      })
  })

  const response_json = await response_after_signup.json()

  localStorage.setItem("access", response_json.access)
  localStorage.setItem("refresh", response_json.refresh)

  const base64Url = response_json.access.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  localStorage.setItem("payload", jsonPayload);
  localStorage.setItem("new", "True");

  // 프로필 페이지 만들어지면 거기로 보냄
  // window.location.href = "profile-update.html"

  }

  export async function handleLogin() {
    const email = document.getElementById("jy-login-email").value;
    const password = document.getElementById("jy-login-password").value;
    const response_after_signup = await fetch(`${BACK_BASE_URL}/user/dj-rest-auth/login/`, {
      headers: {
          "content-type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
          "email": email,
          "password": password
      })
  })

  const response_json = await response_after_signup.json()

  localStorage.setItem("access", response_json.access)
  localStorage.setItem("refresh", response_json.refresh)

  const base64Url = response_json.access.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  localStorage.setItem("payload", jsonPayload);
  localStorage.setItem("new", "True");

}
