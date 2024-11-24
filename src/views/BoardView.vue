<template>
  <div class="w-full h-full flex flex-col rounded-md">
    <!-- Header -->
    <header class="bg-white text-black p-4 shadow-md rounded-md">
      <div class="container mx-auto flex justify-between items-center">
        <h1 class="text-2xl font-bold">커뮤니티</h1>
        <div>
          <span class="text-sm">안녕하세요, User님!</span>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="p-4 flex-grow container mx-auto mt-6 bg-white rounded-t-md">
      <!-- Post List -->
      <BoardList />

      <!-- Pagination -->
    </main>

    <!-- Footer -->
    <footer class="bg-white border-t p-4 flex h-[70px] w-full rounded-b-md">
      <div class="container mx-auto text-end mr-2">
        <button
          class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          글쓰기
        </button>
      </div>
    </footer>
  </div>
</template>

<script setup>
import BoardList from "@/components/Board/BoardList.vue";
</script>

<style scoped>
/* Optional: Additional styles for custom elements */
</style>
