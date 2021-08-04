<template>
  <div>
    <Nuxt />
  </div>
</template>

<style>
html {
  background: #999;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}

.btn {
  display: inline-block;
  border-radius: 4px;
  text-decoration: none;
  padding: 8px 15px;
}

.btn--green {
  background: azure;
  border: 2px solid #3b8070;
  color: #3b8070;
}

.btn--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.btn--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
}

.btn--grey:hover {
  color: #fff;
  background-color: #35495e;
}
</style>
