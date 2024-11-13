<script setup>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"; // Assuming you are using FontAwesome for icons
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";

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

const email = ref("");
const nickname = ref("");
const password = ref("");
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
      <h1 class="mb-10 font-extrabold text-[30px]">
        <font-awesome-icon
          icon="fa-solid fa-house-flag"
          class="text-red-700 fa-xl mr-3"
        />JOIN
      </h1>
      <v-sheet class="mx-auto" width="300">
        <v-form fast-fail @submit.prevent>
          <v-text-field v-model="email" label="Email"></v-text-field>
          <v-text-field v-model="nickname" label="Nickname"></v-text-field>
          <v-text-field v-model="password" label="Password"></v-text-field>
          <v-file-input
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
          </v-file-input>
        </v-form>
      </v-sheet>
      <div
        class="flex flex-col w-full justify-around mt-2 items-center gap-y-2"
      >
        <div
          class="bg-red-700 h-10 w-[300px] cursor-pointer text-sm font-extrabold rounded-md flex items-center justify-center shadow-xl text-white"
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
