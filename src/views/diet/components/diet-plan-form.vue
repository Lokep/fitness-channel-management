<style lang="scss">
.plan {
  border: 1px solid #e4e7ed;
  border-radius: 6px;
  overflow: hidden;
  width: 100%;
  margin-right: 10px;
  &-container{
    display: flex;
  }
  .el-collapse {
    border: none;
  }
  .el-collapse-item__header {
    box-sizing: border-box;
    padding: 10px;
    border-bottom: 1px solid #e6ebf5;
    background-color: #e2eefe;

    &.is-active {
      border-bottom-color: #e6ebf5;
    }
  }
  .el-collapse-item__wrap {
    box-sizing: border-box;
    padding: 10px;
  }
  .collapse-title {
    div {
      margin-left: 10px;
    }
  }
}
</style>
<template>
  <div class="plan-container">
    <div class="plan">
      <el-collapse accordion size="mini" @change="handleChange">
        <el-collapse-item :name="name">
          <template slot="title">
            <div class="collapse-title align-center">
              <slot name="title" />
            </div>
          </template>
          <slot />
        </el-collapse-item>
      </el-collapse>

    </div>
    <slot name="right" />
  </div>
</template>
<script>
export default {
  props: {
    // eslint-disable-next-line
    name: String | Number
  },
  data() {
    return {}
  },
  created() {},
  methods: {
    handleChange(e) {
      this.$emit('change', e)
    }
  }
}
</script>
