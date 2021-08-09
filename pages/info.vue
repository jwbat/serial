<template>
  <div class="info">
    <section class="format">
      <h2>Inputs</h2> 
      <p>
        Input fields must all contain values before Save or Return 
        will add it to the list.
      </p>
      <p>
      CHI 5 R 110 001 A will format as  CHI-5R-V110-001_REVA
      </p><br /> 
    </section> 
    <section>
      <h2>Next Q</h2> 
      <p>
        The second to last field holds the sequence number, Q, which is 
        auto-incremented.
      </p> 
      <p>
        It can be reset via Edit Q but not to a value lower than the 
        highest value already assigned.
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
.info {
  color: #f1f1d2;
  padding-top: 3rem;
  padding-right: 3rem;
  padding-left: 20vw;
  display: flex;
  flex-direction: column;
  background: #09192b;
  min-height: 100vh;
  line-height: 1.6;
  letter-spacing: 1.5px;
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
  font-size: 1.4rem;
}
</style>

