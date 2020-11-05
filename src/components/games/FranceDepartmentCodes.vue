<template>
  <div class="france-departments">
    <strong class="instructions">Corresponding France department code?</strong>

    <section class="road-sign">
      <img class="background" :src="departmentRoadSign" alt="Road sign" />
      <span class="label">département</span>
      <span class="code">{{ currentDepartment.name }}</span>
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
        {{ answer.code }}
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
import { useFranceGeography } from "@/composables/useFranceGeography";
import { useCountdown } from "@/composables/useCountdown";
import { useScore } from "@/composables/useScore";
import Result from "@/components/Result.vue";
const GAME_CODE = "france_department_codes";
const TIME = 30000;

export default {
  name: "FranceDepartmentCodes",
  components: {
    Result,
  },
  setup() {
    const result = ref(false);
    const selectedCode = ref("");
    const departmentRoadSign = require("@/assets/department-road-sign.svg");

    const {
      currentDepartment,
      answers,
      resetCode,
      isRightAnswer,
    } = useFranceGeography();
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
      answers,
      currentDepartment,
      checkAnswer,
      result,
      score,
      bestScore,
      countdown,
      selectedCode,
      departmentRoadSign,
    };
  },
};
</script>

<style lang="scss" scoped>
.france-departments {
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
      height: 100%;
      max-height: 280px;
    }

    .label,
    .code {
      position: absolute;
      font-size: 2rem;
      color: #efb300;
    }
    .label {
      align-self: flex-start;
      margin-top: 0.75rem;
      margin-left: 6rem;
    }
    .code {
      align-self: flex-end;
      margin-bottom: 0.75rem;
      margin-left: 6rem;
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
      background: rgb(20, 20, 236);
      background: linear-gradient(
        90deg,
        rgba(20, 20, 236, 1) 0%,
        rgba(239, 179, 0, 1) 100%
      );
      border: 3px solid #826476;
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