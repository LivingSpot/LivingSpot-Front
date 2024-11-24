<template>
  <v-card>
    <v-data-iterator :items="games" :items-per-page="3" :search="search">
      <template v-slot:header>
        <v-toolbar class="px-2">
          <v-text-field
            v-model="search"
            density="comfortable"
            placeholder="Search"
            prepend-inner-icon="mdi-magnify"
            style="max-width: 300px"
            variant="solo"
            clearable
            hide-details
          ></v-text-field>
        </v-toolbar>
      </template>

      <template v-slot:default="{ items }">
        <v-container class="pa-2" fluid>
          <v-row dense>
            <v-col v-for="item in items" :key="item.title" cols="auto" md="4">
              <v-card class="pb-3" border flat>
                <v-img :src="item.raw.img"></v-img>

                <v-list-item :subtitle="item.raw.subtitle" class="mb-2">
                  <template v-slot:title>
                    <strong class="text-h6 mb-2">{{ item.raw.title }}</strong>
                  </template>
                </v-list-item>

                <div class="d-flex justify-space-between px-4">
                  <div
                    class="d-flex align-center text-caption text-medium-emphasis me-1"
                  >
                    <v-icon icon="mdi-clock" start></v-icon>

                    <div class="text-truncate">{{ item.raw.duration }}</div>
                  </div>

                  <v-btn class="text-none" size="small" text="Read" border flat>
                  </v-btn>
                </div>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </template>

      <template v-slot:footer="{ page, pageCount, prevPage, nextPage }">
        <div class="d-flex align-center justify-center pa-4">
          <v-btn
            :disabled="page === 1"
            density="comfortable"
            icon="mdi-arrow-left"
            variant="tonal"
            rounded
            @click="prevPage"
          ></v-btn>

          <div class="mx-2 text-caption">
            Page {{ page }} of {{ pageCount }}
          </div>

          <v-btn
            :disabled="page >= pageCount"
            density="comfortable"
            icon="mdi-arrow-right"
            variant="tonal"
            rounded
            @click="nextPage"
          ></v-btn>
        </div>
      </template>
    </v-data-iterator>
  </v-card>
</template>

<script setup>
import BoardItem from "@/components/Board/BoardItem.vue";
import { ref, reactive } from "vue";

// title - 제목
// content - 내용
// hit - 조회수
// writer - 작성자
// date - 작성날짜

const search = ref("");
const games = reactive([
  {
    title: "title1",
    content: "content1",
    hit: 2,
    writer: "ssafy",
    date: "2022-10-22",
  },
  {
    title: "title2",
    content: "content2",
    hit: 12,
    writer: "admin",
    date: "2023-05-02",
  },
  {
    title: "title3",
    content: "content3",
    hit: 6,
    writer: "ssafy",
    date: "2024-12-25",
  },
  {
    title: "title4",
    content: "content4",
    hit: 2,
    writer: "ssafy",
    date: "2022-10-22",
  },
  {
    title: "title5",
    content: "content5",
    hit: 12,
    writer: "admin",
    date: "2023-05-02",
  },
  {
    title: "title6",
    content: "content6",
    hit: 6,
    writer: "ssafy",
    date: "2024-12-25",
  },
  {
    title: "title7",
    content: "content7",
    hit: 2,
    writer: "ssafy",
    date: "2022-10-22",
  },
  {
    title: "title8",
    content: "content8",
    hit: 12,
    writer: "admin",
    date: "2023-05-02",
  },
]);
</script>

<style scoped></style>
