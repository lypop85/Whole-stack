<template>
  <div class="about">
    <h1>广告位列表</h1>
    <div>
      <el-table :data="tableData"
        :highlight-current-row="true"
        style="width: 100%">
        <el-table-column prop="_id"
          label="ID"
          width="220">
        </el-table-column>
        <el-table-column prop="name"
          label="广告位名称">
        </el-table-column>
        <el-table-column fixed="right"
          label="操作"
          width="100">
          <template slot-scope="scope">
            <el-button type="text"
              @click="$router.push(`/abs/Edit/${scope.row._id}`)"
              size="small">
              编辑
            </el-button>
            <el-button type="text"
              @click="removeList(scope.row)"
              size="small">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { submitApiFindabs, submitApiFindDeleteabs } from '@/api/abs'
export default {
  name: 'absList',
  data() {
    return {
      tableData: [],
    }
  },
  methods: {
    // 获取列表数据
    tableDataFind() {
      submitApiFindabs()
        .then((res) => {
          this.tableData = res
        })
        .catch((e) => {
          this.$message({
            message: e,
            type: 'error',
          })
        })
    },

    // 删除
    removeList(val) {
      this.$confirm('请是否确定删除该条广告?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          submitApiFindDeleteabs({
            id: val._id,
          })
            .then((res) => {
              this.$message({
                type: 'success',
                message: res.success,
              })
              this.tableDataFind()
            })
            .catch((e) => {
              console.log(e)
            })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
          })
        })
      console.log(val)
    },
  },
  created() {
    this.tableDataFind()
  },
}
</script>
