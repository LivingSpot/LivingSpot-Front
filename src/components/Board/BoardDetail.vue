<template>
  <div v-if="item" class="">
    <div class="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg">
      <!-- Header -->
      <div class="flex justify-between items-center mb-6">
        <h1 v-if="!isEditable" class="text-2xl font-bold text-gray-800">
          게시글 상세정보
        </h1>
        <h1 v-if="isEditable" class="text-2xl font-bold text-gray-800">
          게시글 수정
        </h1>
        <button @click="goBack" class="text-blue-600 hover:underline text-sm">
          목록으로 돌아가기
        </button>
      </div>

      <!-- Details -->
      <!-- Post Details -->
      <div v-if="!isEditable" class="space-y-6">
        <!-- Type -->
        <div class="flex items-center space-x-2 font-extrabold">
          <span
            :class="[
              'px-3 py-1 text-sm font-medium rounded-full shadow-md',
              item.typeColor,
            ]"
          >
            <div v-if="item.typeLabel == '정보'" class="font-extrabold">
              <font-awesome-icon icon="fa-solid fa-circle-info" class="mr-1" />
              정보
            </div>
            <div v-if="item.typeLabel == '긴급'" class="font-extrabold">
              <font-awesome-icon
                icon="fa-solid fa-tower-broadcast"
                class="mr-1"
              />
              긴급
            </div>
            <div v-if="item.typeLabel == '유머'" class="font-extrabold">
              <font-awesome-icon icon="fa-solid fa-face-smile" class="mr-1" />
              유머
            </div>
            <div v-if="item.typeLabel == '친목'" class="font-extrabold">
              <font-awesome-icon icon="fa-solid fa-person" class="mr-1" />
              친목
            </div>
          </span>
        </div>

        <!-- Title -->
        <div>
          <label class="block text-gray-500 text-sm font-medium mb-1"
            >제목</label
          >
          <div
            class="bg-gray-100 px-4 py-3 rounded-lg text-lg text-gray-900 font-semibold"
          >
            {{ item.title }}
          </div>
        </div>

        <!-- Writer -->
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-gray-500 text-sm font-medium mb-1"
              >작성자</label
            >
            <div class="bg-gray-100 px-4 py-3 rounded-lg text-gray-700">
              {{ writerName }}
            </div>
          </div>
          <div>
            <label class="block text-gray-500 text-sm font-medium mb-1"
              >조회수</label
            >
            <div class="bg-gray-100 px-4 py-3 rounded-lg text-gray-700">
              {{ item.hit }}
            </div>
          </div>
        </div>

        <!-- Views -->
        <div>
          <label class="block text-gray-500 text-sm font-medium mb-1"
            >작성 날짜</label
          >
          <div class="bg-gray-100 px-4 py-3 rounded-lg text-gray-700">
            {{ item.registerTime }}
          </div>
        </div>

        <!-- Content -->
        <div>
          <label class="block text-gray-500 text-sm font-medium mb-1"
            >내용</label
          >
          <div class="bg-gray-100 px-4 py-3 rounded-lg text-gray-800">
            {{ item.content }}
          </div>
        </div>
      </div>

      <!-- Editable Form -->
      <div v-if="isEditable" class="space-y-4 mt-6">
        <form class="flex flex-col gap-y-5">
          <!-- Type Selection -->
          <div>
            <label class="block text-sm font-medium text-gray-600 mb-1"
              >유형</label
            >
            <div class="flex gap-3">
              <div
                v-for="(type, key) in types"
                :key="key"
                class="px-4 py-2 text-sm rounded-full shadow-md cursor-pointer transition font-semibold"
                :class="{
                  [type.color]: form.type === key,
                  'bg-gray-100 text-gray-600': form.type !== key,
                }"
                @click="form.type = key"
              >
                {{ type.label }}
              </div>
            </div>
          </div>

          <!-- Title -->
          <div>
            <label class="block text-sm font-medium text-gray-600 mb-1"
              >제목</label
            >
            <input
              v-model="item.title"
              type="text"
              class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>

          <!-- Content -->
          <div>
            <label class="block text-sm font-medium text-gray-600 mb-1"
              >내용</label
            >
            <textarea
              v-model="item.content"
              rows="4"
              class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
            ></textarea>
          </div>
        </form>
      </div>

      <!-- Actions -->
      <div class="mt-6 flex justify-end space-x-4">
        <button
          v-if="!isEditable"
          @click="editPost"
          class="px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
        >
          수정
        </button>
        <button
          v-if="isEditable"
          @click="onEdit"
          class="px-6 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700"
        >
          저장
        </button>
        <button
          v-if="isEditable"
          @click="isEditable = false"
          class="px-6 py-2 bg-red-600 text-white rounded-lg shadow hover:bg-red-700"
        >
          취소
        </button>
        <button
          v-if="!isEditable"
          @click="deletePost"
          class="px-6 py-2 bg-red-600 text-white rounded-lg shadow hover:bg-red-700"
        >
          삭제
        </button>
      </div>
    </div>
  </div>
  <div v-else class="text-center text-gray-500">로딩 중...</div>
