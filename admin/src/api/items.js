import request from '@/axios/index'
export var submitApiItems = pram => request.post('/admin/api/items', pram) // 存储物品列表数据
export var submitApiFindItems = pram => request.get('/admin/api/items', pram) // 查询物品列表数据
export var submitApiFindEditItems = pram => request.get(`/admin/api/items/edit`, pram) // 查询物品列表编辑数据
export var submitApiFindUpdateItems = pram => request.put(`/admin/api/items/update`, pram) // 更新物品列表编辑数据
export var submitApiFindDeleteItems = params => request.delete(`/admin/api/items/delete`, params) // 删除物品列表编辑数据