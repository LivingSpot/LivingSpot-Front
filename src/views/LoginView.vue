<script setup>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"; // Assuming you are using FontAwesome for icons

import { useRoute, useRouter } from "vue-router";
import { ref } from "vue";

// 소셜 로그인 로그인 URI
const GOOGLE_LOGIN_URL = import.meta.env.VITE_GOOGLE_LOGIN_URI;
const KAKAO_LOGIN_URL = import.meta.env.VITE_KAKAO_LOGIN_URI;
const NAVER_LOGIN_URL = import.meta.env.VITE_NAVER_LOGIN_URI;

const route = useRoute();
const router = useRouter();

const goJoin = () => {
  router.push({ name: "join" });
};

const email = ref("");
const nickname = ref("");
const password = ref("");

const onLogin = () => {
  console.log("로그인 버튼 클릭!!!");
  console.log(email.value);
  console.log(password.value);
  if (email.value == "ssafy" && password.value == "1234") {
    router.push({ name: "main" });
  } else {
    alert("로그인 실패");
    email.value = "";
    password.value = "";
    router.push({ name: "login" });
  }
};

const googleLogin = () => {
  window.location.href = GOOGLE_LOGIN_URL.toString();
};

const kakaoLogin = () => {
  window.location.href = KAKAO_LOGIN_URL.toString();
};

const naverLogin = () => {
  window.location.href = NAVER_LOGIN_URL.toString();
};
</script>
<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"; // Assuming you are using FontAwesome for icons

export default {
  data: () => ({
    firstName: "",
    firstNameRules: [
      (value) => {
        if (value?.length >= 3) return true;

        return "First name must be at least 3 characters.";
      },
    ],
    lastName: "123",
    lastNameRules: [
      (value) => {
        if (/[^0-9]/.test(value)) return true;

        return "Last name can not contain digits.";
      },
    ],
  }),
};
</script>

<template>
  <div class="flex w-screen h-screen items-center justify-center">
    <div
      class="shadow-lg w-[400px] h-[600px] flex items-center justify-center flex-col rounded-lg"
    >
      <h1 class="mb-10 font-extrabold text-[30px]">
        <font-awesome-icon
          icon="fa-solid fa-house-flag"
          class="text-red-700 fa-xl mr-3"
        />LIVING SPOT
      </h1>
      <v-sheet class="mx-auto" width="300">
        <v-form fast-fail @submit.prevent="onLogin">
          <v-text-field v-model="email" label="Email"></v-text-field>

          <v-text-field v-model="password" label="Password"></v-text-field>

          <div class="flex flex-row w-full justify-around">
            <button
              type="submit"
              class="bg-blue-700 h-10 w-32 cursor-pointer text-sm font-extrabold rounded-md flex items-center justify-center shadow-xl text-white"
            >
              <font-awesome-icon
                icon="fa-solid fa-right-to-bracket"
                class="fa-lg text-white mr-3"
                size=""
              /><span>LOGIN</span>
            </button>
            <div
              class="bg-red-700 h-10 w-32 cursor-pointer text-sm font-extrabold rounded-md flex items-center justify-center shadow-xl text-white"
              @click="goJoin"
            >
              <font-awesome-icon
                icon="fa-solid fa-address-card"
                class="fa-lg text-white mr-3"
                size=""
              /><span>JOIN</span>
            </div>
          </div>
        </v-form>
      </v-sheet>
      <div>
        <div
          class="border-t-2 border-slate-300 my-10 w-[300px] h-[25px] relative flex items-center justify-center"
        >
          <div class="absolute bottom-[13px] z-1 bg-white px-2 text-slate-300">
            <span class="text-slate-400 font-extrabold">OTHER</span>
          </div>
        </div>
        <div class="flex flex-col gap-y-3 w-full -mt-8">
          <div
            @click="googleLogin"
            class="hover:opacity-80 transition-all duration-200 bg-slate-50 h-10 cursor-pointer text-sm font-extrabold rounded-md flex items-center justify-center shadow-xl text-white"
          >
            <img
              src="../../../public/images/googleLogo.png"
              class="w-6 h-6 mr-3"
            /><span class="text-black">GOOGLE</span>
          </div>
          <div
            @click="naverLogin"
            class="hover:opacity-80 transition-all duration-200 bg-[#03C75A] h-10 cursor-pointer text-sm font-extrabold rounded-md flex items-center justify-center shadow-xl text-white"
          >
            <div class="mr-4 text-2xl">N</div>
            <span>NAVER</span>
          </div>
          <div
            @click="kakaoLogin"
            class="hover:opacity-80 transition-all duration-200 bg-[#FEE500] h-10 cursor-pointer text-sm font-extrabold rounded-md flex items-center justify-center shadow-xl text-white"
          >
            <img
              src="../../../public/images/kakaoLogin.png"
              class="w-[30px] h-[30px] mr-3"
            /><span class="text-black">KAKAO</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
