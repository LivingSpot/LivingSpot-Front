import { defineStore } from "pinia";

export const useMapStore = defineStore("mapStore", {
  state: () => ({
    selectedCoordinates: {
      lat: 37.566826, // 초기 위도 (기본 위치)
      lng: 126.9786567, // 초기 경도 (기본 위치)
    },
  }),

  actions: {
    setCoordinates(lat, lng) {
      this.selectedCoordinates.lat = lat;
      this.selectedCoordinates.lng = lng;
    },
  },
});
