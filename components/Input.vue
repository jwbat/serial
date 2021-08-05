<template>
  <form @submit.prevent="onSave">
    <section class="inputs">
      <input v-model.trim="entered.p" placeholder="Program" ref="inputP" />
      <input v-model.trim="entered.s" placeholder="Size" /> 
      <input v-model.trim="entered.h" placeholder="Hand" /> 
      <input v-model.trim="entered.v" placeholder="Version" ref="inputV" /> 
      <input 
        v-model.trim="entered.q" 
        placeholder="Sequence" 
        :disabled="!resettingQ" 
        ref="inputQ"
      /> 
      <input v-model.trim="entered.r" placeholder="Revision" /> 
    </section> 
    <section class="buttons">
      <button class="btn btn--green" type="submit">Save</button>
      <button class="btn btn--green" @click="clearForm" type="button">Clear</button>
      <button 
        v-if="!resettingQ && selectedQ" 
        class="btn btn--green" 
        @click="reassignQ" 
        type="button"
      >
        Reassign Q
      </button>
      <button 
        class="btn btn--green" 
        type="button"
        v-if="!selectedQ"
      >
        Edit Q
      </button>
    </section> 
  </form> 
</template>

<script>
import { emptyObj } from '../store/utils.js';

export default {
  props: ['selectedQ'],
  emits: ['save', 'move', 'clearForm'],
  data() {
    return {
      resettingQ: false,
      oldQ: null,
    };
  },
  computed: {
    entered: {
      get() {
        if (!this.selectedQ) {
          return this.$store.getters.nextEmptyObject;
        }
        this.$refs.inputP.focus();
        return this.$store.getters.objFromQ(this.selectedQ);
      },
      set(newVal) {
        return newVal;
      }
    }
  },
  methods: {
    onSave() {
      if (this.resettingQ) {
        this.$emit('move', this.entered, this.oldQ);
        this.clearForm();
        return;
      }
      this.$emit('save', this.entered);
      this.resettingQ = false;
    },
    clearForm() {
      this.$emit('clearForm');
      this.resettingQ = false;
      this.oldQ = null;
    },
    reassignQ() {
      this.oldQ = this.selectedQ;
      this.resettingQ = !this.resettingQ;
      this.$refs.inputV.focus();
    },
  },
};
</script>

<style scoped>
.inputs {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr
}

input {
  background: #ece6b1;
  /*
  background: powderblue;
   */
  width: 8rem;
  margin-inline: 5px;
  padding: 10px;
  font-size: 1.5rem;
  font-weight: 600;
  color: #222;
}

input::placeholder {
  font-size: 1.1rem;
}

.buttons {
  margin-block: 1rem;
  text-align: center;
}

.btn--green {
  margin: 1rem;
  font-size: 1.2rem;
  border-radius: 10px;
}
</style>

