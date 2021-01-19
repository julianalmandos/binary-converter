<template>
  <button @click="$emit('click')" :class="getClasses" ref="button">
    <slot></slot>
  </button>
</template>

<script>
/**
 * ---AVAILABLE THEMES---
 * [green, grey, yellow, blue]
 */

export default {
  name: 'Button',
  props: {
    theme: String,
    animated: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      baseClasses: [
        'button',
        'dotted',
        'shadow'
      ]
    }
  },
  computed: {
    getClasses() {
      return [...this.baseClasses, this.theme, this.animated ? 'animated' : null];
    }
  }
}
</script>

<style scoped>

/* FIXME: these buttons should be a different component */
.button {
  border: 1px solid var(--black);
  color: var(--black);
  padding: 10px 20px;
  text-align: center;
  font-size: 16px;
  background-color: var(--primaryRed);
  display: block;
  width: 100%;
}

.animated:active {
  box-shadow: none;
  transform: translate(3px, 3px);
}

.button:hover {
  background-color: whitesmoke;
  cursor: pointer;
}

.green {
  background-color: var(--primaryGreen);
}

.grey {
  background-color: hsl(0, 0%, 45%);
  color: white;
}

.grey:hover {
  color: var(--black);
}

.yellow {
  background-color: #d8df7a;
}

.blue {
  background-color: #79a4d6;
}

.white {
  background-color: var(--primaryWhite);
}

.white:hover {
  background-color: rgb(219, 219, 219);
}

</style>