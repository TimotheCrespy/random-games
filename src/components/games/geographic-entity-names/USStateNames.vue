<template>
  <GeographicEntityNames
    instructions="US State name?"
    :time="30000"
    geographic-zone-code="us"
    :background-svg="usFlag"
    :name-style="{
      marginBottom: '0.25rem',
      marginLeft: '12rem',
      fontSize: '1.25rem',
      color: '#fff',
    }"
  />
</template>

<script>
import GeographicEntityNames from "@/components/games/GeographicEntityNames.vue";
import usFlag from "@/assets/us-flag.svg";

export default {
  name: "USStateNames",
  components: {
    GeographicEntityNames,
  },
  data() {
    return { usFlag };
  },
};
</script>

<style lang="scss" scoped>
</style>