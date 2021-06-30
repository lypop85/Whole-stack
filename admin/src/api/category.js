import request from '@/axios/index'
export var submitApiCategories = pram => request.post('/admin/api/categories', pram) // 存储分类列表数据
export var submitApiFindCategories = pram => request.get('/admin/api/categories', pram) // 查询分类列表数据
export var submitApiFindEditCategories = pram => request.get(`/admin/api/categories/edit`, pram) // 查询分类列表编辑数据
export var submitApiFindUpdateCategories = pram => request.put(`/admin/api/categories/update`, pram) // 更新分类列表编辑数据
export var submitApiFindDeleteCategories = params => request.delete(`/admin/api/categories/delete`, params) // 删除分类列表编辑数据