import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Login from '@/components/Login'
import FileList from '@/components/FileList'
import FileUpload from '@/components/FileUpload'
import UserManagen from '@/components/UserManagen'
import FileArchive from '@/components/FileArchive'
import Temperature from '@/components/Temperature'
import PlanningList from '@/components/PlanningList'
import CreatePlanning from '../components/CreatePlanning'


Vue.use(Router)

const router = new Router({
    routes: [
        {
            path: '/',
            name: '登录',
            hidden: true,
            component: Login
        },
        {
            path: '/home',
            name: '个人中心',
            component: Home,
            meta: {
                requireAuth: true,
                breadcrumb: '个人中心'
            },
            children: [
                {
                    path: '/workbeach',
                    name: '个人中心',
                    component: (resolve) => require(['../components/WorkBeach/index.vue'], resolve)
                }
            ],
        },
        {
            path: '/home',
            name: '产品策划',
            iconCls: 'el-icon-s-marketing',
            component: Home,
            meta: {
                requireAuth: true,
                breadcrumb: '产品策划'
            },
            children: [
                {
                    path: '/planning_list',
                    name: '策划列表',
                    iconCls: 'el-icon-s-order',
                    component: PlanningList,
                    meta: {
                        requireAuth: true,
                        breadcrumb: '策划列表'
                    },
                    children: [
                        {
                            path: "planning_edit/:id",
                            hidden: true,
                            name: '策划编辑',
                            meta: {
                                title: "策划编辑",
                                breadcrumb: '策划编辑'
                            },
                            component: (resolve) => require(['../components/Planning/edit/index.vue'], resolve)
                        },
                        {
                            path: "planning_detail/:id",
                            hidden: true,
                            name: '策划详情',
                            meta: {
                                title: "策划详情",
                                breadcrumb: '策划详情'
                            },
                            component: (resolve) => require(['../components/Planning/detail/index.vue'], resolve)
                        }
                    ]
                },
                {
                    path: '/planning_create',
                    name: '新建策划',
                    iconCls: 'el-icon-plus',
                    meta: {
                        requireAuth: true,
                        breadcrumb: '新建策划'
                    },
                    component: (resolve) => require(['../components/Planning/add/index.vue'], resolve)
                },
                {
                    path: '/brand_list',
                    name: '品牌列表',
                    iconCls: 'el-icon-postcard',
                    meta: {
                        requireAuth: true,
                        breadcrumb: '品牌列表'
                    },
                    component: (resolve) => require(['../components/Planning/brand/index.vue'], resolve)
                },
                {
                    path: '/distribution_channel_list',
                    name: '销售渠道',
                    iconCls: "el-icon-s-promotion",
                    meta: {
                        requireAuth: true,
                        breadcrumb: '销售渠道'
                    },
                    component: (resolve) => require(['../components/Planning/distribution_channel_list/index.vue'], resolve)
                }

            ]
        },
        {
            path: '/home',
            name: '首页',
            component: Home,
            meta: {
                requireAuth: true,
                breadcrumb: '首页'
            },
            children: [
                {
                    path: '/user',
                    name: '用户管理',
                    iconCls: 'el-icon-user',
                    component: UserManagen,
                    meta: {
                        requireAuth: true,
                        breadcrumb: '用户管理'
                    }
                }
            ]
        },
    ]
})

//路由拦截
router.beforeEach((to, from, next) => {
    //判断该路由是否需要登录权限
    if (to.meta.requireAuth) {
        if (sessionStorage.getItem('isLogin')) {
            next()
        } else {
            next({
                path: '/',
            })
        }
    } else {
        next()
    }
})

/**
 * 重写路由的push方法
 */
const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
    return routerPush.call(this, location).catch(error => error)
}


export default router