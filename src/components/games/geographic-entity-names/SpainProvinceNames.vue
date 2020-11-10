<template>
  <GeographicEntityNames
    instructions="Spain Province name?"
    :time="30000"
    geographic-zone-code="spain"
    :background-svg="spainRoadSign"
    :name-style="{
      maxWidth: '280px',
      fontSize: '2.5rem',
      color: '#fff',
      textAlign: 'center',
    }"
  />
</template>

<script>
import GeographicEntityNames from "@/components/games/GeographicEntityNames.vue";
import spainRoadSign from "@/assets/spain-road-sign.svg";

export default {
  name: "SpainProvinceNames",
  components: {
    GeographicEntityNames,
  },
  data() {
    return { spainRoadSign };
  },
};
</script>

<style lang="scss" scoped>
</style>