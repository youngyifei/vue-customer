<template>
  <div class="oneday">
    <div v-if="edit">
      <div class="oneday-title" :style="{ 'background-color': color}" :class="{ 'show': tShow , 'only-title': !tShow }" @click="toggle"><span>{{dateStr}}</span><strong v-show="!TestSuccess" style="color:white">这是必填项</strong></div>
      <transition name="fade">
        <div class="oneday-body" v-show="show"  :style="{ 'border-color': color}" >
          <mt-cell :title="'公司处理事务'">
            <mt-switch v-model="isCompanyTransaction" ></mt-switch>
          </mt-cell>
          <a class="mint-cell" v-show="isCompanyTransaction" >
            <div class="mint-cell-wrapper">
              <textarea label="公司处理事务" placeholder="公司处理事务" :class="{ 'error': !CtransactionTest }" v-model="companyTransaction" rows="2"></textarea>
            </div>
          </a>
          <mt-cell :title="'拜访客户'">
            <mt-switch v-model="isVisitCustomer"></mt-switch>
          </mt-cell>
          <mt-cell :title="'其它'">
            <mt-switch v-model="isOther"></mt-switch>
          </mt-cell>
          <a class="mint-cell" v-show="isOther" >
            <div class="mint-cell-wrapper">
              <textarea label="其它" placeholder="其它" v-model="other" :class="{ 'error': !OtherTest }"  rows="2"></textarea>
            </div>
          </a>
          <div v-show="isVisitCustomer" class="oneday-value"  >
            <div v-show="isVisitCustomer">
              <div v-if="visitData.length > 0">
                <div class="visit" v-for="(li, index) in visitData" :class="{ 'odd': index % 2===1}">
                  <div class="visit-left">
                    <span>{{li.CustomerName}}</span><br>
                    <span>{{li.CompanyName}}</span>
                  </div>
                  <div class="visit-right">
                    <span>{{li.VisitTypeName}}</span><br>
                    <span>{{li.MethodName}}</span>
                  </div>
                </div>
              </div>
              <div v-else>{{visitloadText}}</div>
            </div>
          </div>
          <p v-show="false">{{WorkContent}}</p>
        </div>
      </transition>
    </div>
    <Paper v-else :title="dateStr" :hasTool="true">
      <wu-text v-show="isCompanyTransaction" :title="'公司处理事务：'" :value="companyTransaction" :pre="true"></wu-text>
      <wu-text v-show="isOther" :title="'其它：'" :value="other" :pre="true"></wu-text>
      <div v-show="isVisitCustomer">
        <label>拜访：</label>
        <div class="oneday-value" >
          <div v-if="visitData.length > 0">
            <div class="visit" v-for="(li, index) in visitData" :class="{ 'odd': index % 2===1}">
              <div class="visit-left">
                <span>{{li.CustomerName}}</span><br>
                <span>{{li.CompanyName}}</span>
              </div>
              <div class="visit-right">
                <span>{{li.VisitTypeName}}</span><br>
                <span>{{li.MethodName}}</span>
              </div>
            </div>
          </div>
          <div v-else>{{visitloadText}}</div>
        </div>
      </div>
    </Paper>
  </div>
</template>

