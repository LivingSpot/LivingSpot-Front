<script setup>
import { defineProps } from "vue";

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
});

console.log(props.data.title);

//  title: "title1",
//  content: "content1",
//  hit: 1,
//  writer: "ssafy",
//  date: "2022-12-28",
</script>

<template>
  <div
    class="cursor-pointer w-full bg-white flex flex-row justify-around shadow-md rounded-md hover:bg-pink-500"
  >
    <div>{{ props.data.title }}</div>
    <div>{{ props.data.content }}</div>
    <div>{{ props.data.hit }}</div>
    <div>{{ props.data.writer }}</div>
    <div>{{ props.data.date }}</div>
  </div>
</template>

<style scoped></style>
