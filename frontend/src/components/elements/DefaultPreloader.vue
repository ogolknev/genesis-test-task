<template>
  <div class="default-preloader"></div>
</template>

<style scoped>
.default-preloader {
  width: 15px;
  height: 15px;
  border: 2px solid transparent;
  border-top: 2px solid var(--icon);
  border-right: 2px solid var(--icon);
  border-radius: 50%;
  animation: rotate 1s linear infinite;
}

@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>