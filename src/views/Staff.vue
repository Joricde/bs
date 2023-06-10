<template>
  <a-layout class="layout-demo">
    <a-layout-sider collapsible breakpoint="xl">
      <div class="logo"/>
      <a-menu
          :default-active-key="['01']"
          :style="{ width: '100%' }"
          @menu-item-click="onClickMenuItem"
      >
        <a-menu-item key="01">
          <icon-home/>
          业务系统
        </a-menu-item>
        <a-menu-item key="02">
          <icon-user/>
          个人页面
        </a-menu-item>

      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header>
        <a-button style="float: right; margin-right: 20px;margin-top: 15px " @click="logout">
          <icon-export style="margin-right: 8px"/>
          登出
        </a-button>
      </a-layout-header>
      <a-layout style="padding: 0 24px;">
        <a-breadcrumb :style="{ margin: '16px 0' }">
        </a-breadcrumb>
        <a-layout-content v-if="pageKey===0">

          <!--          <a-row class="grid-demo" :gutter="24" >-->
          <!--            <a-col :span="10" :offset="2">-->
          <!--            </a-col>-->
          <!--          </a-row>-->
          <a-typography :style="{ marginLeft: '30px', marginTop: '20px' }">
            <a-typography-text>
              欢迎：{{ username }}
            </a-typography-text>
          </a-typography>

          <div style="margin-top: 25px">
            <a-row class="grid-demo" :gutter="24" v-for="row in buttons" :key="row[0].text">
              <a-col :span="10" :offset="2">
                <a-button type="primary" @click="this[row[0].func]()" long>{{ row[0].text }}</a-button>
              </a-col>
              <a-col :span="10">
                <a-button type="primary" @click="this[row[1].func]()" long>{{ row[1].text }}</a-button>
              </a-col>
            </a-row>
          </div>
        </a-layout-content>
        <a-layout-content v-else>
          <a-space direction="vertical" size="large" fill :style="{ marginLeft: '50px', marginTop: '50px' }">
            <a-descriptions size="large" title="用户信息" :column="1">
              <a-descriptions-item label="用户名">
                <a-tag>{{ userInfo.username }}</a-tag>
              </a-descriptions-item>
              <a-descriptions-item label="工号">
                <a-tag>{{ userInfo.staffID }}</a-tag>
              </a-descriptions-item>
              <a-descriptions-item label="员工等级">
                <a-tag>{{ userInfo.staffLevel }}</a-tag>
              </a-descriptions-item>
              <a-descriptions-item label="今日报表">
                <a-tag checkable color="arcoblue" :default-checked="true" @check="generateReport">
                  生成报表
                </a-tag>
              </a-descriptions-item>
            </a-descriptions>
            <a-collapse  :bordered="false" @change="getDeptStaff">
              <a-collapse-item :header="'管理部门：共'+userInfo.number+'人'"  key="1" >
                <div>人口1</div>
                <div>人口2</div>
              </a-collapse-item>
            </a-collapse>
          </a-space>
        </a-layout-content>
        <a-layout-footer></a-layout-footer>
      </a-layout>
    </a-layout>
  </a-layout>
</template>
<script>

import { reactive, ref } from 'vue';
export default {
  name: "StaffView",
  data() {
    return {
      pageKey: 0,
      username: "xxx",
      buttons: [
        [
          {text: "开户", func: "openAccount"},
          {text: "存款", func: "saveMoney"},
        ],
        [
          {text: "取款", func: "drawMoney"},
          {text: "查询", func: "queryAccount"},
        ],
        [
          {text: "转账", func: "transMoney"},
          {text: "修改密码", func: "changePassword"},
        ],
        [
          {text: "销户", func: "closeAccount"},
          {text: "企业账户操作人", func: "corporateAccount"},
        ],
      ],
      userInfo: {
        username: "xxx",
        staffID: 1123,
        staffLevel: "lv 1",
        number:1
      },
    }
  },
  methods: {
    onClickMenuItem(key) {
      if (key === "01")
        this.pageKey = 0
      else
        this.pageKey = 1
      this.$message.info({content: `You select ${key}`, showIcon: true});
    },
    logout() {
      console.log("logout")
    },
    openAccount() {
      console.log("test 1");
    },
    saveMoney() {

    },
    drawMoney() {

    },
    queryAccount() {

    },
    transMoney() {

    },
    changePassword() {

    },
    closeAccount() {

    },
    corporateAccount() {

    },
    generateReport(){
      console.log("g")
    },
    getDeptStaff(activeKey){
      if (activeKey[0] === '1'){
        console.log(activeKey)
      }
    },
  },
  setup() {
    const visible = ref(false);

    const handleClick = () => {
      visible.value = true;
    };
    const handleOk = () => {
      visible.value = false;
    };
    const handleCancel = () => {
      visible.value = false;
    }

    return {
      visible,
      handleClick,
      handleOk,
      handleCancel
    }
  },
};
</script>
<style scoped>
.layout-demo {
  height: 96vh;
  width: calc(max(600px, 90vw));
  position: absolute;
  left: calc(min(30px, 5%));
  top: calc(min(15px, 3%));
//right: calc(min(30px,5%)); background: var(--color-fill-2);
  border: 1px solid var(--color-border);
}

.layout-demo :deep(.arco-layout-sider) .logo {
  height: 32px;
  margin: 12px 8px;
  background: rgba(255, 255, 255, 0.2);
}

.layout-demo :deep(.arco-layout-sider-light) .logo {
//background: var(--color-fill-2);
}

.layout-demo :deep(.arco-layout-header) {
  height: 64px;
  line-height: 64px;
  background: var(--color-bg-3);
}

.layout-demo :deep(.arco-layout-footer) {
  height: 48px;
  color: var(--color-text-2);
  font-weight: 400;
  font-size: 14px;
  line-height: 48px;
}

.layout-demo :deep(.arco-layout-content) {
  color: var(--color-text-2);
  font-weight: 200;
  font-size: 24px;
  background: var(--color-bg-3);
  margin-top: 20px;
}

.grid-demo .arco-col {
  height: 64px;
}

.grid-demo .arco-col > div {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
</style>
