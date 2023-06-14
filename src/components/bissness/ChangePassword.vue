<script>
import {defineComponent} from 'vue'

export default defineComponent({
  name: "changePassword",
  data() {
    return {
      formItem: {
        identification: "",
        accountId: '10000000',
        password: "",
        newPassword: "",
        checkPassword: "",
      },
      formRules: {
        identification: [
            {required: true, message: "身份证不能为空", trigger: "blur"},
          /*          {match:^[1-9]\\d{5}\\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\\d{3}$
          , message: "身份证不对", trigger: "blur"},*/

        ],
        accountId: {required: true, min: 8, max: 8, message: "账号不能为空", trigger: "blur"},
        password: {required: true, message: "密码不能为空", trigger: "blur"},
        newPassword: [
          {required: true, message: "新密码不能为空", trigger: "blur"},
          {
            validator: (value, cb) => {
              if (value !== this.formItem.password) {
                cb("密码不一致")
              }
            }
          }
        ],

      },
    }
  },
  methods: {
    submitForm({values, errors}) {
      let that = this
      if (!errors) {
        let data = {
          userID: values.code,
          code: values.code
        }
        that.$axios.post("/business/changePassword", data)
            .then((response) => {
              let res = response["data"]
              if (res.code === 200) {

                that.$message.success({
                  content: res["message"]
                })
                that.$router.push("/home")
              } else {
                that.$message.error(response["data"]["message"])
              }
            })
            .catch((error) => {
              that.$message.error(error.response["data"]["message"])
            })
      } else {
        that.$message.error("提交内容为空")
      }
    },
  }
})
</script>

<template>
  <a-card class="box-card">
    <a-form
        ref="formItemRef"
        layout="vertical"
        :rules="formRules"
        :model="formItem"
        @submit="submitForm"
    >
      <a-form-item>
        <a-typography-title :heading="5">
          修改密码
        </a-typography-title>
      </a-form-item>
      <a-form-item label="身份证号码" field="identification">
        <a-input placeholder="请填写身份证号码" v-model.trim="formItem.identification" />
      </a-form-item>
      <a-form-item label="账号" field="accountId">
        <a-input placeholder="请填写账号" v-model.trim="formItem.accountId"/>
      </a-form-item>
      <a-form-item label="原密码" field="password">
        <a-input placeholder="请填写原密码" v-model.trim="formItem.password"/>
      </a-form-item>
      <a-form-item label="新密码" field="newPassword">
        <a-input placeholder="请填写新密码" v-model.trim="formItem.newPassword"/>
      </a-form-item>
      <a-form-item label="校验新密码" field="checkPassword">
        <a-input placeholder="请再次填写新密码" v-model.trim="formItem.checkPassword"/>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" long>确定</a-button>
      </a-form-item>
    </a-form>
  </a-card>
</template>

<style scoped>


.box-card {
  position: absolute;
  width: calc(min(100%, 360px));
  /*height: 420px;*/
  margin: auto auto auto auto;
  top: 15%;
  left: calc(max(15%, 200px));
  right: 15%;
  line-height: 20%;
}


</style>