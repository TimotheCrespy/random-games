<template>
  <GeographicEntityNames
    instructions="France department name?"
    :time="30000"
    geographic-zone-code="france"
    :background-svg="franceRoadSign"
    :name-style="{
      marginLeft: '6.75rem',
      maxWidth: `280px`,
      fontSize: '2rem',
      color: '#efb300',
    }"
  />
</template>

<script>
import GeographicEntityNames from "@/components/games/GeographicEntityNames.vue";
import franceRoadSign from "@/assets/france-road-sign.svg";

export default {
  name: "FranceDepartmentNames",
  components: {
    GeographicEntityNames,
  },
  data() {
    return { franceRoadSign };
  },
};
</script>

<style lang="scss" scoped>
</style>