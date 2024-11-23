import { defineStore } from "pinia";
import axios from "@/plugins/axios";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: null, // 사용자 정보
    isLoggedIn: false, // 로그인 상태
    baseUrl: import.meta.env.VITE_API_URL || ''
  }),
  actions: {
    async fetchUserInfo() {
      try {
        const token = localStorage.getItem("access_token");

        if (!token) {
          this.logout();
          return;
        }

        const response = await axios.get("/member/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        console.log(response);

        // 소셜 로그인인 경우 전체 URL이, 로컬 로그인인 경우 /files/로 시작하는 상대 경로가 옵니다
        const profileImageUrl = response.data.profileImageUrl;

        console.log(profileImageUrl);

        const fullImageUrl = profileImageUrl?.startsWith('https') 
          ? profileImageUrl  // 소셜 로그인의 경우 전체 URL 사용
          : profileImageUrl  // 로컬 로그인의 경우 상대 경로 사용 (axios baseURL이 설정되어 있으므로)
          ? `${this.baseUrl}${profileImageUrl}`
          : null;
      
        console.log(fullImageUrl);

        this.user = {
          name: response.data.name,
          email: response.data.email,
          profilePicture: fullImageUrl, // 이미지 URL 저장
        };
        this.isLoggedIn = true;
      } catch (error) {
        console.error("Failed to fetch user info:", error);
        this.logout();
      }
    },
    logout() {
      const token = localStorage.getItem("access_token");

      if (!token) {
        this.clearState();
        return;
      }

      axios
        .post("/member/logout", {}, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          console.log("Logged out successfully");
        })
        .catch((error) => {
          console.error("Error during logout:", error);
        })
        .finally(() => {
          this.clearState(); // 상태 초기화
        });
    },

    clearState() {
      this.user = null; // 사용자 정보 초기화
      this.isLoggedIn = false; // 로그인 상태 초기화
      localStorage.removeItem("access_token"); // 로컬 스토리지에서 토큰 삭제
    }
  },
});
