<script setup>
import { ref, watch } from "vue";
import { useMapStore } from "@/stores/mapStore";
import { KakaoMap, KakaoMapMarker } from "vue3-kakao-maps";

// Pinia Store 가져오기
const mapStore = useMapStore();

const mapInstance = ref(); // KakaoMap 인스턴스 참조

// KakaoMap 로드 시 호출되는 핸들러
const onLoadKakaoMap = (mapRef) => {
  mapInstance.value = mapRef;
};

console.log(mapStore.selectedCoordinates);
// Watcher를 사용해 Pinia Store 좌표 변경 시 지도 부드러운 이동
watch(
  () => mapStore.selectedCoordinates,
  (newCoordinates) => {
    const lat = mapStore.selectedCoordinates.lat;
    const lng = mapStore.selectedCoordinates.lng;
    console.log(lat);
    console.log(lng);
    if (mapInstance.value) {
      // 지도 중심을 부드럽게 이동
      mapInstance.value.panTo(
        new kakao.maps.LatLng(newCoordinates.lat, newCoordinates.lng)
      );
    }
  },
  { immediate: true } // 초기 좌표를 반영하기 위해 즉시 실행
);
</script>

<template>
  <div class="flex w-full h-full shadow-lg rounded-md">
    <!-- KakaoMap 컴포넌트 -->
    <KakaoMap
      :lat="mapStore.selectedCoordinates.lat"
      :lng="mapStore.selectedCoordinates.lng"
      @onLoadKakaoMap="onLoadKakaoMap"
      :draggable="true"
      width="100%"
      height="100%"
    >
      <!-- 마커 -->
      <KakaoMapMarker
        :lat="mapStore.selectedCoordinates.lat"
        :lng="mapStore.selectedCoordinates.lng"
      ></KakaoMapMarker>
    </KakaoMap>
  </div>
</template>

<style scoped>
/* 필요 시 스타일 추가 */
</style>
