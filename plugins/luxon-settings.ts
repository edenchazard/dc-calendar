import { Settings } from 'luxon';

export default defineNuxtPlugin(() => {
  Settings.defaultZone = 'America/New_York';
  Settings.defaultLocale = navigator.language;
});
