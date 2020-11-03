import { ref } from "vue";

export function useCountdown(time) {
  const countdown = ref(time);
  const countdownTimeout = ref(null);
  const countdownInterval = ref(null);

  function resetCountdown() {
    countdown.value = time;
  }

  function setCountdownInterval() {
    // Sets interval for countdown update
    countdownInterval.value = setInterval(() => {
      if (countdown.value - 100 <= 0) {
        countdown.value = 0;
        return;
      }
      countdown.value = countdown.value - 100;
    }, 100);
  }

  function setCountdownTimeout(callback) {
    // Sets timeout for a game
    countdownTimeout.value = setTimeout(() => {
      callback()
      clearInterval(countdownInterval.value);
    }, time);
  }

  function clearCountdownTimeout() {
    clearTimeout(countdownTimeout.value)
  }

  function clearCountdownInterval() {
    clearInterval(countdownInterval.value)
  }

  return { countdown, resetCountdown, setCountdownInterval, clearCountdownInterval, setCountdownTimeout, clearCountdownTimeout }
}