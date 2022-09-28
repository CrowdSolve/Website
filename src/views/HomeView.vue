<template>
  <div class="home">
    <MainPage :md='md' />
  </div>
</template>

<script>
// @ is an alias to /src
import MainPage from '@/components/MainPage.vue'

export default {
  name: 'HomeView',
  components: {
    MainPage
  },
  props: ['md'],
}
</script>
