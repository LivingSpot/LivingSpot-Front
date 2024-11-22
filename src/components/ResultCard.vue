<script setup>
import { defineProps } from "vue";
import { useMapStore } from "@/stores/mapStore";
import { useHouseStore } from "@/stores/house";

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
});

// Pinia Store 가져오기
const houseStore = useHouseStore();
const mapStore = useMapStore();

// 좌표 및 매물 데이터 업데이트
const emitCoordinates = () => {
  mapStore.setCoordinates(
    parseFloat(props.data.houseInfo.latitude),
    parseFloat(props.data.houseInfo.longitude)
  );
  houseStore.setSelectedHouse(props.data);
};

// 금액 포매터
const formatAmount = (amount) => {
  amount += "0000";
  const number = parseInt(amount.replace(/,/g, ""));
  let result = "";

  if (number >= 100000000) {
    result += Math.floor(number / 100000000) + "억 ";
  }

  const remainder = number % 100000000;
  if (remainder >= 1000000) {
    result += Math.floor(remainder / 10000) + "만 ";
  }

  return result || "0";
};
</script>

<template>
  <div
    @click="emitCoordinates"
    class="card-container cursor-pointer hover:shadow-xl transition-all duration-300"
  >
    <div class="card-header">
      <h2 class="apt-name">{{ data.houseInfo.aptNm }}</h2>
      <p class="location text-gray-500">
        {{ data.houseInfo.umdNm }} · {{ data.houseInfo.roadNm }}
      </p>
    </div>
    <div class="card-body">
      <!-- <div class="info-row">
        <span class="info-label">거래일</span>
        <span class="info-value"
          >{{ data.dealYear }}년 {{ data.dealMonth }}월
          {{ data.dealDay }}일</span
        >
      </div> -->
      <!-- <div class="info-row">
        <span class="info-label">층</span>
        <span class="info-value">{{ data.floor }}층</span>
      </div> -->
      <div class="info-row">
        <span class="info-label">전용면적</span>
        <span class="info-value">{{ data.excluUseAr }}㎡</span>
      </div>
      <div class="info-row">
        <span class="info-label">거래금액</span>
        <span class="info-value text-red-500 font-bold">{{
          formatAmount(data.dealAmount)
        }}</span>
      </div>
      <!-- <div class="info-row">
        <span class="info-label">건축년도</span>
        <span class="info-value">{{ data.houseInfo.buildYear }}년</span>
      </div> -->
    </div>
  </div>
</template>

<style scoped>
.card-container {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1.5rem;
  border: 1px solid #eaeaea;
  border-radius: 12px;
  background-color: #ffffff;
  transition: box-shadow 0.3s ease-in-out;
}

.card-header {
  border-bottom: 1px solid #eaeaea;
  padding-bottom: 0.5rem;
  margin-bottom: 0.5rem;
}

.apt-name {
  font-size: 1.25rem;
  font-weight: bold;
  color: #333333;
}

.location {
  font-size: 0.875rem;
  margin-top: 0.25rem;
}

.card-body {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.info-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.875rem;
}

.info-label {
  color: #666666;
  font-weight: 500;
}

.info-value {
  color: #333333;
}
</style>
