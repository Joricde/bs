<template>
  <a-card class="box-card">
    <a-tabs default-active-key="1"
            lazy-load
            justify
    >
      <a-tab-pane key="1">
        <template #title>
          <icon-user/> 员工登录
        </template>
        <a-form
            ref="staffLoginForm"
            :rules="formRules"
            size="medium"
            layout="vertical"
            :model="formItem"
            auto-label-width
            @submit="staffSubmit"
        >
          <a-form-item label="工号"
                       field="staffID"
                       hide-asterisk
          >
            <a-input
                v-model.trim="formItem.staffID"
                placeholder="请输入工号"
                :onFocus="onFocus">
              <template #prefix>
                <icon-user />
              </template>
            </a-input>
          </a-form-item>
          <a-form-item label="密码"
                       field="password"
                       hide-asterisk
          >
            <a-input-password
                v-model.trim="formItem.password"
                placeholder="请输入密码"
            >
            </a-input-password>
          </a-form-item>
          <a-form-item>
            <a-button type="primary" style="width: 100%;" html-type="submit"
            >登录
            </a-button>
          </a-form-item>
        </a-form>
      </a-tab-pane>
      <a-tab-pane key="2" style="text-align: center">
        <template #title>
          <icon-qrcode /> 管理员登录
        </template>
        <a-form
            ref="adminLoginFormRef"
            :rules="formRules"
            size="medium"
            layout="vertical"
            :model="formItem"
            auto-label-width
            @submit="adminSubmit"
        >
          <a-form-item label="管理员工号"
                       field="adminID"
                       hide-asterisk
          >
            <a-input
                v-model.trim="formItem.adminID"
                placeholder="请输入管理员ID"
                :onFocus="onFocus">
              <template #prefix>
                <icon-user />
              </template>
            </a-input>
          </a-form-item>
          <a-form-item label="密码"
                       field="password"
                       hide-asterisk
          >
            <a-input-password
                v-model.trim="formItem.a_password"
                placeholder="请输入密码"
            >
            </a-input-password>
          </a-form-item>
          <a-form-item>
            <a-button type="primary" style="width: 100%;" html-type="submit"
            >登录
            </a-button>
          </a-form-item>
        </a-form>
      </a-tab-pane>
    </a-tabs>
  </a-card>
</template>
<script>

import axios from "axios";

export default {
  name: "LoginView",
  data() {
    return {
      formItem: {
        staffID: "",
        password: "",
        adminID: "",
        a_password: ""
      },
      formRules: {
        staffID: [{required: true, message: "工号不能为空", trigger: "blur"},
        ],
        password: {required: true, message: "密码不能为空", trigger: "blur"},

        adminID: [{required: true, message: "管理员工号不能为空", trigger: "blur"},
        ],
        a_password: {required: true, message: "密码不能为空", trigger: "blur"}
      },
    }
  },
  methods: {
    staffSubmit({values, errors}) {
      let that = this
      if (!errors) {
        let data = {
          staffID: values.staffID,
          password: values.password
        }
/*
        axios.post("/staff/login", data)
            .then((response) => {
              let res = response["data"]
              if (res.code ===200){
                that.$message.success({
                  content: res["message"]
                })
                that.$store.commit("setToken", res.data["token"])
                console.log(that.$store.state.token)
                that.$router.push("/home")
              }else {
                that.$message.error(response["data"]["message"])
              }
            })
            .catch((error) => {
              that.$message.error(error.response["data"]["message"])
            })
*/
      }else {
        that.$message.error("提交内容为空")
      }
    },
    adminSubmit({values, errors}) {
      let that = this
      if (!errors) {
        let data = {
          adminID: values.adminID,
          password: values.a_password
        }
        /*
                axios.post("/admin/login", data)
                    .then((response) => {
                      let res = response["data"]
                      if (res.code ===200){
                        that.$message.success({
                          content: res["message"]
                        })
                        that.$store.commit("setToken", res.data["token"])
                        console.log(that.$store.state.token)
                        that.$router.push("/home")
                      }else {
                        that.$message.error(response["data"]["message"])
                      }
                    })
                    .catch((error) => {
                      that.$message.error(error.response["data"]["message"])
                    })
        */
      }else {
        that.$message.error("提交内容为空")
      }
    },
    onFocus(){
      this.$refs.loginFormRef.clearValidate()
    },
  },
}

</script>

<style scoped>
.box-card {
  position: absolute;
  width: calc(min(100%, 360px));
  /*height: 420px;*/
  margin: auto auto auto auto;
  top: 30%;
  left: calc(max(15%,200px));
  right: 15%;
  line-height: 20%;
}
</style>