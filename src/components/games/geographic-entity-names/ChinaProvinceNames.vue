<template>
  <GeographicEntityNames
    instructions="China Province name?"
    :time="30000"
    geographic-zone-code="china"
    :background-svg="chinaRoadSign"
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
import chinaRoadSign from "@/assets/china-road-sign.svg";

export default {
  name: "ChinaProvinceNames",
  components: {
    GeographicEntityNames,
  },
  data() {
    return { chinaRoadSign };
  },
};
</script>

<style lang="scss" scoped>
</style>