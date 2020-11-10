<template>
  <GeographicEntities
    instructions="Highlighted Germany land?"
    :time="30000"
    geographic-zone-code="germany"
    svg-viewbox="0 0 591.504 800.504"
  />
</template>

<script>
import GeographicEntities from "@/components/games/GeographicEntities.vue";

export default {
  name: "GermanyLands",
  components: {
    GeographicEntities,
  },
};
</script>

<style lang="scss" scoped>
</style>