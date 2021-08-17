<template>
  <form @submit.prevent="onSave">
    <section class="inputs">
      <input 
        v-model.trim="entered.p" 
        v-uppercase
        placeholder="Program" 
        ref="inputP" 
      />
      <input 
        v-model.trim="entered.s" 
        placeholder="Size" 
      /> 
      <input 
        v-model.trim="entered.h" 
        v-uppercase
        placeholder="Hand" 
      /> 
      <input 
        v-model.trim="entered.v" 
        placeholder="Version" 
      /> 
      <input 
        v-model.trim="entered.r" 
        v-uppercase
        placeholder="Revision"  
      /> 
      <input 
        v-model.trim="entered.name" 
        v-capitalize
        placeholder="Name" 
      /> 
    </section> 
    <section class="buttons">
      <button class="btn btn--green" type="submit">
        Save
      </button>
      <button 
        @click="clearForm" 
        class="btn btn--green" 
        type="button"
      >
        Clear
      </button>
      <button 
        @click="filter" 
        class="btn btn--green" 
        type="button" 
      > 
        Filter
      </button>
    </section> 
  </form> 
</template>

<script>
export default {
  props: ['filtering', 'fields'],
  emits: ['save', 'move', 'clearForm', 'filter'],
  data() {
    return {
    };
  },
  mounted() { this.$refs.inputP.focus() },
  computed: {
    entered: {
      get() {
        if (this.filtering) {
          return { p: '', s:'', h: '', v: '', r: '', name: '', ...this.fields };
        }
        return { p: '', s:'', h: '', v: '', r: '', name: '', ...this.fields }; 
      },
      set(newVal) {
        return newVal;
      }
    }
  },
  methods: {
    onSave() {
      this.$emit('save', this.upper(this.entered));
    },
    filter() {
      this.$emit('filter', this.upper(this.entered));
    },
    clearForm() {
      this.$emit('clearForm');
    },
    upper(obj) {
      const assign = str => obj[str] ? obj[str].toUpperCase() : ''; 
      obj.p = assign('p');
      obj.h = assign('h');
      obj.r = assign('r');

      obj.name = obj.name ? 
        obj.name[0].toUpperCase() + obj['name'].slice(1).toLowerCase() : '';
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

@media (hover: hover) {
  .btn:hover {
    background: maroon;
    color: white;
  }
}
</style>

