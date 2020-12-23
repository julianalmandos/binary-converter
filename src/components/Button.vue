<template>
  <button @click="$emit('click')" :class="getClasses">
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
    theme: String
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
      return [...this.baseClasses, this.theme];
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

</style>