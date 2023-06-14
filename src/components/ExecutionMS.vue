<script>
import {defineComponent} from 'vue'

export default defineComponent({
  name: "ExecutionMS",
  props: ['resp'],
  data() {
    return {
      result: {
        status: 'success',
        message: ''
      },
      params: {
        userInfo: '用户信息',
        accountId: '用户ID',
        identification: '身份证',
        accountType: '用户类型',
        balance: '余额',
        time: '操作时间',
        content: '内容',
        targetInfo: '转账目标用户信息',
        targetId: '转账目标用户ID',
        money: '金额',
        staffId: '员工ID',
        staffLevel: '员工等级',
      }
    }
  },
  methods: {
    gotoRouter() {
      let that = this
      return that.$router.push('/home')
    },
    passData() {
      this.$emit('passData', this.respData)
    },
    showContent() {
      let i = 0
    },


  },
  watch:{
    respData(value){
      this.result.status = value === 200 ? 'success' : 'error'
    }
  }

})
</script>

<template>
  <a-card class="box-card">
    <a-result title="操作结果" :status="result.status">
      <template #extra>
        <a-space>
          <a-button type='primary' @click="gotoRouter">返回</a-button>
        </a-space>
      </template>
      <a-list>
        <a-list-item v-for="(value,key) in respData">
          {{params[key]}}: {{value}}
        </a-list-item>
      </a-list>
    </a-result>
  </a-card>
</template>

<style scoped>
.box-card {
  position: absolute;
  width: calc(min(100%, 60%));
  margin: auto auto auto auto;
  top: 10%;
  left: calc(max(15%, 200px));
  right: 15%;
  line-height: 20%;
}
</style>