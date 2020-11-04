import { ref, onMounted } from "vue";
import SecureLS from "secure-ls";

export function useScore(gameCode) {
  const ls = new SecureLS({ encodingType: "AES" });
  const bestScoreCode = `${gameCode}-bestScore`;

  const score = ref(0);
  const bestScore = ref(0);

  onMounted(() => {
    // Retrieves best score from localStorage
    if (ls.getAllKeys().includes(bestScoreCode)) {
      bestScore.value = ls.get(bestScoreCode);
    }
  });

  function updateBestScore(newScore) {
    if (newScore > bestScore.value) {
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

  return { score, bestScore, updateBestScore, resetScore, incrementScore }
}