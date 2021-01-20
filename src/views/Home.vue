<template>
  <div class="home">
    <Introduction/>
    <Menu/>
  </div>
</template>

<script>
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

<style>

@media (max-width: 720px) {
  .home {
    padding: 3rem 10px;
  }
}

</style>
