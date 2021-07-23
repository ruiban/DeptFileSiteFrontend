<template>
  <el-form
    :rules="rules"
    class="login-container"
    label-position="left"
    v-loading="loading"
    :model="loginForm"
    ref="loginForm"
  >
    <h3 class="login_title">部门发文系统登录</h3>
    <el-form-item prop="mail" label="邮箱" label-width="50px">
      <el-input
        type="text"
        v-model="loginForm.mail"
        auto-complete="off"
        placeholder="邮箱"
      ></el-input>
    </el-form-item>
    <el-form-item prop="password" label="密码" label-width="50px">
      <el-input
        type="password"
        v-model="loginForm.password"
        auto-complete="off"
        placeholder="密码"
      ></el-input>
    </el-form-item>
    <!-- <el-form-item  label="自动登录" label-width="50px">
      <el-input type="checkbox" v-model="loginForm.remember-me" ></el-input>
    </el-form-item>-->
    <el-checkbox class="login_remember" v-model="checked" label-position="left"
      >记住密码</el-checkbox
    >
    <el-form-item>
      <span sytle="color:#606266">默认密码:123456</span>
    </el-form-item>

    <el-form-item style="width: 100%">
      <el-button
        type="primary"
        @click.native.prevent="submitClick('loginForm')"
        style="width: 100%"
        >登录</el-button
      >
    </el-form-item>
  </el-form>
</template>
<script>
import { postRequest } from "../api/api";
import { putRequest } from "../api/api";
import { getRequest } from "../api/api";
import { loadCurrentUser } from "../util/common";

export default {
  data() {
    return {
      rules: {
        mail: [{ required: true, message: "请输入邮箱号", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
      checked: true,
      loginForm: {
        mail: "",
        password: "",
        //remember-me:null
      },
      loading: false,
    };
  },
  mounted() {
    this.getCookie();
  },
  methods: {
    submitClick(loginForm) {
      var _this = this;
      if (this.checked == true) {
        //传入账号，密码，保存天数3个参数
        this.setCookie(this.loginForm.mail, this.loginForm.password, 7);
      } else {
        this.clearCookie();
      }
      this.loading = true;
      this.$refs[loginForm].validate((valid) => {
        if (valid) {
          postRequest("/login", {
            mail: this.loginForm.mail,
            password: this.loginForm.password,
            //remember-me: this.loginForm.remember-me
          }).then(
            (resp) => {
              _this.loading = false;
              if (resp.status == 200) {
                if (resp.data.code === 1000) {
                  sessionStorage.setItem("isLogin", true);
                  loadCurrentUser(_this);
                } else {
                  _this.$alert(resp.data.data, "失败!");
                }
              } else {
                //失败
                _this.$alert("登陆失败!", "失败!");
              }
            },
            (resp) => {
              _this.loading = false;
              _this.$alert("找不到服务器⊙﹏⊙∥!", "失败!");
            }
          );
        } else {
          _this.loading = false;
          _this.$alert("请输入账号密码!", "失败！");
        }
      });
    },
    //设置cookie
    setCookie(c_name, c_pwd, exdays) {
      var exdate = new Date(); //获取时间
      exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays); //保存的天数
      //字符串拼接cookie
      window.document.cookie =
        "mail" + "=" + c_name + ";path=/;expires=" + exdate.toGMTString();
      window.document.cookie =
        "password" + "=" + c_pwd + ";path=/;expires=" + exdate.toGMTString();
    },
    getCookie: function () {
      if (document.cookie.length > 0) {
        var arr = document.cookie.split("; "); //这里显示的格式需要切割一下自己可输出看下
        for (var i = 0; i < arr.length; i++) {
          var arr2 = arr[i].split("="); //再次切割
          //判断查找相对应的值
          if (arr2[0] == "mail") {
            this.loginForm.mail = arr2[1]; //保存到保存数据的地方
          } else if (arr2[0] == "password") {
            this.loginForm.password = arr2[1];
          }
        }
      }
    },
    //清除cookie
    clearCookie: function () {
      this.setCookie("", "", -1); //清空前两个值，天数为负1天就好了
    },
  },
};
</script>
<style>
.login-container {
  border-radius: 15px;
  background-clip: padding-box;
  margin: 180px auto;
  width: 350px;
  padding: 35px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}

.login_title {
  margin: 0px auto 40px auto;
  text-align: center;
  color: #505458;
}

.login_remember {
  margin: 0px 0px 0px 0px;
  text-align: left;
}
</style>
