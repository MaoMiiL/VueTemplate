<template>
  <div class="lhy-center">
    <h2>Questionnaire-System</h2>
    <el-form :model="loginForm" label-width="0px" class="login-form">
      <el-form-item>
        <el-input type="text" v-model="loginForm.username" autocomplete="off">
          <el-button slot="prepend" icon="el-icon-user-solid"></el-button>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-input
          type="password"
          v-model="loginForm.password"
          autocomplete="off"
        >
          <el-button slot="prepend" icon="el-icon-more-outline"></el-button>
        </el-input>
      </el-form-item>

      <el-form-item>
        <el-button
          type="primary"
          @click="submitForm()"
          class="submit-btn"
          :loading="isBtnLoading"
          >{{ btnText }}</el-button
        >
      </el-form-item>
      <el-form-item>
        <el-row class="others">
          <el-col :span="8" style="text-align: left">
            <a href="#" target="_blank"
              ><el-button type="text" icon="el-icon-info">注册</el-button></a
            >
          </el-col>
          <el-col :span="16" style="text-align: right">
            <a href="#" target="_blank"
              ><el-button type="text" icon="el-icon-question"
                >帮助</el-button
              ></a
            >
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      loginForm: {
        username: "",
        password: "",
      },
      isBtnLoading: false,
      //settimteout
      submitId: "",
    };
  },
  methods: {
    submitForm() {
      this.isBtnLoading = true;
      // debugger;
      if (this.loginForm.username.toString().indexOf("admin") != -1) {
        //管理员
        

        this.submitId = setTimeout(() => {
          this.isBtnLoading = false;
          //将员工基本信息存入 session中
          sessionStorage.setItem("username",this.loginForm.username);
          sessionStorage.setItem("role","admin");
          this.$router.push({name: "home"});
        }, 1500);
      } else if (this.loginForm.username.toString().indexOf("client") != -1) {
        //普通用户
        this.submitId = setTimeout(() => {
          this.isBtnLoading = false;
           sessionStorage.setItem("username",this.loginForm.username);
          sessionStorage.setItem("role","client");
          this.$router.push({ name: "home"});
        }, 1500);
      } else {
        //其他
        this.isBtnLoading = false;
        this.$message.error("该用户不存在！");
      }
    },
  },
  computed: {
    btnText() {
      if (this.isBtnLoading) return "登录中...";
      return "登录";
    },
  },
  mounted() {
    document.title = "QNN- " + this.$route.meta.title;
    console.log(this.$route);
  },
  beforeDestroy() {
    clearTimeout(this.submitId);
  },
};
</script>

<style>
.submit-btn {
  width: 100%;
}
.login-form {
  width: 90%;
  margin: 0 auto;
}
</style>