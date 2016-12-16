<template>
  <div>
    <div class="weeklt-title"><a  @click='openPicker' >{{weeklyNameByDate}}</a>
      <mt-switch v-model="editOrNot" v-show="canEdit"><span style="font-size:16px;" >{{editOrNotMsg}}</span></mt-switch>
    </div>
    <OneDay v-for="(item, index) in dateItem" :edit="editOrNot" :dayUserId="weeklyUserId" :init="oneDayInit" :dateStr="item" :colorIndex="index" :propOneDay="weeklyContent[index]" @change="weeklyContentE" @dataChange="setHasEdit" ></OneDay>
    <Paper v-if="editOrNot">
      <mt-field label="截止本周收费" v-model="WeeklyFee"  :class="{ 'error': !weeklyFeeTest }"  placeholder="请输入金额" type="number"></mt-field>
      <mt-field label="预计本月收费" v-model="MonthFee"  :class="{ 'error': !monthFeeTest }"  placeholder="请输入金额" type="number"></mt-field>
      <mt-cell :title="'项目汇报/下周工作计划：'">
      </mt-cell>
      <a class="mint-cell"  :class="{ 'error': !summaryTest }" >
        <div class="mint-cell-wrapper">
          <textarea label="项目汇报/下周工作计划" placeholder="项目汇报/下周工作计划" v-model="Summary" rows="5"></textarea>
        </div>
      </a>
      <div v-if="isBoss">
        <mt-cell :title="'团队建设计划：'">
        </mt-cell>
        <a class="mint-cell">
          <div class="mint-cell-wrapper">
            <textarea label="团队建设计划" placeholder="团队建设计划" :class="{ 'error': !planTest }" v-model="Plan" rows="5"></textarea>
          </div>
        </a>
      </div>
    </Paper>
    <Paper v-else >
      <wu-text :title="'截止本周收费:'" :value="WeeklyFee"></wu-text>
      <wu-text :title="'预计本月收费:'" :value="MonthFee"></wu-text>
      <wu-text :title="'项目汇报/下周工作计划:'" :value="Summary" :pre="true"></wu-text>
      <wu-text  v-if="isBoss" :title="'团队建设计划:'" :value="Plan" :pre="true"></wu-text>
    </Paper>
    <mt-button type="primary"  v-show="canEdit" size="large" @click="saveWeekly">保存周报</mt-button>
    <mt-datetime-picker
    v-model="date"
    ref="picker"
    type="date"
    year-format="{value} 年"
    month-format="{value} 月"
    date-format="{value} 日"
    @confirm="handleConfirm">
    </mt-datetime-picker>
