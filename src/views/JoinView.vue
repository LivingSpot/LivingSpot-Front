<script setup>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"; // Assuming you are using FontAwesome for icons
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { signup } from "@/api/signup"; // signup 함수를 import

const route = useRoute();
const router = useRouter();

const goJoin = () => {
  router.push({ name: "join" });
};

const goLogin = () => {
  router.push({ name: "login" });
};

const onLogin = () => {
  if (email == "ssafy@naver.com" && password == "1234") {
    router.push({ name: "/" });
  } else {
    router.push({ name: "login" });
  }
};

const userEmail = ref("");
const userNickname = ref("");
const userName = ref("");
const password = ref("");
// 회원가입 요청 함수
const onSignup = async () => {
  try {
    // signup API 호출
    console.log("회원가입 API 호출중!!!");
    const response = await signup(
      userEmail.value,
      userName.value,
      userNickname.value,
      password.value
    );
    console.log("회원가입 성공:", response.data);

    // 회원가입 성공 시 페이지 이동
    router.push({ name: "/" });
  } catch (error) {
    console.error("회원가입 실패:", error);
    alert("회원가입에 실패했습니다. 다시 시도해주세요.");
  }
};
</script>
<script>
export default {
  data: () => ({
    files: [],
  }),
};
</script>

<template>
  <div class="flex w-screen h-screen items-center justify-center">
    <div
      class="shadow-lg w-[400px] h-[600px] flex items-center justify-center flex-col rounded-lg"
    >
      <h1 class="mb-10 font-extrabold text-[30px]" @click="onSignup">
        <font-awesome-icon
          icon="fa-solid fa-house-flag"
          class="text-red-700 fa-xl mr-3"
        />JOIN
      </h1>
      <v-sheet class="mx-auto" width="300">
        <v-form fast-fail @submit.prevent>
          <v-text-field v-model="userEmail" label="Email"></v-text-field>
          <v-text-field v-model="userName" label="Name"></v-text-field>
          <v-text-field v-model="userNickname" label="Nickname"></v-text-field>
          <v-text-field v-model="password" label="Password"></v-text-field>
          <!-- <v-file-input
            v-model="files"
            :show-size="1000"
            color="deep-purple-accent-4"
            label="File input"
            placeholder="Select your files"
            prepend-icon="mdi-paperclip"
            variant="outlined"
            counter
            multiple
          >
            <template v-slot:selection="{ fileNames }">
              <template v-for="(fileName, index) in fileNames" :key="fileName">
                <v-chip
                  v-if="index < 2"
                  class="me-2"
                  color="deep-purple-accent-4"
                  size="small"
                  label
                >
                  {{ fileName }}
                </v-chip>

                <span
                  v-else-if="index === 2"
                  class="text-overline text-grey-darken-3 mx-2"
                >
                  +{{ files.length - 2 }} File(s)
                </span>
              </template>
            </template>
          </v-file-input> -->
        </v-form>
      </v-sheet>
      <div
        class="flex flex-col w-full justify-around mt-2 items-center gap-y-2"
      >
        <div
          class="bg-red-700 h-10 w-[300px] cursor-pointer text-sm font-extrabold rounded-md flex items-center justify-center shadow-xl text-white"
          @click="onSignup"
        >
          <font-awesome-icon
            icon="fa-solid fa-right-to-bracket"
            class="fa-lg text-white mr-3"
            size=""
          /><span>JOIN</span>
        </div>
        <div
          class="bg-slate-600 h-10 w-[300px] cursor-pointer text-sm font-extrabold rounded-md flex items-center justify-center shadow-xl text-white"
          @click="goLogin"
        >
          <font-awesome-icon
            icon="fa-solid fa-x"
            class="fa-lg text-white mr-3"
            size=""
          /><span>CANCLE</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
