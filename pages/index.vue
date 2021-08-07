<template>
  <div class="container">
    <!-- TITLE -->
    <div>
      <h1 class="title">
        serial numbers
      </h1>
    </div>
    <!-- INPUT COMPONENT -->
    <div>
      <Input 
        :selectedQ="selectedQ" 
        :filtering="filtering" 
        :fields="fields" 
        @save="save" 
        @filter="filter"
        @move="move" 
        @clearForm="clearForm" 
      /> 
    </div> 

    <!-- ORDER BUTTONS -->
    <div class="ordering">
      <button class="btn btn--ordering" @click="reverse">Reverse</button> 
      <span class="span--groupby">Group by:</span> 
      <button 
        v-for="str in strings"
        ref="btnRef"
        class="btn btn--ordering" 
        @click="group(str, $event)"
      >{{ str.toUpperCase() }}
      </button> 
    </div> 

    <!-- SERIAL NUMBERS -->
    <div class="container--numbers">
      <ul>
        <li class="item" v-for="nr in nrs" :key="nr">
          <span class="number" @click="edit(nr)"> 
            <Card>{{ nr }}</Card> 
          </span> 
          <button @click="remove(nr)" class="btn--del">
            <Delete class="del" />
          </button> 
        </li> 
      </ul> 
    </div> 
     
    <!-- BIG BUTTONS -->
    <div class="container--bigButtons">
      <button class="btn btn--grey" type="button" @click="addN(10)">
        Add 10
      </button>
      <button class="btn btn--grey" type="button" @click="addN(100)">
        Add 100
      </button>
      <button class="btn btn--grey" type="button" @click="deleteAll">
        Delete All
      </button>
    </div> 
  </div>
</template>

<script>
import { QFromNr, filter, order } from '../store/utils.js';

export default {
  data() {
    return {
      selectedQ: null,
      reversed: false,
      filtering: false,
      fields: {},
      groupBy: '',
      strings: ['p', 's', 'h', 'v', 'r'],
    };
  },
  computed: {
    nrs: {
      get() {
        let numbers = [ ...this.$store.getters.nrs ];
        if (this.groupBy) {
          numbers = order(numbers, this.groupBy);
        }
        if (this.filtering) {
          numbers = filter(numbers, this.fields);
        }
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
    async move(obj, oldQ) {
      await this.$store.dispatch('move', { obj, oldQ });
      this.nrs = await this.$store.getters.nrs;
      this.clearForm();
    },
    filter(obj) {
      this.filtering = true;
      this.fields = obj;
    },
    remove(nr) {
      this.$store.dispatch('remove', QFromNr(nr));
    },
    async addN(n) {
      await this.$store.dispatch('addNRandom', n);
      this.nrs = await this.$store.getters.nrs;
    },
    async deleteAll() {
      await this.$store.dispatch('deleteAll');
      this.nrs = await this.$store.getters.nrs;
    },
    edit(nr) {
      this.selectedQ = QFromNr(nr);
    },
    clearForm() {
      console.log('clearForm called');
      this.filtering = false;
      this.selectedQ = null;
      this.fields = {};
    },
    reverse() {
      this.reversed = !this.reversed;
    },
    group(str, event) {
      this.groupBy = this.groupBy === str ? '' : str;

      let targetEl = event.target;
      this.$refs.btnRef.forEach(el => {
        if (el === targetEl) el.classList.toggle('highlighted');
        else el.classList.remove('highlighted');
      });
    }
  },
}
</script>

<style>
.container {
  margin: 0 auto;
  padding-bottom: 5rem;
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

.ordering {
  margin-block: 1rem;
}

.span--groupby {
  margin-inline: 10px;
  font-size: 1.4rem;
  padding: 5px;
  border-top: 3px solid #4d1c03;
  border-bottom: 3px solid #4d1c03;
  border-radius: 10px;
  color: #4d1c03;
}

.btn--ordering {
  margin-inline: 10px;
  padding: 6px 12px;
  font-size: 1.3rem;
  background: #ffeb3b;
}

.btn--ordering:hover  {
  cursor: pointer;
  background: orange;
  color: white;
}

.highlighted {
  border-bottom: 4px solid black;
  border-top: 4px solid black;
  background: salmon;
}

.container--numbers {
  padding-left: 8rem;
}

ul {
  width: 700px;
  padding-top: 3rem;
  list-style: none;
  margin-left: 0;
  margin-bottom: 6rem;
  padding-left: 0;
  font-size: 2rem; 
}

.item {
  padding-bottom: 0.5rem;
  display: grid;
  grid-template-columns: 80% 10%;
}

.number {
  font-size: 1.4rem;
  font-weight: 400;
  letter-spacing: 3px;
  cursor: pointer;
  color: black;
}

.btn {
  margin-inline: 1rem;
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
