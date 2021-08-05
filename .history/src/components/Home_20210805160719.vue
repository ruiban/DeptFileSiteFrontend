<template>
  <el-container class="home_container">
    <!-- 侧边栏 -->
    <el-aside
      class="menu_wrapper"
      v-bind:class="{ menu_wrapper_collapse: collapse }"
    >
      <el-menu
        default-active="1"
        :collapse="collapse"
        class="el-menu-vertical-demo aside-menu"
        v-bind:class="{ fix: fix }"
        @select="handleSelect"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        
        <template v-for="(item, index) in activeRoutes">
          <el-submenu
            :index="index + ''"
            :key="index"
            v-if="item.children.length > 1"
          >
            <template slot="title">
              <i :class="item.iconCls"></i>
              <span>{{ item.name }}</span>
            </template>
            <el-menu-item
              v-for="child in item.children"
              :index="child.path"
              :key="child.path"
            >
              <i :class="child.iconCls"></i>
              <span>{{ child.name }}</span>
            </el-menu-item>
          </el-submenu>
          <template v-else>
            <el-menu-item
              :index="item.children[0].path"
              :key="item.children.index"
            >
              <i :class="item.children[0].iconCls"></i>
              <span slot="title">{{ item.children[0].name }}</span>
            </el-menu-item>
          </template>
        </template>
        <div class="collapse-btn" @click="collapseChage">
          <i class="el-icon-s-fold"></i>
        </div>
      </el-menu>
    </el-aside>
    <el-container class="sub_container">
      <el-header>
        
        <i class="iconfont icon-gelilogo"></i>
        <div class="home_title">产品策划成本分析系统</div>
        <div class="home_userinfoContainer">
          <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link home_userinfo">
              {{ currentUser.username }}
              <i class="el-icon-arrow-down el-icon--right home_userinfo"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="updatePassword">
                修改密码
              </el-dropdown-item>
              <el-dropdown-item command="logout"> 退出登录 </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <el-dialog title="修改密码" :visible.sync="dialogVisible" center>
            <el-input
              type="password"
              v-model="newPassword"
              placeholder="请输入新密码"
              show-password
              required
            />
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">取消</el-button>
              <el-button type="primary" @click="updatePassword">提交</el-button>
            </div>
          </el-dialog>
        </div>
      </el-header>
      <!-- 主要内容 -->
      <el-container class="main-container">
        <el-main>
          <bread-crumb />
          <keep-alive>
            <router-view v-if="this.$route.meta.keepAlive"></router-view>
          </keep-alive>
          <router-view
            v-if="!this.$route.meta.keepAlive && isRouterAlive"
            :isReload="isReload"
          ></router-view>
        </el-main>
        <el-footer>
          <p>©控制器五室 <span>邮箱:201483 201998</span></p>
        </el-footer>
      </el-container>
      <!-- 主要内容结束 -->
    </el-container>
  </el-container>
