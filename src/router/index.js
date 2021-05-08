import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Login from '@/components/Login'
import FileList from '@/components/FileList'
import FileUpload from '@/components/FileUpload'
import UserManagen from '@/components/UserManagen'
import FileArchive from '@/components/FileArchive'
import Temperature from '@/components/Temperature'
import ImageUpload from '@/components/ImageUpload'


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
            name: '部门发文',
            component: Home,
            iconCls: 'el-icon-folder',
            meta: {
                requireAuth: true
            },
            children: [
                {
                    path: '/fileList',
                    name: '文档列表',
                    component: FileList,
                    meta: {
                        keepAlive: true,
                        requireAuth: true
                    }
                },
                {
                    path: '/fileUpload',
                    name: '上传文档',
                    component: FileUpload,
                    meta: {
                        keepAlive: false,
                        requireAuth: true
                    }
                }


            ]
        },

        {
            path: '/home',
            name: '首页',
            component: Home,
            meta: {
                requireAuth: true
            },
            children: [
                {
                    path: '/temperature',
                    name: '体温记录',
                    iconCls: 'el-icon-s-data',
                    component: Temperature,
                    meta: {
                        requireAuth: true
                    }
                }
            ]

        },

        {
            path: '/home',
            name: '首页',
            component: Home,
            meta: {
                requireAuth: true
            },
            children: [
                {
                    path: '/user',
                    name: '用户管理',
                    iconCls: 'el-icon-user',
                    component: UserManagen,
                    meta: {
                        requireAuth: true
                    }
                }
            ]
        },

        {
            path: '/home',
            name: '首页',
            component: Home,
            meta: {
                requireAuth: true
            },
            children: [
                {
                    path: '/image',
                    name: '图片上传',
                    iconCls: 'el-icon-s-marketing',
                    component: ImageUpload,
                    meta: {
                        requireAuth: true
                    }
                }
            ]
        },
        /*{
            path: '/home',
            name: '文件归档',
            component: Home,
            meta:{
                requireAuth: true
            },
            children: [
                {
                    path: '/archive',
                    name: '文件归档',
                    iconCls: 'el-icon-folder-opened',
                    component: FileArchive,
                    meta:{
                        requireAuth: true
                    }
                }
            ]
        },*/

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