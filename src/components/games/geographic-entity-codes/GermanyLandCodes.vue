<template>
  <GeographicEntityCodes
    instructions="Germany Land code?"
    :time="30000"
    geographic-zone-code="germany"
    :background-svg="germanyRoadSign"
    :code-style="{ fontSize: '6rem', color: '#000' }"
  />
</template>

<script>
import GeographicEntityCodes from "@/components/games/GeographicEntityCodes.vue";
import germanyRoadSign from "@/assets/germany-road-sign.svg";

export default {
  name: "GermanyLandCodes",
  components: {
    GeographicEntityCodes,
  },
  data() {
    return { germanyRoadSign };
  },
};
</script>

<style lang="scss" scoped>
</style>