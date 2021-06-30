<template>
  <div class="about">
    <h1>{{id ? '编辑': '新建'}}英雄</h1>
    <el-form ref="form"
      :model="model"
      label-width="80px">
      <el-tabs type="border-card"
        value="basic">
        <el-tab-pane label="基本信息"
          name="basic">
          <el-form-item label="名称">
            <el-input v-model="model.name"></el-input>
          </el-form-item>
          <el-form-item label="称号">
            <el-input v-model="model.nickname"></el-input>
          </el-form-item>
          <el-form-item label="定位">
            <el-select v-model="model.categorys"
              multiple
              placeholder="请选择定位">
              <el-option v-for="item in categoriesOptions"
                :key="item._id"
                :label="item.name"
                :value="item._id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="难度">
            <el-rate style="margin-top: 0.6rem"
              :max="9"
              show-score
              v-model="model.tip.difficulty"></el-rate>
          </el-form-item>
          <el-form-item label="技能">
            <el-rate style="margin-top: 0.6rem"
              :max="9"
              show-score
              v-model="model.tip.skill"></el-rate>
          </el-form-item>
          <el-form-item label="攻击">
            <el-rate style="margin-top: 0.6rem"
              :max="9"
              show-score
              v-model="model.tip.attack"></el-rate>
          </el-form-item>
          <el-form-item label="生存">
            <el-rate style="margin-top: 0.6rem"
              :max="9"
              show-score
              v-model="model.tip.existence"></el-rate>
          </el-form-item>
          <el-form-item label="图标">
            <el-upload class="avatar-uploader"
              action="http://localhost:3000/admin/api/hero/updateHeroImg"
              :show-file-list="false"
              :on-success="handleAvatarSuccess">
              <img v-if="model.icon"
                :src="model.icon"
                class="avatar">
              <i v-else
                class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="顺风出装">
            <el-select v-model="model.items1"
              multiple
              placeholder="请选择顺风出装">
              <el-option v-for="item in items1Options"
                :key="item._id"
                :label="item.name"
                :value="item._id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="逆风出装">
            <el-select v-model="model.items2"
              multiple
              placeholder="请选择逆风出装">
              <el-option v-for="item in items2Options"
                :key="item._id"
                :label="item.name"
                :value="item._id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="使用技巧">
            <el-input v-model="model.use"></el-input>
          </el-form-item>
          <el-form-item label="对抗技巧">
            <el-input v-model="model.countermeasure"></el-input>
          </el-form-item>
          <el-form-item label="团战思路">
            <el-input v-model="model.warfare"></el-input>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="技能"
          name="skills">
          <el-button type="text"
            @click="model.descriptions.push({})"> <i class="el-icon-plus"></i> 添加技能</el-button>
          <el-row type="flex"
            style="flex-wrap: wrap">
            <el-col :md="12"
              v-for="(item, index) in model.descriptions"
              :key="index">
              <el-form-item label="名称">
                <el-input v-model="item.name"></el-input>
              </el-form-item>
              <el-form-item label="图标">
                <el-upload class="avatar-uploader"
                  action="http://localhost:3000/admin/api/hero/updateHeroDesImg"
                  :headers="getAuthHeadersMixin()"
                  :show-file-list="false"
                  :on-success="res=> $set(item, 'icon', res.url)">
                  <img v-if="item.icon"
                    :src="item.icon"
                    class="avatar">
                  <i v-else
                    class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
              <el-form-item label="描述">
                <el-input v-model="item.passive"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="danger"
                  size="small"
                  @click="model.descriptions.splice(index, 1)">
                  删除
                </el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
      <el-form-item style="margin-top: 1rem">
        <el-button type="primary"
          @click="save">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import {
  submitApiHero,
  submitApiFindEditHero,
  submitApiFindUpdateHero,
} from '@/api/hero.js'
import { submitApiFindCategories } from '@/api/category'
import { submitApiFindItems } from '@/api/items'
export default {
  name: 'heroEdit',
  props: {
    id: {},
  },
  data() {
    return {
      model: {
        tip: {
          difficulty: 0,
          skill: 0,
          attack: 0,
          existence: 0,
        },
        descriptions: [],
      },
      categoriesOptions: [],
      items1Options: [],
      items2Options: [],
    }
  },
  methods: {
    // 保存、编辑
    save() {
      if (this.id) {
        submitApiFindUpdateHero({
          id: this.id,
          model: this.model,
        })
          .then((res) => {
            console.log(res)
            this.$message({
              message: '修改成功',
              type: 'success',
            })
            this.$router.push('/hero/list')
          })
          .catch((e) => {
            this.$message({
              message: e,
              type: 'error',
            })
          })
      } else {
        submitApiHero(this.model)
          .then((res) => {
            console.log(res)
            this.$message({
              message: '保存成功',
              type: 'success',
            })
            this.$router.push('/hero/list')
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
      submitApiFindEditHero({
        id: this.id,
      })
        .then((res) => {
          this.model = Object.assign({}, this.model, res)
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

    // 英雄定位列表
    findHero() {
      submitApiFindCategories()
        .then((res) => {
          this.categoriesOptions = res
        })
        .catch((e) => {
          this.$message({
            message: e,
            type: 'error',
          })
        })
    },

    // 英雄顺风装备列表
    findItemsOne() {
      submitApiFindItems()
        .then((res) => {
          this.items1Options = res
        })
        .catch((e) => {
          this.$message({
            message: e,
            type: 'error',
          })
        })
    },

    // 英雄逆风出装列表
    findItemsTwo() {
      submitApiFindItems()
        .then((res) => {
          this.items2Options = res
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
    this.findHero()
    this.findItemsOne()
    this.findItemsTwo()
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
  width: 5rem;
  height: 5rem;
  line-height: 5rem;
  text-align: center;
}
.avatar {
  width: 5rem;
  height: 5rem;
  display: block;
}
</style>
