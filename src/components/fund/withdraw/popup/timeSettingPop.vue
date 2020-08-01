<template>
    <div class="Popup">
        <el-dialog :title="titleName" :visible.sync="editVisible" width="700px" :close-on-click-modal="false">
            <el-container>
                <el-main>
                    <div class="information">
                        <div class="news-noe">
                            <div class="title">
                                <div class="left">- 信息修改</div>
                            </div>
                            <div class="nav">
								<div class="line">
								    <div class="line-center">
								        <div class="name">平台类型：</div>
								        <el-select
								            v-model="bean.fAccountType"
								            :disabled="true"
											style="width:180px"
								        >
								            <el-option key="1" label="交易商" value="1"></el-option>
								            <el-option key="2" label="交易员" value="2"></el-option>
								        </el-select>
								    </div>
								</div>
								<div class="line">
								    <div class="line-center">
								        <div class="name required">星期：</div>
								        <el-input
								            size="small"
								            v-model="fWeekDay"
								            style="width:180px"
											:disabled="true"
								        ></el-input>
								    </div>
								</div>
								<div class="line">
								    <div class="line-center">
								        <div class="name required">是否启用：</div>
								        <el-select
								            v-model="bean.fStatus"
											style="width:180px"
								        >
								            <el-option key="1" label="启用" value="1"></el-option>
								            <el-option key="2" label="禁用" value="2"></el-option>
								        </el-select>
								    </div>
								</div>
								<div class="line">
								    <div class="line-center">
								        <div class="name required">开始时间：</div>
								        <el-time-picker
								            size="small"
								            v-model="fStartTime"
								            style="width:180px"
											placeholder="请选择开始时间"
								        ></el-time-picker>
								    </div>
								</div>
								<div class="line">
								    <div class="line-center">
								        <div class="name required">结束时间：</div>
								        <el-time-picker
								            size="small"
								            v-model="fEndTime"
								            style="width:180px"
											placeholder="请选择结束时间"
								        ></el-time-picker>
								    </div>
								</div>
							</div>
                        </div>
                    </div>
                </el-main>
                <el-footer>
                    <el-button size="small" @click="determine" :disabled="submitting">确定</el-button>
                    <el-button size="small" @click="cancel" >取消</el-button>
                </el-footer>
            </el-container>
        </el-dialog>
    </div>
</template>
<style>
	.required:before {
		content: '* ';
		color: red;
	}
</style>
<script>
import '../../../../assets/css/popup/popup.css';
import request from '../../../../assets/Public/request.js';
import commonUtils from '../../../../utils/commonUtils.js';

export default {
    data() {
        return {
            editVisible: false,
			bean:{},
			fWeekDays:["","一","二","三","四","五","六","日"],
			titleName: '',
			accountInput:false,
			submitting:false,
			fWeekDay:'',
			fStartTime:'',
			fEndTime:''
        };
    },
    mounted() {
        // console.log(this.editVisible);
    },
    methods: {
       async receipt(index, row) {
            this.editVisible = true;
			this.submitting=false;
            let popup1 = this.$store.state.Popup.popup1;
			this.bean = popup1;
			this.titleName='修改出入金时间';
			this.fWeekDay=this.fWeekDays[this.bean.fWeekDay];
			if(this.bean.fAccountType){
				this.bean.fAccountType+='';
			}
			if(this.bean.fStatus){
				this.bean.fStatus+='';
			}
			var stimes = this.bean.fStartTime.split(":");
			var etimes = this.bean.fEndTime.split(":");
			this.fStartTime = new Date(2020,1,1,stimes[0],stimes[1],stimes[2]);
			this.fEndTime = new Date(2020,1,1,etimes[0],etimes[1],etimes[2]);
        },
		formatDate(date){
			var seperator2 = ":";
			var hours = date.getHours();
			var minutes = date.getMinutes();
			var seconds = date.getSeconds();
			//时
			if (hours >= 0 && hours <= 9) {
				hours = "0" + hours;
			}
			//分
			if (minutes >= 0 && minutes <= 9) {
				minutes = "0" + minutes;
			}
			//秒
			if (seconds >= 0 && seconds <= 9) {
				seconds = "0" + seconds;
			}
			return hours + seperator2 + minutes + seperator2 + seconds;
		},
		change (e) {
		      this.$forceUpdate()
		},
        //取消事件
        cancel() {
            this.editVisible = false;
        },
        //确定事件
        async determine() {
			let bean = this.bean;
			if(!this.checkSubmit(bean)){
				return;
			}
			bean.fStartTime=(this.formatDate(this.fStartTime));
			bean.fEndTime=(this.formatDate(this.fEndTime));
			this.submitting=true;
            let result = await request('/fund/withdraw/setting/updateTimeSetting', bean);
            this.submitting=false;
            if(result.data>=0){
            	this.editVisible = false;
            	this.$message.success("修改成功");
				this.$parent.getData();
            }else if(!commonUtils.isEmpty(result.errMsg)){
				this.$message.error(result.errMsg);
			}else{
				this.$message.error("操作失败");
			}
        },
		checkSubmit(bean){
			if(commonUtils.isEmpty(bean.fAccountType)){
				this.$message.error("请选择是否启用");
				return false;
			}
			if(commonUtils.isEmpty(this.fStartTime)){
				this.$message.error("请选择开始时间");
				return false;
			}
			if(commonUtils.isEmpty(this.fEndTime)){
				this.$message.error("请选择结束时间");
				return false;
			}
			return true;
		}
    }
};
</script>

