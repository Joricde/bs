<script>
import {defineComponent} from 'vue'
import {dayjs} from "@arco-design/web-vue/es/_utils/date";

export default defineComponent({
  name: "queryRecords",
  data() {
    return {
      rangeValue: [Date.now(), Date.now()],
      formItem: {
        accountId: "10000000",
        password: "",
        optType: "all",
        startDate: Date.now(),
        endDate: Date.now(),

      },
      formRules: {
        accountId: {type: "number", min: 8, max: 8, message: "请输入8位长度的账号", trigger: "blur"},
        password: [
          {match: '^d{6}&', message: "密码应为长度6位的数字", trigger: "blur"},]
      },
    }
  },
  methods: {
    dayjs,
    setOPTType(value) {
      this.formItem.optType = value
    },
    setQueryDate(value, date) {
      this.formItem.startDate = date.at(0)
      this.formItem.endDate = date.at(1)
      console.log("start", this.formItem)
      console.log("end", this.formItem.endDate)
    },
    submitForm({values, errors}) {
      let that = this
      if (!errors) {
        that.$axios.post("/business/queryRecords", values)
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
        @submit="submitForm"
    >
      <a-form-item>
        <a-typography-title :heading="5">
          查询流水
        </a-typography-title>
      </a-form-item>

      <a-form-item label="账号" field="accountId">
        <a-input  placeholder="请填写账号" v-model.number="formItem.accountId"/>
      </a-form-item>
      <a-form-item label="账号密码" field="password">
        <a-input placeholder="请填写账号密码" v-model.trim="formItem.password"/>
      </a-form-item>
      <a-form-item label="查询类型" field="optType">
        <a-radio-group :model-value="formItem.optType" @change="setOPTType">
          <a-radio value="all">role1</a-radio>
          <a-radio value="all2">role2</a-radio>
          <a-radio value="all3">role3</a-radio>
          <a-radio value="all4">role4</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item>
        <a-range-picker style="width: 300px;"
                        :defaultValue="[formItem.startDate, formItem.endDate]"
                        :disabledDate="(current) => dayjs(current).isAfter(dayjs(Date.now()))"
                        :allow-clear="false"
                        v-model="rangeValue"
                        @change="setQueryDate"

        />
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