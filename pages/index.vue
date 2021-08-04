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
      <Input :Q="selectedQ" @save="save" @clearForm="clearForm" /> 
    </div> 

    <!-- ORDER BUTTONS -->
    <div class="ordering">
      <button class="btn btn--ordering" @click="reverse">Reverse</button> 
      <button 
        v-for="s in strings"
        ref="btnRef"
        class="btn btn--ordering" 
        @click="group(s, $event)"
      >
          {{ s.toUpperCase() }}
      </button> 

      <!--
      <button class="btn btn--ordering" @click="group('p', $event)">P</button> 
      <button class="btn btn--ordering" @click="group('s', $event)">S</button> 
      <button class="btn btn--ordering" @click="group('h', $event)">H</button> 
      <button class="btn btn--ordering" @click="group('v', $event)">V</button> 
      <button class="btn btn--ordering" @click="group('r', $event)">R</button> 
      -->
    </div> 

    <!-- NUMBER LIST -->
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
import { QFromNr, order } from '../store/utils.js';

export default {
  data() {
    return {
      selectedQ: null,
      reversed: false,
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
    },
    group(str, event) {
      this.groupBy = this.groupBy === str ? '' : str;

      let targetEl = event.target;
      this.$refs.btnRef.forEach(el => {
        if (el === targetEl) el.classList.toggle('highlighted');
        else el.classList.remove('highlighted');
      });
    },
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

.ordering {
  margin-block: 1rem;
}

.btn--ordering {
  margin-inline: 10px;
  padding: 6px;
  font-size: 1.3rem;
  background: azure;
}

.btn--ordering:hover  {
  cursor: pointer;
  background: black;
  color: white;
}

.highlighted {
  border-bottom: 4px solid black;
  border-top: 4px solid black;
  background: #ccdf07;
}

ul {
  width: 700px;
  padding-top: 3rem;
  list-style: none;
  margin-left: 0;
  margin-bottom: 2rem;
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
  font-weight: 600;
  line-height: 1;
  text-shadow: 1px 1px 1px grey;
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
