<script setup>
import { useHouseStore } from "@/stores/house";
import { computed, ref } from "vue";
import axios from "@/plugins/axios";

// Pinia Store
const houseStore = useHouseStore();

// 찜하기 상태
const isLiked = ref(true); // 기본값은 true

// API 호출에 필요한 데이터
const aptSeq = computed(
  () => houseStore.selectedHouse?.houseInfo?.aptSeq || null
);
const no = computed(() => houseStore.selectedHouse?.houseInfo?.no || null);

// Access Token 가져오기
const getAccessToken = () => {
  return localStorage.getItem("access_token") || "";
};

// 찜하기 취소
const removeFavorite = async () => {
  if (!no.value) {
    console.error("No house deal ID provided.");
    return;
  }

  try {
    // DELETE API 호출
    await axios.delete("/favorite/delete", {
      params: { houseDealNo: no.value },
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });

    // 찜 상태 변경
    isLiked.value = false;

    // 부모 컴포넌트에 이벤트 전달 (필요 시)
    emit("removeFavorite", no.value);
    console.log("찜하기 취소 성공!");
  } catch (error) {
    console.error("찜하기 취소 실패:", error);
  }
};

// 이벤트 정의
const emit = defineEmits(["removeFavorite"]);

// 금액 포맷 함수
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
</script>

<template>
  <div v-if="houseStore.selectedHouse" class="overlay-card">
    <!-- 헤더 -->
    <div class="header">
      <h2 class="apt-name">
        {{ houseStore.selectedHouse.houseInfo.aptNm }}
        <span class="floor"
          >({{ houseStore.selectedHouse.houseInfo.floor }}층)</span
        >
      </h2>
      <div class="location">
        {{ houseStore.selectedHouse.houseInfo.umdNm }} ·
        {{ houseStore.selectedHouse.houseInfo.roadNm }}
        {{ houseStore.selectedHouse.houseInfo.jibun }}
      </div>
    </div>

    <!-- 주요 데이터 -->
    <div class="details-container">
      <!-- 왼쪽 열 -->
      <div class="details-column">
        <div class="info-box">
          <div class="info-label">거래 금액</div>
          <div class="info-value text-primary">
            {{ formatAmount(houseStore.selectedHouse.houseInfo.dealAmount) }}원
          </div>
        </div>
        <div class="info-box">
          <div class="info-label">전용면적</div>
          <div class="info-value">
            {{ houseStore.selectedHouse.houseInfo.excluUseAr }}㎡
          </div>
        </div>
      </div>

      <!-- 오른쪽 열 -->
      <div class="details-column">
        <div class="info-box">
          <div class="info-label">건축 연도</div>
          <div class="info-value">
            {{ houseStore.selectedHouse.houseInfo.buildYear }}년
          </div>
        </div>
        <div class="info-box">
          <div class="info-label">지번</div>
          <div class="info-value">
            {{ houseStore.selectedHouse.houseInfo.jibun }}
          </div>
        </div>
      </div>
    </div>

    <!-- 하단 액션 -->
    <div class="actions" data-aos="zoom-in">
      <button
        class="like-button"
        :class="{ liked: isLiked }"
        @click="removeFavorite"
      >
        <span v-if="isLiked">❤️ 찜하기 취소</span>
        <span v-else>🤍 찜하기</span>
      </button>
    </div>
  </div>
</template>

<style scoped>
/* 기존 OverlayCard의 스타일을 그대로 사용 */
.overlay-card {
  width: 100%;
  max-width: 500px;
  padding: 1rem 1.5rem;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  background: #ffffff;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  animation: fadeIn 0.5s ease-in-out;
}

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

.details-container {
  display: flex;
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
  transition: all 0.3s ease;
}

.like-button.liked {
  background: #e63946;
  color: #ffffff;
}

.like-button:not(.liked):hover {
  background: #e9ecef;
  color: #495057;
}

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
