import request from '@/axios/index'
export var submitApiAdministrators = pram => request.post('/admin/api/administrators', pram) // 存储分类列表数据
export var submitApiFindAdministrators = pram => request.get('/admin/api/administrators', pram) // 查询分类列表数据
export var submitApiFindEditAdministrators = pram => request.get(`/admin/api/administrators/edit`, pram) // 查询分类列表编辑数据
export var submitApiFindUpdateAdministrators = pram => request.put(`/admin/api/administrators/update`, pram) // 更新分类列表编辑数据
export var submitApiFindDeleteAdministrators = params => request.delete(`/admin/api/administrators/delete`, params) // 删除分类列表编辑数据