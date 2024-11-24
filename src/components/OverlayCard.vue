<script setup>
import { useHouseStore } from "@/stores/house";
import { computed, ref } from "vue";
import axios from "@/plugins/axios";

// Pinia Store
const houseStore = useHouseStore();

// 평수 계산
const computedExcluUseAr = computed(() => {
  return Math.floor(houseStore.selectedHouse.excluUseAr / 3.3058);
});

// Access Token 가져오기
const getAccessToken = () => {
  return localStorage.getItem("access_token") || ""; // 로컬 스토리지에서 access_token 가져오기
};

// 금액 포맷
const formatAmount = (amount) => {
  amount += "0000";
  const number = parseInt(amount.replace(/,/g, ""));
  let result = "";

  if (number >= 100000000) {
    result += Math.floor(number / 100000000) + "억 ";
  }

  const remainder = number % 100000000;
  if (remainder >= 1000000) {
    result += Math.floor(remainder / 10000) + "만";
  }

  return result || "0";
};

// 찜하기 상태
const isLiked = ref(false);
const aptSeq = computed(
  () => houseStore.selectedHouse?.houseInfo?.aptSeq || null
); // 선택된 아파트 ID

// 서버와 찜 상태 동기화
const syncLikeStatus = async () => {
  if (!aptSeq.value) return;

  try {
    // 서버에 찜 상태를 요청하는 API가 있다고 가정 (옵션 기능)
    // const response = await axios.get(`/favorite/status?aptSeq=${aptSeq.value}`);
    // isLiked.value = response.data.isLiked;
    console.log("Fetched initial favorite status"); // 실제 API가 있다면 위 코드를 활성화
  } catch (error) {
    console.error("Failed to fetch like status:", error);
  }
};

// 찜하기 토글
const toggleLike = async () => {
  if (!aptSeq.value) return;

  try {
    // 서버로 POST 요청 전송
    await axios.post("/favorite/toggle", null, {
      params: { aptSeq: aptSeq.value },
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });

    // 로컬 상태 업데이트
    isLiked.value = !isLiked.value;
  } catch (error) {
    console.error("Failed to toggle like:", error);
  }
};

// 컴포넌트가 로드될 때 찜 상태 동기화
syncLikeStatus();
</script>

<template>
  <div v-if="houseStore.selectedHouse" class="overlay-card">
    <!-- 헤더 -->
    <div class="header">
      <h2 class="apt-name">
        {{ houseStore.selectedHouse?.houseInfo?.aptNm }}
        <span class="floor">({{ houseStore.selectedHouse?.floor }}층)</span>
      </h2>
      <div class="location">
        {{ houseStore.selectedHouse?.houseInfo?.umdNm }} ·
        {{ houseStore.selectedHouse?.houseInfo.roadNm }}
        {{ houseStore.selectedHouse?.houseInfo.roadNmBonbun }}
      </div>
    </div>

    <!-- 주요 데이터 -->
    <div class="details-container">
      <!-- 왼쪽 열 -->
      <div class="details-column">
        <div class="info-box" data-aos="fade-right">
          <div class="info-label">거래 금액</div>
          <div class="info-value text-primary">
            {{ formatAmount(houseStore.selectedHouse.dealAmount) }}원
          </div>
        </div>
        <div class="info-box" data-aos="fade-right">
          <div class="info-label">전용면적</div>
          <div class="info-value">
            {{ computedExcluUseAr }}평 ({{
              houseStore.selectedHouse.excluUseAr
            }}㎡)
          </div>
        </div>
      </div>

      <!-- 오른쪽 열 -->
      <div class="details-column">
        <div class="info-box" data-aos="fade-left">
          <div class="info-label">건축 연도</div>
          <div class="info-value">
            {{ houseStore.selectedHouse?.houseInfo.buildYear }}년
          </div>
        </div>
        <div class="info-box" data-aos="fade-left">
          <div class="info-label">지번</div>
          <div class="info-value">
            {{ houseStore.selectedHouse?.houseInfo.jibun }}
          </div>
        </div>
      </div>
    </div>

    <!-- 하단 액션 -->
    <div class="actions" data-aos="zoom-in">
      <button
        class="like-button"
        :class="{ liked: isLiked }"
        @click="toggleLike"
      >
        <span v-if="isLiked">❤️ 찜하기 완료</span>
        <span v-else>🤍 찜하기</span>
      </button>
    </div>
  </div>
</template>

<style scoped>
/* 전체 카드 스타일 */
.overlay-card {
  width: 100%;
  max-width: 500px;
  padding: 1rem;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  background: #ffffff;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  animation: fadeIn 0.5s ease-in-out;
}

/* 헤더 */
.header {
  border-bottom: 1px solid #eaeaea;
  padding-bottom: 0.5rem;
}

.apt-name {
  font-size: 1.5rem;
  font-weight: bold;
  color: #333333;
}

.floor {
  font-size: 1rem;
  color: #666666;
  margin-left: 0.25rem;
}

.location {
  font-size: 0.875rem;
  color: #888888;
  margin-top: 0.25rem;
}

/* 주요 데이터 */
.details-container {
  display: flex;
  flex-direction: row;
  gap: 1.5rem;
}

.details-column {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.info-box {
  display: flex;
  flex-direction: column;
  font-size: 0.875rem;
}

.info-label {
  color: #666666;
  font-weight: 500;
}

.info-value {
  color: #333333;
  font-weight: bold;
  margin-top: 0.25rem;
}

.text-primary {
  color: #e63946;
}

/* 하단 액션 */
.actions {
  display: flex;
  justify-content: center;
  margin-top: 1rem;
}

.like-button {
  background: #f8f9fa;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.3s ease, color 0.3s ease;
}

.like-button:hover {
  background: #e63946;
  color: #ffffff;
}

.like-button.liked {
  background: #e63946;
  color: #ffffff;
}

/* 애니메이션 */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
