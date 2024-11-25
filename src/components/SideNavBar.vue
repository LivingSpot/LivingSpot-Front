<script setup>
import { useRouter, useRoute } from "vue-router";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"; // Assuming you are using FontAwesome for icons
import { ref } from "vue";
import SideOptionMenu from "@/components/SideOptionMenu.vue";
import { useUserStore } from "@/stores/userStore";

const router = useRouter();
const route = useRoute();
const userStore = useUserStore();

const isOpened = ref(false);

const goMain = () => {
  if (route.name === "main") {
    isOpened.value = !isOpened.value;
  } else if (route.name != "main" && isOpened.value == false) {
    isOpened.value = true;
  }
  console.log(isOpened);
  router.push({ name: "main" });
};
const goLike = () => {
  if (route.name === "like") {
    isOpened.value = !isOpened.value;
  } else if (route.name !== "like" && isOpened.value === false) {
    isOpened.value = true;
  }
  router.push({ name: "like" });
};
const goMyPage = () => {
  isOpened.value = false;
  router.push({ name: "mypage" });
};
const goBoard = () => {
  isOpened.value = false;
  router.push({ name: "board" });
};
const goOther2 = () => {
  isOpened.value = false;
  router.push({ name: "other2" });
};
const goOther3 = () => {
  isOpened.value = false;
  router.push({ name: "other3" });
};
const goSettings = () => {
  isOpened.value = false;
  router.push({ name: "settings" });
};
const login = () => userStore.login();
const logout = () => userStore.logout(); // 로그아웃
</script>

<template>
  <div class="h-full w-full flex bg-white items-center justify-center relative">
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
      <!-- USER AVATAR -->
      <div class="flex flex-col items-center mt-16 gap-y-2">
        <v-avatar size="115">
          <v-img
            alt="User Avatar"
            :src="
              userStore.user?.profilePicture ||
              'https://via.placeholder.com/150'
            "
          ></v-img>
        </v-avatar>

        <div class="flex flex-col">
          <div class="text-xl font-extrabold flex flex-row items-center">
            <span>{{ userStore.user?.name || "Guest" }}</span>
          </div>
          <div class="text-md font-semibold text-slate-500">
            {{ userStore.user?.email || "guest@example.com" }}
          </div>
        </div>
      </div>

      <!-- MENU LISTS -->
      <div class="text-sm font-extrabold flex flex-col mt-16">
        <div class="w-[200px] mx-auto">
          <div
            :class="[
              'py-3 px-6 rounded-lg cursor-pointer flex items-center justify-between',
              route.name === 'main' ? 'bg-[#f2f1ee]' : 'hover:bg-slate-100',
            ]"
            @click="goMain"
          >
            <div>
              <font-awesome-icon
                :icon="['fas', 'magnifying-glass']"
                class="mr-2"
              /><span class="mr-8">상세 검색</span>
            </div>
            <span><font-awesome-icon icon="fa-solid fa-arrow-right" /></span>
          </div>

          <!-- side side option memu -->
          <div
            :class="[
              'absolute bottom-0 left-[264px] h-full rounded-r-md w-full z-10 bg-slate-50 transition-all duration-300 shadow-lg',
              isOpened ? 'clip-path-open' : 'clip-path-close',
            ]"
            class="flex justify-center items-center"
          >
            <SideOptionMenu />
          </div>

          <div
            :class="[
              'py-3 px-6 rounded-lg cursor-pointer flex items-center justify-between',
              route.name === 'like' ? 'bg-[#f2f1ee]' : 'hover:bg-slate-100',
            ]"
            @click="goLike"
          >
            <div>
              <font-awesome-icon
                :icon="['fas', 'fa-heart']"
                class="mr-2"
              /><span class="mr-8">찜 목록</span>
            </div>
            <span><font-awesome-icon icon="fa-solid fa-arrow-right" /></span>
          </div>

          <div
            :class="[
              'py-3 px-6 rounded-lg cursor-pointer flex items-center',
              route.name === 'board' ? 'bg-[#f2f1ee]' : 'hover:bg-slate-100',
            ]"
            @click="goBoard"
          >
            <font-awesome-icon
              icon="fa-solid fa-tv"
              class="mr-2 w-[14px]"
            />커뮤니티
          </div>
          <div
            :class="[
              'py-3 px-6 rounded-lg cursor-pointer flex items-center',
              route.name === 'settings' ? 'bg-[#f2f1ee]' : 'hover:bg-slate-100',
            ]"
            @click="goSettings"
          >
            <font-awesome-icon icon="fa-solid fa-gear" class="mr-2" />설정
          </div>
        </div>
      </div>
      <div
        class="text-[#bcbcbc] absolute bottom-0 w-full h-[50px] flex items-center justify-start font-extrabold text-lg ml-12"
        @click="logout"
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
.clip-path-close {
  clip-path: inset(0 100% 0 0); /* 요소를 오른쪽으로 감춥니다 */
}
.clip-path-open {
  clip-path: inset(0 0 0 0); /* 요소를 완전히 표시합니다 */
}
.transition-all {
  transition: clip-path 0.3s ease; /* clip-path에 트랜지션 효과를 적용 */
}
</style>
