<template>
  <div class="result" :style="style" :key="selectedCode">
    <div v-if="isSuccess" class="success">
      <strong>Good!</strong>
      <br />
      <span>+1</span>
    </div>
    <div v-else class="failure">
      <strong>Try again.</strong>
      <br />
      <span>-1</span>
    </div>
  </div>
</template>

<script>
import { toRefs, ref, watch } from "vue";

export default {
  name: "Result",
  props: {
    isSuccess: {
      type: Boolean,
      required: true,
    },
    selectedCode: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const ANIMATION_DURATION = 1000;
    const { selectedCode } = toRefs(props);
    const style = ref({});

    const animate = () => {
      style.value = {
        display: "block",
        animation: `${ANIMATION_DURATION}ms slide-bottom`,
      };
      setTimeout(() => {
        style.value = {
          display: "none",
        };
      }, ANIMATION_DURATION);
    };

    watch(selectedCode, () => {
      animate();
    });

    return { style };
  },
};
</script>

<style lang="scss" scoped>
.result {
  display: none;
  position: absolute;
  top: 72vh;
  opacity: 0;
  text-align: center;

  .success {
    color: green;
  }
  .failure {
    color: darkred;
  }
}
</style>
