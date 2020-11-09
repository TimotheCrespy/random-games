<template>
  <GeographicEntityCodes
    instructions="Spain Province code?"
    :time="30000"
    geographic-zone-code="spain"
    :background-svg="spainFlag"
    :code-style="{ marginLeft: '10rem', fontSize: '2rem', color: '#c60b1e' }"
  />
</template>

<script>
import GeographicEntityCodes from "@/components/games/GeographicEntityCodes.vue";
import spainFlag from "@/assets/spain-flag.svg";

export default {
  name: "SpainProvinceCodes",
  components: {
    GeographicEntityCodes,
  },
  data() {
    return { spainFlag };
  },
};
</script>

<style lang="scss" scoped>
</style>