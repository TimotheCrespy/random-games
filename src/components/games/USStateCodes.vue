<template>
  <div class="us-state-codes">
    <strong class="instructions">Corresponding US State?</strong>

    <section class="road-sign">
      <img class="background" :src="intersateRoadSign" alt="Road sign" />
      <span class="code">{{ currentCode }}</span>
    </section>

    <div class="answers">
      <button
        v-for="answer in answers"
        :key="answer.code"
        type="button"
        class="answer"
        @click="checkAnswer(answer.code)"
        :disabled="countdown.value === 0"
      >
        {{ answer.name }}
      </button>
    </div>

    <Result :is-success="result" :selected-code="selectedCode" />
    <strong class="time">Time: {{ (countdown / 1000).toFixed(2) }}s</strong>
    <strong class="score">Score: {{ score }}</strong>
    <strong class="best-score">Best score: {{ bestScore }}</strong>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useUSGeography } from "@/composables/useUSGeography";
import { useCountdown } from "@/composables/useCountdown";
import { useScore } from "@/composables/useScore";
import Result from "@/components/Result.vue";
const GAME_CODE = "us_state_codes";
const TIME = 10000;

export default {
  name: "USStateCodes",
  components: {
    Result,
  },
  setup() {
    const result = ref(false);
    const selectedCode = ref("");
    const intersateRoadSign = require("@/assets/intersate-road-sign.svg");

    const {
      states,
      currentCode,
      answers,
      resetCode,
      isRightAnswer,
    } = useUSGeography();
    const {
      countdown,
      resetCountdown,
      setCountdownInterval,
      setCountdownTimeout,
    } = useCountdown(TIME);
    const {
      score,
      bestScore,
      updateBestScore,
      resetScore,
      incrementScore,
    } = useScore(GAME_CODE);

    onMounted(() => {
      resetCode();
    });

    function checkAnswer(code) {
      selectedCode.value = code;
      if (isRightAnswer(code)) {
        handleRightAnswer();
        return;
      }

      handleWrongAnswer();
    }

    function handleRightAnswer() {
      if (countdown.value === 0 || countdown.value === TIME) {
        resetScore();
        setCountdownInterval();
        setCountdownTimeout(() => {
          updateBestScore(score.value);
        });
        resetCountdown();
      }

      result.value = true;
      incrementScore();
      resetCode();
    }

    function handleWrongAnswer() {
      if (countdown.value !== 0) {
        result.value = false;
        if (countdown.value !== TIME) {
          incrementScore(-1);
        }
      }
    }

    return {
      states,
      answers,
      currentCode,
      checkAnswer,
      result,
      score,
      bestScore,
      countdown,
      selectedCode,
      intersateRoadSign,
    };
  },
};
</script>

<style lang="scss" scoped>
.us-state-codes {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: rgb(114, 255, 146);
  background: radial-gradient(
    circle,
    rgba(114, 255, 146, 1) 0%,
    rgba(29, 87, 42, 1) 100%
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

  .road-sign {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    max-height: 50vh;

    .background {
      width: 60%;
    }

    .code {
      position: absolute;
      font-size: 8rem;
      color: #fff;
    }
  }

  .answers {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 1rem;
    color: #fff;

    .answer {
      all: unset;
      margin-bottom: 0.5rem;
      padding: 0.4rem 1rem;
      background: rgb(175, 30, 45);
      background: linear-gradient(
        135deg,
        rgba(175, 30, 45, 1) 30%,
        rgba(0, 63, 135, 1) 70%
      );
      border: 3px solid #582f5a;
      border-radius: 1.25rem;
      text-align: center;

      cursor: pointer;

      &:hover {
        border: 3px solid #fff;
      }
    }
  }
}
</style>