<template>
    <div class="Popup">
        <el-dialog :title="titleName" :visible.sync="editVisible" width="700px"  :close-on-click-modal="false">
            <el-container>
                <el-main>
                    <div class="information">
                        <div class="news-noe">
                            <div class="title">
                                <div class="left">- 余额信息</div>
                            </div>
                            <div class="nav">
								<div class="line">
								    <div class="line-center">
								        <div class="name">账户余额：</div>
								        <el-input
								            size="small"
								            v-model="bean.fBalance"
								            style="width:180px"
											:disabled="true"
								        ></el-input>
								    </div>
								</div>
							</div>
                        </div>
                        <div class="news-two">
                            <div class="title">
                                <div class="left">- 提现信息</div>
                            </div>
                            <div class="nav">
								<div class="line">
								    <div class="line-center">
								        <div class="name required">提现金额：</div>
								        <el-input
								            size="small"
								            v-model="money"
								            style="width:180px"
											placeholder="请输入提现金额"
											@input="moneyChange"
											ref="moneyInputRef"
											maxlength="12"
								        ></el-input>
								    </div>
								</div>
								<div class="line" style="padding-top: 10px;">
								    <div class="line-center">
								    	<div class="name required">资金密码：</div>
								    	<el-input
								    		size="small"
								    		v-model="moneyPwd"
								    		style="width:180px"
											type="password"
											auto-complete="new-password"
											placeholder="请输入资金密码"
											maxlength="32"
								    	></el-input>
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
import pwdmd5 from '../../../../assets/js/pwdmd5.js';
export default {
    data() {
        return {
            editVisible: false,
			moneyPwd:'',
			bean:{},
			banks:[],
			titleName: '',
			accountInput:false,
			submitting:false,
			money:'',
        };
    },
    mounted() {
        // console.log(this.editVisible);
    },
    methods: {
       async receipt(index, row) {
            this.editVisible = true;
			this.submitting=false;
			this.moneyPwd = '';
			this.money='';
            let popup1 = this.$store.state.Popup.popup1;
			this.bean = popup1;
			this.titleName='交易中心提现';
        },
		change (e) {
		      this.$forceUpdate()
		},
        //取消事件
        cancel() {
            this.editVisible = false;
        },
		moneyChange(){
			var regu = /^[0-9]+\.?[0-9]*$/;
			if (this.money&&!regu.test(this.money)) {
				let val = this.money.substring(0, this.money.length - 1);
				if(isNaN(val)){
					this.money = '';
				}else{
					this.money = val;
				}
				this.$refs.moneyInputRef.$el.children[0].focus();
			}
		},
        //确定事件
        async determine() {
			let bean = this.bean;
			if(!this.checkSubmit(bean)){
				return;
			}
			let obj = {};
			obj.amt=this.money;
			obj.mpwd=pwdmd5(bean.fCode+"_"+this.moneyPwd);
			obj.bcd = bean.fBankCode;
			this.submitting=true;
            let result = await request('/fund/withdraw/center/withdraw', obj);
            this.submitting=false;
            if(result.data>=0){
            	this.editVisible = false;
            	this.$message.success("提现成功");
				this.$parent.getData();
            }else if(!commonUtils.isEmpty(result.errMsg)){
				this.$message.error(result.errMsg);
			}else{
				this.$message.error("操作失败");
			}
        },
		checkSubmit(bean){
			if(commonUtils.isEmpty(this.money)){
				this.$message.error("请输入提现金额");
				return false;
			}
			if(isNaN(this.money)){
				this.$message.error("提现金额有误，须是数字");
				return false;
			}
			this.money = parseFloat(this.money);
			if(this.money<=0){
				this.$message.error("提现金额有误，提现金额须大于0");
				return false;
			}
			let balance = parseFloat(bean.fBalance);
			if(this.money>balance){
				this.$message.error("提现金额有误，提现金额不能超过余额");
				return false;
			}
			if(commonUtils.isEmpty(this.moneyPwd)){
				this.$message.error("请输入资金密码");
				return false;
			}
			return true;
		}
    }
};
</script>

