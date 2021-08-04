<template>
  <form @submit.prevent="onSave">
    <section class="inputs">
      <input 
        v-model.trim="entered.p"
        placeholder="Program"
      /> 
      <input 
        v-model.trim="entered.s"
        placeholder="Size"
      /> 
      <input 
        v-model.trim="entered.h"
        placeholder="Hand"
      /> 
      <input 
        v-model.trim="entered.v"
        placeholder="Version"
      /> 
      <input 
        v-model.trim="entered.q"
        placeholder="Sequence"
        disabled
      /> 
      <input 
        v-model.trim="entered.r"
        placeholder="Revision"
      /> 
    </section> 
    <section class="save">
      <button type="submit" class="btn btn--green">Save</button>
      <button @click="clearForm" type="button" class="btn btn--green">Clear</button>
    </section> 
  </form> 
</template>



<script>
import { emptyObj } from '../store/utils.js';

export default {
  props: ['Q'],
  emits: ['save', 'clearForm'],
  computed: {
    entered: {
      get() {
        if (!this.Q) {
          return this.$store.getters.nextEmptyObject;
        }
        return this.$store.getters.objFromQ(this.Q);
      },
      set(newVal) {
        return newVal;
      }
    }
  },
  methods: {
    onSave() {
      this.$emit('save', this.entered);
    },
    clearForm() {
      this.$emit('clearForm');
    }
  },
};
</script>

<style scoped>
.inputs {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr
}

input {
  background: powderblue;
  width: 8rem;
  padding: 10px;
  font-size: 1.5rem;
  font-weight: 600;
  color: #222;
}

input::placeholder {
  font-size: 1.1rem;
}

.save {
  margin-block: 1rem;
  text-align: center;
}

.btn--green {
  margin: 1rem;
  font-size: 1.4rem;
  border-radius: 10px;
}
</style>

