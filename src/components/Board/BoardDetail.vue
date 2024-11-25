<template>
  <div class="w-full h-full bg-gray-50">
    <div class="max-w-4xl mx-auto p-6 bg-gray-50 rounded-lg shadow">
      <!-- Header -->
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-2xl font-bold">{{ item.title }}</h1>
        <button @click="goBack" class="text-blue-600 hover:underline text-sm">
          목록으로 돌아가기
        </button>
      </div>

      <!-- Details -->
      <div class="bg-white shadow-sm rounded p-6 space-y-4">
        <div>
          <strong class="block text-gray-500 text-sm">작성자:</strong>
          <p class="text-gray-800">{{ item.writer }}</p>
        </div>
        <div>
          <strong class="block text-gray-500 text-sm">작성 날짜:</strong>
          <p class="text-gray-800">{{ item.date }}</p>
        </div>
        <div>
          <strong class="block text-gray-500 text-sm">조회수:</strong>
          <p class="text-gray-800">{{ item.hit }}</p>
        </div>
        <div>
          <strong class="block text-gray-500 text-sm">카테고리:</strong>
          <span :class="['px-2 py-1 text-sm rounded-full', item.typeColor]">
            {{ item.typeLabel }}
          </span>
        </div>
        <div>
          <strong class="block text-gray-500 text-sm">내용:</strong>
          <p class="text-gray-800">{{ item.content }}</p>
        </div>
      </div>

      <!-- Actions -->
      <div class="mt-6 flex space-x-4">
        <button
          @click="editPost"
          class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          글 수정
        </button>
        <button
          @click="deletePost"
          class="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          글 삭제
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

// 전체 게시글 데이터 (공유하거나 API 호출로 가져올 수도 있음)
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

const item = ref(null);

// console.log(typeof route.params.id);
// pk를 기반으로 게시글 찾기
watch(
  () => route.params.id,
  (newId) => {
    const id = parseInt(newId);
    console.log(id); // 이 부분에서 정상적으로 id가 나오길 기대
    item.value = games.value.find((game) => game.id === id);

    if (!item.value) {
      alert("게시글을 찾을 수 없습니다.");
      router.push({ name: "board" });
    }
  },
  { immediate: true } // 처음 렌더링 시에도 watch가 실행되도록 설정
);
// onMounted(() => {
//   const id = parseInt(route.params.id);
//   console.log(id);
//   item.value = games.value.find((game) => game.id === id);

//   if (!item.value) {
//     alert("게시글을 찾을 수 없습니다.");
//     router.push({ name: "board" });
//   }
// });

const goBack = () => {
  router.push({ name: "board" });
};

const editPost = () => {
  alert("글 수정 기능을 구현하세요!");
};

const deletePost = () => {
  if (confirm("정말 이 글을 삭제하시겠습니까?")) {
    alert("글이 삭제되었습니다.");
    goBack();
  }
};
</script>
