<template>
  <div id="Header" class="inline-flex content-center justify-center align-middle h-20 w-full">
    <div v-if="isAndroid" class="bg-slate-600 rounded-full h-px w-full ml-7 mr-7"></div>
    <div v-if="isAndroid == false" class="w-7"></div>
    <img @click="$router.push('/')" src="./assets/website-header-white.png" alt="CrowdSolve logo" class="h-9">
    <div class="bg-slate-600 rounded-full h-px w-full ml-7 mr-7"></div>
  </div>
  <!-- <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/questions">About</router-link>
  </nav> -->
  <router-view :Android="isAndroid" :md="md" />
</template>

<script setup>
const ua = navigator.userAgent.toLowerCase()
const isAndroid = ua.indexOf("android") > -1

// define math equations renderer that transforms markdown math equations into html
// that gets previewed with css rules from external file linked in the index.html
const tm = require('markdown-it-texmath');
const md = require('markdown-it')({ html: true })
  .use(tm, {
    engine: require('katex'),
    delimiters: 'dollars',
    katexOptions: { macros: { "\\RR": "\\mathbb{R}" } }
  })
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#Header {
  display: inline-flex;
  justify-content: center;
  align-items: center;
}

#HeaderBot {
  padding-left: 3.5vw;
}

#ad>i {
  padding-bottom: 0.15rem;
}

@media only screen and (max-width: 690px) {
  #app {
    width: 100vw;
    max-width: 100%;
    font-size: 3vw;
    margin-top: 60px;
  }

  #Header {
    position: fixed;
    top: 0px;
    left: 0px;
    height: 60px;
    background-color: #263646;
    z-index: 5;
  }
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}

.noselect {
  -webkit-touch-callout: none;
  /* iOS Safari */
  -webkit-user-select: none;
  /* Safari */
  -khtml-user-select: none;
  /* Konqueror HTML */
  -moz-user-select: none;
  /* Old versions of Firefox */
  -ms-user-select: none;
  /* Internet Explorer/Edge */
  user-select: none;
  /* Non-prefixed version, currently
                                  supported by Chrome, Edge, Opera and Firefox */
}
</style>
