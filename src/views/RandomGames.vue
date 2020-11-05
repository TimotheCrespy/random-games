<template>
  <component :is="game" />
  <div class="credits">
    <span>
      By <a href="https://timothecrespy.fr">Tim</a> with ❤️ and
      <a href="https://v3.vuejs.org/">Vue 3</a>
    </span>
  </div>
</template>

<script>
import { ref, markRaw } from "vue";
import NextLetter from "@/components/games/NextLetter";
import PreviousLetter from "@/components/games/PreviousLetter";
import FranceDepartments from "@/components/games/FranceDepartments";
import USStates from "@/components/games/USStates";
import USStateCodes from "@/components/games/USStateCodes";
import CanadaProvinces from "@/components/games/CanadaProvinces";

export default {
  name: "RandomGames",
  setup() {
    const game = ref(null);
    const games = ref([
      markRaw(NextLetter),
      markRaw(PreviousLetter),
      markRaw(FranceDepartments),
      markRaw(USStates),
      markRaw(USStateCodes),
      markRaw(CanadaProvinces),
    ]);
    game.value = games.value[Math.floor(Math.random() * games.value.length)];

    return { game };
  },
};
</script>

<style lang="scss" scoped>
.credits {
  position: fixed;
  display: flex;
  justify-content: center;
  bottom: 0;
  width: 100%;
  color: #fff;
  margin-bottom: 1rem;

  a {
    text-decoration: underline;
    color: #fff;

    &:hover {
      text-decoration: none;
    }
  }
}
</style>