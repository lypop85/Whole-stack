import Vue from 'vue'
import VueRouter from 'vue-router'
import main from '../views/main.vue'
import login from '../views/login/login.vue'
//分类组件
import categoryEdit from '../views/categoty/categoryEdit.vue'
import categoryList from '../views/categoty/categoryList.vue'
// 物品组件
import itemsEdit from '../views/items/itemsEdit.vue'
import itemsList from '../views/items/itemsList.vue'
// 英雄组件
import heroEdit from '../views/hero/heroEdit.vue'
import heroList from '../views/hero/heroList.vue'
// 资讯组件
import journalismEdit from '../views/journalism/journalismEdit.vue'
import journalismList from '../views/journalism/journalismList.vue'
// 广告位组件
import absEdit from '../views/abs/absEdit.vue'
import absList from '../views/abs/absList.vue'

// 管理员组件
import administratorEdit from '../views/administrators/administratorEdit.vue'
import administratorList from '../views/administrators/administratorList.vue'

Vue.use(VueRouter)

const routes = [{
        path: '/login',
        name: 'login',
        component: login,
        meta: {
            isPulice: true
        }
    },
    {
        path: '/',
        name: 'main',
        component: main,
        children: [
            // 分类Router
            {
                path: '/categories/create',
                name: 'categoryEdit',
                component: categoryEdit
            },
            {
                path: '/categories/edit/:id',
                name: 'categoryEdit',
                component: categoryEdit,
                props: true
            },
            {
                path: '/categories/list',
                name: 'categoryList',
                component: categoryList
            },
            // 物品Router
            {
                path: '/items/create',
                name: 'itemsEdit',
                component: itemsEdit
            },
            {
                path: '/items/edit/:id',
                name: 'itemsEdit',
                component: itemsEdit,
                props: true
            },
            {
                path: '/items/list',
                name: 'itemsList',
                component: itemsList
            },
            // 英雄Router
            {
                path: '/hero/create',
                name: 'heroEdit',
                component: heroEdit
            },
            {
                path: '/hero/edit/:id',
                name: 'heroEdit',
                component: heroEdit,
                props: true
            },
            {
                path: '/hero/list',
                name: 'heroList',
                component: heroList
            },
            // 资讯Router
            {
                path: '/journalism/create',
                name: 'journalismEdit',
                component: journalismEdit
            },
            {
                path: '/journalism/edit/:id',
                name: 'journalismEdit',
                component: journalismEdit,
                props: true
            },
            {
                path: '/journalism/list',
                name: 'journalismList',
                component: journalismList
            },
            // 广告位Router
            {
                path: '/abs/create',
                name: 'absEdit',
                component: absEdit
            },
            {
                path: '/abs/edit/:id',
                name: 'absEdit',
                component: absEdit,
                props: true
            },
            {
                path: '/abs/list',
                name: 'absList',
                component: absList
            },
            // 管理员Router
            {
                path: '/administrators/create',
                name: 'administratorEdit',
                component: administratorEdit
            },
            {
                path: '/administrators/edit/:id',
                name: 'administratorEdit',
                component: administratorEdit,
                props: true
            },
            {
                path: '/administrators/list',
                name: 'administratorList',
                component: administratorList
            },
        ]
    }
]

const router = new VueRouter({
    routes
})
router.beforeEach((to, from, next) => {
    if (!to.meta.isPulice && !sessionStorage.token) {
        return next('/login')
    }
    next()
})

export default router