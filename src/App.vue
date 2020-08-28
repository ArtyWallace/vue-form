<template>
  <div id="app" class="container">
    <user-form></user-form>
  </div>
</template>

<script>
import UserForm from './components/UserForm.vue'

export default {
  name: 'App',
  components: {
    UserForm
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  padding: 50px 0;
}

.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
}
</style>
