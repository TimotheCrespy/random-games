<template>
  <GeographicEntityCodes
    instructions="Canada Province code?"
    :time="30000"
    geographic-zone-code="canada"
    :background-svg="canadaFlag"
    :code-style="{ marginTop: '2.5rem', fontSize: '4rem', color: '#fff' }"
  />
</template>

<script>
import GeographicEntityCodes from "@/components/games/GeographicEntityCodes.vue";
import canadaFlag from "@/assets/canada-flag.svg";

export default {
  name: "CanadaProvinceCodes",
  components: {
    GeographicEntityCodes,
  },
  data() {
    return { canadaFlag };
  },
};
</script>

<style lang="scss" scoped>
</style>