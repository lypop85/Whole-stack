import request from '@/axios/index'
export var submitApiabs = pram => request.post('/admin/api/abs', pram) // 存储物品列表数据
export var submitApiFindabs = pram => request.get('/admin/api/abs', pram) // 查询物品列表数据
export var submitApiFindEditabs = pram => request.get(`/admin/api/abs/edit`, pram) // 查询物品列表编辑数据
export var submitApiFindUpdateabs = pram => request.put(`/admin/api/abs/update`, pram) // 更新物品列表编辑数据
export var submitApiFindDeleteabs = params => request.delete(`/admin/api/abs/delete`, params) // 删除物品列表编辑数据