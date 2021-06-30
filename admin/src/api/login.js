import request from '@/axios/index'
export var loginIn = pram => request.post('/admin/api/login', pram) // 存储物品列表数据