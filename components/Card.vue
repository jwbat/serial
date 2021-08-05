<template>
  <div class="card-container">
    <slot></slot> 
  </div> 
</template>

<style scoped>
.card-container {
  background: #b5c1dd;
  border-radius: 10px;
  border: 1px solid black;
  box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.3);
  padding: 1rem;
}
</style>

