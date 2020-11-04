<template>
  <div class="previous-letter">
    <strong class="instructions">Previous letter?</strong>
    <Letter :value="currentLetter" />
    <LetterResult :is-success="result" :typed-letter="typedLetter" />
    <strong class="time">Time: {{ (countdown / 1000).toFixed(2) }}s</strong>
    <strong class="score">Score: {{ score }}</strong>
    <strong class="best-score">Best score: {{ bestScore }}</strong>
    <Keypress @any="checkPreviousLetter" />
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useAlphabet } from "@/composables/useAlphabet";
import { useCountdown } from "@/composables/useCountdown";
import { useScore } from "@/composables/useScore";
import Keypress from "vue-keypress";
import Letter from "@/components/Letter.vue";
import LetterResult from "@/components/LetterResult.vue";
const GAME_CODE = "previous_letter";
const TIME = 10000;

export default {
  name: "PreviousLetter",
  components: { Keypress, Letter, LetterResult },
  setup() {
    const result = ref(false);
    const typedLetter = ref("");

    const { currentLetter, resetLetter, isRightPreviousLetter } = useAlphabet();
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

    function checkPreviousLetter(letter) {
      typedLetter.value = letter.event.key;
      if (isRightPreviousLetter(typedLetter.value)) {
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
      checkPreviousLetter,
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
.previous-letter {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: rgb(253, 29, 29);
  background: linear-gradient(
    135deg,
    rgba(253, 29, 29, 1) 0%,
    rgba(216, 102, 242, 1) 50%,
    rgba(252, 176, 69, 1) 100%
  );

  .instructions,
  .time,
  .score,
  .best-score {
    color: #fff;
  }
  .instructions {
    margin-bottom: 1rem;
  }
  .time {
    margin-top: 1rem;
  }
}
</style>
