<template>
  <div class="next-letter">
    <Letter :value="currentLetter" />
    <Result :is-success="result" :typed-letter="typedLetter" />
    <strong class="time">Time: {{ (countdown / 1000).toFixed(2) }}s</strong>
    <strong class="score">Score: {{ score }}</strong>
    <strong class="best-score">Best score: {{ bestScore }}</strong>
    <Keypress @any="checkNextLetter" />
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useAlphabet } from "@/composables/useAlphabet";
import { useCountdown } from "@/composables/useCountdown";
import { useScore } from "@/composables/useScore";
import Keypress from "vue-keypress";
import Letter from "@/components/Letter.vue";
import Result from "@/components/Result.vue";
const GAME_CODE = "next_letter";
const TIME = 10000;

export default {
  name: "NextLetter",
  components: { Keypress, Letter, Result },
  setup() {
    const result = ref(false);
    const typedLetter = ref("");

    const { currentLetter, resetLetter, isRightNextLetter } = useAlphabet();
    const {
      countdown,
      resetCountdown,
      setCountdownInterval,
      clearCountdownInterval,
      setCountdownTimeout,
      clearCountdownTimeout,
    } = useCountdown(TIME);
    const {
      score,
      bestScore,
      updateBestScore,
      resetScore,
      incrementScore,
    } = useScore(GAME_CODE);

    onMounted(() => {
      resetLetter();
    });

    function checkNextLetter(letter) {
      typedLetter.value = letter.event.key;
      if (isRightNextLetter(typedLetter.value)) {
        handleRightLetter();
        return;
      }

      handleWrongLetter();
    }

    function handleRightLetter() {
      if (!result.value || countdown.value === 0) {
        resetScore();
        setCountdownInterval();
        setCountdownTimeout(() => {
          updateBestScore(score.value);
        });
        if (countdown.value === 0) {
          resetCountdown();
        }
      }

      result.value = true;
      incrementScore();
      resetLetter();
    }

    function handleWrongLetter() {
      if (result.value) {
        clearCountdownTimeout();
        clearCountdownInterval();
        resetCountdown();
      }

      result.value = false;
      resetScore();
    }

    return {
      currentLetter,
      checkNextLetter,
      result,
      score,
      bestScore,
      typedLetter,
      countdown,
    };
  },
};
</script>

<style lang="scss" scoped>
.next-letter {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: rgb(2, 0, 36);
  background: linear-gradient(
    45deg,
    rgba(2, 0, 36, 1) 0%,
    rgba(9, 9, 121, 1) 34%,
    rgba(0, 212, 255, 1) 100%
  );

  .time,
  .score,
  .best-score {
    color: #fff;
  }
  .time {
    margin-top: 1rem;
  }
}
</style>
