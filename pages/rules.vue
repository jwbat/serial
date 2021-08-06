<template>
  <div class="rules">
    <section class="format">
      <h2>enter: CHI 5 R 110 001 A </h2><br /> 
      <h2>format: CHI-5R-V110-001_REVA</h2> 
    </section> 
    <section>
      <h2>Next Q</h2> 
      <p>
        The sequence number field holds the next, default Q value.
      </p> 
    </section> 
    <section>
      <h2>Reassigning Q</h2> 
      <p>
        Once a serial no. has been selected, its sequence nr, Q,
        may be reassigned if necessary.
      </p> 
      <p>
        When reassigning Q, the new value must be less than the highest and not already be taken.
      </p> 
    </section> 
  </div> 
</template>

<script>
export default {
};
</script>

<style scoped>
.rules {
  color: #f1f1d2;
  padding-top: 3rem;
  padding-right: 3rem;
  padding-left: 8rem;
  display: flex;
  flex-direction: column;
  background: #09192b;
  min-height: 100vh;
}

section {
  margin-block: 1rem; 
}

h2 {
  word-spacing: 5px;
  letter-spacing: 3px;
}

h2, h3, h4 {
  color: orange;
  margin-bottom: 0.5rem;
  margin-right: 1rem;
  display: inline-block;
}

h4 {
  color: yellow; 
  margin-right: 2rem;
}

p {
  font-size: 1.2rem;
}
</style>

