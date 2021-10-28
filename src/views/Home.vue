<template>
  <div class="home">
    <header :style="{backgroundColor:themeColor}">
      <div class="header-left" :class="{ close: isCollapse }">问卷系统</div>
      <div class="header-main">
        <div class="main-left">
          <span @click="isCollapse = !isCollapse">
            <transition name="fade">
              <i class="el-icon-s-fold" v-if="!isCollapse"></i>
              <i class="el-icon-s-unfold" v-else></i>
            </transition>
          </span>
          <div class="breadcrumb">
            <el-breadcrumb separator="/">
              <el-breadcrumb-item>首页</el-breadcrumb-item>
              <el-breadcrumb-item v-for="item in keyPath">{{
                item
              }}</el-breadcrumb-item>
            </el-breadcrumb>
          </div>
        </div>
        <div class="user-setting">
          <!-- 修改主题色 -->
          <el-tooltip effect="dark" content="修改主题" placement="bottom">
           <div class="color-picker"> 
            <el-color-picker v-model="themeColor" show-alpha size="small " style="opacity:0;z-index:99"></el-color-picker>
            <div class="color-picker-icon">
              <i class="el-icon-magic-stick"></i> 
            </div>
           </div>
          </el-tooltip>
                    
          <!-- 系统通知图标 -->       
          <div class="toolbar"> 
            <i class="el-icon-message-solid"></i> 
          </div>
          
          <!-- 员工信息简介 -->
          <el-popover
            placement="bottom"
            title="标题"
            width="200"
            trigger="hover"
            content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。">
            <el-button slot="reference" type="text" style="color:#fff">{{ username }}</el-button>
          </el-popover>

          <!-- 个人信息编辑图标 -->
          <div class="toolbar" @click="SelectedPath(['个人信息'],'个人信息','/personalInfor')"> 
            <i class="el-icon-user-solid"></i>
          </div>
         
          <!-- 帮助 -->
          <div class="toolbar"> 
            <el-tooltip effect="dark" content="帮助" placement="bottom">
              <i class="el-icon-question"></i>
            </el-tooltip>
          </div>

        </div>
      </div>
    </header>
    <div class="contain">
      <aside>
        <aside-menu
          :collapse="isCollapse"
          @selectedPath="SelectedPath"
          :activeItem = "curPage"
        ></aside-menu>
      </aside>
      <main>
        <div class="history-router-box">
          <transition-group name="list" tag="div" class="router-group">
            <div
              class="router-item"
              :class="{ active: curPage === '首页' }"
              key="首页"
              @click="handleRouter('首页', '/')">
              <transition name="fade">
                <i v-if="curPage === '首页'"
                  class="el-icon-paperclip"
                  key="首页tag"></i>
                <i v-else class="pending" key="首页"></i>
              </transition>
              首页
            </div>
            <div
              v-for="item in historyPathArray"
              class="router-item"
              :class="{ active: curPage === item.name }"
              :key="item.name"
              @click="handleRouter(item.name, item.routee)"
            >
              <transition name="fade">
                <i v-if="curPage === item.name"
                  class="el-icon-paperclip"
                  :key="item.name + 'tag'"></i>
                <i v-else class="pending" :key="item.name"></i>
              </transition>
              {{ item.name }}
              <i class="el-icon-close" @click.stop="handleHistoryArray(item.name)"></i>
            </div>
          </transition-group>
        </div>
        <!-- 路由切换 内容展示的区域 -->
        <div class="showPage">
          <transition name="fade">
           <component :is="curComponent"></component>
          </transition>
        </div> 
      </main>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  components: {
    AsideMenu: () => import("../components/AsideMenu.vue"),
    error: () => import("./common/404.vue"),
    
    Index:() => import("../views/Index.vue"),
    Grade:()=>import("../views/createNewPage/GradePage.vue"),
    Ordinary:()=>import("../views/createNewPage/OrdinaryPage.vue"),
    EditUser:()=>import("../views/editDatabase/Users.vue"),
    EditJiXiao:()=>import("../views/editDatabase/Marks.vue"),

    // 当前用户 个人信息页面
    UserSetting:()=>import("../views/UsersSettings/UserInforSetting.vue")

  },
  data() {
    return {
      // 主题颜色：
      themeColor:'#3385ff',
      username: "",
      isCollapse: false,
      // 顶部
      keyPath: [],

      // 收集 点击浏览记录 ---需保存在 vuex
      historyPathArray: [],
      // 当前路由
      curPage: "首页",
      // 当前组件
      curComponent:'Index',

    };
  },
  watch: {
    curPage: {
      immediate: true,
      handler(newValue, oldValue) {
        switch(newValue){
          case '测评业务流':
            this.curComponent = 'Grade';
            break;
          case '问卷业务流':
            this.curComponent = 'Ordinary';
            break;
          case '个人信息':
            this.curComponent = 'UserSetting';
            break;
          case '人员信息':
            this.curComponent = 'EditUser';
            break;
          case '绩效信息':
            this.curComponent = 'EditJiXiao';
            break;
          default:
            this.curComponent = 'Index';
        }
      },
    },
  },
  created() {
    this.username = sessionStorage.getItem("username");
    // 刷新的读取 路由信息
    this.keyPath = this.$route.meta.keyPath;
    this.curPage = this.$route.meta.name;
    console.log(this.$route);
  },
  methods: {
    SelectedPath(keyPath, key, value) {
      this.keyPath = keyPath;
      let obj = {
        routee: value,
        name: key,
        keyPath: keyPath,
      };
      let flag = this.historyPathArray.some((item) => {
        return item.routee == value;
      });
      if (!flag) {
        // 先保存，
        this.historyPathArray.push(obj);
      }
      this.curPage = key;
    },
    // 控制路由跳转
    handleRouter(key, value) {
      this.curPage = key;
      let keyPath = "";
      this.historyPathArray.forEach((item, index) => {
        if (item.name == key) {
          keyPath = item.keyPath;
        }
      });
      this.keyPath = keyPath;
      this.$router.push({ path: value });
    },

    // 点击 删除按钮 x ：更新当前路由记录数组 + 关闭当前路由
    handleHistoryArray(key) {
      let i = -1;
      this.historyPathArray.forEach((item, index) => {
        if (item.name == key) {
          i = index;
        }
      });
      this.historyPathArray.splice(i, 1);
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="less">
@import "../styles/Home.less";

</style>