<template>
  <input
    class="input shadow"
    :value="value"
    @input="updateValue($event.target.value)">
</template>

<script>
export default {
  name: 'Input',
  props: {
    value: String
  },
  methods: {
    //Made to replicate a normal input v-model behaviour.
    //https://paulund.co.uk/use-v-model-on-custom-vue-component
    updateValue(value) {
      this.$emit('input', value);
    }
  }
}
</script>

<style>

.input {
  font-size: 3rem;
  text-align:center;
  background-color: var(--primaryWhite);
  border: 1px solid var(--black);
}

.input:focus {
  box-shadow: none;
  transform: translate(3px, 3px);
}

@media (max-width: 720px) {
  .input {
    font-size: 7vw;
  }
}

</style>