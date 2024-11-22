<template>
  <div
    :class="[
      'py-3 px-6 rounded-lg cursor-pointer flex items-center transition-colors duration-300',
      isActive
        ? 'bg-blue-100 text-blue-700'
        : 'hover:bg-gray-100 text-gray-700',
    ]"
    @click="handleClick"
  >
    <font-awesome-icon :icon="icon" class="mr-3" />
    <span class="flex-1">{{ title }}</span>
    <font-awesome-icon
      v-if="isActive"
      icon="fa-solid fa-arrow-right"
      class="text-blue-700"
    />
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { computed } from "vue";

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  icon: {
    type: [Array, String],
    required: true,
  },
  routeName: {
    type: String,
    required: true,
  },
});

defineEmits(["click"]);

const route = useRoute();

// 현재 경로와 비교하여 활성화 상태를 계산
const isActive = computed(() => route.name === props.routeName);

const handleClick = () => {
  emit("click");
};
</script>
