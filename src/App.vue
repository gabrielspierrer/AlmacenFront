<template>
  <div id="app">
    <div id="nav" class="d-flex flex-row justify-content-center align-items-center gap-5">
      <router-link to="/">Compras / Ventas</router-link>
      <router-link to="/articulos">Articulos</router-link>
      <router-link to="/rubros">Rubros</router-link>
      <router-link to="/comprobantes">Comprobantes</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: black;
}

#nav {
  padding: 2em;
}

#nav a {
  font-weight: bold;
  color: black;
  text-decoration: none;
}

#nav a:hover {
  text-decoration: underline;
}

#nav a.router-link-exact-active {
  text-decoration: underline;
}
</style>