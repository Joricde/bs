<template>
  <a-layout style="padding: 0 24px;">
    <a-breadcrumb :style="{ margin: '16px 0' }">
    </a-breadcrumb>
    <a-layout-content>
      <a-space direction="vertical" size="large" fill :style="{ marginLeft: '50px', marginTop: '50px' }">

        <a-typography :style="{ marginLeft: '30px', marginTop: '20px' }">
          <a-typography-text>
            您好：{{ username }}管理员
          </a-typography-text>
        </a-typography>
        <a-space direction="vertical" size="small" fill>
          <a-typography-title :heading="6">
            {{ '雇员管理：' }}
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
          <a-typography-title :heading="6">
            {{ '总报表：' }}
            <a-button type="primary" @click="generateReport">查询</a-button>
          </a-typography-title>
        </a-space>

      </a-space>
    </a-layout-content>
    <a-layout-footer></a-layout-footer>
  </a-layout>
</template>
<script>


export default {
  name: "AdminView",
  data() {
    return {
      username: "xxx",
      userInfo: {
        username: "xxx",
        staffID: "1123",
        staffLevel: "lv 1",
        number: 1
      },
      customStyle: {
        borderRadius: '6px',
        marginBottom: '18px',
        border: 'none',
        overflow: 'hidden',
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
        {
          title: '所属领导',
          dataIndex: 'leader',
          sortable: {
            sortDirections: ['ascend', 'descend']
          }
        }
      ]

    }
  },
  created() {
    this.getDeptStaff()
  },
  methods: {
    logout() {
      let that = this
      that.$store.commit('clearState')
      that.$router.push('/login')

    },
    getDeptStaff() {
      let that = this
      console.log(that.$store.state.staffData.staffLevel)
      if (that.$store.state.staffData.staffLevel > 0)
        that.columnLoading = true
      that.$axios.post("/admin/queryStaff")
          .then((response) => {
            let res = response["data"]
            console.log(res['data'])
            if (res.status === 200) {
              that.$message.success({
                content: res["message"]
              })
              that.staffInfo = []
              let l = 0
              for (let s of res['data']) {
                l = s.staffLevel === 0 ? '员工' : s.staffLevel === 1 ? '经理' : '主管'
                s.staffLevel = l
                that.staffInfo.push(s)
              }
              that.userInfo.number = that.staffInfo.length
            } else {
              that.$message.error(res["message"])
            }
          })
          .catch((error) => {
            that.$message.error("请求发送错误，请重试")
          })
      setTimeout(() => {
        that.columnLoading = false
      }, 1000);

    },
    generateReport() {
      let that = this
      that.$router.push({
        path: '/report',
        query: {
          q: 'admin'
        }
      })
    },
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
