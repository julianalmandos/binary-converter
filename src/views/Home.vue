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

<style>

.home {
  padding: 5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

@media (max-width: 720px) {
  .home {
    padding: 3rem 10px 5rem 10px;
  }
}

</style>
