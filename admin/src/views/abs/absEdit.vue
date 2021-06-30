<template>
  <div class="about">
    <h1>{{id ? '编辑': '新建'}}广告位</h1>
    <el-form ref="form"
      :model="model"
      label-width="80px">
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
  submitApiabs,
  submitApiFindEditabs,
  submitApiFindUpdateabs,
} from '@/api/abs.js'
export default {
  name: 'absEdit',
  props: {
    id: {},
  },
  data() {
    return {
      model: {},
    }
  },
  methods: {
    // 保存、编辑
    save() {
      if (this.id) {
        submitApiFindUpdateabs({
          id: this.id,
          model: this.model,
        })
          .then((res) => {
            console.log(res)
            this.$message({
              message: '修改成功',
              type: 'success',
            })
            this.$router.push('/abs/list')
          })
          .catch((e) => {
            this.$message({
              message: e,
              type: 'error',
            })
          })
      } else {
        submitApiabs(this.model)
          .then((res) => {
            console.log(res)
            this.$message({
              message: '保存成功',
              type: 'success',
            })
            this.$router.push('/abs/list')
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
      submitApiFindEditabs({
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

    // 上传图标
    handleAvatarSuccess(res) {
      this.$set(this.model, 'icon', res.url)
    },
  },
  created() {
    this.id && this.submitApiList()
  },
}
</script>

<style lang="scss">
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
