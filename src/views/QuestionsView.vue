<template id="app">
  <QuestionView :isAndroid='Android' :md="md" />
</template>

<script>
import QuestionView from '../components/QuestionView.vue'

export default {
  name: 'QuestionsView',
  props: ['Android', 'md'],
  components: {
    QuestionView
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
    margin-top: 60px;
  }
}
</style>