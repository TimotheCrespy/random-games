<template>
  <GeographicEntityNames
    instructions="Germany Land name?"
    :time="30000"
    geographic-zone-code="germany"
    :background-svg="germanyFlag"
    :name-style="{
      maxWidth: `340px`,
      fontSize: '2.5rem',
      color: '#FFCE00',
      textAlign: 'center',
    }"
  />
</template>

<script>
import GeographicEntityNames from "@/components/games/GeographicEntityNames.vue";
import germanyFlag from "@/assets/germany-flag.svg";

export default {
  name: "GermanyLandNames",
  components: {
    GeographicEntityNames,
  },
  data() {
    return { germanyFlag };
  },
};
</script>

<style lang="scss" scoped>
</style>