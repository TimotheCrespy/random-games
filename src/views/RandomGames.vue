<template>
  <component :is="game" />
</template>

<script>
import { ref, markRaw } from "vue";
import NextLetter from "@/components/games/NextLetter";

export default {
  name: "RandomGames",
  components: {
    NextLetter,
  },
  setup() {
    const game = ref(null);
    const games = ref([markRaw(NextLetter)]);
    game.value = games.value[Math.floor(Math.random() * games.value.length)];

    return { game };
  },
};
</script>
