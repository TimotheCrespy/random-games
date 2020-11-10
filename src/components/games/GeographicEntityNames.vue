<template>
  <div class="geographic-entity-names">
    <strong class="instructions">{{ instructions }}</strong>

    <section class="road-sign">
      <img class="background" :src="backgroundSvg" alt="Road sign" />
      <span class="name" :style="nameStyle">{{ currentEntity.name }}</span>
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
  name: "GeographicEntityNames",
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
    nameStyle: {
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
    } = useScore(`${props.geographicZoneCode}_geographic_entity_names`);

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
.geographic-entity-names {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: rgb(238, 174, 202);
  background: radial-gradient(
    circle,
    rgba(238, 174, 202, 1) 0%,
    rgba(148, 187, 233, 1) 100%
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
      max-height: 340px;
      max-width: 100%;
    }

    .name {
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