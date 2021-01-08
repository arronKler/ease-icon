<template>
  <div class="panel">
    <el-form label-width="80px">
      <el-form-item label="大小">
        <el-slider v-model="size" :min="12" :max="58"></el-slider>
      </el-form-item>

      <el-form-item label="常规色彩">
        <el-color-picker v-model="colors[0]"></el-color-picker>
        <el-color-picker v-model="colors[1]"></el-color-picker>
      </el-form-item>
      <el-form-item label="黑夜模式">
        <el-switch
          v-model="darkMode"
          active-color="#ff6b00"
          inactive-color="#aaa"
        >
        </el-switch>
      </el-form-item>
      <el-form-item v-if="darkMode" label="黑夜色彩">
        <el-color-picker v-model="darkColors[0]"></el-color-picker>
        <el-color-picker v-model="darkColors[1]"></el-color-picker>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      size: 46,
      colors: ['#333', '#fff', '', ''],
      darkColors: ['#333', '#fff', '', ''],
      darkMode: false,
    };
  },
  watch: {
    size(val) {
      this.$emit('size', String(val));
    },
    colors(val) {
      this.$emit('colors', val);
    },
  },
};
</script>

<style lang="less"></style>
