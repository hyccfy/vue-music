import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index/index'

Vue.use(Router)

// 路由懒加载
const Index = (resolve) => {
    import('@/components/index/index').then((module) => {
        resolve(module)
    })
};

const Search = (resolve) => {
    import('@/components/search/search').then((module) => {
        resolve(module)
    })
};


export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/index',
            component: Index
        },
        {
            path: '/index',
            component: Index
        },
        {
            path: '/search',
            component: Search
        }
    ]
})





