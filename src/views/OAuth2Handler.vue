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

      // 로컬스토리지에 저장
      localStorage.setItem("accessToken", accessToken);
      console.log("Access token saved to localStorage:", accessToken);

      // 서버와 통신하여 access_token 제거 요청
      const response = await axios.post(
        "/auth/oauth2-jwt-header",
        {},
        { withCredentials: true }
      );
      if (response.status === 200) {
        console.log("엑세스 토큰이 제거되었습니다.");
        this.$router.push("/"); // 예: 홈 화면으로 이동
      }
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
