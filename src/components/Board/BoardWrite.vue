<template>
  <div class="mx-auto max-w-lg p-6 bg-gray-100 rounded-lg shadow">
    <h1 class="text-2xl text-center font-bold mb-5">게시글 작성</h1>

    <!-- 제목 입력 -->
    <input
      type="text"
      v-model="form.title"
      placeholder="글 제목을 입력하세요"
      class="w-full p-3 mb-4 border border-gray-300 rounded"
    />

    <!-- 작성자 이름 (읽기 전용) -->
    <input
      type="text"
      v-model="form.writer"
      class="w-full p-3 mb-4 border border-gray-300 rounded bg-gray-200 text-gray-500"
      readonly
    />

    <!-- 글 타입 선택 -->
    <div class="flex gap-3 mb-4">
      <div
        v-for="type in types"
        :key="type.value"
        class="px-4 py-[2px] text-sm border-[3px] rounded-full cursor-pointer transition font-extrabold"
        :class="{
          'bg-[color] text-white': form.type === type.value,
          'text-[color] bg-transparent': form.type !== type.value,
        }"
        @click="form.type = type.value"
        :style="
          form.type === type.value
            ? {
                borderColor: type.style.color,
                backgroundColor: type.style.color,
                color: type.style.color,
              }
            : {
                borderColor: type.style.color,
                textColor: type.style.color,
              }
        "
      >
        {{ type.label }}
      </div>
    </div>

    <!-- 글 내용 -->
    <textarea
      v-model="form.content"
      placeholder="글 내용을 입력하세요"
      class="w-full p-3 mb-4 border border-gray-300 rounded h-32"
    ></textarea>

    <!-- 작성 버튼 -->
    <button
      @click="submitForm"
      class="w-full p-3 text-white bg-gray-800 rounded hover:bg-gray-700 transition"
    >
      작성하기
    </button>
  </div>
</template>

<script setup>
import { reactive, onMounted, ref } from "vue";
import { useUserStore } from "@/stores/userStore";
import { writeArticle } from "@/api/board.js";
import { useRouter, useRoute } from "vue-router";

const userStore = useUserStore();

const userName = ref("");
const router = useRouter();
const route = useRoute();

onMounted(() => {
  if (userStore.user?.name) {
    userName.value = userStore.user?.name;
  }
});

const types = [
  {
    label: "긴급",
    value: "urgent",
    style: { borderColor: "#C0392B", color: "#C0392B" },
  },
  {
    label: "정보",
    value: "info",
    style: { borderColor: "#2980B9", color: "#2980B9" },
  },
  {
    label: "유머",
    value: "humor",
    style: { borderColor: "#27AE60", color: "#27AE60" },
  },
  {
    label: "친목",
    value: "friendship",
    style: { borderColor: "#F39C12", color: "#F39C12" },
  },
];

const form = reactive({
  title: "",
  writer: userName,
  type: "",
  content: "",
});

const submitForm = async () => {
  try {
    const response = await writeArticle(form.title, form.content, form.type);
    // console.log(response);
    router.push({ name: "board" });
  } catch (error) {
    console.error("검색 실패:", error);
    alert("검색 실패: 다시 시도해주세요.");
  }
};

const resetForm = () => {
  form.title = "";
  form.type = "";
  form.content = "";
};
</script>

<style scoped>
.bg-current {
  background-color: currentColor;
}
</style>
