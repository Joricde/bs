<template>
  <a-layout>
    <a-typography :style="{ marginLeft: '30px', marginTop: '20px' }">
      <a-typography-text>
        <a-button primary @click="startSys">进入系统</a-button>
      </a-typography-text>
    </a-typography>
  </a-layout>
</template>

<script>

import LoginView from "@/views/Login.vue";
export default {
  name: "IndexView",
  components:{
    LoginView
  },
  methods:{
    startSys(){
      let that = this
      that.$router.push('/login')
    }
  }
}
</script>