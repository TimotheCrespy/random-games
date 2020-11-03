<template>
  <div class="letter">
    {{ value.toUpperCase() }}
  </div>
</template>

<script>
export default {
  name: "Letter",
  props: {
    value: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.letter {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80px;
  width: 80px;
  font-size: 4rem;
  border: 4px solid;
  border-radius: 1rem;
  background-color: #fffc;
}
</style>
