<template>
  <div>
    <p>OAuth2 로그인 처리가 진행 중입니다...</p>
  </div>
</template>

<script>
import axios from "@/plugins/axios";


export default {
  name: "OAuth2Handler",
  async created() {
    try {
      // 쿠키에서 access_token 읽기
      const accessToken = this.getCookie("access_token");

      if (!accessToken) {
        console.error("Access token not found in cookies.");
        this.$router.push("/login");
        return;
      }

      // 서버와 통신하여 access_token 제거 요청
      const response = await axios.post(
        "/auth/oauth2-jwt-header",
        {},
        { withCredentials: true },
      );

      // Authorization 헤더에서 Bearer 토큰 추출
      const authHeader = response.headers["authorization"]; // 'Authorization' 헤더 값 가져오기
        if (authHeader && authHeader.startsWith("Bearer ")) {
          const token = authHeader.slice(7); // "Bearer " 제거
          console.log("Access Token:", token);

          // 로컬 스토리지에 저장
          localStorage.setItem("access_token", token);
          console.log("Access token saved to localStorage:", token);
        } else {
          console.error("Invalid Authorization header format");
        }
        // 홈 화면으로 이동
        this.$router.push("/");
    } catch (error) {
      console.error("Error during OAuth2 login handling:", error);
      alert("로그인 처리 중 문제가 발생했습니다.");
      this.$router.push("/login"); // 오류 시 로그인 페이지로 이동
    }
  },
  methods: {
    // 쿠키 값 읽기 메서드
    getCookie(name) {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) {
        return parts.pop().split(";").shift();
      }
      return null;
    },
  },
};
</script>
