// I do this to keep all h1 titles in sync
function animateTitleGradient() {
  const duration = 7000; // 7 seconds
  const startTime = performance.now();

  function update(currentTime: number) {
    const elapsed = (currentTime - startTime) % duration;
    const progress = elapsed / duration;

    document.documentElement.style.setProperty("--title-gradient-move-factor", progress.toString());

    requestAnimationFrame(update);
  }

  requestAnimationFrame(update);
}

animateTitleGradient();