</div>
</template>
<script>
  import Paper from '../paper/paper'
  import WuText from '../paper/text'
  import OneDay from './oneDay'
  import { MessageBox, Toast, Indicator } from 'mint-ui'
  export default {
    name: 'weekly-detail',
    components: {
      'wu-text': WuText,
      OneDay,
      Paper
    },
    computed: {
      editOrNotMsg () {
        return this.editOrNot ? '编辑' : '预览'
      },
      weeklyNameByDate () {
        return this.getWeekCountByDate()
      },
      isBoss () {
        return this.roleId === '1'
      },
      needTest () {
        return new Date() > this.strToDate(this.dateItem[4]) && this.canEdit
      },
      weeklyFeeTest () {
        return !this.needTest || (this.needTest && this.WeeklyFee !== '' && this.WeeklyFee !== null)
      },
      monthFeeTest () {
        return !this.needTest || (this.needTest && this.MonthFee !== '' && this.MonthFee !== null)
      },
      summaryTest () {
        return !this.needTest || (this.needTest && this.Summary.length > 0)
      },
      planTest () {
        return !this.isBoss || !this.needTest || (this.needTest && this.Plan.length > 0)
      }
    },
    data () {
      return {
        dateItem: [],
        WeeklyId: '',
        WeeklyFee: '', // 截止本周收费
        MonthFee: '', // 预计本月收费
        Summary: '', // 项目汇报/下周工作计划
        Plan: '', // 团队建设计划
        weeklyContent: [],
        oneDayInit: false, // 单日组件是否已经初始化第一个数据
        WeekIdentified: '',
        Monday: '',
        Sunday: '',
        editOrNot: true,
        date: new Date(),
        weeklyDate: new Date(),
        hasEdit: false, // 判断是否编辑过
        canEdit: true,
        testSuccess: [true, true, true, true, true],
        dataSuccess: false,
        weeklyUserId: ''
      }
    },
    beforeRouteEnter (to, from, next) {
      next(vm => {
        let routeUserId = vm.$route.params.id
        if (routeUserId !== undefined && routeUserId.length > 31) {
          vm.weeklyUserId = routeUserId
        } else {
          vm.weeklyUserId = vm.userId
          vm.appTitle = '我的周报'
        }
        vm.weeklyChange()
      })
    },
    watch: {
      // 如果路由有变化，会再次执行该方法
      '$route': 'routeChange',
      editOrNot () {
        let now = this.hasEdit
        setTimeout(() => { this.hasEdit = now }) // 切换保证hasEdit不变
      }
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
      },
      setHasEdit () {
        if (this.canEdit) {
          this.hasEdit = true
        }
      },
      saveWeekly () { // 保存周报
        if (!this.dataSuccess) {
          Toast('请确保红色必填部分全部填充完成~')
          this.editOrNot = true
          return
        }
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
        this.loading('保存中...')
        this.$http.post('/api/WUApi/SaveWeeklyByWxId', data)
        .then(response => {
          console.log(response)
          this.loaded()
          let lastTime = this.strToDate(this.dateItem[4])
          let now = new Date()
          now.setDate(now.getDate() - now.getDay())
          this.editOrNot = false
          if (lastTime < now) {
            this.canEdit = false
          }
          this.hasEdit = false
        })
        .catch(error => {
          console.log(error)
          this.loaded()
        })
      },
      loading (text) {
        Indicator.open({
          text: text,
          spinnerType: 'fading-circle'
        })
      },
      loaded () {
        Indicator.close()
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
        this.loading('加载数据中...')
        let url = '/api/WUApi/GetWeeklyByUserIdAndIndent?userId=' + this.weeklyUserId + '&weekIdentified=' + this.getWeekIdentified(this.date)
        this.$http.get(url)
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
            Toast('本周还未填写周报')
          }
          if (this.WeekIdentified < this.getWeekIdentified(new Date()) || this.userId !== this.weeklyUserId) {
            this.editOrNot = false
            this.canEdit = false
          } else {
            this.editOrNot = true
            this.canEdit = true
          }
          this.weeklyDate = new Date(this.date)
          this.oneDayInit = true
          this.loaded()
          setTimeout(() => { this.hasEdit = false }, 200)
        })
        .catch(function (error) {
          this.loaded()
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
      strToDate (str) {
        let timeArray = str.replace(/[ -.:/]/g, '/').split('/')
        let time = new Date(timeArray[0], timeArray[1] - 1, timeArray[2])
        return time
      },
      getTrueDate (date) { // 把周日变成周六
        let dt = new Date(date)
        if (dt.getDay() === 0) {
          dt = new Date(dt - 24 * 60 * 60 * 1000)
        }
        return dt
      },
      weeklyContentE (index, OneDayContent, oneTestSuccess) { // 数据更新
        this.testSuccess[index] = oneTestSuccess
        this.weeklyContent[index] = OneDayContent
        this.testDaySuccess()
      },
      testDaySuccess () {
        let success = this.testSuccess[0] && this.testSuccess[1] && this.testSuccess[2] && this.testSuccess[3] && this.testSuccess[4] && this.weeklyFeeTest && this.monthFeeTest && this.planTest && this.summaryTest
        this.dataSuccess = success
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
  textarea.error{
    border-bottom: 1px solid #f44336;
  }
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