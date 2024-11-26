<script setup>
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
import { useMapStore } from "@/stores/mapStore";
import OverlayCard from "@/components/OverlayCard.vue";
import FavoriteOverlayCard from "@/components/FavoriteOverlayCard.vue";

import {
  KakaoMap,
  KakaoMapMarker,
  KakaoMapCustomOverlay,
} from "vue3-kakao-maps";

const route = useRoute();

// Pinia Store 가져오기
const mapStore = useMapStore();

const isFavorite = ref(true);

const visible = ref(true);
const mapInstance = ref(); // KakaoMap 인스턴스 참조
const overlay = ref();

// KakaoMap 로드 시 호출되는 핸들러
const onLoadKakaoMap = (mapRef) => {
  mapInstance.value = mapRef;
};

const onLoadKakaoMapCustomOverlay = (newCustomOverlay) => {
  overlay.value = newCustomOverlay;
};
const closeOverlay = () => {
  overlay?.value?.setMap(null);
};
// const onClickKakaoMapMarker = () => {
//   mapInstance.value && overlay?.value?.setMap(mapInstance.value);
// };

const onClickKakaoMapMarker = () => {
  visible.value = !visible.value;
};

const handleRemoveFavorite = (aptSeq) => {
  // 찜 제거 후 필요한 처리
  closeOverlay();
  // 필요한 경우 부모 컴포넌트에 이벤트 전달
  emit("favoriteRemoved", aptSeq);
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
        @onClickKakaoMapMarker="onClickKakaoMapMarker"
        :clickable="true"
        :image="{
          imageSrc: '/images/marker.png',
          imageWidth: 30,
          imageHeight: 52,
          imageOption: {},
        }"
      />
      <KakaoMapCustomOverlay
        :lat="mapStore.selectedCoordinates.lat"
        :lng="mapStore.selectedCoordinates.lng"
        :yAnchor="0"
        :xAnchor="0"
        @onLoadKakaoMapCustomOverlay="onLoadKakaoMapCustomOverlay"
        :visible="visible"
      >
        <OverlayCard v-if="route.name === 'main'" />
        <FavoriteOverlayCard v-else-if="route.name === 'favorite'" />
      </KakaoMapCustomOverlay>
    </KakaoMap>
  </div>
</template>

<style scoped>
/* 필요 시 스타일 추가 */
</style>
