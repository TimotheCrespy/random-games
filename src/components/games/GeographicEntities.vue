<template>
  <div class="geographic-entities">
    <strong class="instructions">{{ instructions }}</strong>

    <section class="map">
      <svg
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        :viewBox="svgViewbox"
        xml:space="preserve"
      >
        <g>
          <path
            v-for="entity in entities"
            :key="entity.code"
            :class="{ active: currentEntity.code === entity.code }"
            :d="entity.path"
          ></path>
        </g>
        <slot name="specific-path" :currentEntity="currentEntity" />
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
import { useCountdown } from "@/composables/useCountdown";
import { useScore } from "@/composables/useScore";
import { useGeography } from "@/composables/useGeography";
import Result from "@/components/Result.vue";

export default {
  name: "GeographicEntities",
  components: {
    Result,
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
    svgViewbox: {
      type: String,
      required: true,
    },
    specificPath: {
      type: String,
      default: "",
    },
  },
  setup(props) {
    const result = ref(false);
    const selectedCode = ref("");

    const {
      entities,
      currentEntity,
      answers,
      resetEntity,
      isRightAnswer,
    } = useGeography(props.geographicZoneCode);
    const {
      countdown,
      resetCountdown,
      setCountdownInterval,
      setCountdownTimeout,
    } = useCountdown(props.time);
    const {
      score,
      bestScore,
      updateBestScore,
      resetScore,
      incrementScore,
    } = useScore(`${props.geographicZoneCode}_geographic_entities`);

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
      entities,
      currentEntity,
      answers,
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
.geographic-entities {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #23003c;
  background: radial-gradient(circle, #9300ff 0%, #23003c 100%);

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