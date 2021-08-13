<template>
  <div class="container--numbers">
    <ul>
      <li class="item" v-for="item in items" :key="item.Q">
        <span class="number" @click="edit(item)"> 
          <Card>
            <span> {{ item.nr }} </span>
            <span > {{ item.name }} </span>
            <span > {{ item.date }} </span>
          </Card> 
        </span> 
        <button class="btn--del" @click="remove(item)">
          <Delete class="del" />
        </button> 
      </li> 
    </ul> 
  </div> 
</template>

<script>
export default {
  props: ['items'],
  emits: ['edit', 'remove'],
  methods: {
    remove(item) {
      this.$emit('remove', item);
    },
    edit(item) {
      this.$emit('edit', item);
    },
  },
};
</script>

<style scoped>
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
  padding-bottom: 2rem;
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
  margin-inline: 6rem 5rem;
}

.btn {
  margin-inline: 1rem;
}

.btn--del {
  margin-left: 12rem;
  background: none;
  border: none;
}


.del {
  stroke: maroon;
}

.del:hover {
  width: 28px;
  height: 28px;
}

@media (max-width: 480px) {
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
  .btn--del  {
    margin-left: -3rem;
  }
}
</style>
