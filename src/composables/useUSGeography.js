import { ref } from "vue";
import { useShuffle } from "@/composables/useShuffle";
import USStates from "@/data/USStates.json";

export function useUSGeography() {
  const currentCode = ref("");
  const states = ref(USStates);
  const answers = ref([])

  const { shuffle } = useShuffle();

  function resetCode() {
    // Finds random new code
    let lastCodeValue = currentCode.value
    while (lastCodeValue === currentCode.value) {
      shuffle(states.value)
      currentCode.value = states.value[0].code
      answers.value = states.value.slice(0, 4)
      shuffle(answers.value)
    }
  }

  function isRightAnswer(code) {
    return code === currentCode.value;
  }

  return { states, currentCode, answers, resetCode, isRightAnswer };
}