<script>
  import Paper from '../paper/paper'
  import WuText from '../paper/text'
  export default {
    name: 'OneDay',
    components: {
      'wu-text': WuText,
      Paper
    },
    props: {
      dateStr: String,
      init: Boolean,
      colorIndex: Number,
      edit: {
        type: Boolean,
        default: true
      },
      dayUserId: String,
      propOneDay: {
        type: Object,
        default: function () {
          return {
            WeeklyId: '',
            Date: '',
            WorkType: '',
            WorkContent: '',
            Other: ''
          }
        }
      },
      pOther: {}
    },
    computed: {
      WorkContent () {
        let type = []
        let workStr = ''
        let otherStr = ''
        if (this.isCompanyTransaction) {
          type.push(1)
          workStr = this.companyTransaction
        }
        if (this.isVisitCustomer) {
          type.push(2)
        }
        if (this.isOther) {
          type.push(3)
          otherStr = this.other
        }
        let OneDayContent = {
          WeeklyId: '',
          Date: this.dateStr,
          WorkType: type.toString(),
          WorkContent: workStr,
          Other: otherStr
        }
        this.change(OneDayContent)
        return OneDayContent
      },
      NeedTest () { // 是否需要数据验证。如果不是编辑且日期不是当天或以前则不需要
        let timeArray = this.dateStr.replace(/[ -.:/]/g, '/').split('/')
        let time = new Date(timeArray[0], timeArray[1] - 1, timeArray[2])
        time = time.setDate(time.getDate() + 1) // +1是为了排除掉今天
        return this.edit && (new Date() > time || new Date().getDay() === 5)
      },
      CtransactionTest () { // 公司处理事务是否验证正确
        if (this.NeedTest && this.isCompanyTransaction) {
          return !(this.companyTransaction.trim().length === 0)
        } else {
          return true
        }
      },
      OtherTest () { // 其它是否验证正确
        if (this.NeedTest && this.isOther) {
          return !(this.other.trim().length === 0)
        } else {
          return true
        }
      },
      TestSuccess () { // 是否验证成功
        if (this.NeedTest) { // 如果不需要默认成功，若需要则至少选择一项且数据验证成功则成功否则失败
          if ((this.isCompanyTransaction || this.isVisitCustomer || this.isOther) && this.CtransactionTest && this.OtherTest) {
            return true
          } else {
            this.show = true
            return false
          }
        } else {
          return true
        }
      },
      color () {
        if (this.TestSuccess) {
          return this.tColor[this.colorIndex]
        } else {
          return '#f44336'
        }
      }
    },
    data () {
      return {
        isCompanyTransaction: this.propOneDay.WorkType.indexOf('1') > -1,
        isVisitCustomer: this.propOneDay.WorkType.indexOf('2') > -1,
        isOther: this.propOneDay.WorkType.indexOf('3') > -1,
        companyTransaction: this.propOneDay.WorkContent,
        other: this.propOneDay.Other,
        tColor: ['#D9D6CF', '#D5D9BA', '#D9D6CF', '#D5D9BA', '#D9D6CF'],
        visitData: [],
        visitloadText: '加载中...',
        hasLoadVisit: false,
        show: true,
        tShow: true
      }
    },
    methods: {
      toggle () {
        this.show = !this.show
      },
      change (data) {
        this.$emit('change', this.colorIndex, data, this.TestSuccess)
      },
      dataChange () {
        this.$emit('dataChange')
      },
      toLoadVisitData () {
        if (this.isVisitCustomer && !this.hasLoadVisit) {
          this.hasLoadVisit = true
          this.$http.get('/api/WUApi/GetWeeklyVisitList?userId=' + this.dayUserId + '&Date=' + this.dateStr)
          .then(response => {
            if (response.status === 200) {
              this.visitData = response.data
              if (this.visitData.length === 0) {
                this.visitloadText = '本日无拜访'
              }
            }
          })
          .catch(error => {
            console.log(error)
          })
        }
      },
      propChangeData () {
        this.isCompanyTransaction = this.propOneDay.WorkType.indexOf('1') > -1
        this.isVisitCustomer = this.propOneDay.WorkType.indexOf('2') > -1
        this.isOther = this.propOneDay.WorkType.indexOf('3') > -1
        this.companyTransaction = this.propOneDay.WorkContent
        this.other = this.propOneDay.Other
        this.visitData = []
        this.hasLoadVisit = false
        this.visitloadText = '加载中...'
        if (this.NeedTest && this.TestSuccess && this.edit) {
          this.show = false
        }
        this.toLoadVisitData()
      }
    },
    watch: {
      show () {
        if (!this.show) {
          setTimeout(() => {
            this.tShow = this.show
          }, 500)
        } else {
          this.tShow = this.show
        }
      },
      WorkContent () {
        this.dataChange()
      },
      init () { // 首次加载数据初始化。对拜访信息进行加载
        this.propChangeData()
      },
      dateStr () {
        this.propChangeData()
      },
      isVisitCustomer () {
        this.toLoadVisitData()
      }
    }
  }
</script>

<style scoped>
  div.visit{
    justify-content: space-between;
    display: flex;
  }
  div.visit-left{
    max-width:60%;
  }
  div.visit-right{
    max-width:40%;
  }
  div.visit.odd{
    background-color: #D9D6CF;
    margin:5px 0px;
    padding: 5px 3px
  }
  div.visit span{
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    max-width: 100%;
    display: inline-block;
  }
  textarea{
    border: 0px;
    width: 100%;
    min-height: 40px;
    font-size: inherit;
    margin-top: 5px;
  }
  textarea.error{
    border-bottom: 1px solid #f44336;
  }
	.fade-enter-active, .fade-leave-active {
  		transition: opacity .5s
	}
	.fade-enter, .fade-leave-active {
		  opacity: 0
	}
	.oneday{
		margin:5px 0px;
	}
	.show{
		border-radius: 5px 5px 0px 0px;
	}
	.only-title{
		border-radius: 5px 5px 5px 5px;
	}
	.oneday-body{
		border-color: #d0cfcf;
		border-style: solid;
		border-width: 0px 1px 1px 1px;
	}
	.oneday-title{
		background-color: #d0cfcf;
    justify-content: space-between;
    display: flex;
		padding: 10px 10px;
    margin-top: 12px;
	}
	.oneday-value{
		margin: 5px 5px;
		padding: 5px;
		-webkit-box-shadow: 0 1px 4px rgb(173,173,173);
	}
  pre.text{
    background-color: #f9f9f9;
    border-radius: 5px;
    padding: 2px 2px 2px 6px;
    white-space: pre-wrap;
    white-space: -moz-pre-wrap;
    white-space: -pre-wrap;
    white-space: -o-pre-wrap;
    word-wrap: break-word;
  }
</style>