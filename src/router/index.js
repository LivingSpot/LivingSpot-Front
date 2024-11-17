import { createRouter, createWebHistory } from "vue-router";
import MainPage from "@/views/MainPage.vue";

import GoogleCallback from '../views/oauth/GoogleCallback.vue';
import KakaoCallback from '../views/oauth/KakaoCallback.vue';
import NaverCallback from '../views/oauth/NaverCallback.vue';

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
      path: "/like",
      name: "like",
      component: () => import("../views/LikeView.vue"),
      meta: { layout: "default" }, // 기본 레이아웃
    },
    {
      path: "/mypage",
      name: "mypage",
      component: () => import("../views/MyPageView.vue"),
      meta: { layout: "default" }, // 기본 레이아웃
    },
    {
      path: "/other1",
      name: "other1",
      component: () => import("../views/Other1View.vue"),
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
      path: '/oauth/callback/google',
      name: 'googleCallback',
      component: GoogleCallback
    },
    {
      path: '/oauth/callback/kakao',
      name: 'kakaoCallback',
      component: KakaoCallback
    },
    {
      path: '/oauth/callback/naver',
      name: 'naverCallback',
      component: NaverCallback
    },
  ],
});

export default router;
