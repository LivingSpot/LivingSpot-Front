import "./assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";

import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
library.add(fas);

import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import { useKakao } from "vue3-kakao-maps/@utils";

const app = createApp(App);

useKakao("23c96bdf19692b8b473ec46e77a5f78a");

app.use(createPinia());
app.use(router);
app.use(vuetify);
app.component("font-awesome-icon", FontAwesomeIcon);

app.mount("#app");
