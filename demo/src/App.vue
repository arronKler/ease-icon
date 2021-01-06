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
      colors: ['#333', '', '', ''],
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
html,
body {
  margin: 0;
  padding: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100vw;
  height: 100vh;
  display: flex;
}

.left-panel {
  width: 200px;
  border-right: 1px solid #aaa;
  height: 100%;
  flex-shrink: 0;
}

.main-area {
  flex: 1;
  box-sizing: border-box;
  overflow-y: scroll;
  height: 100%;
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
}

.operation {
  width: 300px;
  border-left: 1px solid #aaa;
  height: 100%;
  padding: 20px;
}
</style>
