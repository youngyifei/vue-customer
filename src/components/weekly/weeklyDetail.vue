<template>
  <div>
    <div class="weeklt-title"><a  @click='openPicker' >{{weeklyNameByDate}}</a>
      <mt-switch v-model="editOrNot"><span style="font-size:16px;" >{{editOrNotMsg}}</span></mt-switch>
    </div>
    <OneDay v-for="(item, index) in dateItem" :edit="editOrNot" :dateStr="item" :colorIndex="index" :propOneDay="weeklyContent[index]" @change="weeklyContentE" ></OneDay>
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
    <mt-button type="primary" size="large">保存周报</mt-button>
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
        dateItem: ['2016-12-05', '2016-12-06', '2016-12-07', '2016-12-08', '2016-12-09'],
        WeeklyFee: null, // 截止本周收费
        MonthFee: null, // 预计本月收费
        Summary: '', // 项目汇报/下周工作计划
        Plan: '', // 团队建设计划
        weeklyContent: [],
        editOrNot: true,
        date: new Date(),
        weeklyDate: new Date()
      }
    },
    methods: {
      openPicker () {
        this.$refs.picker.open()
      },
      handleConfirm () {
        this.weeklyDate = new Date(this.date)
      },
      getWeekCountByDate () {
        let dt = this.getTrueDate(this.weeklyDate)
        let weekNo = this.getMonthAndWeekNo(dt)
        // 说明是上个月的,于是计算上个月最后一天是上个月的第几周
        if (weekNo === 0) {
          weekNo = this.getMonthAndWeekNo(this.getTrueDate(dt.setDate(0)))
        }
        var title = dt.getFullYear() + '年' + (dt.getMonth() - 0 + 1) + '月第' + weekNo + '周周报'
        return title
      },
      getTrueDate (date) {
        let dt = new Date(date)
        if (dt.getDay() === 0) {
          dt = new Date(dt - 24 * 60 * 60 * 1000)
        }
        return dt
      },
      weeklyContentE (index, OneDayContent) {
        this.weeklyContent[index] = OneDayContent
        console.log(this.weeklyContent)
      },
      getMonthAndWeekNo (dateTime) {
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