</template>
<script>
import { getRequest } from "../api/api";
import { postRequest } from "../api/api";
import { loadCurrentUser } from "../util/common";
import { getCookie } from "../util/common";
import BreadCrumb from "./BreadCrumb.vue";
import debounce from "lodash.debounce";
import "@/assets/icons/gree/iconfont.css";
export default {
  components: { BreadCrumb },
  //inject: ['reload'],
  created: function () {
    loadCurrentUser(this);
    // var temp = sessionStorage.getItem("currentUser");
    // this.currentUser = JSON.parse(temp);
  },
  mounted: function () {
    //挂载阶段处理
    //this.loadCurrentUser();
    //var temp = sessionStorage.getItem("currentUser");
    //this.currentUser = JSON.parse(temp);
    var temp = getCookie("currentUser");
    this.currentUser = JSON.parse(temp);
    var _this = this;
    window.bus.$on("changeIsReload", function () {
      _this.isReload = false;
    });
    // this.debouncePageScrollHandler = debounce(this.pageScrollHandler, 10);
    // window.addEventListener("scroll", this.debouncePageScrollHandler);
  },
  beforeDestroy() {
    // window.removeEventListener("scroll", this.pageScrollHandler);
  },
  data() {
    return {
      currentUser: "",
      dialogVisible: false,
      newPassword: "",
      collapse: false,
      fix: false,
      hide: true,
      isRouterAlive: true,
      isReload: false,
    };
  },
  computed: {
    activeRoutes: function () {
      return this.$router.options.routes.filter(function (item) {
        return !item.hidden;
      });
    },
  },
  methods: {
    pageScrollHandler(e) {
      e.stopPropagation();
      const currentScrollTop = document.documentElement.scrollTop;
      console.log("scrollTop", currentScrollTop);
      console.log("scroll");
      if (currentScrollTop > 60) {
        this.fix = true;
      } else {
        this.fix = false;
      }
    },
    handleCommand(command) {
      //下拉菜单处理

      var _this = this;
      if (command === "logout") {
        this.$confirm("注销登录吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }).then(
          () => {
            getRequest("/logout");
            _this.$router.push({ path: "/" });
            //localStorage.clear();
            sessionStorage.clear();
          },
          function () {
            //取消
          }
        );
      }
      if (command === "updatePassword") {
        this.dialogVisible = true;
      }
    },
    updatePassword() {
      var _this = this;
      postRequest("/user/password", {
        id: this.currentUser.id,
        password: this.newPassword,
      }).then(
        (resp) => {
          if (resp.status == 200) {
            if (resp.data.code === 1000) {
              _this.dialogVisible = false;
              _this.newPassword = "";
              _this
                .$alert(resp.data.data + ",即将重新登录！", "成功", {
                  showClose: false,
                })
                .then(() => {
                  getRequest("/logout");
                  _this.$router.push({ path: "/" });
                  sessionStorage.clear();
                });
            } else {
              _this.$message({ type: "error", message: resp.data.data });
            }
          } else {
            _this.$message({ type: "error", message: "提交失败" });
          }
        },
        (resp) => {
          if (resp.response.status == 403) {
            _this.$message({ type: "error", message: resp.response.data });
          } else {
            _this.$message({ type: "error", message: "根本找不到服务器" });
          }
        }
      );
    },
    handleSelect(index, path) {
      if (index === "/user" || index === "/temperature") {
        var roles = this.currentUser.roles;

        var flag = false;
        for (let i = 0; i < roles.length; i++) {
          if (
            index === "/user" &&
            (roles[i].name === "超级管理员" ||
              roles[i].name === "公司领导" ||
              roles[i].name === "部门领导" ||
              roles[i].name === "科室主任")
          ) {
            flag = true;
          }
          if (
            index === "/temperature" &&
            (roles[i].name === "超级管理员" ||
              roles[i].name === "公司领导" ||
              roles[i].name === "部门领导" ||
              roles[i].name === "科室主任" ||
              roles[i].name === "体温管理员" ||
              roles[i].name === "体温记录员")
          ) {
            flag = true;
          }
        }
        if (flag) {
          this.$router.push({ path: index });
        } else {
          this.$alert(
            "您还没有权限查看哦！ 权限开通请联系科室主任或管理员",
            "权限不足",
            {
              confirmButtonText: "确定",
              type: "warning",
            }
          );
        }
      } else {
        if (this.$route.path !== index) {
          this.$router.push({ path: index });
          //不同路由重载
          this.isReload = false;
        } else {
          //同路由重载
          this.isReload = true;
          //重载子组件
          this.isRouterAlive = false;
          this.$nextTick(function () {
            this.isRouterAlive = true;
          });
        }
      }
    },

    collapseChage() {
      this.collapse = !this.collapse;
      // this.fcollapse = !this.fcollapse;
    },
  },
};
</script>
<style>
.el-header {
  background: linear-gradient(45deg, rgb(42, 103, 226), rgb(250, 83, 6));
  color: #fff;
  text-align: left;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.hide {
  display: none;
}
.collapse-btn {
  text-align: center;
  position: absolute;
  bottom: 0;
  padding: 0 0px;
  cursor: pointer;
  line-height: 70px;
  width: 100%;
  color: white;
}
.home_container {
  position: relative;
}
.sub_container {
  position: relative;
}
.el-main {
  background-color: #fff;
  color: #000;
  text-align: center;
}
.menu_wrapper {
  background-color: wheat;
  transition: width 0.5s;
  width: 200px !important;
  /* height: 1400px; */
}
.menu_wrapper_collapse {
  width: 64px !important;
}
.aside-menu {
  height: 100%;
  /* width: 200px; */
  position: fixed;
  top: 0px;
  /* display: none; */
}
.icon-gelilogo {
  font-size: 80px;
}
.aside_header {
  padding: 16px;
  font-size: 18px;
  color: white;
}
.fix {
  position: fixed;
  top: 0px;
  /* display: block; */
}
.el-footer {
  height: 40px !important;
  background-color: #f2f6fc;
}

.home_title {
  color: #fff;
  font-size: 22px;
  float: left;
  width: 250px;
  line-height: 70px;
  padding-left: 0px;
}

.home_userinfo {
  color: #fff;
  cursor: pointer;
}

.home_userinfoContainer {
  float: right;
  padding-right: 20px;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
}
</style>

    