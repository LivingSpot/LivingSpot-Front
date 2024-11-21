<script setup>
import { useUserStore } from "@/stores/ㅕserStore";

const userStore = useUserStore();
</script>

<template>
  <div v-if="userStore.isLoggedIn">
    <h1>Welcome, {{ userStore.user.username }}</h1>
    <p>Email: {{ userStore.user.email }}</p>
    <p>Roles: {{ userStore.user.roles.join(", ") }}</p>
  </div>
  <div v-else>
    <p>Please log in to view your profile.</p>
  </div>
</template>
