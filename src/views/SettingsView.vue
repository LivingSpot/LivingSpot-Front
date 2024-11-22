<template>
  <div class="h-full w-full">
    <!-- Header -->
    <header class="bg-white text-black p-6 shadow-md rounded-md">
      <div class="container mx-auto flex justify-between items-center">
        <h1 class="text-2xl font-bold">설정 페이지</h1>
        <div>
          <span class="text-sm">안녕하세요, User님!</span>
        </div>
      </div>
    </header>

    <!-- Content -->
    <main class="container mx-auto py-10">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- Profile Settings -->
        <div class="bg-white shadow-md rounded-lg p-6 hover:shadow-lg">
          <h2 class="text-lg font-semibold mb-4">프로필 설정</h2>
          <p class="text-sm text-gray-500 mb-6">
            이름, 이메일, 비밀번호를 업데이트하세요.
          </p>
          <button
            class="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            설정하기
          </button>
        </div>

        <!-- Notifications Settings -->
        <div class="bg-white shadow-md rounded-lg p-6 hover:shadow-lg">
          <h2 class="text-lg font-semibold mb-4">알림 설정</h2>
          <p class="text-sm text-gray-500 mb-6">
            푸시 알림 및 이메일 알림을 관리하세요.
          </p>
          <button
            class="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            설정하기
          </button>
        </div>

        <!-- Privacy Settings -->
        <div class="bg-white shadow-md rounded-lg p-6 hover:shadow-lg">
          <h2 class="text-lg font-semibold mb-4">개인 정보 설정</h2>
          <p class="text-sm text-gray-500 mb-6">
            개인정보 보호 옵션을 수정하세요.
          </p>
          <button
            class="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            설정하기
          </button>
        </div>

        <!-- Theme Settings -->
        <div class="bg-white shadow-md rounded-lg p-6 hover:shadow-lg">
          <h2 class="text-lg font-semibold mb-4">테마 설정</h2>
          <p class="text-sm text-gray-500 mb-6">
            다크 모드 및 색상 테마를 선택하세요.
          </p>
          <button
            class="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            설정하기
          </button>
        </div>

        <!-- Account Settings -->
        <div class="bg-white shadow-md rounded-lg p-6 hover:shadow-lg">
          <h2 class="text-lg font-semibold mb-4">계정 설정</h2>
          <p class="text-sm text-gray-500 mb-6">
            계정 삭제 또는 휴면 계정 전환.
          </p>
          <button
            class="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            설정하기
          </button>
        </div>

        <!-- Security Settings -->
        <div class="bg-white shadow-md rounded-lg p-6 hover:shadow-lg">
          <h2 class="text-lg font-semibold mb-4">보안 설정</h2>
          <p class="text-sm text-gray-500 mb-6">2단계 인증 및 비밀번호 변경.</p>
          <button
            class="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            설정하기
          </button>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: "SettingsPage",
};
</script>

<style scoped>
/* Optional: Add any additional custom styles if needed */
</style>
