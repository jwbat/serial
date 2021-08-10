<template>
  <form @submit.prevent="onSave">
    <section class="inputs">
      <input 
        v-if="!editingQ" 
        v-model.trim="entered.p" 
        v-uppercase
        placeholder="Program" 
        ref="inputP" 
      />
      <input 
        v-if="!editingQ"  
        v-model.trim="entered.s" 
        placeholder="Size" 
      /> 
      <input 
        v-if="!editingQ" 
        v-model.trim="entered.h" 
        v-uppercase
        placeholder="Hand" 
      /> 
      <input 
        v-if="!editingQ" 
        v-model.trim="entered.v" 
        placeholder="Version" 
      /> 
      <input 
        v-model.trim="entered.q" 
        placeholder="Sequence" 
        :class="{ disabled: !resettingQ && !editingQ }"
        :disabled="!resettingQ && !editingQ" 
        ref="inputQ"
      /> 
      <input 
        v-if="!editingQ" 
        v-model.trim="entered.r" 
        v-uppercase
        placeholder="Revision"  
      /> 
      <input 
        v-if="!editingQ"  
        v-model.trim="entered.name" 
        placeholder="Name" 
      /> 
    </section> 
    <section class="buttons">
      <button class="btn btn--green" type="submit">
        Save
      </button>
      <button 
        v-if="!editingQ" 
        @click="clearForm" 
        class="btn btn--green" 
        type="button"
      >
        Clear
      </button>
      <button 
        v-if="!resettingQ && selectedQ" 
        @click="reassignQ" 
        class="btn btn--green" 
        type="button"
      >
        Reassign Q
      </button>
      <button 
        v-if="!selectedQ && !editingQ"
        @click="filter" 
        class="btn btn--green" 
        type="button" 
      > 
        Filter
      </button>
      <button 
        v-if="!selectedQ && !editingQ"
        @click="editQ"
        class="btn btn--green btn--editQ"
        type="button" 
      >
        Edit Q
      </button>
      <button 
        v-if="editingQ"
        @click="editingQ = false"
        class="btn btn--green" 
        type="button"
      >
        Exit
      </button>
    </section> 
  </form> 
</template>

<script>
export default {
  props: ['selectedQ', 'filtering', 'fields'],
  emits: ['save', 'move', 'clearForm', 'editQ', 'filter'],
  data() {
    return {
      resettingQ: false,
      oldQ: null,
      editingQ: false,
    };
  },
  mounted() { this.$refs.inputP.focus() },
  computed: {
    entered: {
      get() {
        if (this.filtering) {
          return { p: '', s:'', h: '', v: '', q: '', r: '', name: '', ...this.fields };
        }
        if (!this.selectedQ) {
          let q = this.$store.getters.nextq;
          return { p: '', s:'', h: '', v: '', q, r: '', name: '' };
        }
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
      }
      const entered = this.upper(this.entered);
      this.$emit('save', entered);
    },
    filter() {
      delete this.entered['q'];
      this.$emit('filter', this.upper(this.entered));
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
    },
    upper(obj) {
      obj.p = obj['p'].toUpperCase();
      obj.h = obj['h'].toUpperCase();
      obj.r = obj['r'].toUpperCase();
      return obj;
    }
  },
};
</script>

<style scoped>
.inputs {
  display: flex;
  justify-content: center;
}

@media (max-width: 480px) {
  .inputs {
    flex-direction: column;
    align-items: center;
  }
  input {
    margin-top: 10px;
  }
  .buttons {
    display: grid;
    grid-template-columns: 40% 40%;
    justify-content: space-around;
  }
  .btn {
    width: 7rem;
  }
}

input {
  background: #9ffafa;
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

.disabled {
  background: lightgrey;
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

