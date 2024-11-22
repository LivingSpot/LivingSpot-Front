<template>
  <div class="w-full h-full flex flex-col rounded-md">
    <!-- Header -->
    <header class="bg-white text-black p-6 shadow-md rounded-md">
      <div class="container mx-auto flex justify-between items-center">
        <h1 class="text-2xl font-bold">커뮤니티</h1>
        <div>
          <span class="text-sm">안녕하세요, User님!</span>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="flex-grow container mx-auto mt-6 bg-white rounded-t-md">
      <!-- Post List -->
      <div class="bg-white h-[420px] rounded-t-md">
        <ul>
          <li
            v-for="post in posts"
            :key="post.id"
            class="border-b last:border-none p-4 hover:bg-gray-50"
          >
            <div class="flex justify-between">
              <div>
                <h2 class="font-semibold text-lg">{{ post.title }}</h2>
                <p class="text-sm text-gray-500">작성자: {{ post.author }}</p>
              </div>
              <span class="text-sm text-gray-400">{{ post.date }}</span>
            </div>
          </li>
        </ul>
      </div>

      <!-- Pagination -->
      <div class="flex justify-center mt-6">
        <button
          class="px-4 py-2 mx-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          v-for="page in totalPages"
          :key="page"
        >
          {{ page }}
        </button>
      </div>
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

<script>
export default {
  data() {
    return {
      posts: [
        { id: 1, title: "첫 번째 게시글", author: "User1", date: "2024-11-21" },
        { id: 2, title: "두 번째 게시글", author: "User2", date: "2024-11-20" },
        { id: 3, title: "세 번째 게시글", author: "User3", date: "2024-11-19" },
      ],
      totalPages: 5,
    };
  },
};
</script>

<style scoped>
/* Optional: Additional styles for custom elements */
</style>
