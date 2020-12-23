<template>
  <div id="app">
    <div class="main-content">
      <div class="classy-menu classy-right-menu">
        <Button :theme="'grey'">_</Button>
        <Button :theme="'grey'">■</Button>
        <Button :theme="'grey'">X</Button>
      </div>
      <div class="classy-menu classy-left-menu">
        <router-link to="/"><Button :theme="'yellow'">Home</Button></router-link>
        <router-link to="/records"><Button :theme="'yellow'">Records</Button></router-link>
        <Button :theme="'blue'" @click="openDropdown">Language ▼</Button>
      </div>
      <router-view class="view"/>
    </div>
    <div class="classy-bottom-bar">
      <span>Made with ♥ by <a class="classy-link" target="_blank" href="http://github.com/julianalmandos">Julian Luis Almandos</a> in 2019-2020</span>
    </div>
  </div>
</template>

<script>
import Button from '@/components/Button.vue'

export default {
  name: 'App',
  components: {
    Button
  },
  data() {
    return {
      showDropdown: false,
    }
  },
  methods: {
    openDropdown(){
      console.log('Opened!');
    }
  }
}

</script>


<style>

#app {
  min-height: 100vh;
  font-family: "Courier";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #333;
  display: flex;
  flex-direction: column;
  
}

.classy-menu {
  position: absolute;
  display: flex;
  top: 5%;
}

.classy-left-menu {
  left: 5%;
  flex-direction: column;
}

.classy-right-menu {
  right: 5%;
  pointer-events: none;
}

.classy-left-menu > *:not(:first-child) {
  margin-top: 15px;
}

.classy-right-menu > Button:not(:first-child) {
  margin-left: 15px;
}

.classy-link {
  text-decoration: underline;
  color: var(--black);
}

.classy-link:hover {
  text-decoration: none;
}

.classy-bottom-bar {
  padding: 6px;
  text-align: center;
  margin-bottom: 20px;
}

.main-content {
  flex: 1 1 100%;
}

.router-link-exact-active > Button::after {
  content: '*';
  font-weight: bold;
}

/*FIXME: decide what to do with the menu in mobile sizes*/
@media (max-width: 720px) {
  .classy-menu {
    position: static;
    width: 80%;
    margin: 20px auto;
    display: none;
  }

  .classy-right-menu {
    display: none;
  }

  .classy-bottom-bar {
    font-weight: bold;
    line-height: 1.4;
  }
}

</style>
