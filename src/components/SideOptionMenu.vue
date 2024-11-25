<template>
  <div v-if="route.name === 'main'" class="h-full w-full">
    <div
      v-if="showForm"
      class="h-full flex flex-col justify-center bg-gradient-to-br from-white to-gray-100 p-6 rounded-lg shadow-lg"
    >
      <h2 class="text-2xl font-bold text-center mb-6 text-gray-800">
        상세 검색
      </h2>
      <form class="space-y-6">
        <!-- 지역 선택 -->
        <div>
          <label class="block text-gray-700 font-medium mb-2">지역 정보</label>
          <div class="flex gap-y-2 flex-col">
            <select
              v-model="selectedOptions.sido"
              @change="onSelectChange('sido')"
              class="w-full px-4 py-3 rounded-md bg-white border border-gray-300 shadow-sm focus:ring focus:ring-blue-300"
            >
              <option value="">시도선택</option>
              <option
                v-for="option in findSelectOptions('sido')"
                :key="option.value"
                :value="option.value"
              >
                {{ option.text }}
              </option>
            </select>
            <select
              v-model="selectedOptions.gugun"
              @change="onSelectChange('gugun')"
              class="w-full px-4 py-3 rounded-md bg-white border border-gray-300 shadow-sm focus:ring focus:ring-blue-300"
            >
              <option value="">구군선택</option>
              <option
                v-for="option in findSelectOptions('gugun')"
                :key="option.value"
                :value="option.value"
              >
                {{ option.text }}
              </option>
            </select>
            <select
              v-model="selectedOptions.dong"
              class="w-full px-4 py-3 rounded-md bg-white border border-gray-300 shadow-sm focus:ring focus:ring-blue-300"
            >
              <option value="">동선택</option>
              <option
                v-for="option in findSelectOptions('dong')"
                :key="option.value"
                :value="option.value"
              >
                {{ option.text }}
              </option>
            </select>
          </div>
        </div>

        <!-- 날짜 선택 -->
        <div>
          <label class="block text-gray-700 font-medium mb-2">날짜 정보</label>
          <div class="flex space-x-4">
            <select
              v-model="selectedOptions.year"
              @change="onSelectChange('year')"
              class="w-1/2 px-4 py-3 rounded-md bg-white border border-gray-300 shadow-sm focus:ring focus:ring-blue-300"
            >
              <option value="">매매년선택</option>
              <option
                v-for="option in findSelectOptions('year')"
                :key="option.value"
                :value="option.value"
              >
                {{ option.text }}
              </option>
            </select>
            <select
              v-model="selectedOptions.month"
              class="w-1/2 px-4 py-3 rounded-md bg-white border border-gray-300 shadow-sm focus:ring focus:ring-blue-300"
            >
              <option value="">매매월선택</option>
              <option
                v-for="option in findSelectOptions('month')"
                :key="option.value"
                :value="option.value"
              >
                {{ option.text }}
              </option>
            </select>
          </div>
        </div>

        <!-- 아파트 이름 -->
        <div>
          <label class="block text-gray-700 font-medium mb-2">이름 정보</label>
          <input
            type="text"
            v-model="aptNameInput"
            placeholder="이름으로 검색.."
            class="w-full px-4 py-3 rounded-md bg-white border border-gray-300 shadow-sm focus:ring focus:ring-blue-300"
          />
        </div>

        <!-- 검색 버튼 -->
        <div class="text-center">
          <button
            type="button"
            @click="onSearchDetail"
            class="px-6 py-3 text-white bg-blue-500 hover:bg-blue-600 rounded-lg shadow-md transition"
          >
            검색하기
          </button>
        </div>
      </form>
    </div>
    <!-- 검색 결과 -->
    <div v-else class="w-full px-2 h-full overflow-hidden">
      <!-- 검색 결과 헤더 -->
      <div
        class="relative h-[7%] font-extrabold text-xl flex items-center justify-center mb-3 mt-10"
      >
        <font-awesome-icon
          icon="fa-solid fa-arrow-left"
          class="absolute left-2 cursor-pointer"
          @click="onBackToSearch"
        />
        검색 결과
      </div>

      <!-- 결과 리스트 -->
      <div class="h-full overflow-y-auto scrollbar-hide -mt-5">
        <v-infinite-scroll
          color="secondary"
          height="730"
          @load="load"
          class="flex gap-y-2 h-full scrollbar-hide"
        >
          <ResultCard v-for="list in displayedList" :data="list" />
          <!-- <ResultCard :data="list" />
        </ResultCard> -->
          <template v-slot:empty>
            <v-alert type="warning">No more items!</v-alert>
          </template>
          <!-- <ResultCard v-for="item in displayedList" :key="item.id" :data="item" /> -->
        </v-infinite-scroll>
      </div>
    </div>
  </div>
  <!-- 찜 목록 화면 -->
  <div v-else class="h-full w-full">
    <div class="w-full px-2 h-full overflow-hidden">
      <!-- 찜 목록 헤더 -->
      <div
        class="relative h-[7%] font-extrabold text-xl flex items-center justify-center mb-4 mt-10"
      >
        <font-awesome-icon
          :icon="['fas', 'fa-heart']"
          class="mr-2 text-red-500"
        />
        찜 목록
        <font-awesome-icon
          :icon="['fas', 'fa-heart']"
          class="ml-2 text-red-500"
        />
      </div>

      <!-- 찜 목록 결과 리스트 -->
      <div class="overflow-y-auto h-[730px] scrollbar-hide -mt-5">
        <div v-if="!isLoading">
          <div v-if="favoriteList.length > 0" class="gap-y-2 flex flex-col">
            <FavoriteResultCard
              v-for="item in displayedList"
              :key="item.aptSeq"
              :data="formatFavoriteData(item)"
            />
          </div>
          <div v-else class="text-center py-8 text-gray-500">
            찜한 매물이 없습니다.
          </div>
        </div>
        <div v-else class="text-center py-8">
          <span class="text-gray-500">로딩 중...</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from "@/plugins/axios";
