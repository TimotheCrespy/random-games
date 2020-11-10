<template>
  <GeographicEntityCodes
    instructions="China Province code?"
    :time="30000"
    geographic-zone-code="china"
    :background-svg="chinaFlag"
    :code-style="{ marginTop: '8rem', fontSize: '3rem', color: '#ffde00' }"
  />
</template>

<script>
import GeographicEntityCodes from "@/components/games/GeographicEntityCodes.vue";
import chinaFlag from "@/assets/china-flag.svg";

export default {
  name: "ChinaProvinceCodes",
  components: {
    GeographicEntityCodes,
  },
  data() {
    return { chinaFlag };
  },
};
</script>

<style lang="scss" scoped>
</style>