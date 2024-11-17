<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const router = useRouter();

onMounted(async () => {
  const code = new URL(window.location.href).searchParams.get("code");

  if (code) {
    try {
      // 백엔드로 인가코드 전송
      const response = await axios.post('http://localhost:8080/api/oauth/google', { code });
      
      // 받은 토큰 저장
      localStorage.setItem('accessToken', response.data.accessToken);
      localStorage.setItem('refreshToken', response.data.refreshToken);
      
      // 메인 페이지로 리다이렉트
      router.push('/');
    } catch (error) {
      console.error('Google 로그인 에러:', error);
      router.push('/login');
    }
  }
});
</script>

<template>
  <div class="flex items-center justify-center h-screen">
    <p>Google 로그인 처리중...</p>
  </div>
</template>