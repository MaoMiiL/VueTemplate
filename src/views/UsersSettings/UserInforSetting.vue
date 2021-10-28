<template>
  <div class="infor">
    <!-- 左边 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>关于我</span>
      </div>
      <div>
        <el-image class="image" :src="url" fit="cover"></el-image>
        <div style="text-align: center"><span>姓名</span></div>
      </div>
      <div class="bottom clearfix">
        <el-button
          type="text"
          class="button"
          @click="dialogVisible = !dialogVisible"
          >修改密码</el-button
        >
      </div>
    </el-card>
    <!-- 右边 -->
    <div class="box-menu">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="用户管理" name="first">
          <el-card shadow="never">
            <div class="edit-btn-box">
              <el-button type="text" class="button">操作按钮</el-button>
            </div>
            <div class="message-list">
              <div>账号：<span></span></div>
              <div>手机号：<span></span></div>
              <div>座机号：<span></span></div>
              <div>直接上级：<span></span></div>
            </div>
          </el-card>
          <el-divider></el-divider>
          <el-card shadow="never">
            <div class="edit-btn-box">
              <el-button type="text" class="button">转给他人处理</el-button>
            </div>
            <div class="message-list">
              <div>是否转接给他人：<span></span></div>
              <div>承接人：<span></span></div>
              <div>开始时间：<span></span></div>
              <div>结束时间：<span></span></div>
            </div>
          </el-card>
        </el-tab-pane>
        <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
        <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
      </el-tabs>
    </div>

    <!-- 修改密码的对话框 -->
    <el-dialog title="修改密码" :visible.sync="dialogVisible" width="30%">
      <el-form  :rules="PasswordRules" :model="changePasswordForm" label-width="120px">
        <el-form-item label="原密码：" prop="old">
          <el-input v-model="changePasswordForm.old"></el-input>
        </el-form-item>
        <el-form-item label="新密码：" prop="newP">
          <el-input v-model="changePasswordForm.newP"></el-input>
        </el-form-item>
        <el-form-item label="确认新密码：" prop="checkP">
          <el-input v-model="changePasswordForm.checkP"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleChangePass">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "userInforSetting",
  data() {
    var validatePass = (rule,value,callback)=>{
      if(value === ""){
        callback(new Error("请确认新密码"));
      }else if(value !== this.changePasswordForm.newP){
        callback(new Error("确认的密码与新密码不一致"));
      }else{
        callback();
      }

    }
    return {
      activeName: "first",
      // 控制密码框显示的变量
      dialogVisible: false,
      changePasswordForm:{
        old:'',
        newP:'',
        checkP:'',
      },
      PasswordRules:{
        old:[
          {required:true,message:'请输入密码！'}
        ],
        newP:[
          {required:true,message:'请输入密码！'}
        ],
        checkP:[
          { required:true,validator: validatePass, trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    handleSelect(key, keyPath) {},
    // 更换密码
    handleChangePass(){
      
    }
  },
};
</script>

<style lang="less">
@import "../../styles/userInforSetting.less";
</style>