import { ref, reactive, onMounted, onUnmounted, nextTick, watch } from "vue";
import { searchDetail } from "@/api/search.js";
import ResultCard from "@/components/ResultCard.vue";
import FavoriteResultCard from "@/components/FavoriteResultCard.vue";
import { useRouter, useRoute } from "vue-router";

import "v3-infinite-loading/lib/style.css";

const router = useRouter();
const route = useRoute();
const isOpened = ref(false);

// 상태 변수들
const showForm = ref(true);
const list = ref([]); // 전체 데이터
const favoriteList = ref([]); // 서버에서 가져온 찜 목록 전체 데이터
const displayedList = ref([]); // 화면에 보여질 데이터
const currentPage = ref(1); // 현재 페이지
const itemsPerPage = ref(5); // 페이지당 아이템 수
const isLoading = ref(false); // 로딩 상태
const hasMore = ref(true); // 추가 데이터 여부
const aptNameInput = ref("");
const maxLen = ref(0);
const isLoadingFinish = ref(false); // 더 이상 로딩할 것이 없다는 것
const start = ref(5);
const end = ref(10);

// 찜 목록 데이터 포맷팅 함수
const formatFavoriteData = (item) => {
  return {
    houseInfo: {
      aptNm: item.aptNm,
      umdNm: item.umdNm,
      roadNm: item.roadNm,
      jibun: item.jibun,
      latitude: item.latitude,
      longitude: item.longitude,
      buildYear: item.buildYear,
      floor: item.floor,
      no: item.no,
      excluUseAr: item.excluUseAr,
      dealAmount: item.dealAmount,
      aptSeq: item.aptSeq,
    },
  };
};

// 찜 목록 가져오기
const fetchFavoriteList = async () => {
  isLoading.value = true;
  try {
    const response = await axios.get("/favorite/list", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    });

    console.log(response.data);

    if (response.data && response.data.favoriteHouses) {
      favoriteList.value = response.data.favoriteHouses;
      displayedList.value = favoriteList.value.slice(0, itemsPerPage.value);
    } else {
      favoriteList.value = [];
      displayedList.value = [];
    }
  } catch (error) {
    console.error("찜 목록 가져오기 실패:", error);
    favoriteList.value = [];
    displayedList.value = [];
  } finally {
    isLoading.value = false;
  }
};

// 무한 스크롤 데이터 로드
const loadMoreFavorites = ({ done }) => {
  setTimeout(() => {
    if (isLoadingFinish.value) {
      done("empty");
      return;
    }

    const nextStart = start.value;
    const nextEnd = Math.min(end.value, maxLen.value);

    if (nextStart >= maxLen.value) {
      isLoadingFinish.value = true;
      done("empty");
      return;
    }

    const newItems = favoriteList.value.slice(nextStart, nextEnd);
    if (newItems.length > 0) {
      displayedList.value.push(...newItems);
      console.log("Added new items:", newItems);
      start.value = nextEnd;
      end.value = nextEnd + itemsPerPage.value;
    }

    if (nextEnd >= maxLen.value) {
      isLoadingFinish.value = true;
    }

    done("ok");
  }, 1000);
};

const load = ({ done }) => {
  setTimeout(() => {
    if (isLoadingFinish.value) {
      done("empty");
    } else {
      console.log("MAXLENGTH ::: " + maxLen.value);
      if (end.value > maxLen.value) {
        end.value = maxLen.value;
        isLoadingFinish.value = true;
      }
      displayedList.value.push(...list.value.slice(start.value, end.value));
      console.log("displayedList ::: " + displayedList.value);
      start.value = end.value;
      end.value += itemsPerPage.value;
      done("ok"); // Indicates that loading is complete
    }
  }, 1000);
};
const selectedOptions = reactive({
  sido: "",
  gugun: "",
  dong: "",
  year: "",
  month: "",
});

