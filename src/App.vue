<template>
  <router-view />
  <meta http-equiv="pragma" content="no-cache" />
  <meta
    http-equiv="cache-control"
    content="no-cache, no-store, must-revalidate"
  />
  <meta http-equiv="expires" content="0" />
</template>

<script setup>
const debounce = (fn, delay) => {
  let timer = null;
  return function () {
    let context = this;
    let args = arguments;
    clearTimeout(timer);
    timer = setTimeout(function () {
      fn.apply(context, args);
    }, delay);
  };
};

const _ResizeObserver = window.ResizeObserver;
window.ResizeObserver = class ResizeObserver extends _ResizeObserver {
  constructor(callback) {
    callback = debounce(callback, 16);
    super(callback);
  }
};
</script>

<style lang="scss">
@import "./assets/css/main.css";
@import "./assets/css/color-dark.scss";
</style>
