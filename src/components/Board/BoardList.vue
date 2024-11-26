<template>
  <div class="w-full mx-auto p-6 bg-gray-50 rounded-b-lg shadow-lg">
    <!-- Header -->
    <div class="flex justify-between items-center mb-6">
      <input
        v-model="search"
        type="text"
        placeholder="🔍 검색어 입력..."
        class="px-4 py-3 w-80 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-400 shadow-sm transition"
      />
      <button
        @click="goWrite"
        class="bg-slate-600 font-extrabold text-white px-4 py-2 rounded-lg shadow-md hover:bg-slate-700 active:scale-95 transition-transform"
      >
        <font-awesome-icon
          icon="fa-solid fa-pen-nib"
          class="mr-1 font-extrabold"
        />
        글 작성
      </button>
    </div>

    <!-- List -->
    <div class="grid grid-cols-2 gap-6 h-[460px]">
      <div
        v-for="item in filteredGames"
        :key="item.title"
        class="flex h-[100px] items-center p-4 bg-white shadow-md rounded-lg hover:shadow-lg transition cursor-pointer"
        @click="goDetail(item)"
      >
        <div class="flex-shrink-0 mr-4 font-extrabold">
          <div
            :class="[
              item.typeIconBg,
              'flex items-center justify-center w-12 h-12 rounded-full',
            ]"
          >
            <i :class="item.typeIcon" class="text-white text-lg"></i>
          </div>
        </div>
        <div class="flex-1">
          <div class="text-lg font-bold text-gray-800">{{ item.title }}</div>
          <div class="text-sm text-gray-500">
            {{ item.registerTime }} / 조회수 : {{ item.hit }}회
          </div>
          <div class="text-sm text-gray-700 font-medium mt-1">
            {{ item.content }}
          </div>
        </div>
        <div class="text-right">
          <div
            :class="item.typeColor"
            class="px-3 py-1 rounded-full text-sm font-bold"
          >
            <div v-if="item.typeLabel == 'Info'">
              <font-awesome-icon icon="fa-solid fa-circle-info" class="mr-1" />
              정보
            </div>
            <div v-if="item.typeLabel == 'Urgent'">
              <font-awesome-icon
                icon="fa-solid fa-tower-broadcast"
                class="mr-1"
              />
              긴급
            </div>
            <div v-if="item.typeLabel == 'Humor'">
              <font-awesome-icon icon="fa-solid fa-face-smile" class="mr-1" />
              유머
            </div>
            <div v-if="item.typeLabel == 'Friendship'">
              <font-awesome-icon icon="fa-solid fa-person" class="mr-1" />
              친목
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Pagination -->
    <div class="flex justify-center items-center mt-8 space-x-4">
      <button
        @click="prevPage"
        :disabled="page === 1"
        class="px-4 py-2 bg-gray-200 text-gray-600 rounded-lg shadow-md hover:bg-gray-300 disabled:opacity-50 transition"
      >
        ◀ 이전
      </button>
      <span class="text-gray-600 font-medium">
        페이지 {{ page }} 중 {{ pageCount }}
      </span>
      <button
        @click="nextPage"
        :disabled="page >= pageCount"
        class="px-4 py-2 bg-gray-200 text-gray-600 rounded-lg shadow-md hover:bg-gray-300 disabled:opacity-50 transition"
      >
        다음 ▶
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { searchAllArticles } from "@/api/board.js";

const router = useRouter();
const search = ref("");
const page = ref(1);
const games = ref([]);
const itemsPerPage = 8;

onMounted(() => {
  initSearch();
});

async function initSearch() {
  try {
    const response = await searchAllArticles();

    games.value = response.data.map((game) => ({
      ...game,
      typeLabel: types[game.type].label,
      typeColor: types[game.type].color,
      typeIcon: types[game.type].icon,
      typeIconBg: types[game.type].iconBg,
    }));
  } catch (error) {
    console.error("Search failed:", error);
    alert("Search failed: Please try again.");
  }
}

const types = {
  urgent: { label: "Urgent", color: "bg-red-500 text-white" },
  info: { label: "Info", color: "bg-blue-500 text-white" },
  humor: { label: "Humor", color: "bg-green-500 text-white" },
  friendship: { label: "Friendship", color: "bg-yellow-500 text-white" },
};

const filteredGames = computed(() => {
  const start = (page.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const filtered = games.value.filter(
    (game) =>
      game.title.includes(search.value) || game.content.includes(search.value)
  );
  return filtered.slice(start, end);
});

const pageCount = computed(() => {
  return Math.ceil(
    games.value.filter(
      (game) =>
        game.title.includes(search.value) || game.content.includes(search.value)
    ).length / itemsPerPage
  );
});

const nextPage = () => {
  if (page.value < pageCount.value) page.value++;
};

const prevPage = () => {
  if (page.value > 1) page.value--;
};

const goWrite = () => {
  router.push({ name: "boardWrite" });
};

const goDetail = (item) => {
  router.push({
    name: "detail",
    params: { articleNo: item.articleNo },
  });
};
</script>

<style>
/* Add custom scrollbars */
</style>
