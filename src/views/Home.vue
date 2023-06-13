<template>
  <a-layout-content>
    <a-typography :style="{ marginLeft: '30px', marginTop: '20px' }">
      <a-typography-text>
        欢迎：{{ username }}
      </a-typography-text>
    </a-typography>
    <a-space direction="vertical" fill size="large" style="margin-top: 25px">
      <a-row class="grid-demo" :gutter="24" v-for="row in buttons">
        <a-col :span="8" :offset="2">
          <a-button type="primary" @click="clickButton(row[0].key)" long>{{ row[0].text }}</a-button>
        </a-col>
        <a-col :span="8">
          <a-button type="primary" @click="clickButton(row[1].key)" long>{{ row[1].text }}</a-button>
        </a-col>
      </a-row>
    </a-space>
  </a-layout-content>
</template>
<script>

export default {
  name: "HomeView",
  data() {
    return {
      username: "xxx",
      buttons: [
        [
          {text: "开户", key: "openAccount"},
          {text: "存款", key: "saveMoney"},
        ],
        [
          {text: "取款", key: "drawMoney"},
          {text: "查询", key: "queryAccount"},
        ],
        [
          {text: "转账", key: "transMoney"},
          {text: "修改密码", key: "changePassword"},
        ],
        [
          {text: "销户", key: "closeAccount"},
          {text: "企业账户操作人", key: "corporateAccount"},
        ],
      ]
    }
  },
  mounted() {
    let that = this
    that.username = that.$store.state.staffData.name
  },
  methods: {
    clickButton(key) {
      let that = this
      that.$router.push(key)
    },
  },
};
</script>
<style scoped>

.layout-demo :deep(.arco-layout-content) {
  color: var(--color-text-2);
  font-weight: 200;
  font-size: 24px;
  background: var(--color-bg-3);
  margin-top: 20px;
}


.grid-demo .arco-col > div {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
</style>
