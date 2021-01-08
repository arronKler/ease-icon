<template>
  <div id="app">
    <aside class="left-panel"></aside>
    <main class="main-area">
      <IconItem
        v-for="comp of icons"
        :key="comp.name"
        :name="comp.name"
        :size="size"
        :colors="colors"
      ></IconItem>
    </main>
    <aside class="operation">
      <OperatePanel @size="onSizeChange" @colors="onColors"></OperatePanel>
    </aside>
  </div>
</template>

<script>
import OperatePanel from './components/OperatePanel';
import IconItem from './components/IconItem';

export default {
  name: 'App',
  components: {
    IconItem,
    OperatePanel,
  },
  data() {
    return {
      size: '40',
      colors: ['#333', '#333', '', ''],
    };
  },
  methods: {
    onSizeChange(size) {
      this.size = size;
    },

    onColors(colors) {
      this.colors = colors;
    },
  },
};
</script>

<style lang="less">
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html,
body {
  margin: 0;
  padding: 0;
  width: 100vw;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  width: 100%;
  height: 100vh;
  display: flex;
  overflow: hidden;
}

.left-panel {
  width: 200px;
  border-right: 1px solid #aaa;
  height: 100%;
  flex-shrink: 0;
  flex-basis: 200px;
}

.main-area {
  flex: 1;
  overflow-y: scroll;
  height: 100%;
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
}

.operation {
  width: 300px;
  flex-basis: 300px;
  border-left: 1px solid #aaa;
  padding: 20px;
  flex-shrink: 0;
}
</style>
