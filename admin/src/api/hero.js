import request from '@/axios/index'
export var submitApiHero = pram => request.post('/admin/api/hero', pram) // 存储物品列表数据
export var submitApiFindHero = pram => request.get('/admin/api/hero', pram) // 查询物品列表数据
export var submitApiFindEditHero = pram => request.get(`/admin/api/hero/edit`, pram) // 查询物品列表编辑数据
export var submitApiFindUpdateHero = pram => request.put(`/admin/api/hero/update`, pram) // 更新物品列表编辑数据
export var submitApiFindDeleteHero = params => request.delete(`/admin/api/hero/delete`, params) // 删除物品列表编辑数据