<template>
  <form @submit.prevent="onSave">
    <section class="inputs">
      <input v-if="!editingQ" v-model.trim="entered.p" placeholder="Program" ref="inputP" />
      <input v-if="!editingQ"  v-model.trim="entered.s" placeholder="Size" /> 
      <input v-if="!editingQ" v-model.trim="entered.h" placeholder="Hand" /> 
      <input v-if="!editingQ" v-model.trim="entered.v" placeholder="Version" /> 
      <input v-model.trim="entered.q" placeholder="Sequence" 
             :disabled="!resettingQ && !editingQ" ref="inputQ"
      /> 
      <input v-if="!editingQ" v-model.trim="entered.r" placeholder="Revision"  /> 
    </section> 
    <section class="buttons">
      <button class="btn btn--green" type="submit">
        Save
      </button>
      <button 
        v-if="!editingQ" class="btn btn--green" 
        @click="clearForm" type="button"
      >
        Clear
      </button>
      <button 
        v-if="!resettingQ && selectedQ" class="btn btn--green" 
        @click="reassignQ" type="button"
      >
        Reassign Q
      </button>
      <button 
        v-if="!selectedQ && !editingQ" @click="editQ"
        class="btn btn--green btn--editQ" type="button" 
      >
        Edit Q
      </button>
      <button 
        v-else class="btn btn--green" 
        type="button"
        @click="editingQ = false"
      >
        Exit
      </button>
    </section> 
  </form> 
</template>

<script>
import { emptyObj } from '../store/utils.js';

export default {
  props: ['selectedQ'],
  emits: ['save', 'move', 'clearForm', 'editQ'],
  data() {
    return {
      resettingQ: false,
      oldQ: null,
      editingQ: false,
//       newQ: null
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
      if (this.editingQ) {
        let newQ = this.entered.q;
        this.$store.dispatch('editQ', newQ);
        this.clearForm();
        return;
//         this.$emit('editQ')
      }
      this.$emit('save', this.entered);
    },
    clearForm() {
      this.$emit('clearForm');
      this.resettingQ = false;
      this.editingQ = false;
      this.oldQ = null;
    },
    reassignQ() {
      console.log('selected Q: ', this.selected);
      this.oldQ = this.selectedQ;
      this.resettingQ = !this.resettingQ;
    },
    editQ() {
      this.editingQ = true;
      this.$nextTick(() => {
        this.$refs.inputQ.focus();
      });
    }
  },
};
</script>

<style scoped>
.inputs {
  display: flex;
  justify-content: center;
}

input {
  background: #ece6b1;
  width: 8rem;
  margin-inline: 5px;
  padding: 10px;
  font-size: 1.5rem;
  font-weight: 600;
  color: #222;
}

.input--editQ {
  width: 10rem;
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

.btn--editQ {
  color: grey;
  border-color: grey;
}
.btn--editQ:hover  {
  background: maroon;
  color: white;
}
</style>

