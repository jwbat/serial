<template>
  <nav>
    <nuxt-link to="/">Home</nuxt-link> 
    <nuxt-link to="rules">Rules</nuxt-link> 
  </nav> 
</template>

<script>
export default {
};
</script>

<style scoped>
nav {
  color: white;
  display: flex;
  justify-content: space-around;
  padding: 1rem;
  background: hsla(30, 78%, 47%, 1);
  border: 1px solid grey;
  background: 
   radial-gradient(circle, hsla(30deg, 29%, 65%, 0.5) 0%, hsla(326deg, 35%, 46%, 0.5) 100%);
}

a {
  color: black;
  text-decoration: none;
}
</style>
