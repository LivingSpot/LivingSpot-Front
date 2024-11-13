<script>
export default {
  data: () => ({
    items: [
      { title: "Click Me" },
      { title: "Click Me" },
      { title: "Click Me" },
      { title: "Click Me 2" },
    ],
  }),
};
</script>

<template>
  <v-menu>
    <template v-slot:activator="{ props }">
      <v-btn v-bind="props" style="width: 500px"
        ><v-avatar color="">
          <v-icon icon="mdi-account-circle"></v-icon>
        </v-avatar>
      </v-btn>
      <span>LeeJinGyu</span>
    </template>
    <v-list>
      <v-list-item v-for="(item, index) in items" :key="index" :value="index">
        <v-list-item-title>{{ item.title }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<style scoped></style>
