<template>
  <div class="home">
    <Introduction/>
    <Menu/>
  </div>
</template>

<script>
// @ is an alias to /src
import Introduction from '@/components/Introduction.vue'
import Menu from '@/components/Menu.vue'

export default {
  name: 'home',
  components: {
    Introduction,
    Menu
  }
}
</script>
