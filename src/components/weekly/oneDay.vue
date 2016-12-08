<template>
  <div class="oneday">
    <div v-if="edit">
      <div class="oneday-title" :style="{ 'background-color': tColor[colorIndex]}" :class="{ 'show': tShow , 'only-title': !tShow }" @click="toggle">{{dateStr}}</div>
      <transition name="fade">
        <div class="oneday-body" v-show="show"  :style="{ 'border-color': tColor[colorIndex]}" >
          <mt-cell :title="'公司处理事务'">
            <mt-switch v-model="isCompanyTransaction" ></mt-switch>
          </mt-cell>
          <a class="mint-cell" v-show="isCompanyTransaction" >
            <div class="mint-cell-wrapper">
              <textarea label="公司处理事务" placeholder="公司处理事务" v-model="companyTransaction" rows="2"></textarea>
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
              <textarea label="其它" placeholder="其它" v-model="other" rows="2"></textarea>
            </div>
          </a>
          <div v-show="isVisitCustomer" class="oneday-value"  >
            <div v-show="isVisitCustomer">
              拜访客户
            </div>
          </div>
          <p v-show="false">{{WorkContent}}</p>
        </div>
      </transition>
    </div>
    <Paper v-else :title="dateStr" :hasTool="true">
      <div v-show="isCompanyTransaction">
        <label>公司处理事务：</label>
        <pre class="text">{{companyTransaction}}</pre>
      </div>
      <div v-show="isOther">
        <label>其它：</label>
        <pre class="text">{{other}}</pre>
      </div>
      <div v-show="isVisitCustomer">拜访</div>
    </Paper>
  </div>
</template>

<script>
  import Paper from '../paper/paper'
  export default {
    name: 'OneDay',
    components: {
      Paper
    },
    props: {
      dateStr: String,
      colorIndex: Number,
      edit: {
        type: Boolean,
        default: true
      },
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
        this.$emit('change', this.colorIndex, OneDayContent)
        return OneDayContent
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
        show: true,
        tShow: true
      }
    },
    methods: {
      toggle () {
        this.show = !this.show
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