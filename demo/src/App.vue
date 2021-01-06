<template>
  <div id="app">
    <IOffScreen :size="size"></IOffScreen>
    <IExit :size="size"></IExit>
    <IClose :size="size"></IClose>

    <input type="text" v-model="size" />
  </div>
</template>

<script>
/* eslint-disable */

export default {
  name: 'App',
  components: {},
  data() {
    return {
      size: '40',
    };
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
