import { ref, computed } from "vue";
import { useShuffle } from "@/composables/useShuffle";
import franceRegions from "@/data/franceRegions.json";

export function useFranceGeography() {
  const currentCode = ref("");
  const regions = ref(franceRegions);
  const departments = computed(() => {
    let departments = [];
    regions.value.forEach((r) => {
      departments.push(...r.departments);
    });
    return departments;
  });
  const answers = ref([])

  const { shuffle } = useShuffle();

  function resetCode() {
    // Finds random new code
    let lastCodeValue = currentCode.value
    while (lastCodeValue === currentCode.value) {
      shuffle(departments.value)
      currentCode.value = departments.value[0].code
      answers.value = departments.value.slice(0, 4)
      shuffle(answers.value)
    }
  }

  function isRightAnswer(code) {
    return code === currentCode.value;
  }

  return { regions, currentCode, answers, resetCode, isRightAnswer };
}