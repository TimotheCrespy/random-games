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
  height: 160px;
  width: 160px;
  font-size: 8rem;
  border: 4px solid;
  border-radius: 1rem;
  background-color: #fffc;
}
</style>