</template>

<script setup>
import { ref, onMounted, watch, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useUserStore } from "@/stores/userStore";
import {
  searchOneArticle,
  deleteArticle,
  changeToName,
  updateArticle,
} from "@/api/board.js";

const route = useRoute();
const router = useRouter();
const userName = ref(null);

const userStore = useUserStore();
onMounted(() => {
  if (userStore.user?.name) {
    userName.value = userStore.user?.name;
  }
});
const typese = [
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
const writerName = ref(null);
const isEditable = ref(false);

const form = reactive({
  title: "",
  writer: "",
  type: "",
  content: "",
});
const types = {
  urgent: { label: "긴급", color: "bg-red-500 text-white" },
  info: { label: "정보", color: "bg-blue-500 text-white" },
  humor: { label: "유머", color: "bg-green-500 text-white" },
  friendship: { label: "친목", color: "bg-yellow-500 text-white" },
};

// const types = [
//   {
//     label: "긴급",
//     value: "urgent",
//     style: { borderColor: "#C0392B", color: "#C0392B" },
//   },
//   {
//     label: "정보",
//     value: "info",
//     style: { borderColor: "#2980B9", color: "#2980B9" },
//   },
//   {
//     label: "유머",
//     value: "humor",
//     style: { borderColor: "#27AE60", color: "#27AE60" },
//   },
//   {
//     label: "친목",
//     value: "friendship",
//     style: { borderColor: "#F39C12", color: "#F39C12" },
//   },
// ];

onMounted(() => {
  search();
});
async function search() {
  try {
    const articleNo = parseInt(route.params.articleNo);
    const response = await searchOneArticle(articleNo);
    console.log("articleNo :::" + articleNo);
    item.value = response.data;
    const response2 = await changeToName(item.value.id);
    // console.log(response.data);
    writerName.value = response2.data;
    console.log(item.value);
    form.type = item.value.type;

    item.value.typeLabel = types[item.value.type].label;
    item.value.typeColor = types[item.value.type].color;
    console.log(item.value);
  } catch (error) {
    console.error("검색 실패:", error);
    alert("검색 실패: 다시 시도해주세요.");
  }
}

async function deleteA() {
  try {
    const articleNo = parseInt(route.params.articleNo);
    const response = await deleteArticle(articleNo);
    item.value = response.data;
  } catch (error) {
    console.error("검색 실패:", error);
    alert("검색 실패: 다시 시도해주세요.");
  }
}

const goBack = () => {
  router.push({ name: "board" });
};

const editPost = () => {
  isEditable.value = !isEditable.value;
};

const deletePost = () => {
  if (confirm("정말 이 글을 삭제하시겠습니까?")) {
    alert("글이 삭제되었습니다.");
    deleteA();
    goBack();
    router.push({ name: "board" });
  }
};

const onEdit = async () => {
  try {
    const articleNo = parseInt(route.params.articleNo);

    const response = await updateArticle(
      articleNo,
      item.value.title,
      item.value.content,
      form.type
    );
    router.push({ name: "board" });
  } catch (error) {
    console.error("검색 실패:", error);
    alert("검색 실패: 다시 시도해주세요.");
  }
};
</script>
