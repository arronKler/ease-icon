<template>
  <div class="item">
    <div class="icon-wrapper">
      <component :is="'I' + name" :size="size" :colors="colors"></component>
    </div>
    <div class="infos">
      <div class="name">{{ name }}</div>
    </div>
    <div class="opt"></div>
  </div>
</template>

<script>
export default {
  props: {
    name: String,
    size: String,
    colors: Array,
  },
};
</script>

<style lang="less">
.item {
  border-radius: 4px;
  width: 230px;
  height: auto;
  margin: 10px;
  padding: 10px;
  box-sizing: border-box;
  box-shadow: 0 0 5px #ccc;
  display: flex;

  .icon-wrapper {
    line-height: 0;
    border: 1px dashed #ccc;
    flex-shrink: 0;
  }

  .infos {
    margin-left: 10px;
    flex: 1;
    text-align: left;
  }

  .opt {
    width: 40px;
  }
}
</style>
