<template>
  <div id="Header" class="inline-flex content-center justify-center align-middle h-20 w-full">
    <div class="bg-slate-600 rounded-full h-px w-full ml-10 mr-10"></div>
    <img src="./assets/logo.png" alt="CrowdSolve logo" class="h-14 w-14">
    <div>
      <span class="block text-4xl font-black text-white pl-2" style="font-style: italic;">
        <span class="text-6xl">C</span>rowd<span class="text-6xl" style="color: #D07000">S</span>olve</span>
      <span id="HeaderBot" class="text-xs text-slate-600">The BEST platform for college students</span>
    </div>
    <div class="bg-slate-600 rounded-full h-px w-full ml-10 mr-10"></div>
  </div>
  <HelloWorld />
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
  margin-bottom: 100px;
}

#Header {
  display: inline-flex;
  justify-content: center;
  align-items: center;
}

#HeaderBot {
  padding-left: 3.5vw;
}

@media only screen and (max-width: 690px) {
  #app {
    width: 100vw;
    max-width: 100%;
    font-size: 3vw;
  }
}
</style>
