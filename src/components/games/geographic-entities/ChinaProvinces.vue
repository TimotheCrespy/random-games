<template>
  <GeographicEntities
    instructions="Highlighted China province?"
    :time="30000"
    geographic-zone-code="china"
    svg-viewbox="0 0 626.957 511.369"
  />
</template>

<script>
import GeographicEntities from "@/components/games/GeographicEntities.vue";

export default {
  name: "ChinaProvinces",
  components: {
    GeographicEntities,
  },
};
</script>

<style lang="scss" scoped>
</style>