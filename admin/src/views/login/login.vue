<template>
  <div class="login-container">
    <el-card header="登录"
      class="login-card">
      <el-form ref="form"
        :model="model"
        label-width="80px">
        <el-form-item label="用户名:">
          <el-input v-model="model.name"></el-input>
        </el-form-item>
        <el-form-item label="密码:">
          <el-input v-model="model.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
            @click="login">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>


<script>
import { loginIn } from '@/api/login'
export default {
  name: 'login',
  data() {
    return {
      model: {
        name: '',
        password: '',
      },
    }
  },
  methods: {
    login() {
      loginIn(this.model)
        .then((res) => {
          sessionStorage.token = res.token
          sessionStorage.tokenName = JSON.stringify(res.tokenName)
          this.$message({
            message: '欢迎回来' + res.tokenName.userName,
            type: 'success',
          })
          this.$router.push('/')
        })
        .catch((e) => {
          console.log(e)
        })
    },
  },
}
</script>

<style lang="scss">
.login-card {
  width: 25rem;
  margin: 15rem auto;
}
</style>