<template>
  <div class="app">
    <Letter :value="letter" />
    <Result :is-success="result" :typed-letter="typedLetter" />
    <strong class="time">Time: {{ (countdown / 1000).toFixed(2) }}s</strong>
    <strong class="score">Score: {{ score }}</strong>
    <strong class="best-score">Best score: {{ bestScore }}</strong>
    <Keypress @any="checkNextLetter" />
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import Keypress from "vue-keypress"
import SecureLS from "secure-ls"
import Letter from "@/components/Letter.vue"
import Result from "@/components/Result.vue"
const ALPHABET = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
const TIME = 10000

export default {
  name: 'App',
  components: { Keypress, Letter, Result },
  setup() {
    const result = ref(false)
    const score = ref(0)
    const bestScore = ref(0)
    const letterIndex = ref(0)
    const letter = computed(() => ALPHABET[letterIndex.value])
    const typedLetter = ref("")
    const countdown = ref(TIME)
    const countdownTimeout = ref(null)
    const countdownInterval = ref(null)
    const ls = new SecureLS({ encodingType: "AES" })

    const resetLetterIndex = () => {
      // Generates random new index for letter
      let lastLetterValue = letterIndex.value
      while (lastLetterValue === letterIndex.value) {
        letterIndex.value = Math.floor(Math.random() * ALPHABET.length)
      }
    }

    onMounted(() => {
      // Retrieves best score
      if (ls.getAllKeys().includes("bestScore")) {
        bestScore.value = ls.get('bestScore')
      }
      resetLetterIndex()
    })

    const updateBestScore = (newScore) => {
      if (newScore > bestScore.value) {
        bestScore.value = newScore
        ls.set('bestScore', bestScore.value)
      }
    }

    const setCountdownInterval = () => {
      // Sets interval for countdown update
      return setInterval(() => {
        if (countdown.value - 100 <= 0) {
          countdown.value = 0
          return
        }
        countdown.value = countdown.value - 100
      }, 100);
    }
    const setCountdownTimeout = () => {
      // Sets timeout for a game
      return setTimeout(() => {
        updateBestScore(score.value)
        clearInterval(countdownInterval.value)
      }, TIME);
    }

    const checkNextLetter = (letter) => {
      typedLetter.value = letter.event.key
      if (letterIndex.value === ALPHABET.length - 1 && ALPHABET.findIndex(l => l === letter.event.key) === 0
          || ALPHABET.findIndex(l => l === letter.event.key) === letterIndex.value + 1) {
        if (!result.value) {
          score.value = 0
          countdownInterval.value = setCountdownInterval()
          countdownTimeout.value = setCountdownTimeout()
        } else if (countdown.value === 0) {
          countdown.value = TIME
          score.value = 0
          countdownInterval.value = setCountdownInterval()
          countdownTimeout.value = setCountdownTimeout()
        }

        result.value = true
        score.value++
        resetLetterIndex()
        return
      }

      if (result.value) {
        clearTimeout(countdownTimeout.value)
        clearInterval(countdownInterval.value)
        countdown.value = TIME
      }

      result.value = false
      score.value = 0
      return
    }

    return { letter, letterIndex, checkNextLetter, result, score, bestScore, typedLetter, countdown }
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
  
  .time,
  .score,
  .best-score {
    color: #fff;
  }
  .time {
    margin-top: 1rem;
  }
}
</style>
