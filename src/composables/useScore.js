import { ref, onMounted } from "vue";
import SecureLS from "secure-ls";

export function useScore(gameCode) {
  const ls = new SecureLS({ encodingType: "AES" });
  const bestScoreCode = `${gameCode}-bestScore`;
  const cumulativeBestScoreCode = `cumulativeBestScore`;

  const score = ref(0);
  const bestScore = ref(0);
  const cumulativeBestScore = ref(0);

  onMounted(() => {
    // Retrieves best score from localStorage
    if (ls.getAllKeys().includes(bestScoreCode)) {
      bestScore.value = ls.get(bestScoreCode);
    }
    // Retrieves cumulative best score from localStorage
    if (ls.getAllKeys().includes(cumulativeBestScoreCode)) {
      cumulativeBestScore.value = ls.get(cumulativeBestScoreCode);
    }
  });

  function updateBestScore(newScore) {
    if (newScore > bestScore.value) {
      // Updates cumulative best score
      cumulativeBestScore.value = cumulativeBestScore.value - bestScore.value + newScore
      ls.set(cumulativeBestScoreCode, cumulativeBestScore.value);
      // Updates game best score
      bestScore.value = newScore;
      ls.set(bestScoreCode, bestScore.value);
    }
  }

  function resetScore() {
    score.value = 0;
  }

  function incrementScore(value) {
    if (!value) {
      score.value++
      return
    }
    if ((score.value += value) <= 0) {
      score.value = 0;
      return
    }
    score.value += value;
  }

  return { score, bestScore, cumulativeBestScore, updateBestScore, resetScore, incrementScore }
}