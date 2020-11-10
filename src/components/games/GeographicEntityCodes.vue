<template>
  <div class="geographic-entity-codes">
    <strong class="instructions">{{ instructions }}</strong>

    <section class="road-sign">
      <img class="background" :src="backgroundSvg" alt="Road sign" />
      <span class="code" :style="codeStyle">{{ currentEntity.code }}</span>
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
    <Score
      :countdown="countdown"
      :score="score"
      :bestScore="bestScore"
      :cumulativeBestScore="cumulativeBestScore"
    />
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useCountdown } from "@/composables/useCountdown";
import { useScore } from "@/composables/useScore";
import { useGeography } from "@/composables/useGeography";
import Result from "@/components/Result.vue";
import Score from "@/components/Score.vue";

export default {
  name: "USStateCodes",
  components: {
    Result,
    Score,
  },
  props: {
    time: {
      type: Number,
      required: true,
    },
    instructions: {
      type: String,
      required: true,
    },
    geographicZoneCode: {
      type: String,
      required: true,
    },
    backgroundSvg: {
      type: String,
      required: true,
    },
    codeStyle: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const result = ref(false);
    const selectedCode = ref("");

    const { currentEntity, answers, resetEntity, isRightAnswer } = useGeography(
      props.geographicZoneCode
    );
    const {
      countdown,
      resetCountdown,
      setCountdownInterval,
      setCountdownTimeout,
    } = useCountdown(props.time);
    const {
      score,
      bestScore,
      cumulativeBestScore,
      updateBestScore,
      resetScore,
      incrementScore,
    } = useScore(`${props.geographicZoneCode}_geographic_entity_codes`);

    onMounted(() => {
      resetEntity();
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
      if (countdown.value === 0 || countdown.value === props.time) {
        resetScore();
        setCountdownInterval();
        setCountdownTimeout(() => {
          updateBestScore(score.value);
        });
        resetCountdown();
      }

      result.value = true;
      incrementScore();
      resetEntity();
    }

    function handleWrongAnswer() {
      if (countdown.value !== 0) {
        result.value = false;
        if (countdown.value !== props.time) {
          incrementScore(-1);
        }
      }
    }

    return {
      answers,
      currentEntity,
      checkAnswer,
      result,
      score,
      bestScore,
      cumulativeBestScore,
      countdown,
      selectedCode,
    };
  },
};
</script>

<style lang="scss" scoped>
.geographic-entity-codes {
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

  .instructions {
    margin-bottom: 2rem;
    color: #fff;
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
      max-width: 100%;
    }

    .code {
      position: absolute;
    }
  }

  .answers {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 1rem;
    margin-bottom: 2rem;
    color: #fff;

    .answer {
      all: unset;
      margin-bottom: 0.5rem;
      padding: 0.4rem 1rem;
      background: #d76da9(175, 30, 45);
      background: linear-gradient(90deg, #b13cff, #fd9d52);

      border: 3px solid #d76da9;
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