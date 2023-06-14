<script>
import {defineComponent} from 'vue'
import router from "@/router/routers";

export default defineComponent({
  name: "OpenAccount",
  data() {
    return {
      labelPosition: "top",
      registerFormItem: {
        name: "",
        identification: "",
        password: "",
        checkPassword: "",
        money: 0.00,
        accountType:"fixed",
        userType:"personal",
      },
      user_status: 'success',
      rules: {
        name: [
          {required: true, message: "用户名不能空", trigger: "blur"}, // 规则1
        ],
        identification: [
          {required: true, message: "身份证不能为空", trigger: "blur"},
/*          {match:'^[1-9]\\d{5}\\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\\d{3}$'
            , message: "身份证不对", trigger: "blur"},*/
        ],
        password: [
          {required: true, message: "密码不能为空", trigger: "blur"},
          {min: 6, max: 6, message: "密码长度不合法", trigger: "blur"}
        ],
        checkPassword: [
          {required: true, message: "请再次输入密码", trigger: "blur"},
          {
            validator: (value, cb) => {
              if (value !== this.registerFormItem.password) {
                cb("密码不一致")
              }
            }
          }

        ],
        money: [
          {type: 'number', message: '请输入初始金额', trigger: 'blur'},
          {
            validator: (value, cb) => {
              if (value <= 0) {
                cb("输入金额错误")
              }
            }
          }
        ],
        accountType: [
          {required: true, message: "acc", trigger: "blur"}, // 规则1
        ],
        userType: [
          {required: true, message: "用户名不能空", trigger: "blur"}, // 规则1
        ],
      },
    }
  },
  methods: {
    setAccountType(value){
      console.log(value )
      this.registerFormItem.accountType = value
    },
    setUserType(value){
      console.log(value)
      this.registerFormItem.userType = value
    },
    onFocus() {
      this.$refs.registerFormRef.clearValidate()
    },
    changeRouter(){
      let that = this
    },
    submitForm({values, errors}) {
      let that = this
      if (!errors) {
        that.$axios.post("/business/openAccount", JSON.stringify(values))
            .then((response) => {
              let resData = response["data"]
              if (resData.status === 200) {
                that.$message.success({
                  content: resData["data"]["message"]
                })
                that.$router.push("/act/message")
              } else {
                that.$message.error({
                  content: resData["data"]["message"]
                    }
                )
              }
            })
            .catch((error) => {
              that.$message.error(error.response["data"]["message"])
            })
      }
    },
  },
})
</script>

<template>
  <a-card class="box-card">
    <a-form
        ref="registerFormRef"
        :rules="rules"
        layout="vertical"
        label-width="100px"
        :model="registerFormItem"
        auto-label-width
        @submit="submitForm"
    >
      <a-form-item>
        <a-typography-title :heading="4">
          注册
        </a-typography-title>
      </a-form-item>
      <a-form-item label="姓名"
                   field="name"
      >
        <a-input
            v-model.trim="registerFormItem.name"
            placeholder="请输入姓名"
            @focus="onFocus"
        />
      </a-form-item>
      <a-form-item label="身份证" field="identification">
        <a-input
            v-model.trim="registerFormItem.identification"
            placeholder="请输入身份证"
        />
      </a-form-item>
      <a-form-item label="密码" field="password">
        <a-input-password
            v-model.trim="registerFormItem.password"
            placeholder="请输入密码"
            autocomplete="off"
        />
      </a-form-item>
      <a-form-item label="校验密码" field="checkPassword" hide-asterisk>
        <a-input-password
            v-model.trim="registerFormItem.checkPassword"
            placeholder="请再次输入密码"
        />
      </a-form-item>
      <a-form-item label="初始金额" field="money">
        <a-input-number
            v-model="registerFormItem.money"
            placeholder="请输入初始金额"
            :min="0"
            :precision="2"
        />
      </a-form-item>
      <a-form-item label="账户类型" field="accountType" >
        <a-radio-group  :model-value="registerFormItem.accountType" @change="setAccountType">
          <a-radio value="fixed" >定期用户</a-radio>
          <a-radio value="current" >活期用户</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item label="用户类型" field="userType" >
        <a-radio-group :model-value="registerFormItem.userType" @change="setUserType">
          <a-radio value="personal" >个人用户</a-radio>
          <a-radio value="company" >企业用户</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" style="width: 100%;" html-type="submit"
        >提交
        </a-button>
      </a-form-item>
    </a-form>
  </a-card>
</template>

<style scoped>
.box-card {
  position: absolute;
  width: calc(min(100%, 420px));
  margin: auto auto auto auto;
  top: 10%;
  left: calc(max(15%, 200px));
  right: 15%;
  line-height: 20%;
}
</style>

