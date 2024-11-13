<script setup>
import { useRouter, useRoute } from "vue-router";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"; // Assuming you are using FontAwesome for icons

const router = useRouter();
const route = useRoute();

const goMain = () => {
  router.push({ name: "main" });
};
const goLike = () => {
  router.push({ name: "like" });
};
const goMyPage = () => {
  router.push({ name: "mypage" });
};
const goOther1 = () => {
  router.push({ name: "other1" });
};
const goOther2 = () => {
  router.push({ name: "other2" });
};
const goOther3 = () => {
  router.push({ name: "other3" });
};
const goSettings = () => {
  router.push({ name: "settings" });
};
</script>

<template>
  <div class="h-full w-full flex bg-white items-center justify-center">
    <!-- TITLE -->
    <div class="h-full w-full text-black relative shadow-2xl">
      <div class="flex items-center justify-center">
        <div
          class="mt-6 font-[1000] text-black flex flex-row justify-center items-center gap-x-4 cursor-pointer"
          @click="goMain"
        >
          <font-awesome-icon
            icon="fa-solid fa-house-flag"
            class="text-red-700 fa-3x"
          />
          <div>
            <div class="text-[30px]">LIVING</div>
            <div class="text-[30px]">SPOT</div>
          </div>
        </div>
      </div>
      <!-- USER AVATER -->
      <div class="flex flex-col items-center mt-16 gap-y-2">
        <v-avatar size="115">
          <v-img alt="John" src="https://cdn.vuetifyjs.com/images/john.jpg">
          </v-img>
        </v-avatar>

        <div class="flex flex-col">
          <div class="text-xl font-extrabold flex flex-row items-center">
            <span>LEE JIN GYU</span>
            <v-btn
              class="text-sm mx-2"
              color="gray"
              icon="mdi-wrench"
              size="small"
            ></v-btn>
          </div>
          <div class="text-md font-semibold text-slate-500">
            aiduriaaa@gmail.com
          </div>
        </div>
      </div>

      <!-- MENU LISTS -->
      <div class="text-sm font-extrabold flex flex-col mt-16">
        <div class="w-[200px] mx-auto">
          <div
            :class="[
              'py-3 px-6 rounded-lg cursor-pointer flex items-center',
              route.name === 'main' ? 'bg-[#f2f1ee]' : 'hover:bg-slate-100',
            ]"
            @click="goMain"
          >
            <font-awesome-icon
              :icon="['fas', 'magnifying-glass']"
              class="mr-2"
            />SEARCHING
          </div>
          <div
            :class="[
              'py-3 px-6 rounded-lg cursor-pointer flex items-center',
              route.name === 'like' ? 'bg-[#f2f1ee]' : 'hover:bg-slate-100',
            ]"
            @click="goLike"
          >
            <font-awesome-icon icon="fa-solid fa-heart" class="mr-2" />LIKES
          </div>

          <div
            :class="[
              'py-3 px-6 rounded-lg cursor-pointer flex items-center',
              route.name === 'other1' ? 'bg-[#f2f1ee]' : 'hover:bg-slate-100',
            ]"
            @click="goOther1"
          >
            <font-awesome-icon
              icon="fa-solid fa-network-wired"
              class="mr-2"
            />OTHER 1
          </div>
          <div
            :class="[
              'py-3 px-6 rounded-lg cursor-pointer flex items-center',
              route.name === 'other2' ? 'bg-[#f2f1ee]' : 'hover:bg-slate-100',
            ]"
            @click="goOther2"
          >
            <font-awesome-icon
              icon="fa-solid fa-network-wired"
              class="mr-2"
            />OTHER 2
          </div>

          <div
            :class="[
              'py-3 px-6 rounded-lg cursor-pointer flex items-center',
              route.name === 'mypage' ? 'bg-[#f2f1ee]' : 'hover:bg-slate-100',
            ]"
            @click="goMyPage"
          >
            <font-awesome-icon
              icon="fa-solid fa-circle-info"
              class="mr-2"
            />MYPAGE
          </div>
          <div
            :class="[
              'py-3 px-6 rounded-lg cursor-pointer flex items-center',
              route.name === 'settings' ? 'bg-[#f2f1ee]' : 'hover:bg-slate-100',
            ]"
            @click="goSettings"
          >
            <font-awesome-icon icon="fa-solid fa-gear" class="mr-2" />SETTINGS
          </div>
        </div>
      </div>
      <div
        class="text-[#bcbcbc] absolute bottom-0 w-full h-[50px] flex items-center justify-start font-extrabold text-lg ml-12"
      >
        <font-awesome-icon icon="fa-solid fa-right-to-bracket" class="mr-3" />
        <div class="cursor-pointer">Exit</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.hover\:bg-slate-500:hover {
  background-color: #64748b; /* Slate color on hover */
}
</style>
