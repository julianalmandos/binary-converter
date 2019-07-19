<template>
  <div id="app">
    <!--
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>-->
    <div class="classyMenu classyRightMenu">
      <button class="classyLanguageButton">_</button>
      <button class="classyLanguageButton">■</button>
      <button class="classyLanguageButton">X</button>
    </div>
    <div class="classyMenu classyLeftMenu">
      <button class="classyLanguageButton">Menu</button>
    </div>
    <router-view/>
    <div class="classyBottomBar">
      <span>Made with ♥ by <a class="classyLink" href="http://github.com/julianalmandos">Julian Almandos</a> in 2019</span>
    </div>
  </div>
</template>

<style>

  #app {
    padding: 50px 500px 50px 500px;
    font-family: "Courier";
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #333;
  }

  button, input { 
    font-family: "Courier";
  }

  .classyMenu {
    position: fixed;
    display: flex;
    flex-direction: row;
  }

  .classyLeftMenu {
    left: 5%;
  }

  .classyRightMenu {
    right: 5%;
  }

  .classyLink {
    color: black;
  }

  .classyBottomBar {
    position: fixed;
    width:90%;
    left:5%;
    bottom: 5%
  }

  .classyLanguageButton {
    background-color: grey;
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAYAAABytg0kAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAABZJREFUeNpi2r9//38gYGAEESAAEGAAasgJOgzOKCoAAAAASUVORK5CYII=);
    border: 1px solid black;
    color: white;
    padding: 10px 20px;
    margin-left: 7px;
    text-align: center;
    font-size: 16px;
    -webkit-box-shadow: 5px 5px 0px -1px rgba(0,0,0,0.75);
    -moz-box-shadow: 5px 5px 0px -1px rgba(0,0,0,0.75);
    box-shadow: 5px 5px 0px -1px rgba(0,0,0,0.75);
  }

  .classyLanguageButton:hover {
    background-color: white;
    color:black;
    cursor: pointer;
  }

</style>
