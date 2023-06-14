<script>
import {defineComponent} from 'vue'
import {Message} from "@arco-design/web-vue";
export default defineComponent({
  name: "ProfileView",
  data() {
    return {
      userInfo: {
        username: "xxx",
        staffId: '1123123',
        staffLevel: 0,
        staffLevelShow:'',
        number: 0
      },
      staffInfo: [],
      columnLoading: false,
      columnsTemp: [
        {
          title: '姓名',
          dataIndex: 'name',
          sortable: {
            sortDirections: ['ascend', 'descend']
          }
        },
        {
          title: '员工ID',
          dataIndex: 'staffId',
          sortable: {
            sortDirections: ['ascend', 'descend']
          }
        },
        {
          title: '员工等级',
          dataIndex: 'staffLevel',
          sortable: {
            sortDirections: ['ascend', 'descend']
          }
        },
      ]

    }
  },

  mounted() {
    let that = this
    that.userInfo.username = that.$store.state.staffData.name
    that.userInfo.staffID = that.$store.state.staffData.staffId
    that.userInfo.staffLevel = Number(that.$store.state.staffData.staffLevel)
    that.userInfo.staffLevelShow = (() => {
      let a = Number(that.$store.state.staffData.staffLevel)
      return a === 0 ? '员工' : a === 1 ? '经理' : '主管'
    })()
    that.userInfo.number = that.$store.state.staffData.number
    if (that.userInfo.staffLevel > 0) {
      that.getDeptStaff()
    }
  },
  methods: {
    generateReport() {
      let that = this
      that.$router.push({
        path:'/report',
        query:{
          q:'staff'
        }
      })
    },
    getDeptStaff() {
      let that = this
        that.columnLoading = true
      that.$axios.post("/staff/deptStaff")
          .then((response) => {
            let res = response["data"]
            if (res.status === 200) {
              that.$message.success({
                content: res["message"]
              })
              that.staffInfo = []
              let l = 0
              for (let s of res['data']['staff']) {
                l = s.staffLevel === 0 ? '员工' : s.staffLevel === 1 ? '经理' : '主管'
                s.staffLevel = l
                that.staffInfo.push(s)
              }
              that.userInfo.number = that.staffInfo.length
              setTimeout(() => {
                that.columnLoading = false
              }, 300);
            } else {
              that.$message.error(res["message"])
            }
          })
          .catch((error) => {
            that.$message.error("请求发送错误，请重试")
          })
    },

  },
})
</script>

<template>
  <a-layout-content>
    <a-space direction="vertical" size="large" fill :style="{ marginLeft: '50px', marginTop: '50px' }">
      <a-descriptions size="large" title="用户信息" :column="1">
        <a-descriptions-item label="用户名">
          <a-tag>{{ userInfo.username }}</a-tag>
        </a-descriptions-item>
        <a-descriptions-item label="工号">
          <a-tag>{{ userInfo.staffID }}</a-tag>
        </a-descriptions-item>
        <a-descriptions-item label="员工等级">
          <a-tag>{{ userInfo.staffLevelShow }}</a-tag>
        </a-descriptions-item>
        <a-descriptions-item label="今日报表">
          <a-tag checkable color="arcoblue" :default-checked="true" @check="generateReport">
            生成报表
          </a-tag>
        </a-descriptions-item>
      </a-descriptions>
        <a-space direction="vertical" size="small" fill v-if="userInfo.staffLevel>0">
          <a-typography-title :heading="6">
            {{ '管理部门：共' + userInfo.number + '人' }}
            <a-button type="primary" @click="getDeptStaff">查询</a-button>
          </a-typography-title>
          <a-table :columns="columnsTemp"
                   :data="staffInfo"
                   column-resizable
                   table-layout-fixed
                   :virtual-list-props="{height:300}"
                   :pagination="false"
                   style="margin-right: 5%"
                   :loading="columnLoading"
          />
        </a-space>
    </a-space>
  </a-layout-content>
</template>

<style scoped>

</style>