<template>
  <div class="container">
    <div>
      <h1 class="title">
        serial numbers
      </h1>
    </div>
    <div>
      <Input :Q="selectedQ" @save="save" @clearForm="clearForm" /> 
    </div> 
    <div>
      <button @click="reverse">Reverse</button> 
    </div> 

    <div>
      <ul>
        <li class="item" v-for="nr in nrs" :key="nr">
          <span class="number" @click="edit(nr)">{{ nr }}</span> 
          <button @click="remove(nr)" class="btn--del">
            <Delete class="del" />
          </button> 
        </li> 
      </ul> 
    </div> 
  </div>
</template>

<script>
import { QFromNr } from '../store/utils.js';

export default {
  data() {
    return {
      reversed: false,
      selectedQ: null
    };
  },
  computed: {
    nrs: {
      get() {
        let numbers = [ ...this.$store.getters.nrs ];
        if (this.reversed) {
          return numbers.reverse();
        }
        return numbers;
      },
      set(n) {
        return n;
      }
    },
  },
  methods: {
    async save(obj) {
      await this.$store.dispatch('save', obj);
      this.nrs = await this.$store.getters.nrs;
      this.clearForm();
    },
    remove(nr) {
      this.$store.dispatch('remove', QFromNr(nr));
    },
    edit(nr) {
      this.selectedQ = QFromNr(nr);
    },
    clearForm() {
      this.selectedQ = null;
    },
    reverse() {
      this.reversed = !this.reversed;
    }
  },
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', Roboto, Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 3rem;
  color: #02468d;
  margin-block: 3rem 2rem;
  letter-spacing: 1px;
}

.btn {
  margin-top: 2rem;
  font-size: 1.5rem;
}

ul {
  width: 700px;
  padding-top: 5rem;
  list-style: none;
  margin-left: 0;
  padding-left: 0;
  font-size: 2rem;
}

.item {
  padding-bottom: 1rem;
  display: grid;
  grid-template-columns: 80% 10%;
}

.number {
  text-shadow: 2px 2px 2px grey;
  cursor: pointer;
}

.btn--del {
  margin-left: 3rem;;
  background: none;
  border: none;
}

.del:hover {
  width: 28px;
  height: 28px;
}

.del {
  stroke: maroon;
}
</style>
