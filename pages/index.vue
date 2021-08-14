<template>
  <div class="container">
    <!-- TITLE -->
      <h1 class="title">
        serial numbers
      </h1>
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
        v-for="str in groupByFields"
        ref="btnRef"
        class="btn btn--ordering" 
        @click="group(str, $event)"
      >{{ str.toUpperCase() }}
      </button> 
    </div> 

    <!-- CSV DOWNLOAD UPLOAD -->
    <div class="btns--download">
      <download-csv
        class="btn btn--grey btn--csv"
        :data="json_data"
        name="serials.csv"
      >
        Download CSV
      </download-csv> 
      <Upload @upload-error="alert" class="btn btn--grey btn--csv" /> 
    </div> 
    <div class="error-message" v-if="uploadError">
      <h3>
        There was an error during  upload. <br /> Please check that the
        csv file to be uploaded is correctly formatted.
      </h3>
    </div>

    <!-- SERIAL NUMBERS -->
    <ItemList 
      :items="items" 
      @edit="edit" 
      @remove="remove" 
    /> 

    <hr> 
    <!-- BIG BUTTONS -->
    <div v-if="!deletingAll" class="container--bigButtons">
      <button class="btn btn--add" type="button" @click="addN(10)">
        Add 10
      </button>
      <button class="btn btn--add" type="button" @click="addN(100)">
        Add 100
      </button>
      <button 
        class="btn btn--deleteAll" 
        type="button" 
        @click="deleteAll"
      >
        Delete All
      </button>
    </div> 
    <div class="deleting" v-if="deletingAll">
      <p class="are-you-sure">
        Are you sure you would like to delete all entries?
      </p>
      <span class="yes-no">
        <button @click="deleteAll" class="btn btn--grey">Yes</button>
        <button @click="deletingAll = !deletingAll" class="btn btn--grey">No</button>
      </span>
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
      groupByFields: ['p', 's', 'h', 'v', 'r', 'date', 'name'],
      uploadError: false,
      deletingAll: false,
    };
  },
  computed: {
    json_data() {
      return jsonFromItems(this.items);
    },
    items: {
      get() {
        let arr = [ ...this.$store.getters.items ];
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
      if (this.deletingAll) {
        await this.$store.dispatch('deleteAll');
        this.deletingAll = !this.deletingAll;
      } else {
        this.deletingAll = !this.deletingAll;
      }
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
    },
    alert() {
      this.uploadError = !this.uploadError;
      setTimeout(() => {
        this.uploadError = !this.uploadError;
      }, 9000);
    },
  },
}
</script>

<style scoped>
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

.highlighted {
  border-bottom: 4px solid black;
  border-top: 4px solid black;
  background: salmon;
}

.error-message h3 {
  margin-block: 4rem;
  color: maroon;
  font-size: 1.4rem;
  text-align: center;
}

hr {
  width: 80vw;
  border-top: 2px solid blue;
  box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.3);
  margin-bottom: 2rem;
}

.btn {
  margin-inline: 1rem;
}

.btn--csv {
  color: #ddd;
  border-color: #ddd;
}

.container--bigButtons {
  padding: 5rem;
  width: 60vw;
  display: flex;
  justify-content: center;
}

.btn--add, .btn--deleteAll {
  width: 8rem;
  border-radius: 10px;
  background: #ccc;
  font-size: 1.4rem;
  padding: 10px;
}
.btn--deleteAll {
  background: #a26161;
}

.deleting {
  margin: 1rem;
  padding: 1rem;
  border: 2px solid chartreuse;
  border-radius: 20px;
}

.deleting p {
  font-weight: bold;
  font-size: 1.4rem;
}

.are-you-sure {
  text-align: center;
  color: #f6ff00;
}

.yes-no {
  display: flex;
  justify-content: center;
}
.yes-no .btn {
  background: #ccc;
}

@media (hover: hover) {
  .btn--ordering:hover {
    background: blue;
    color: white;
  }
}

@media (max-width: 480px) {
  .container {
    width: 100vw;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .title {
    margin-inline: auto;
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
    width: 100vw;
    padding-top: 2rem;
    list-style: none;
    margin-bottom: 4rem;
    margin-inline: 0;
    font-size: 1.1rem; 
    padding: 8px;
  }
  .item {
    display: grid;
    grid-template-columns: 6fr 1fr;
    grid-column-gap: 3rem;

  }
  .container--bigButtons {
    padding: 2rem;
    width: 100vw;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .btn--del  {
    margin-left: -3rem;
  }
}
</style>
