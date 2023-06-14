<script>
import {defineComponent} from 'vue'

export default defineComponent({
  name: "ReportForms",
  props:["reqPath"],
  data(){
    return {
      columnsTemp:[
        {
          title:'时间',
          dataIndex:'time',
          sortable: {
            sortDirections: ['ascend', 'descend']
          }

        },
        {
          title:'内容',
          dataIndex:'content',
        },
      ],
      columnsData:[],
      cLoading: false
    }
  },
  created() {
    this.updateDept()

  },
  methods:{
    updateDept(){
      let that = this
      let u = ''
      if (that.reqPath.q==='staff')
        u = '/staff/dailyReport'
      else if (that.reqPath.q==='admin')
        u = '/admin/allRecord'
      console.log(u)
      if (u){
        that.cLoading = true
        that.$axios.post(u)
            .then((response) => {
              let res = response["data"]
              if (res.status === 200) {
                that.$message.success({
                  content: res["message"]
                })
                that.columnsData = []
                console.log(res)
                for (let re of res['data']) {
                  that.columnsData.push(re)
                }
                that.cLoading = false
              } else {
                that.$message.error(res["message"])
              }
            })
            .catch((error) => {
              that.$message.error("请求发送错误，请重试")
            })
      }else {
        that.$message.error("请求参数错误，请重试")
      }
    }
  }
})
</script>

<template>
  <a-card >
    <a-typography-title :heading="6">
      <a-button type="primary" @click="updateDept">更新数据</a-button>
    </a-typography-title>
    <a-table :columns="columnsTemp"
             :data="columnsData"
             table-layout-fixed
             :virtual-list-props="{height:300}"
             :pagination="false"
             style="margin-right: 5%"
             :loading="cLoading"
    />
  </a-card>
</template>

<style scoped>
.box-card {
  position: absolute;
  margin: auto auto auto auto;
  top: 10%;
  left: calc(max(15%, 200px));
  right: 15%;
  line-height: 20%;
}
</style>