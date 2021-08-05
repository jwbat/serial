<template>
  <div class="rules">
    <h2>Reassigning Q</h2> 
    <p>
      Once a serial no. has been selected, its sequence nr, Q,
      may be reassigned if necessary.
    </p> 
    <p>
      When reassigning Q, the new value must be less than the highest and not already be taken.
    </p> 
  </div> 
</template>

<script>
export default {
};
</script>

<style scoped>
.rules {
  padding-top: 3rem;
  padding-right: 3rem;
  padding-left: 8rem;
  display: flex;
  flex-direction: column;
  background: #09192b;
  color: yellow;
  min-height: 100vh;
}

p {
  font-size: 1.1rem;
}
</style>

