<template>
  <div class="result" :style="style" :key="typedLetter">
    <div v-if="isSuccess" class="success">
      <Letter :value="typedLetter" />
      <br />
      <span>Good!</span>
      <br />
      <span>+1</span>
    </div>
    <div v-else class="failure">
      <Letter :value="typedLetter" />
      <br />
      <span>Try again</span>
      <br />
      <span>Back to 0</span>
    </div>
  </div>
</template>

<script>
import Letter from "@/components/Letter.vue"
import { toRefs, ref, watch } from "vue";

export default {
  name: "Result",
  components: {
    Letter
  },
  props: {
    isSuccess: {
      type: Boolean,
      required: true,
    },
    typedLetter: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const { typedLetter } = toRefs(props);
    const style = ref({});
    const timeout = ref(null);

    watch(typedLetter, () => {
      clearTimeout(timeout.value)
      style.value = {
        opacity: 1,
        animation: "1s slide-bottom",
      };
      timeout.value = setTimeout(() => {
        style.value = { opacity: 0 };
      }, 900);
    });

    return { style };
  },
};
</script>

<style lang="scss">
.result {
  position: absolute;
  top: 46vh;
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
