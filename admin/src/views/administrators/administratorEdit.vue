<template>
  <div class="about">
    <h1>{{id ? '编辑': '新建'}}分类</h1>
    <el-form ref="form"
      :model="model"
      label-width="80px">
      <el-form-item label="用户名">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input type="text"
          v-model="model.password"></el-input>
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
  submitApiAdministrators,
  submitApiFindEditAdministrators,
  submitApiFindUpdateAdministrators,
} from '@/api/administrators.js'
export default {
  name: 'administratorsEdit',
  props: {
    id: {},
  },
  data() {
    return {
      model: {
        name: '',
        password: '',
      },
      parentList: [], // 上级分类
    }
  },
  methods: {
    // 保存、编辑
    save() {
      if (this.id) {
        submitApiFindUpdateAdministrators({
          id: this.id,
          model: this.model,
        })
          .then(() => {
            this.$message({
              message: '修改成功',
              type: 'success',
            })
            this.$router.push('/administrators/list')
          })
          .catch((e) => {
            this.$message({
              message: e,
              type: 'error',
            })
          })
      } else {
        submitApiAdministrators(this.model)
          .then(() => {
            this.$message({
              message: '保存成功',
              type: 'success',
            })
            this.$router.push('/administrators/list')
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
      submitApiFindEditAdministrators({
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
  },
  created() {
    this.id && this.submitApiList()
  },
}
</script>
