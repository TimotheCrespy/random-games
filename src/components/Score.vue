<template>
  <div class="score">
    <strong class="time">Time: {{ (countdown / 1000).toFixed(2) }}s</strong>
    <strong class="score">Score: {{ score }}</strong>
    <strong class="best-score">Best score: {{ bestScore }}</strong>
    <strong class="cumulative-best-score">
      Cumulative best score: {{ cumulativeBestScore }}
    </strong>
  </div>
</template>

<script>
export default {
  name: "Score",
  props: {
    countdown: {
      type: Number,
      required: true,
    },
    score: {
      type: Number,
      required: true,
    },
    bestScore: {
      type: Number,
      required: true,
    },
    cumulativeBestScore: {
      type: Number,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.score {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #fff;
}
</style>
