<script>
import {defineComponent} from 'vue'

export default defineComponent({
  name: "ExecutionMS",
  props:['respData'],
  data(){
    return {
      params: {
        userInfo: '',
        accountId: '',
        identification: '',
        accountType: '',
        balance: '',
        time: '',
        content: '',
        targetInfo: '',
        targetId: '',
        money: '',
        staffId: '',
        staffLevel: '',
      }
    }
  },
  methods:{
    passData(){
      this.$emit('passData', this.respData)
    }
  }
})
</script>

<template>
  <a-result title="操作结果">
    <template #extra>
      <a-typography style="background: var(--color-fill-2); padding: 24px;">
        <a-typography-paragraph>
          {{ respData }}
        </a-typography-paragraph>
      </a-typography>
      <a-space>
        <a-button type="primary">Back</a-button>
      </a-space>
    </template>
  </a-result>
</template>

<style scoped>

</style>