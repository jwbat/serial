<template>
  <div>
    <Header /> 
    <Nuxt />
  </div>
</template>

<style>
html {
  background: #1f4037;
  background: -webkit-linear-gradient(to bottom, #62c3bb, #1f4037);
  background: linear-gradient(to bottom, #62c3bb, #1f4037);
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
  cursor: pointer;
}

.btn--green {
  background: azure;
  border: 2px solid #3b8070;
  color: #3b8070;
}


.btn--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
}

@media (hover: hover) {
  .btn--grey:hover {
    color: #fff;
    background-color: #35495e;
  }
  .btn--green:hover {
    color: #fff;
    background-color: #3b8070;
  }
}
</style>
