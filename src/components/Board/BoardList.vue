<template>
  <div class="w-full h-full mx-auto p-4 bg-gray-50 rounded-b-md shadow">
    <!-- Header -->
    <div class="flex justify-between items-center mb-4">
      <input
        v-model="search"
        type="text"
        placeholder="Search"
        class="px-4 py-2 w-72 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
      />
      <button
        @click="goWrite"
        class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        글 작성
      </button>
    </div>

    <!-- List -->
    <div class="space-y-4 h-[450px]">
      <div
        v-for="item in filteredGames"
        :key="item.title"
        class="h-[100px] flex items-center justify-between p-4 bg-white shadow-sm rounded hover:bg-gray-00 cursor-pointer"
        @click="goDetail(item)"
      >
        <div>
          <div class="text-lg font-semibold">{{ item.title }}</div>
          <div class="text-sm text-gray-500">
            {{ item.writer }} · {{ item.date }} · 조회수 {{ item.hit }}
          </div>
          <p class="truncate text-gray-700">{{ item.content }}</p>
        </div>
        <span
          :class="[
            'px-2 py-1 rounded-full text-sm font-medium',
            item.typeColor,
          ]"
        >
          {{ item.typeLabel }}
        </span>
      </div>
    </div>

    <!-- Pagination -->
    <div class="flex justify-center items-center mt-6 space-x-2">
      <button
        @click="prevPage"
        :disabled="page === 1"
        class="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
      >
        이전
      </button>
      <span class="text-sm text-gray-600">
        Page {{ page }} of {{ pageCount }}
      </span>
      <button
        @click="nextPage"
        :disabled="page >= pageCount"
        class="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
      >
        다음
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const search = ref("");
const page = ref(1);
const itemsPerPage = 4;

const types = {
  urgent: { label: "긴급", color: "bg-red-500 text-white" },
  info: { label: "정보", color: "bg-blue-500 text-white" },
  humor: { label: "유머", color: "bg-green-500 text-white" },
  friendship: { label: "친목", color: "bg-yellow-500 text-white" },
};

const games = ref([
  {
    id: 1,
    title: "title1",
    content: "content1",
    hit: 2,
    writer: "ssafy",
    date: "2022-10-22",
    type: "urgent",
  },
  {
    id: 2,
    title: "title2",
    content: "content2",
    hit: 12,
    writer: "admin",
    date: "2023-05-02",
    type: "info",
  },
  {
    id: 3,
    title: "title3",
    content: "content3",
    hit: 6,
    writer: "ssafy",
    date: "2024-12-25",
    type: "humor",
  },
  {
    id: 4,
    title: "title4",
    content: "content4",
    hit: 2,
    writer: "ssafy",
    date: "2022-10-22",
    type: "urgent",
  },
  {
    id: 5,
    title: "title5",
    content: "content5",
    hit: 12,
    writer: "admin",
    date: "2023-05-02",
    type: "friendship",
  },
  {
    id: 6,
    title: "title6",
    content: "content6",
    hit: 6,
    writer: "ssafy",
    date: "2024-12-25",
    type: "urgent",
  },
  {
    id: 7,
    title: "title7",
    content: "content7",
    hit: 2,
    writer: "ssafy",
    date: "2022-10-22",
    type: "urgent",
  },
]);

// Enhance game data with labels and colors
games.value.forEach((game) => {
  game.typeLabel = types[game.type].label;
  game.typeColor = types[game.type].color;
});

// Pagination logic
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
    params: { id: item.id }, // pk만 전달
  });
  console.log(item.id);
};
</script>

<style>
.truncate {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  -webkit-line-clamp: 2;
}
</style>
