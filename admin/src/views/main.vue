<template>
  <div class="container">
    <el-container style="height: 100vh;">
      <el-aside width="200px"
        style="background-color: rgb(238, 241, 246); height: 100%">
        <el-menu router
          :default-active="$route.path"
          unique-opened>
          <el-submenu index="1">
            <template slot="title"><i class="el-icon-message"></i>内容管理</template>
            <el-menu-item-group>
              <template slot="title">物品</template>
              <el-menu-item index="/items/create">新建物品</el-menu-item>
              <el-menu-item index="/items/list">物品列表</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <template slot="title">英雄</template>
              <el-menu-item index="/hero/create">新建英雄</el-menu-item>
              <el-menu-item index="/hero/list">英雄列表</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <template slot="title">资讯</template>
              <el-menu-item index="/journalism/create">新建资讯</el-menu-item>
              <el-menu-item index="/journalism/list">资讯列表</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <template slot="title">广告位</template>
              <el-menu-item index="/abs/create">新建广告位</el-menu-item>
              <el-menu-item index="/abs/list">广告位列表</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title"><i class="el-icon-message"></i>系统管理</template>
            <el-menu-item-group>
              <template slot="title">管理员</template>
              <el-menu-item index="/administrators/create">新建管理员</el-menu-item>
              <el-menu-item index="/administrators/list">管理员列表</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <template slot="title">分类</template>
              <el-menu-item index="/categories/create">新建分类</el-menu-item>
              <el-menu-item index="/categories/list">分类列表</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>

      <el-container>
        <el-header style="text-align: right; font-size: 12px">
          <i class="el-icon-user"
            style="margin-right: 10px"></i>
          <span style="margin-right: 10px">{{tokenName}}</span>
          <span @click="loginOut"
            style="cursor: pointer;color: red;">退出</span>
        </el-header>

        <el-main>
          <router-view> </router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>



<script>
export default {
  data() {
    const item = {
      date: '2016-05-02',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1518 弄',
    }
    return {
      tableData: Array(20).fill(item),
      tokenName: '',
    }
  },
  created() {
    this.tokenName =
      JSON.parse(window.sessionStorage.getItem('tokenName')).userName || ''
  },
  methods: {
    loginOut() {
      sessionStorage.clear()
      this.$router.push('/login')
    },
  },
}
</script>

<style lang="scss" scoped>
.container /deep/ {
  .el-header {
    background-color: #b3c0d1;
    color: #333;
    line-height: 60px;
  }
  .el-menu {
    height: 100%;
  }
  .el-aside {
    color: #333;
  }
}
</style>