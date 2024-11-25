<template>
  <div class="w-full h-full flex flex-col rounded-md">
    <!-- Header -->
    <header class="bg-gray-50 text-black p-4 shadow-md rounded-t-md">
      <div class="container mx-auto flex justify-between items-center">
        <h1 class="text-2xl font-bold">커뮤니티</h1>
        <div>
          <span class="text-sm">안녕하세요, User님!</span>
        </div>
      </div>
    </header>

    <!-- Post List -->
    <BoardList />
  </div>
</template>

<script setup>
import BoardList from "@/components/Board/BoardList.vue";
</script>

<style scoped>
/* Optional: Additional styles for custom elements */
</style>
