<template>
  <GeographicEntities
    instructions="Highlighted France department?"
    :time="30000"
    geographic-zone-code="france"
    svg-viewbox="0 0 680 590"
  />
</template>

<script>
import GeographicEntities from "@/components/games/GeographicEntities.vue";

export default {
  name: "CanadaProvinces",
  components: {
    GeographicEntities,
  },
};
</script>

<style lang="scss" scoped>
</style>