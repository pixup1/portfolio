<template>
  <div
    style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; text-align: center;">
    <span class="appear-weight" style="font-size: clamp(5rem, 25vw, 20rem); line-height: 1;">
      Portfolio
    </span>
    <span class="appear-opacity" style="font-size: clamp(1.25rem, 5vw, 3rem); font-weight: 500; line-height: 1;">
      Hector Vernet
    </span>
    <span class="appear-opacity2" style="font-size: clamp(.6rem, 2.5vw, 1.5rem);; font-weight: 500; line-height: 3;">
      Revenez plus tard.
    </span>
  </div>
</template>

<style scoped>
.appear-weight {
  animation: appear-weight 2s ease-out forwards, flex-width 6s ease-in-out infinite 4s alternate;
}

@keyframes appear-weight {
  0% {
    opacity: 0;
    font-weight: 100;
    transform: translateY(-40px);
  }

  30% {
    opacity: 1;
  }

  100% {
    font-weight: 600;
    transform: translateY(0);
  }
}

@keyframes flex-width {
  0% {
    transform: scale(1, 1);
  }

  100% {
    transform: scale(1.035, 1);
  }
}

.appear-opacity {
  opacity: 0;
  animation: fadein 1.5s ease-in-out 1.5s forwards;
}

.appear-opacity2 {
  opacity: 0;
  animation: fadein 1.5s ease-in-out 2s forwards;
}

@keyframes fadein {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}
</style>
