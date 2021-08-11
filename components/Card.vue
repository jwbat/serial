<template>
  <div class="card-container">
    <slot></slot> 
  </div> 
</template>

<style scoped>
.card-container {
  width: 40rem;
  background: #d8f8cd;
  border-radius: 10px;
  border: 1px solid black;
  box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.3);
  padding: 1rem;
  padding-left: 2rem;
  white-space: pre;
}

.card-container:hover {
  background: coral;
}

@media (max-width: 480px) {
  .card-container {
    width: 70vw;
    padding: 8px;
    font-size: 0.9rem;
  }
}
</style>

