import { defineStore } from "pinia";

export const useHouseStore = defineStore("houseStore", {
  state: () => ({
    selectedHouse: null, // 선택된 데이터 (초기값 null)
  }),

  actions: {
    setSelectedHouse(house) {
      this.selectedHouse = house;
      console.log("House 저장됨:", this.selectedHouse);
    },
  },
});
