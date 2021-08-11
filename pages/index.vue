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

    <!-- GROUPBY BUTTONS -->
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

    <!-- CSV DOWNLOAD -->
    <div class="btns--download">
      <download-csv
        class="btn btn--grey btn--csv"
        :data="json_data"
        name="serials.csv"
      >
        Download CSV
      </download-csv> 
      <Upload class="btn btn--grey btn--csv" /> 
    </div> 

    <!--

    -->

    <!-- SERIAL NUMBERS -->
    <div class="container--numbers">
      <ul>
        <li class="item" v-for="item in items" :key="item.Q">
          <span class="number" @click="edit(item)"> 
            <Card>{{ item.nr }}    {{ item.date }} {{ item.name }}</Card> 
          </span> 
          <button class="btn--del" @click="remove(item)">
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
import { QFromItem, filter, sortItems, jsonFromItems } from '../store/utils.js';

export default {
  data() {
    return {
      selectedQ: null,
      reversed: false,
      filtering: false,
      fields: {},
      groupBy: '',
      strings: ['p', 's', 'h', 'v', 'r', 'name', 'date'], // for groupby
    };
  },
  computed: {
    json_data() {
      return jsonFromItems(this.items);
    },
    items: {
      get() {
        let arr = [ ...this.$store.getters.items ];
        console.log('items: ', arr);
        if (this.groupBy) {
          arr = sortItems(arr, this.groupBy);
        }
        if (this.filtering) {
          arr = filter(arr, this.fields);
        }
        if (this.reversed) {
          return arr.reverse();
        }
        return arr;
      },
      set(n) {
        return n;
      }
    },
  },
  methods: {
    async save(fieldsObj) {
      await this.$store.dispatch('save', fieldsObj);
      this.items = await this.$store.getters.items;
      this.clearForm();
    },
    async move(fieldsObj, oldQ) {
      await this.$store.dispatch('move', { fieldsObj, oldQ });
      this.items = await this.$store.getters.items;
      this.clearForm();
    },
    filter(fieldsObj) {
      this.filtering = true;
      this.fields = fieldsObj;
    },
    remove(item) {
      this.$store.dispatch('removeItem', QFromItem(item));
    },
    async addN(n) {
      await this.$store.dispatch('addNRandom', n);
      this.items = await this.$store.getters.items;
    },
    async deleteAll() {
      await this.$store.dispatch('deleteAll');
      this.items = await this.$store.getters.items;
    },
    edit(item) {
      this.selectedQ = QFromItem(item);
    },
    clearForm() {
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
  border-top: 3px solid #9a3502;
  border-bottom: 3px solid #9a3502;
  border-radius: 10px;
  color: black;
  text-shadow: 1px 1px 3px #aaa;
}

.btn--ordering {
  margin-inline: 10px;
  padding: 6px 12px;
  font-size: 1.3rem;
  background: #e5d232;
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
  margin-left: -2rem;
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
  grid-template-columns: 85% 10%;
  grid-column-gap: 6rem;
}

.number {
  font-size: 1.4rem;
  font-weight: 400;
  letter-spacing: 3px;
  cursor: pointer;
  color: black;
  margin-left: 6rem;
}

.btn {
  margin-inline: 1rem;
}

.btn--del {
  margin-left: 8rem;
  background: none;
  border: none;
}

.btn--csv {
  color: #ddd;
  border-color: #ddd;
}

.del:hover {
  width: 28px;
  height: 28px;
}

.del {
  stroke: maroon;
}

@media (max-width: 480px) {
  .container {
    width: 100vw;
    display: flex;
    flex-direction: column;
  }
  .title {
    text-align: center;
  }
  .ordering {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    margin-block: 0.5rem;
  }
  .span--groupby {
    width: 100%;
    margin-top: 1rem;
    margin-inline: 6rem;
    text-align: center;
  }
  .btns--download {
    display: flex;
    justify-content: space-around;
  }
  .container--numbers {
    max-width: 100%;
    padding: 1rem;
  }
  .number {
    font-size: 1.1rem;
    font-weight: 400;
    letter-spacing: 1px;
    cursor: pointer;
    color: black;
    margin-left: 0.5rem;
  }
  ul {
    width: 280px;
    padding-top: 2rem;
    list-style: none;
    margin-bottom: 4rem;
    padding: 1rem;
    padding-left: 0;
    font-size: 1.1rem; 
  }
  .item {
    display: grid;
    grid-template-columns: 70% 20%;
    grid-column-gap: 3rem;
  }
  .container--bigButtons {
    display: flex;
    flex-direction: column;
  }
  .btn--grey {
    font-size: 1rem;
    padding: 10px;
  }
}
</style>
