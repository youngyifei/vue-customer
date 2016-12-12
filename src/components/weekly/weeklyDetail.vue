<template>
  <div>
    <div class="weeklt-title"><a  @click='openPicker' >{{weeklyNameByDate}}</a>
      <mt-switch v-model="editOrNot" v-show="canEdit"><span style="font-size:16px;" >{{editOrNotMsg}}</span></mt-switch>
    </div>
    <OneDay v-for="(item, index) in dateItem" :edit="editOrNot" :dateStr="item" :colorIndex="index" :propOneDay="weeklyContent[index]" @change="weeklyContentE" @dataChange="setHasEdit" ></OneDay>
    <Paper v-if="editOrNot">
      <mt-field label="截止本周收费" v-model="WeeklyFee" placeholder="请输入金额" type="number"></mt-field>
      <mt-field label="预计本月收费" v-model="MonthFee" placeholder="请输入金额" type="number"></mt-field>
      <mt-cell :title="'项目汇报/下周工作计划：'">
      </mt-cell>
      <a class="mint-cell">
        <div class="mint-cell-wrapper">
          <textarea label="项目汇报/下周工作计划" placeholder="项目汇报/下周工作计划" v-model="Summary" rows="5"></textarea>
        </div>
      </a>
      <div>
        <mt-cell :title="'团队建设计划：'">
        </mt-cell>
        <a class="mint-cell">
          <div class="mint-cell-wrapper">
            <textarea label="团队建设计划" placeholder="团队建设计划" v-model="Plan" rows="5"></textarea>
          </div>
        </a>
      </div>
    </Paper>
    <Paper v-else >
      <wu-text :title="'截止本周收费:'" :value="WeeklyFee"></wu-text>
      <wu-text :title="'预计本月收费:'" :value="MonthFee"></wu-text>
      <wu-text :title="'项目汇报/下周工作计划:'" :value="Summary" :pre="true"></wu-text>
      <wu-text :title="'团队建设计划:'" :value="Plan" :pre="true"></wu-text>
    </Paper>
    <mt-button type="primary"  v-show="canEdit" size="large" @click="saveWeekly">保存周报</mt-button>
    <mt-datetime-picker
    v-model="date"
    ref="picker"
    type="date"
    year-format="{value} 年"
    month-format="{value} 月"
    date-format="{value} 日"
    @confirm="handleConfirm">sss
    </mt-datetime-picker>
