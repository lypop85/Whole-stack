<template>
  <div class="about">
    <h1>{{id ? '编辑': '新建'}}资讯</h1>
    <el-form ref="form"
      :model="model"
      label-width="80px">
      <el-form-item label="label"
        class="changeSelect">
        <el-select v-model="changData"
          :filter-method="changeText"
          filterable
          placeholder="placeholder">
          <el-option v-for="item in changDataList"
            :key="item.id"
            :value="item.value">
            <div sort="content"
              id="changeDiv">
              <span class="changeSpan"
                v-for="(it, ix) in item.list"
                :key="ix">
                {{it.name}}
              </span>
            </div>
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="所属分类">
        <el-select v-model="model.classifys"
          multiple
          placeholder="请选择资讯所属分类">
          <el-option v-for="item in options"
            :key="item._id"
            :label="item.name"
            :value="item._id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标题">
        <el-input v-model="model.tittle"></el-input>
      </el-form-item>
      <el-form-item label="内容">
        <Vue-editor v-model="model.content"
          useCustomImageHandler
          @image-added="handleImageAdded"></Vue-editor>
      </el-form-item>
      <el-form-item>
        <el-button type="primary"
          @click="save">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { VueEditor } from 'vue2-editor'
import {
  submitApiJournalism,
  submitApiFindEditJournalism,
  submitApiFindUpdateJournalism,
  multerFutext,
} from '@/api/journalism.js'
import { submitApiFindCategories } from '@/api/category'
export default {
  name: 'journalismEdit',
  props: {
    id: {},
  },
  data() {
    return {
      model: {},
      options: [],
      changData: '',
      changDataList: [
        {
          value: '',
          list: [
            {
              code: '0_1',
              name: '自定义选项为：',
            },
            {
              code: 'N',
              name: '',
            },
          ],
          id: '1',
        },
        {
          value: '122',
          list: [
            {
              code: '1_1',
              name: '122',
            },
          ],
          id: '2',
        },
        {
          value: '133',
          list: [
            {
              code: '2_1',
              name: '13',
            },
            {
              code: '2_2',
              name: '3',
            },
          ],
          id: '3',
        },
        {
          value: '144',
          list: [
            {
              code: '3_1',
              name: '14',
            },
            {
              code: '3_2',
              name: '4',
            },
          ],
          id: '4',
        },
      ],
    }
  },
  components: {
    VueEditor,
  },
  methods: {
    changeText(val) {
      console.log(document.getElementById('changeDiv'))
      let changeDiv = document
        .getElementById('changeDiv')
        .getElementsByClassName('changeSpan')[1]
      changeDiv.innerHTML = val
      console.log(changeDiv, 'changeDiv')
      // this.changDataList[0].value = val
      // this.changDataList[0].list[1].name = val
    },
    // 保存、编辑
    save() {
      if (this.id) {
        submitApiFindUpdateJournalism({
          id: this.id,
          model: this.model,
        })
          .then((res) => {
            console.log(res)
            this.$message({
              message: '修改成功',
              type: 'success',
            })
            this.$router.push('/journalism/list')
          })
          .catch((e) => {
            this.$message({
              message: e,
              type: 'error',
            })
          })
      } else {
        submitApiJournalism(this.model)
          .then((res) => {
            console.log(res)
            this.$message({
              message: '保存成功',
              type: 'success',
            })
            this.$router.push('/journalism/list')
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
      submitApiFindEditJournalism({
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

    //查询所属分类列表数据
    findCategory() {
      submitApiFindCategories().then((res) => {
        this.options = res
      })
    },
    // 富文本编辑器
    handleImageAdded(file, Editor, cursorLocation, resetUploader) {
      // An example of using FormData
      // NOTE: Your key could be different such as:
      // formData.append('file', file)
      var formData = new FormData()
      formData.append('file', file)

      multerFutext(formData)
        .then((result) => {
          let url = result.url // Get url from response
          Editor.insertEmbed(cursorLocation, 'image', url)
          resetUploader()
        })
        .catch((err) => {
          console.log(err)
        })
    },
  },
  created() {
    this.findCategory()
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