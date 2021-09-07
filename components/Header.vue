<template>
  <nav>
    <nuxt-link to="/">
      <Home />
    </nuxt-link> 
    <nuxt-link to="info">
      <Info /> 
    </nuxt-link> 
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
  background: none;
}

a {
  color: black;
  text-decoration: none;
  font-size: 1.4rem;
}
</style>
