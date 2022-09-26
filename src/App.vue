<template>
  <div id="Header" class="inline-flex content-center justify-center align-middle h-20 w-full">
    <div v-if="isAndroid" class="bg-slate-600 rounded-full h-px w-full ml-7 mr-7"></div>
    <div v-if="isAndroid == false" class="w-7"></div>
    <img src="./assets/logo.png" alt="CrowdSolve logo" class="h-9 w-9">
    <!-- <div>
      <span class="block text-xl text-white pl-2" style="font-style: italic;">
        <span class="text-2xl">C</span>rowd<span class="text-3xl" style="color: #D07000">S</span>olve</span>
      <span id="HeaderBot" class="text-xs text-slate-600">The BEST platform for college students</span>
  </div> -->
    <div class="bg-slate-600 rounded-full h-px w-full ml-7 mr-7"></div>
  </div>
  <HelloWorld @Android='checkDevice' />
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  data() {
    return {
      isAndroid: null,
    }
  },
  components: {
    HelloWorld
  },
  methods: {
    checkDevice(value) {
      this.isAndroid = value
    }
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
