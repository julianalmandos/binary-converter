<template>
  <div id="app">
    <div class="main-content">
      <!--This should be a list-->
      <div class="classy-menu classy-right-menu">
        <Button :theme="'grey'">_</Button>
        <Button :theme="'grey'">■</Button>
        <Button :theme="'grey'">X</Button>
      </div>
      <!--This should be a list, even a nav-->
      <div class="classy-menu classy-left-menu">
        <router-link to="/"><Button :theme="'yellow'">{{currentLanguage.home}}</Button></router-link>
        <router-link to="/records"><Button :theme="'yellow'">{{currentLanguage.records}}</Button></router-link>
        <Button :theme="'blue'" @click="openDropdown" ref="languagesMenuButton">
          {{currentLanguage.language + ' ' + (isDropdownOpen ? '▲' : '▼')}}
        </Button>
        <ul class="languages-menu shadow dotted" ref="languagesMenu">
          <li v-for="language in languageKeys" :key="language">
            <Button
              :class="[currentLanguageKey === language ? 'current-language' : '']"
              :theme="'white'"
              :animated="false"
              @click="setLanguage(language)"
            >{{currentLanguage[language]}}</Button>
          </li>
        </ul>
        <div class="external-link">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
          <a class="classy-link" target="_blank" href="https://github.com/julianalmandos/binary-converter">
            {{currentLanguage.seeItOnGitHub}}
          </a>
        </div>
      </div>
      <router-view class="view"/>
    </div>
    <div class="classy-bottom-bar">
      <span>{{currentLanguage.madeWithLove}} <a class="classy-link" target="_blank" href="http://github.com/julianalmandos">Julian Luis Almandos</a> {{currentLanguage.madeInDate}}</span>
    </div>
  </div>
</template>

<script>
import Button from '@/components/Button.vue'
import Vuex from 'vuex'
import LanguageManager from '@/utils/LanguageManager.js'

export default {
  name: 'App',
  components: {
    Button
  },
  data() {
    return {
      isDropdownOpen: false,
      languageKeys: []
    }
  },
  mounted() {
    this.languageKeys = LanguageManager.getLanguages();
    const html = document.querySelector('html');
    html.addEventListener('click', event => {
      if (event.target !== this.$refs.languagesMenuButton.$el) {
        this.$refs.languagesMenu.classList.remove('languages-menu-show');
        this.isDropdownOpen = false;
      }
    })
  },
  computed: {
    ...Vuex.mapState([
      'currentLanguage',
      'currentLanguageKey'
    ]),
  },
  methods: {
    ...Vuex.mapActions({
      setLanguageAction: 'setLanguage'
    }),
    openDropdown(){
      const languagesMenu = this.$refs.languagesMenu;
      if (!languagesMenu.classList.contains('languages-menu-show')) {
        languagesMenu.classList.add('languages-menu-show');
        this.isDropdownOpen = true;
      } else {
        languagesMenu.classList.remove('languages-menu-show');
        this.isDropdownOpen = false;
      }
    },
    setLanguage(language) {
      this.setLanguageAction(language);
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
  text-align: center;
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

.external-link {
  display: flex;
  align-items: center;
  justify-content: center;
}

.external-link > svg {
  margin-right: 10px;
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

.router-link-exact-active > Button::after,
.router-link-exact-active > Button::before,
.current-language::after,
.current-language::before {
  content: '*';
  font-weight: bold;
}

.languages-menu {
  display: none;
  position: relative;
  -webkit-list-style-type: none;
  -moz-list-style-type: none;
  -ms-list-style-type: none;
  -o-list-style-type: none;
  list-style-type: none;
  padding: 0;
  left: 15px;
  top: -5px;
}

.languages-menu > li:not(:first-child) > Button {
  border-top: none;
}

.languages-menu-show {
  display: block;
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
