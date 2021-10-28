import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login.vue'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {
        title: '登录',
      }
    },
    {
      path: '/',
      name: 'home',
      component:  () => import("../views/Home.vue"),
      meta: {
        title: '首页',
      },
      children:[
        {
          path: '',
          component:  () => import("../views/Index.vue"),
          meta: {
            name: '首页',
          },
        },
        {
          path:'create/ordinary',
          name:'ordinary',
          component:()=>import("../views/createNewPage/OrdinaryPage.vue"),
          meta: {
            name: '问卷业务流',
            keyPath:["新建业务流程","问卷业务流"],
          },
        },
        {
          path:'create/grade',
          name:'grade',
          component:()=>import("../views/createNewPage/GradePage.vue"),   
          meta: {
            name: '测评业务流',
            keyPath:["新建业务流程","测评业务流"],
          },
        },
        {
          path:'edit/users',
          name:'user',
          component:()=>import("../views/editDatabase/Users.vue"),
          meta: {
            name: '人员信息',
            keyPath:["基础数据维护","人员信息"],
          },
        },
        {
          path:'edit/marks',
          name:'mark',
          component:()=>import("../views/editDatabase/Marks.vue"),
          meta: {
            name: '绩效信息',
            keyPath:["基础数据维护","绩效信息"],
          },
        },
        {
          path:'personalInfor',
          name:'personalInfor',
          component:()=>import("../views/UsersSettings/UserInforSetting.vue"),
          meta: {
            name: '个人信息',
            keyPath:["个人信息"],
          },
        }

      ]
    },
    
    {
      path: '*',
      name: '404',
      component: () => import("../views/common/404.vue"),
      meta: {
        title: '找不到页面',
      }
    }
  ]
})
