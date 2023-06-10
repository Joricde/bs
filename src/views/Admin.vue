<template>
  <a-layout class="layout-demo">
    <a-layout-sider collapsible breakpoint="xl">
      <div class="logo"/>
      <a-menu
          :default-active-key="[1]"
          :style="{ width: '100%' }"
          @menu-item-click="onClickMenuItem"
      >
        <a-menu-item :key=1>
          <icon-home/>
          系统管理员
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
        <a-layout-content >
          <a-space direction="vertical" size="large" fill :style="{ marginLeft: '50px', marginTop: '50px' }">

            <a-typography :style="{ marginLeft: '30px', marginTop: '20px' }">
              <a-typography-text>
                您好：{{ username }}管理员
              </a-typography-text>
            </a-typography>
            <a-collapse  :bordered="false" @change="getDeptStaff" style="margin-right: 20px">
              <a-collapse-item header="雇员管理"  key="1" :style="customStyle">
                <div>人口1</div>
                <div>人口2</div>
              </a-collapse-item>
              <a-collapse-item header="总报表"  key="2" :style="customStyle">
                <div>人口1</div>
                <div>人口2</div>
              </a-collapse-item>
              <a-collapse-item header="总日志"  key="3" :style="customStyle">
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


export default {
  setup() {
    const customStyle = {
      borderRadius: '6px',
      marginBottom: '18px',
      border: 'none',
      overflow: 'hidden',
    }

    return {
      customStyle
    }
  },
  name: "AdminView",
  data() {
    return {
      username: "xxx",
      userInfo: {
        username: "xxx",
        staffID: 1123,
        staffLevel: "lv 1",
        number:1
      }
    }
  },
  methods: {
    onClickMenuItem(key) {
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
    }
  }
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
