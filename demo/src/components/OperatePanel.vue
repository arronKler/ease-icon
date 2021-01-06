<template>
  <div class="panel">
    <el-form label-width="80px">
      <el-form-item label="大小">
        <el-slider v-model="size" :min="12" :max="58"></el-slider>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      size: 46,
    };
  },
  watch: {
    size(val) {
      this.$emit('size', String(val));
    },
  },
};
</script>

<style lang="less"></style>
