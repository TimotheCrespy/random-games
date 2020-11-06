import { ref } from "vue";
import { useShuffle } from "@/composables/useShuffle";
const GEOGRAPHIC_ZONE_FILE_CODES = {
  "canada": "canadaProvinces",
  "france": "franceDepartments",
  "spain": "spainProvinces",
  "us": "usStates",
}

export function useGeography(geographicZoneCode) {
  const entities = ref(require(`@/data/${GEOGRAPHIC_ZONE_FILE_CODES[geographicZoneCode]}.json`))
  const currentEntity = ref({});
  const answers = ref([])

  const { shuffle } = useShuffle();

  function resetEntity() {
    // Finds random new entity
    let lastCodeValue = currentEntity.value.code
    while (lastCodeValue === currentEntity.value.code) {
      shuffle(entities.value)
      currentEntity.value = entities.value[0]
      answers.value = entities.value.slice(0, 4)
      shuffle(answers.value)
    }
  }

  function isRightAnswer(code) {
    return code === currentEntity.value.code;
  }

  return { entities, currentEntity, resetEntity, answers, isRightAnswer };
}