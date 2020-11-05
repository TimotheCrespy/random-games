import { ref } from "vue";
import { useShuffle } from "@/composables/useShuffle";
import canadaProvinces from "@/data/canadaProvinces.json";

export function useCanadaGeography() {
  const currentCode = ref("");
  const provinces = ref(canadaProvinces);
  const answers = ref([])

  const { shuffle } = useShuffle();

  function resetCode() {
    // Finds random new code
    let lastCodeValue = currentCode.value
    while (lastCodeValue === currentCode.value) {
      shuffle(provinces.value)
      currentCode.value = provinces.value[0].code
      answers.value = provinces.value.slice(0, 4)
      shuffle(answers.value)
    }
  }

  function isRightAnswer(code) {
    return code === currentCode.value;
  }

  return { provinces, currentCode, answers, resetCode, isRightAnswer };
}