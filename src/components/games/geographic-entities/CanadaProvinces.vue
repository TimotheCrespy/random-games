<template>
  <GeographicEntities
    instructions="Highlighted Canada province?"
    :time="30000"
    geographic-zone-code="canada"
    svg-viewbox="0 0 1000 1298"
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