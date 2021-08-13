import Vue from 'vue';

Vue.directive('uppercase', {
  bind(el) {
    el.value = el.value.toUpperCase();
    el.addEventListener('onchange', () => el.value.toUpperCase());
  },
  update(el, binding) {
    el.value = el.value.toUpperCase();
  }
});