const selects = reactive([
  { id: "sido", defaultText: "시도선택", options: [] },
  { id: "gugun", defaultText: "구군선택", options: [] },
  { id: "dong", defaultText: "동선택", options: [] },
  {
    id: "year",
    defaultText: "매매년선택",
    options: generateYearOptions(),
  },
  { id: "month", defaultText: "매매월선택", options: [] },
]);

// route 변경 감지하여 찜 목록 데이터 로드
watch(
  () => route.name,
  (newRouteName) => {
    if (newRouteName === "favorite") {
      fetchFavoriteList();
    }
  }
);

// onMounted에서 fetchFavoriteList 제거
onMounted(() => {
  fetchRegionData("sido", "*00000000");
  // 현재 route가 favorite인 경우에만 데이터 로드
  if (route.name === "favorite") {
    fetchFavoriteList();
  }
});

// 검색 버튼 클릭
async function onSearchDetail() {
  try {
    // 검색 API 호출
    const params = {
      dong: selectedOptions.dong || "",
      aptName: aptNameInput.value || "",
      year: selectedOptions.year || -1,
      month: selectedOptions.month || -1,
    };

    const response = await searchDetail(
      params.dong,
      params.aptName,
      params.year,
      params.month
    );

    list.value = response.data; // 전체 데이터를 저장
    // console.log(list.value);
    console.log("FETCH 해온 결과 리스트의 길이 ::: " + list.value.length);
    maxLen.value = list.value.length;
    displayedList.value = list.value.slice(0, itemsPerPage.value); // 첫 5개 데이터 표시
    hasMore.value = list.value.length > itemsPerPage.value;
    showForm.value = false;
  } catch (error) {
    console.error("검색 실패:", error);
    alert("검색 실패: 다시 시도해주세요.");
  }
}

// // 옵션 초기화
function resetOptions(type) {
  if (type === "sido") {
    selects.find((select) => select.id === "gugun").options = [
      { value: "", text: "구군선택" },
    ];
    selects.find((select) => select.id === "dong").options = [
      { value: "", text: "동선택" },
    ];
  } else if (type === "gugun") {
    selects.find((select) => select.id === "dong").options = [
      { value: "", text: "동선택" },
    ];
  }
}

// // 지역 데이터 API 호출
function fetchRegionData(type, regcode) {
  const url = `https://grpc-proxy-server-mkvo6j4wsq-du.a.run.app/v1/regcodes?regcode_pattern=${regcode}&is_ignore_zero=true`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => updateSelectOptions(type, data.regcodes));
}
// // 옵션 갱신
function updateSelectOptions(type, regcodes) {
  const options = regcodes.map((regcode) => ({
    value: regcode.code,
    text: formatRegionName(type, regcode.name),
  }));
  const targetSelect = selects.find((select) => select.id === type);
  if (targetSelect)
    targetSelect.options = [
      { value: "", text: targetSelect.defaultText },
      ...options,
    ];
}

// // 선택 변경 처리
function onSelectChange(type) {
  if (type === "year") {
    selects.find((select) => select.id === "month").options =
      generateMonthOptions(selectedOptions.year);
  } else if (type === "sido" && selectedOptions.sido) {
    fetchRegionData("gugun", `${selectedOptions.sido.substr(0, 2)}*00000`);
  } else if (type === "gugun" && selectedOptions.gugun) {
    fetchRegionData("dong", `${selectedOptions.gugun.substr(0, 5)}*`);
  } else {
    resetOptions(type);
  }
}

// // 유틸리티 함수
function generateYearOptions() {
  const currentYear = new Date().getFullYear();
  return Array.from({ length: 20 }, (_, i) => {
    const year = currentYear - i;
    return { value: year, text: `${year}년` }; // 템플릿 리터럴로 수정
  });
}

function generateMonthOptions(year) {
  const currentYear = new Date().getFullYear();
  const maxMonth = year == currentYear ? new Date().getMonth() + 1 : 12;
  return Array.from({ length: maxMonth }, (_, i) => {
    const month = i + 1;
    return { value: month < 10 ? `0${month}` : month, text: `${month}월` };
  });
}

function formatRegionName(type, name) {
  const nameParts = name.split(" ");
  if (type === "sido") return nameParts[0];
  if (type === "gugun") {
    return nameParts.length === 2
      ? nameParts[1]
      : `${nameParts[1]} ${nameParts[2]}`; // 템플릿 리터럴로 수정
  }
  return nameParts.length === 3 ? nameParts[2] : nameParts[3];
}

function findSelectOptions(type) {
  return selects.find((select) => select.id === type)?.options || [];
}

function onBackToSearch() {
  showForm.value = true;
  isLoadingFinish.value = false; // 더 이상 로딩할 것이 없다는 것
  start.value = 5;
  end.value = 10;
  itemsPerPage.value = 5;
}
</script>

<style>
.custom-select,
.custom-input {
  flex: 1;
  padding: 0.75rem;
  font-size: 1rem;
  border: 1px solid #eaeaea;
  border-radius: 8px;
  background: #ffffff;
  transition: border-color 0.3s ease;
}

.custom-select:focus,
.custom-input:focus {
  border-color: #007bff;
  outline: none;
}
</style>
