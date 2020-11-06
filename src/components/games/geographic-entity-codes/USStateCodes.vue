<template>
  <GeographicEntityCodes
    instructions="US State code?"
    :time="30000"
    geographic-zone-code="us"
    :background-svg="intersateRoadSign"
    :code-style="{ fontSize: '8rem', color: '#fff' }"
  />
</template>

<script>
import GeographicEntityCodes from "@/components/games/GeographicEntityCodes.vue";
import intersateRoadSign from "@/assets/intersate-road-sign.svg";

export default {
  name: "USStateCodes",
  components: {
    GeographicEntityCodes,
  },
  data() {
    return { intersateRoadSign };
  },
};
</script>

<style lang="scss" scoped>
</style>