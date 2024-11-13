<script setup>
import { KakaoMap, KakaoMapMarker } from "vue3-kakao-maps";
import HeadNavBar from "@/components/HeadNavBar.vue";
const coordinate = {
  lat: 37.566826,
  lng: 126.9786567,
};
</script>

<template>
  <div class="flex w-full h-full shadow-lg rounded-md">
    <KakaoMap
      :lat="coordinate.lat"
      :lng="coordinate.lng"
      :draggable="true"
      width="100%"
      height="100%"
    >
      <KakaoMapMarker
        :lat="coordinate.lat"
        :lng="coordinate.lng"
      ></KakaoMapMarker>
    </KakaoMap>
  </div>
</template>

<style scoped></style>
