<template>
  <div class="us-states">
    <strong class="instructions">Highlighted US State?</strong>

    <section class="map">
      <svg
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        viewBox="174 100 959 593"
        xml:space="preserve"
      >
        <g>
          <path
            v-for="state in states"
            :key="state.code"
            :class="{ active: currentCode === state.code }"
            :d="state.path"
          ></path>
        </g>
        <g>
          <circle
            fill="none"
            :stroke="currentCode === 'DC' ? '#ffd127' : '#fff'"
            stroke-width="1.5"
            cx="975.3"
            cy="351.8"
            r="6"
          />
        </g>
      </svg>
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
const GAME_CODE = "us_states";
const TIME = 30000;

export default {
  name: "USStates",
  components: {
    Result,
  },
  setup() {
    const result = ref(false);
    const selectedCode = ref("");

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
    };
  },
};
</script>

<style lang="scss" scoped>
.us-states {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: rgb(255, 255, 255);
  background: radial-gradient(
    circle,
    rgba(255, 255, 255, 1) 0%,
    rgba(135, 135, 135, 1) 66%,
    rgba(0, 0, 0, 1) 100%
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

  .map {
    width: 100%;
    max-height: 50vh;

    svg {
      width: 100%;
      height: 100%;
    }

    path {
      stroke: #000000;
      stroke-width: 1px;
      stroke-linecap: round;
      stroke-linejoin: round;
      stroke-opacity: 0.4;
      fill: rgba(94, 255, 247, 1);
    }
    g path:hover {
      fill: rgba(255, 235, 100, 1);
      cursor: pointer;
    }
    path.active {
      fill: rgba(255, 208, 39, 1) !important;
      box-shadow: 10px 5px 5px red;
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
      background: rgb(255, 208, 39);
      background: linear-gradient(
        135deg,
        rgba(255, 208, 39, 1) 0%,
        rgba(94, 255, 247, 1) 100%
      );
      border: 3px solid #afeca1;
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