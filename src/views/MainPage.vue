<script setup>
import { onMounted } from "vue";
import MainKaKaoMap from "@/components/MainKaKaoMap.vue";
import SideNavBar from "@/components/SideNavBar.vue";
import HeadNavBar from "@/components/HeadNavBar.vue";
import { useRouter, useRoute, RouterLink, RouterView } from "vue-router";

import { useUserStore } from "@/stores/userStore";

const userStore = useUserStore();

onMounted(async () => {
  if (!userStore.isLoggedIn) {
    await userStore.fetchUserInfo(); // 유저 정보 가져오기
  }
});

</script>

<template>
  <div
    v-if="$route.meta.layout !== 'none'"
    class="flex flex-row w-screen h-screen bg-white"
  >
    <div class="h-full w-[18%]">
      <SideNavBar />
    </div>
    <div class="flex flex-col w-[82%] bg-slate-200">
      <div class="p-4"><HeadNavBar /></div>
      <div class="p-4 w-full h-full"><RouterView /></div>
    </div>
  </div>

  <div v-else>
    <RouterView />
  </div>
</template>

<style scoped></style>
