<template>
  <div id="app">
    <div class="main-content">
      <div class="classy-menu classy-right-menu">
        <button class="classy-menu-button classy-shadow dotted">_</button>
        <button class="classy-menu-button classy-shadow dotted">■</button>
        <button class="classy-menu-button classy-shadow dotted">X</button>
      </div>
      <div class="classy-menu classy-left-menu">
        <button class="classy-menu-button classy-shadow dotted">Records</button>
        <button class="classy-menu-button classy-shadow dotted">Language</button>
        <div class="classy-dropdown" v-if="showDropdown">
          <button class="classy-menu-button classy-shadow dotted">Record</button>
          <button class="classy-menu-button classy-shadow dotted">Language</button>
        </div>
      </div>
      <router-view class="view"/>
    </div>
    <div class="classy-bottom-bar">
      <span>Made with ♥ by <a class="classy-link" href="http://github.com/julianalmandos">Julian Luis Almandos</a> in 2019-2020</span>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'App',
    data() {
      return {
        showDropdown: false,
      }
    },
    methods: {
      openDropdown(){
        this.showDropdown=!this.showDropdown;
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

body, html {
  box-sizing: border-box;
  margin: 0;
  background-image: var(--dotBackground);
}

button, input { 
  font-family: inherit;
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
}

.classy-left-menu > .classy-menu-button:not(:first-child) {
  margin-top: 15px;
}

.classy-right-menu > .classy-menu-button:not(:first-child) {
  margin-left: 15px;
}

.classy-link {
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

.classy-menu-button {
  background-color: grey;
  border: 1px solid var(--black);
  color: white;
  padding: 10px 20px;
  text-align: center;
  font-size: 16px;
}

.classy-menu-button:hover {
  background-color: white;
  color: var(--black);
  cursor: pointer;
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