</div>
</template>
<script>
  import Paper from '../paper/paper'
  import WuText from '../paper/text'
  import OneDay from './oneDay'
  import { MessageBox, Toast } from 'mint-ui'
  export default {
    name: 'weekly-detail',
    components: {
      'wu-text': WuText,
      OneDay,
      Paper
    },
    computed: {
      editOrNotMsg () {
        return this.editOrNot ? '编辑' : '查看'
      },
      weeklyNameByDate () {
        return this.getWeekCountByDate()
      }
    },
    data () {
      return {
        dateItem: [],
        WeeklyId: '',
        WeeklyFee: null, // 截止本周收费
        MonthFee: null, // 预计本月收费
        Summary: '', // 项目汇报/下周工作计划
        Plan: '', // 团队建设计划
        weeklyContent: [],
        WeekIdentified: '',
        Monday: '',
        Sunday: '',
        editOrNot: true,
        date: new Date(),
        weeklyDate: new Date(),
        hasEdit: false, // 判断是否编辑过
        canEdit: true
      }
    },
    beforeRouteEnter (to, from, next) {
      console.log(to.params.id)
      next(vm => {
        vm.weeklyChange()
      })
    },
    watch: {
      // 如果路由有变化，会再次执行该方法
      '$route': 'routeChange'
    },
    methods: {
      routeChange () {
        console.log(this.$route.params.id)
      },
      initWeeklyData (data) {
        this.WeeklyId = data.Weekly.Id
        this.weeklyNameByDate = data.Weekly.Title
        this.Summary = data.Weekly.Summary
        this.Plan = data.Weekly.Plan
        this.WeeklyFee = data.Weekly.WeeklyFee
        this.MonthFee = data.Weekly.MonthFee
        this.Monday = data.Weekly.Monday
        this.Sunday = data.Weekly.Sunday
        this.WeekIdentified = data.Weekly.WeekIdentified
        this.weeklyContent = data.WeeklyContent
        if (this.WeekIdentified < this.getWeekIdentified(new Date())) {
          this.editOrNot = false
          this.canEdit = false
        } else {
          this.editOrNot = true
          this.canEdit = true
        }
      },
      setHasEdit () {
        if (this.canEdit) {
          this.hasEdit = true
        }
      },
      saveWeekly () { // 保存周报
        let data = {
          WxId: this.wxId,
          Weekly: {
            Id: this.WeeklyId,
            Title: this.weeklyNameByDate,
            Summary: this.Summary,
            Plan: this.Plan,
            WeeklyFee: this.WeeklyFee,
            MonthFee: this.MonthFee,
            Monday: this.Monday,
            Sunday: this.Sunday,
            WeekIdentified: this.WeekIdentified
          },
          WeeklyContent: this.weeklyContent
        }
        this.$http.post('/api/WUApi/SaveWeeklyByWxId', data)
        .then(function (response) {
          console.log(response)
        })
        .catch(function (error) {
          console.log(error)
        })
      },
      openPicker () {
        this.$refs.picker.open()
      },
      handleConfirm () { // 时间变更
        let indent = this.getWeekIdentified(this.date)
        if (this.hasEdit) {
          if (indent !== this.WeekIdentified) {
            MessageBox.confirm('检测到您对周报做了修改，并未保存，确定要放弃修改?').then(action => {
              this.weeklyChange()
            })
            .catch(action => {
            })
          }
        } else {
          if (indent !== this.WeekIdentified) {
            this.weeklyChange()
          }
        }
      },
      weeklyChange () {
        this.$http.get('/api/WUApi/GetWeeklyByWxIdAndIndent?wxId=' + this.wxId + '&weekIdentified=' + this.getWeekIdentified(this.date))
        .then(response => {
          if (response.data !== '1') {
            this.initWeeklyData(response.data)
          } else {
            this.WeeklyId = ''
            this.Summary = ''
            this.Plan = ''
            this.WeeklyFee = ''
            this.MonthFee = ''
            this.weeklyContent = []
            this.editOrNot = true
            this.canEdit = true
            Toast('您本周还未填写周报，请填写~')
          }
          this.weeklyDate = new Date(this.date)
          setTimeout(() => { this.hasEdit = false }, 200)
        })
        .catch(function (error) {
          Toast(error)
        })
      },
      getWeekCountByDate () { // 序列化“xxxx年xx月第x周周报” ,并序列化出dateItem
        let dt = this.getTrueDate(this.weeklyDate)
        let weekNo = this.getMonthAndWeekNo(dt)
        // 说明是上个月的,于是计算上个月最后一天是上个月的第几周
        if (weekNo === 0) {
          weekNo = this.getMonthAndWeekNo(this.getTrueDate(dt.setDate(0)))
        }
        var title = dt.getFullYear() + '年' + (dt.getMonth() - 0 + 1) + '月第' + weekNo + '周周报'
        let month = dt.getMonth() - 0 + 1
        if (month < 10) {
          month = '0' + month
        }
        this.WeekIdentified = dt.getFullYear() + '' + month + weekNo
        let dt1 = new Date(dt)
        dt1.setDate(dt1.getDate() - dt1.getDay() + 1)
        this.Monday = this.dateFormat(dt1)
        this.dateItem = [
          this.Monday,
          this.dateFormat(dt1.setDate(dt1.getDate() + 1)),
          this.dateFormat(dt1.setDate(dt1.getDate() + 1)),
          this.dateFormat(dt1.setDate(dt1.getDate() + 1)),
          this.dateFormat(dt1.setDate(dt1.getDate() + 1))
        ]
        dt1.setDate(dt1.getDate() + 3)
        this.Sunday = this.dateFormat(dt1)
        return title
      },
      getWeekIdentified (date) { // 根据时间获取当周的唯一标识，例'2016051'标识2016年5月第一周
        let dt = this.getTrueDate(date)
        let weekNo = this.getMonthAndWeekNo(dt)
        // 说明是上个月的,于是计算上个月最后一天是上个月的第几周
        if (weekNo === 0) {
          weekNo = this.getMonthAndWeekNo(this.getTrueDate(dt.setDate(0)))
        }
        let month = dt.getMonth() - 0 + 1
        if (month < 10) {
          month = '0' + month
        }
        return dt.getFullYear() + '' + month + weekNo
      },
      dateFormat (date) { // 序列化时间为 yyyy-MM-dd
        let dt = new Date(date)
        let day = dt.getDate() < 10 ? '0' + dt.getDate() : dt.getDate()
        return dt.getFullYear() + '-' + (dt.getMonth() - 0 + 1) + '-' + day
      },
      getTrueDate (date) { // 把周日变成周六
        let dt = new Date(date)
        if (dt.getDay() === 0) {
          dt = new Date(dt - 24 * 60 * 60 * 1000)
        }
        return dt
      },
      weeklyContentE (index, OneDayContent) { // 数据更新
        this.weeklyContent[index] = OneDayContent
      },
      getMonthAndWeekNo (dateTime) { // 返回属本月第几周
        let dt = new Date(dateTime)
        let first = new Date(dt.getFullYear(), dt.getMonth(), 1)
        let xishu = first.getDay() - 2
        let weekNo = parseInt((dt.getDate() + xishu) / 7)
        if (first.getDay() < 2) {
          weekNo++
        }
        if (first.getDay() === 0 && dt.getDate() === 1) {
          weekNo = 0
        }
        return weekNo // 返回属本月第几周
      }
    }
  }
</script>
<style scoped>
  textarea{
    border: 0px;
    width: 100%;
    min-height: 40px;
    font-size: inherit;
    margin-top: 5px;
  }
  .weeklt-title{
    font-size: 18px;
    justify-content: space-between;
    display: flex;
    align-items: center;
  }
  .show-p{
    justify-content: space-between;
    display: flex;
    align-items: center;
  }
</style>