import './assets/main.css';

import { createApp } from 'vue';
import App from './App.vue';

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core';

/* import specific icons */
import {
  faSnowflake,
  faLeaf,
  faSun,
  faClock,
  faSkull,
  faGem,
  faMoon,
  faToolbox,
  faCoffee,
} from '@fortawesome/free-solid-svg-icons';

import { Settings } from 'luxon';
import {
  faGithub,
  faCanadianMapleLeaf,
} from '@fortawesome/free-brands-svg-icons';

/* add icons to the library */
library.add(
  faSnowflake,
  faSun,
  faClock,
  faSkull,
  faGem,
  faMoon,
  faToolbox,
  faCoffee,
  faGithub,
  faCanadianMapleLeaf,
  faLeaf,
);

Settings.defaultZone = 'America/New_York';
Settings.defaultLocale = navigator.language;

const app = createApp(App);

app.mount('#app');
