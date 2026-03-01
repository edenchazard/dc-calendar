// For Nuxt 3
import { library, config } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
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
import {
  faGithub,
  faCanadianMapleLeaf,
} from '@fortawesome/free-brands-svg-icons';

// This is important, we are going to let Nuxt worry about the CSS
config.autoAddCss = false;

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

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('font-awesome-icon', FontAwesomeIcon);
});
