<template>
  <GeographicEntities
    instructions="Highlighted US State?"
    :time="30000"
    geographic-zone-code="us"
    svg-viewbox="174 100 959 593"
  >
    <template v-slot:specific-path="slotProps">
      <g>
        <circle
          fill="none"
          :stroke="slotProps.currentEntity.code === 'DC' ? '#ffd127' : '#fff'"
          stroke-width="2"
          cx="975.3"
          cy="351.8"
          r="8"
        />
      </g>
    </template>
  </GeographicEntities>
</template>

<script>
import GeographicEntities from "@/components/games/GeographicEntities.vue";

export default {
  name: "USStates",
  components: {
    GeographicEntities,
  },
};
</script>

<style lang="scss" scoped>
</style>