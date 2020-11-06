<template>
  <GeographicEntities
    instructions="Highlighted Spain province?"
    :time="30000"
    geographic-zone-code="spain"
    svg-viewbox="0 0 450 380"
  />
</template>

<script>
import GeographicEntities from "@/components/games/GeographicEntities.vue";

export default {
  name: "SpainProvinces",
  components: {
    GeographicEntities,
  },
};
</script>

<style lang="scss" scoped>
</style>