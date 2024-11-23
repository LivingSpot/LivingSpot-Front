<script setup>
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { signup } from "@/api/signup";

const router = useRouter();

const userEmail = ref("");
const userName = ref("");
const password = ref("");
const profileImage = ref(null); // 업로드된 이미지 파일
const previewImage = ref("/images/defaultProfile.png"); // 기본 프로필 이미지 경로 (public 디렉토리의 기본 이미지)

const onFileChange = async (event) => {
  const files = event.target.files;
  if (files && files.length > 0) {
    const file = files[0];
    profileImage.value = file;
    previewImage.value = URL.createObjectURL(file); // 업로드된 이미지 미리보기

    try {
      // /upload-profile-image API 호출
      const formData = new FormData();
      formData.append("file", file);
      const response = await axios.post(
        "http://localhost:8080/member/upload-profile-image",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // 업로드된 이미지의 URL을 저장
      profileImage.value = response.data.imageUrl;
      console.log("업로드된 이미지 URL:", profileImage.value);
    } catch (error) {
      console.error("이미지 업로드 실패:", error);
      alert("이미지 업로드에 실패했습니다. 다시 시도해주세요.");
      profileImage.value = null;
      previewImage.value = "/images/defaultProfile.png";
    }
  }
};

// 이미지 업로드 취소
const onCancelImage = () => {
  profileImage.value = null; // 업로드된 이미지 파일 초기화
  previewImage.value = "/images/defaultProfile.png"; // 기본 이미지로 복원
};

// 회원가입 요청
const onSignup = async () => {
  try {
    console.log("회원가입 요청 데이터:", {
      name: userName.value,
      email: userEmail.value,
      password: password.value,
      profileImageUrl: profileImage.value, // 업로드된 이미지 URL
    });

    // signup API 호출
    const response = await signup(
      userEmail.value,
      userName.value,
      password.value,
      profileImage.value // 이미지 URL 전달
    );
    console.log("회원가입 성공:", response.data);
    router.push({ name: "login" });
  } catch (error) {
    console.error("회원가입 실패:", error);
    alert("회원가입에 실패했습니다. 다시 시도해주세요.");
  }
};

// 로그인 페이지로 이동
const goLogin = () => {
  router.push({ name: "login" });
};
</script>

<template>
  <div class="flex w-screen h-screen items-center justify-center">
    <div
      class="shadow-lg w-[400px] h-[750px] flex items-center justify-center flex-col rounded-lg"
    >
      <h1 class="mb-10 font-extrabold text-[30px]">
        <font-awesome-icon
          icon="fa-solid fa-house-flag"
          class="text-red-700 fa-xl mr-3"
        />JOIN
      </h1>

      <!-- 프로필 이미지 미리보기 및 업로드 -->
      <div class="flex flex-col items-center mb-6">
        <img
          :src="previewImage"
          alt="Profile Preview"
          class="w-24 h-24 rounded-full border border-gray-300 object-cover mb-3"
        />
        <input
          type="file"
          id="profile-upload"
          accept="image/*"
          @change="onFileChange"
          class="hidden"
        />
        <label
          for="profile-upload"
          class="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-md text-sm font-bold"
        >
          Upload Image
        </label>
        <button
          v-if="profileImage"
          @click="onCancelImage"
          class="mt-2 text-red-600 text-sm font-bold"
        >
          Cancel Image
        </button>
      </div>

      <v-sheet class="mx-auto" width="300">
        <v-form fast-fail @submit.prevent>
          <v-text-field v-model="userEmail" label="Email"></v-text-field>
          <v-text-field v-model="userName" label="Name"></v-text-field>
          <v-text-field
            v-model="password"
            label="Password"
            type="password"
          ></v-text-field>
        </v-form>
      </v-sheet>

      <div
        class="flex flex-col w-full justify-around mt-6 items-center gap-y-2"
      >
        <div
          class="bg-red-700 h-10 w-[300px] cursor-pointer text-sm font-extrabold rounded-md flex items-center justify-center shadow-xl text-white"
          @click="onSignup"
        >
          <font-awesome-icon
            icon="fa-solid fa-right-to-bracket"
            class="fa-lg text-white mr-3"
          /><span>JOIN</span>
        </div>
        <div
          class="bg-slate-600 h-10 w-[300px] cursor-pointer text-sm font-extrabold rounded-md flex items-center justify-center shadow-xl text-white"
          @click="goLogin"
        >
          <font-awesome-icon
            icon="fa-solid fa-x"
            class="fa-lg text-white mr-3"
          /><span>CANCEL</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
