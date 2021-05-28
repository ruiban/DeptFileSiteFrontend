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
            redirect: '/fileList',
            name: '部门发文',
            component: Home,
            iconCls: 'el-icon-folder',
            meta: {
                requireAuth: true,
                breadcrumb: '首页'
            },
            children: [
                {
                    path: '/fileList',
                    name: '文档列表',
                    component: FileList,
                    meta: {
                        keepAlive: true,
                        requireAuth: true,
                        breadcrumb: '文档列表'
                    }
                },
                {
                    path: '/fileUpload',
                    name: '上传文档',
                    component: FileUpload,
                    meta: {
                        keepAlive: false,
                        requireAuth: true,
                        breadcrumb: '上传文档'
                    }
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
                    path: '/temperature',
                    name: '体温记录',
                    iconCls: 'el-icon-s-data',
                    component: Temperature,
                    meta: {
                        requireAuth: true,
                        breadcrumb: '体温记录'
                    }
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
                    iconCls: 'el-icon-s-marketing',
                    component: PlanningList,
                    meta: {
                        requireAuth: true,
                        breadcrumb: '策划列表'
                    },
                    children: [
                        {
                            path:"planning_edit/:id",
                            hidden: true,
                            name:'策划编辑',
                            meta: {
                                title: "策划编辑",
                                breadcrumb: '策划编辑'
                            },
                            component: (resolve) => require(['../components/PlanningEdit.vue'], resolve)
                        },
                        {
                            path:"planning_detail/:id",
                            hidden: true,
                            name: '策划详情',
                            meta: {
                                title: "策划详情",
                                breadcrumb: '策划详情'
                            },
                            component: (resolve) => require(['../components/PlanningDetail.vue'], resolve)

                        }
                    ]

                },
                {
                    path: '/planning_create',
                    name: '新建策划',
                    iconCls: 'el-icon-s-marketing',
                    component: CreatePlanning,
                    meta: {
                        requireAuth: true,
                        breadcrumb: '新建策划'
                    }

                },
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