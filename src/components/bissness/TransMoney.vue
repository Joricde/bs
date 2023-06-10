<script>
import {defineComponent} from 'vue'

export default defineComponent({
  name: "transMoney",
  data() {
    return {
      labelTitle: ["账号", "密码", "用户名", "目标账号", "目标用户名", "转账金额"],
      transMoneyForm: {
        accountId: "",
        password: "",
        name: "",
        targetId: "",
        targetName: "",
        money: 0.00,
      },
      rules: {
        accountId: [
          {required: true, message: "用户名不能空", trigger: "blur"},
        ],
        password: [
          {required: true, message: "密码不能为空", trigger: "blur"},
          {match:/^[0-9]{6}$/, message: "密码应为6位数字", trigger: "blur"},

        ],
        name: [
          {required: true, message: "姓名不能为空", trigger: "blur"},
        ],
        targetId: {required: true, message: "目标账号不能为空", trigger: "blur"},

        targetName: {required: true, message: "目标用户名不能空", trigger: "blur"},

        money: [
          {type: 'number', message: '请输入转账金额', trigger: 'blur'},
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
      // values.money = values.money.toFixed(2)
      console.log("open account ", values)
      if (!errors) {
        that.$axios.post("/business/openAccount", values)
            .then((response) => {
              let resData = response["data"]
              if (resData.code === 200) {
                that.$message.success({
                  message: resData["data"]["message"]
                })
                that.$router.push("/")
              } else {
                that.$message.error({
                      message: resData["data"]["message"]
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
        ref="transMoneyFormRef"
        :rules="rules"
        layout="vertical"
        label-width="100px"
        :model="transMoneyForm"
        auto-label-width
        @submit="submitForm"
    >
      <a-form-item>
        <a-typography-title :heading="4">
          转账
        </a-typography-title>
      </a-form-item>
      <a-form-item v-for="(value, key, index) in transMoneyForm"
                   :label="labelTitle[index]"
                   :field="key"

      >
        <a-input-number v-if="key==='money'"
                        v-model="transMoneyForm[key]"
                        :placeholder="'请输入'+labelTitle[index]"
                        :min="0"
                        :precision="2"

        />
        <a-input
            v-else
            v-model.trim="transMoneyForm[key]"
            :placeholder="'请输入'+labelTitle[index]"

        />

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



