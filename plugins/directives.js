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

// Vue.directive("autosize", {
//   bind(el){ autosize(el) },
//   inserted(el) { autosize.update(el) },
//   update(el){ autosize.update(el) },
//   unbind(el){ autosize.destroy(el) }
// })
