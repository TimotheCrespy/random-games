import { ref, computed } from "vue";
const ALPHABET = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];

export function useAlphabet() {
  const letterIndex = ref(0)

  const currentLetter = computed(() => ALPHABET[letterIndex.value])

  function resetLetter() {
    // Generates random new index for letter
    let lastLetterValue = letterIndex.value
    while (lastLetterValue === letterIndex.value) {
      letterIndex.value = Math.floor(Math.random() * ALPHABET.length)
    }
  }

  function isRightNextLetter(typedLetter) {
    return letterIndex.value === ALPHABET.length - 1 &&
      ALPHABET.findIndex((l) => l === typedLetter) === 0 ||
      ALPHABET.findIndex((l) => l === typedLetter) === letterIndex.value + 1
  }

  return { currentLetter, resetLetter, isRightNextLetter }
}