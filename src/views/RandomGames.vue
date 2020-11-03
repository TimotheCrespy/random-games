<template>
  <component :is="game" />
</template>

<script>
import { ref, markRaw } from "vue";
import NextLetter from "@/components/games/NextLetter";
import PreviousLetter from "@/components/games/PreviousLetter";

export default {
  name: "RandomGames",
  setup() {
    const game = ref(null);
    const games = ref([markRaw(NextLetter), markRaw(PreviousLetter)]);
    game.value = games.value[Math.floor(Math.random() * games.value.length)];

    return { game };
  },
};
</script>
