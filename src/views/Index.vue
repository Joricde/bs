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
        <a-menu-item key="02" v-if="!isAdmin">
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
        <router-view></router-view>
        <a-layout-footer></a-layout-footer>
      </a-layout>
    </a-layout>
  </a-layout>
</template>
<script>

export default {
  name: "IndexView",
  data() {
    return {
      username: "xxx",
      isAdmin:false,
    }
  },
  created() {
    let that = this
    that.isAdmin = that.$store.state.staffData.name.length <= 0
  },
  methods: {
    onClickMenuItem(key) {
      let that = this
      if (that.isAdmin){
        that.$router.push('/admin')
      }else {
        if (key === "01")
          that.$router.push('/staff')
        else
          that.$router.push('/profile')

      }

    },
    logout() {
      let that = this
      that.$store.commit('clearState')
      that.$router.push('/login')
    },
  },
};
</script>
<style scoped>
.layout-demo {
  height: 96vh;
  width: calc(max(600px, 95%));
  position: absolute;
  left: calc(min(30px, 5%));
  top: calc(min(15px, 3%));
//right: calc(min(30px,5%)); background: var(--color-fill-2); border: 1px solid var(--color-border);
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


.grid-demo .arco-col > div {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
</style>
