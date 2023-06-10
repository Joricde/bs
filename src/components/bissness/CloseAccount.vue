<script>
import {defineComponent} from 'vue'

export default defineComponent({
  name: "closeAccount",
  data() {
    return {
      labelTitle: ["身份证号码","账号", "密码"],
      closeAccountForm: {
        identification:"",
        accountId: "",
        password: "",
      },
      rules: {
        identification: [
          {required: true, message: "身份证不能为空", trigger: "blur"},
        ],
        accountId: [
          {required: true, message: "用户名不能空", trigger: "blur"},
        ],
        password: [
          {required: true, message: "密码不能为空", trigger: "blur"},
          {match:/^[0-9]{6}$/, message: "密码应为6位数字", trigger: "blur"},

        ],

      },
    }
  },
  methods: {
    submitForm({values, errors}) {
      let that = this
      // values.money = values.money.toFixed(2)
      if (!errors) {
        that.$axios.post(" /business/closeAccount", values)
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
        ref="closeAccountForm"
        :rules="rules"
        layout="vertical"
        label-width="100px"
        :model="closeAccountForm"
        auto-label-width
        @submit="submitForm"
    >
      <a-form-item>
        <a-typography-title :heading="4">
          注销账户
        </a-typography-title>
      </a-form-item>
      <a-form-item v-for="(value, key, index) in closeAccountForm"
                   :label="labelTitle[index]"
                   :field="key"
      >
        <a-input
            v-model.trim="closeAccountForm[key]"
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
