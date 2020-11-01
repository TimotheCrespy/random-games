<template>
  <div class="app">
    <Letter :value="letter" />
    <Result :is-success="result" :typed-letter="typedLetter" />
    <strong class="score">Score: {{ score }}</strong>
    <Keypress @any="checkNextLetter" />
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import Keypress from "vue-keypress"
import Letter from "@/components/Letter.vue"
import Result from "@/components/Result.vue"
const ALPHABET = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]

export default {
  name: 'App',
  components: { Keypress, Letter, Result },
  setup() {
    const result = ref(false)
    const score = ref(0)
    const letterIndex = ref(0)
    const letter = computed(() => ALPHABET[letterIndex.value])
    const typedLetter = ref("")

    const resetLetterIndex = () => {
      let lastLetterValue = letterIndex.value
      while (lastLetterValue === letterIndex.value) {
        letterIndex.value = Math.floor(Math.random() * ALPHABET.length)
      }
    }
    resetLetterIndex()

    const checkNextLetter = (letter) => {
      typedLetter.value = letter.event.key
      if (letterIndex.value === ALPHABET.length - 1 && ALPHABET.findIndex(l => l === letter.event.key) === 0) {
        result.value = true
        score.value++
        resetLetterIndex()
        return
      }
      if (ALPHABET.findIndex(l => l === letter.event.key) !== letterIndex.value + 1) {
        result.value = false
        score.value = 0
        return
      }
      result.value = true
      score.value++
      resetLetterIndex()
    }

    return { letter, letterIndex, checkNextLetter, result, score, typedLetter }
  }
}
</script>

<style lang="scss" scoped>
.app {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: rgb(2,0,36);
  background: linear-gradient(45deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 34%, rgba(0,212,255,1) 100%);
  
  .score {
    margin: 1rem;
    color: #fff;
  }
}
</style>
