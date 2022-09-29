<template>
  <div class="home">
    <MainPage :isAndroid='Android' :md='md' />
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
  props: ['Android', 'md'],
}
</script>
