import { createRouter, createWebHistory } from "vue-router";
import MainPage from "@/views/MainPage.vue";
import { useUserStore } from "@/stores/userStore";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "main",
      component: () => import("../views/KaKaoMapView.vue"),
      meta: { layout: "default" }, // 기본 레이아웃
    },
    {
      path: "/favorite",
      name: "favorite",
      component: () => import("../views/KaKaoMapView.vue"),
      meta: { layout: "default" }, // 기본 레이아웃
    },
    {
      path: "/mypage",
      name: "mypage",
      component: () => import("../views/MyPageView.vue"),
      meta: { layout: "default" }, // 기본 레이아웃
    },
    {
      path: "/board",
      name: "board",
      component: () => import("../views/BoardView.vue"),
      meta: { layout: "default" }, // 기본 레이아웃
    },
    {
      path: "/other2",
      name: "other2",
      component: () => import("../views/Other2View.vue"),
      meta: { layout: "default" }, // 기본 레이아웃
    },
    {
      path: "/other3",
      name: "other3",
      component: () => import("../views/Other3View.vue"),
      meta: { layout: "default" }, // 기본 레이아웃
    },
    {
      path: "/settings",
      name: "settings",
      component: () => import("../views/SettingsView.vue"),
      meta: { layout: "default" }, // 기본 레이아웃
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/LoginView.vue"),
      meta: { layout: "none" }, // 로그인 페이지는 특별한 레이아웃 없음
    },
    {
      path: "/join",
      name: "join",
      component: () => import("../views/JoinView.vue"),
      meta: { layout: "none" }, // 로그인 페이지는 특별한 레이아웃 없음
    },
    {
      path: "/auth/oauth2-jwt-header",
      name: "OAuth2Handler",
      component: () => import("@/views/OAuth2Handler.vue"),
    },
    {
      path: "/board/write",
      name: "boardWrite",
      component: () => import("@/components/Board/BoardWrite.vue"),
    },
    {
      path: "/board/detail/:articleNo",
      name: "detail",
      component: () => import("@/components/Board/BoardDetail.vue"),
      props: true, // pk를 props로 전달
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore();

  if (!userStore.isLoggedIn && localStorage.getItem("access_token")) {
    await userStore.fetchUserInfo(); // 사용자 정보를 미리 로드
  }

  next();
});

export default router;
