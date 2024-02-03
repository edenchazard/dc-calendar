import './assets/main.css';

import { createApp } from 'vue';
import App from './App.vue';

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core';

/* import specific icons */
import {
  faSnowflake,
  faSun,
  faClock,
  faSkull,
} from '@fortawesome/free-solid-svg-icons';

/* add icons to the library */
library.add(faSnowflake, faSun, faClock, faSkull);

const app = createApp(App);

app.mount('#app');
