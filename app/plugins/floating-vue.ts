import FloatingVue from 'floating-vue';

export default defineNuxtPlugin(() => {
  FloatingVue.options.themes.tooltip.triggers = ['hover', 'click'];
  FloatingVue.options.themes.breed = {
    $extend: 'dropdown',
  };
});
