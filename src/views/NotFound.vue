<template>
  <div
    style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; text-align: center;">
    <span class="appear-weight" style="font-size: clamp(5rem, 30vw, 20rem); line-height: 1;">
      404
    </span>
    <span class="appear-justplop" style="font-size: clamp(1.25rem, 5vw, 3rem); font-weight: 500; line-height: 1;">
      Introuvable.
    </span>
  </div>
</template>

<style scoped>
.appear-weight {
  animation: plop-down 2s ease-out, appear-weight 2s ease-out forwards;
}

@keyframes appear-weight {
  0% {
    opacity: 0;
    font-weight: 100;
  }

  30% {
    opacity: 1;
  }

  100% {
    font-weight: 800;
    color: rgb(223, 94, 94)
  }
}

.appear-justplop {
  opacity: 0;
  animation: plop-down 1.5s ease-in-out 1.5s forwards;
}

@keyframes plop-down {
  0% {
    transform: translateY(-40px);
    opacity: 0;
  }

  100% {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>
