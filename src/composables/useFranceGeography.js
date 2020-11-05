import { ref, computed } from "vue";
import { useShuffle } from "@/composables/useShuffle";
import franceRegions from "@/data/franceRegions.json";

export function useFranceGeography() {
  const currentDepartment = ref({});
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
    let lastCodeValue = currentDepartment.value.code
    while (lastCodeValue === currentDepartment.value.code) {
      shuffle(departments.value)
      currentDepartment.value = departments.value[0]
      answers.value = departments.value.slice(0, 4)
      shuffle(answers.value)
    }
  }

  function isRightAnswer(code) {
    return code === currentDepartment.value.code;
  }

  return { regions, departments, currentDepartment, answers, resetCode, isRightAnswer };
}