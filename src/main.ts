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
  faGem,
  faMoon,
} from '@fortawesome/free-solid-svg-icons';

import { Settings } from 'luxon';

/* add icons to the library */
library.add(faSnowflake, faSun, faClock, faSkull, faGem, faMoon);

Settings.defaultZone = 'America/New_York';

const app = createApp(App);

app.mount('#app');
