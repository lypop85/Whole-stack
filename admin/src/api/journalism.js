import request from '@/axios/index'
export var submitApiJournalism = pram => request.post('/admin/api/journalism', pram) // 存储物品列表数据
export var submitApiFindJournalism = pram => request.get('/admin/api/journalism', pram) // 查询物品列表数据
export var submitApiFindEditJournalism = pram => request.get(`/admin/api/journalism/edit`, pram) // 查询物品列表编辑数据
export var submitApiFindUpdateJournalism = pram => request.put(`/admin/api/journalism/update`, pram) // 更新物品列表编辑数据
export var submitApiFindDeleteJournalism = params => request.delete(`/admin/api/journalism/delete`, params) // 删除物品列表编辑数据
export var multerFutext = params => request.post(`/admin/api/multerFutext`, params) //上传富文本编辑器图片