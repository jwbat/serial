<template>
  <div class="card-container">
    <slot></slot> 
  </div> 
</template>

<style scoped>
.card-container {
  width: 50rem;
  background: #d8f8cd;
  border-radius: 10px;
  border: 1px solid black;
  box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.3);
  padding: 1rem;
  padding-left: 2rem;
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  grid-column-gap: 2rem;
}

.card-container:hover {
  background: coral;
}

@media (max-width: 480px) {
  .card-container {
    width: 80vw;
    padding: 1px;
    font-size: 1.1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0.7rem;
    font-weight: 600;
  }
}
</style>
