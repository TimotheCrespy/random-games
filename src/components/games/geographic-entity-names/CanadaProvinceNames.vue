<template>
  <GeographicEntityNames
    instructions="Canada Province name?"
    :time="30000"
    geographic-zone-code="canada"
    :background-svg="canadaRaodSign"
    :name-style="{
      maxWidth: '220px',
      marginTop: '15.5rem',
      fontSize: '1.75rem',
      color: '#fff',
      textAlign: 'center',
    }"
  />
</template>

<script>
import GeographicEntityNames from "@/components/games/GeographicEntityNames.vue";
import canadaRaodSign from "@/assets/canada-road-sign.svg";

export default {
  name: "CanadaProvinceNames",
  components: {
    GeographicEntityNames,
  },
  data() {
    return { canadaRaodSign };
  },
};
</script>

<style lang="scss" scoped>
</style>