<script>
import {defineComponent} from 'vue'

export default defineComponent({
  name: "drawMoney",
  data(){
    return{
      formItem:{
        accountId: '10000000',
        password: "",
        money:0.00,
      },
      formRules: {
        accountId: {required: true, min: 8, max: 8, message: "账号不能为空", trigger: "blur"},
        password: {required: true, message: "密码不能为空", trigger: "blur"},
        money: [
          {type: 'number', message: '请输入取款金额', trigger: 'blur'},
          {
            validator: (value, cb) => {
              if (value <= 0) {
                cb("输入金额错误")
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
        that.$axios.post("/business/drawMoney", values)
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
        layout="vertical"
        :rules="formRules"
        :model="formItem"
        @submit="submitForm"
    >
      <a-form-item>
        <a-typography-title :heading="5">
          取款
        </a-typography-title>
      </a-form-item>

      <a-form-item label="账号">
        <a-input placeholder="请填写账号" v-model.trim="formItem.accountId"/>
      </a-form-item>
      <a-form-item label="账号密码">
        <a-input placeholder="请填写账号密码" v-model.trim="formItem.password"/>
      </a-form-item>
      <a-form-item label="取款金额">
        <a-input-number placeholder="请填写取款金额"
                        v-model.trim="formItem.money"
                        :min="0"
                        ::precision="2" />
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
  top: 20%;
  left: calc(max(15%, 200px));
  right: 15%;
  line-height: 20%;
}
</style>