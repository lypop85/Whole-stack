<template>
  <div class="about">
    <h1>{{id ? '编辑': '新建'}}分类</h1>
    <el-form ref="form"
      :model="model"
      label-width="80px">
      <el-form-item label="上级分类">
        <el-select v-model="model.parent"
          placeholder="请选择上级分类">
          <el-option v-for="item in parentList"
            :label="item.name"
            :value="item._id"
            :key="item._id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary"
          @click="save">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import {
  submitApiCategories,
  submitApiFindEditCategories,
  submitApiFindCategories,
  submitApiFindUpdateCategories,
} from '@/api/category.js'
export default {
  name: 'categoryEdit',
  props: {
    id: {},
  },
  data() {
    return {
      model: {
        name: '',
        parent: '',
      },
      parentList: [], // 上级分类
    }
  },
  methods: {
    // 保存、编辑
    save() {
      if (this.id) {
        submitApiFindUpdateCategories({
          id: this.id,
          model: this.model,
        })
          .then(() => {
            this.$message({
              message: '修改成功',
              type: 'success',
            })
            this.$router.push('/categories/list')
          })
          .catch((e) => {
            this.$message({
              message: e,
              type: 'error',
            })
          })
      } else {
        submitApiCategories(this.model)
          .then(() => {
            this.$message({
              message: '保存成功',
              type: 'success',
            })
            this.$router.push('/categories/list')
          })
          .catch((e) => {
            this.$message({
              message: e,
              type: 'error',
            })
          })
      }
    },

    // 查询编辑数据
    submitApiList() {
      submitApiFindEditCategories({
        id: this.id,
      })
        .then((res) => {
          this.model = res
        })
        .catch((e) => {
          this.$message({
            message: e,
            type: 'error',
          })
        })
    },

    // 查询上级分类
    submitApiFindFc() {
      submitApiFindCategories()
        .then((res) => {
          this.parentList = res
        })
        .catch((e) => {
          this.$message({
            message: e,
            type: 'error',
          })
        })
    },
  },
  created() {
    this.id && this.submitApiList()
    this.submitApiFindFc()
  },
}
</script>
