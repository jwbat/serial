<template>
  <div class="card-container">
    <slot></slot> 
  </div> 
</template>

<style scoped>
.card-container {
  width: 30rem;
  background: #d8f8cd;
  border-radius: 10px;
  border: 1px solid black;
  box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.3);
  padding: 1rem;
}

.card-container:hover {
  background: coral;
}
</style>

