<script setup>
import { ref } from "vue";

// 좋아요 상태 관리
const isLiked = ref(false);

// 좋아요 토글 함수
const toggleLike = () => {
  isLiked.value = !isLiked.value;
};
</script>

<template>
  <div class="right_area">
    <!-- 좋아요 버튼 -->
    <a
      href="javascript:;"
      class="icon heart"
      :class="{ active: isLiked }"
      @click="toggleLike"
    >
      <img
        :src="
          isLiked
            ? 'https://cdn-icons-png.flaticon.com/512/803/803087.png'
            : 'https://cdn-icons-png.flaticon.com/512/812/812327.png'
        "
        :alt="isLiked ? '찜하기 완료' : '찜하기'"
      />
    </a>
  </div>
</template>

<style scoped>
/* 스타일 정의 */
a {
  text-decoration: none;
  color: inherit;
  cursor: pointer;
}
.right_area .icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: calc(100vw * (51 / 1920));
  height: calc(100vw * (51 / 1920));
  border-radius: 50%;
  border: solid 2px #eaeaea;
  background-color: #fff;
}

.icon.heart img {
  width: calc(100vw * (28 / 1920));
  height: calc(100vw * (28 / 1920));
}

/* 좋아요 활성화 상태 */
.heart.active img {
  animation: animateHeart 0.3s linear forwards;
}

/* 애니메이션 */
@keyframes animateHeart {
  0% {
    transform: scale(0.2);
  }
  40% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}
</style>
