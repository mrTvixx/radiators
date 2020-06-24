<template>
  <div class="container">
    <div class="lds-dual-ring"></div>
  </div>
</template>

<style lang="scss" scoped>
@import "./constants/_default.scss";

.container {
  width: 100%;
  display: flex;
  justify-content: space-around;
  padding: 25% 0;
}
.lds-dual-ring {
  display: inline-block;
  width: 80px;
  height: 80px;
}
.lds-dual-ring:after {
  content: " ";
  display: block;
  width: 64px;
  height: 64px;
  margin: 8px;
  border-radius: 50%;
  border: 6px solid $project-red;
  border-color: $project-red transparent $project-red transparent;
  animation: lds-dual-ring 1.2s linear infinite;
}
@keyframes lds-dual-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>