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

const capitalize = el => {
  el.value = el.value.toLowerCase();
  el.value = el.value ? el.value[0].toUpperCase() + el.value.slice(1) : '';
  return el;
};

Vue.directive('capitalize', {
  bind(el) {
    el = capitalize(el);
    el.addEventListener('onchange', () => {
      el = capitalize(el);
    });
  },
  update(el, binding) {
    el = capitalize(el);
  }
});
