<template>
  <GeographicEntityCodes
    instructions="US State code?"
    :time="30000"
    geographic-zone-code="us"
    :background-svg="usRoadSign"
    :code-style="{ fontSize: '8rem', color: '#fff' }"
  />
</template>

<script>
import GeographicEntityCodes from "@/components/games/GeographicEntityCodes.vue";
import usRoadSign from "@/assets/us-road-sign.svg";

export default {
  name: "USStateCodes",
  components: {
    GeographicEntityCodes,
  },
  data() {
    return { usRoadSign };
  },
};
</script>

<style lang="scss" scoped>
</style>