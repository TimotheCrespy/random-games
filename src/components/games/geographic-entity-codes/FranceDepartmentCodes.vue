<template>
  <GeographicEntityCodes
    instructions="France department code?"
    :time="30000"
    geographic-zone-code="france"
    :background-svg="franceFlag"
    :code-style="{ fontSize: '5rem', color: '#000' }"
  />
</template>

<script>
import GeographicEntityCodes from "@/components/games/GeographicEntityCodes.vue";
import franceFlag from "@/assets/france-flag.svg";

export default {
  name: "FranceDepartmentCodes",
  components: {
    GeographicEntityCodes,
  },
  data() {
    return { franceFlag };
  },
};
</script>

<style lang="scss" scoped>
</style>