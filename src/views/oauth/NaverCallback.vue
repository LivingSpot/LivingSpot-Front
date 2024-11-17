<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const router = useRouter();

onMounted(async () => {
  const code = new URL(window.location.href).searchParams.get("code");
  const state = new URL(window.location.href).searchParams.get("state");
 
  if (code && state) {
    try {
      const response = await axios.post('http://localhost:8080/api/oauth/naver', { 
        code,
        state 
      });
      
      localStorage.setItem('accessToken', response.data.accessToken);
      localStorage.setItem('refreshToken', response.data.refreshToken);
      
      router.push('/');
    } catch (error) {
      console.error('Naver 로그인 에러:', error);
      router.push('/login');
    }
  }
});
</script>

<template>
  <div class="flex items-center justify-center h-screen">
    <p>Naver 로그인 처리중...</p>
  </div>
</template>