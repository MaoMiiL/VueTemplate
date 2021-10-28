<template>
  <div class="sidebar-menu">
    <el-menu
      style="height:100%"
      class="el-menu-vertical-demo"
      @select="handleSelect"
      @open="handleOpen"
      @close="handleClose"
      :collapse="collapse"
      :default-openeds="openedSubMenu"
      :default-active="activeItem"
    >
      <el-submenu index="新建业务流程" v-if="userRole == 'admin'">
        <template slot="title">
          <i class="el-icon-document-add"></i>
          <span>新建业务流程</span>
        </template>
        <el-menu-item-group>
          <router-link to="/create/ordinary" tag="span">
            <el-menu-item index="问卷业务流">
              <i class="none-icon"></i>
              问卷业务流
            </el-menu-item>
          </router-link>
          <router-link to="/create/grade" tag="span">
            <el-menu-item index="测评业务流">
              <i class="none-icon"></i>
              测评业务流
            </el-menu-item>
          </router-link>
        </el-menu-item-group>
      </el-submenu>

      <el-submenu index="基础数据维护" v-if="userRole == 'admin'">
        <template slot="title">
          <i class="el-icon-setting"></i>
          <span>基础数据维护</span>
        </template>
        <el-menu-item-group>
          <router-link to="/edit/users" tag="span">
            <el-menu-item index="人员信息">
              <template slot="title">
                <i class="none-icon"></i>
                <span>人员信息</span>
              </template>
            </el-menu-item>
          </router-link>
          <router-link to="/edit/marks" tag="span">
            <el-menu-item index="绩效信息">
              <template slot="title">
                <i class="none-icon"></i>
                绩效信息
              </template>
            </el-menu-item>
          </router-link>
        </el-menu-item-group>
      </el-submenu>

      <el-menu-item index="待填写问卷">
        <i class="el-icon-document"></i>
        <span slot="title">待填写问卷</span>
      </el-menu-item>

      <el-menu-item index="已填写的问卷">
        <i class="el-icon-document-checked"></i>
        <span slot="title">已填写的问卷</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "AsideMenu",
  props: {
    collapse: {
      type: Boolean,
      default: false,
    },
    activeItem:{
      type:String

    }
  },
  data() {
    return {
      // 
      userRole: "admin",
      selectedMenu: [],
      // 默认打开的 sub-menu
      openedSubMenu: ["新建业务流程", "基础数据维护"],
      routerPath: {
        问卷业务流: "/create/ordinary",
        测评业务流: "/create/grade",
        人员信息: "/edit/users",
        绩效信息: "/edit/marks",
      },
    };
  },

  methods: {
    CheckMenu(event) {
      console.log(event.target.getAttribute("class"));
      this.show = !this.show;
    },
    //菜单选择
    handleSelect(key, keyPath) {
      this.selectedMenu = keyPath;
      this.$emit("selectedPath", this.selectedMenu, key, this.routerPath[key]);
    },
    // sub-menu 打开
    handleOpen(key, keyPath) {},
    // sub-menu 关闭
    handleClose(key, keyPath) {},
  },
  created() {
    this.userRole = sessionStorage.getItem("role");
  },
};
</script>

<style lang="less">
.sidebar-menu{
  height: 100%;
  .el-menu{
    width: 240px;
  }
  .el-menu--collapse{
    width: 64px;
  }
}


.none-icon::before {
  display: inline-block;
  content: " ";
  width: 1em;
}
</style>