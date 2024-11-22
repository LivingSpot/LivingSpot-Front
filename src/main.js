import "./assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";

import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
library.add(fas);

import VueSelect from "vs-vue3-select";
import "vs-vue3-select/dist/vs-vue3-select.css";
import InfiniteLoading from "v3-infinite-loading";

import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import { IonicVue } from "@ionic/vue";
import { useKakao } from "vue3-kakao-maps/@utils";

const app = createApp(App);

useKakao("23c96bdf19692b8b473ec46e77a5f78a");
app.component("v-select", VueSelect);
app.component("infinite-loading", InfiniteLoading);

app.use(IonicVue);
app.use(createPinia());
app.use(router);
app.use(vuetify);
app.component("font-awesome-icon", FontAwesomeIcon);

app.mount("#app");
