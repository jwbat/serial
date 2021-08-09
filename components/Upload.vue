<template>
  <div class="upload">
    <label for="file">Upload CSV</label>
    <input 
       id="file"
       type="file"
       accept=".csv"
       @change="preview"
    /> 
  </div> 

</template>

<script>
import { csvToJson } from '../store/utils.js';

export default {
  methods: {
    preview(e) {
      let file = e.target.files[0];
      let reader = new FileReader();
      reader.onload = e => {
        let contents = e.target.result;
        let objects = csvToJson(contents);
        this.$store.dispatch('replace', objects);
      };
      reader.readAsText(file);
    }
  },
};
</script>

<style scoped>
label {
  cursor: pointer;
}

input {
  opacity: 0;
  width: 0.1px;
  height: 0.1px;
  position: absolute;
  background: none;
}
</style>
