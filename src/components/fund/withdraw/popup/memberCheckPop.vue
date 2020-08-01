<template>
    <div class="Popup">
        <el-dialog :title="titleName" :visible.sync="editVisible" width="700px" :close-on-click-modal="false">
            <el-container>
                <el-main>
                    <div class="information">
                        <div class="news-noe">
                            <div class="title">
                                <div class="left">- 收款人信息</div>
                            </div>
                            <div class="nav">
								<div class="line">
								    <div class="line-center">
								        <div class="name required">运营商编号：</div>
								        <el-input
								            size="small"
								            v-model="bean.fDealerCode"
								            style="width:180px"
											:disabled="true"
								        ></el-input>
								    </div>
									<div class="line-center">
									    <div class="name required">运营商简称：</div>
									    <el-input
									        size="small"
									        v-model="bean.fDealerName"
									        style="width:180px"
											:disabled="true"
									    ></el-input>
									</div>
								</div>
								<div class="line">
								    <div class="line-center">
								        <div class="name required">收款银行：</div>
								        <el-input
								            size="small"
								            v-model="bean.fBankNameRel"
								            style="width:180px"
								        	:disabled="true"
								        ></el-input>
								    </div>
								</div>
								
                                <div class="line">
                                    <div class="line-center">
                                        <div class="name required">收款银行卡号：</div>
                                        <el-input
                                            size="small"
                                            v-model="bean.fBankAccount"
                                            style="width:180px"
											:disabled="true"
                                        ></el-input>
									</div>
									<div class="line-center">
									    <div class="name required">收款人名称：</div>
									    <el-input
									        size="small"
									        v-model="bean.fAccountName"
									        style="width:180px"
											:disabled="true"
									    ></el-input>
									</div>
							    </div>
							</div>
                        </div>
                        <div class="news-three">
                            <div class="title">
                                <div class="left">- 审核</div>
                            </div>
                            <div class="nav">
								<div class="line">
								    <div class="line-center">
								        <div class="name required">提现流水号：</div>
								        <el-input
								            size="small"
								            v-model="bean.fIoCode"
								            style="width:180px"
											:disabled="true"
								        ></el-input>
								    </div>
									<div class="line-center">
										<div class="name required">出金金额：</div>
										<el-input
											size="small"
											v-model="bean.fFundIo"
											style="width:180px"
											:disabled="true"
										></el-input>
									</div>
								</div>
								<div class="line" style="padding-top: 10px;">
								    <div class="line-center">
								        <div class="name">备注：</div>
								        <el-input
								        	size="small"
								        	placeholder="请输入出金备注"
								        	v-model="fAuditRemark"
								        	type="textarea"
											maxlength="64"
											rows="8"
											cols="68"
								        ></el-input>
								    </div>
								</div>
                            </div>
                        </div>
                    </div>
                </el-main>
                <el-footer>
                    <el-button size="small" @click="determine('pass')" :disabled="submitting">通过</el-button>
                    <el-button size="small" @click="determine('unpass')" :disabled="submitting">不通过</el-button>
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
            confirmLoginPwd: '',
            confirmMoneyPwd: '',
			loginPwd:'',
			moneyPwd:'',
			bean:{},
			banks:[],
			titleName: '',
			accountInput:false,
			submitting:false,
			fAuditRemark:'',
        };
    },
    mounted() {
        // console.log(this.editVisible);
    },
    methods: {
       async receipt(index, row) {
            this.editVisible = true;
			this.submitting=false;
			this.selectedCitys = [];
            let popup1 = this.$store.state.Popup.popup1;
			this.bean = popup1;
			this.titleName='出金审核';
			this.fAuditRemark='';
        },
		change (e) {
		      this.$forceUpdate()
		},
        //取消事件
        cancel() {
            this.editVisible = false;
        },
        //确定事件
        async determine(opType) {
			if(opType!='pass'&&opType!='unpass'){
				this.$message.error("未知的操作类型");
				return false;
			}
			let bean = this.bean;
			if(!this.checkSubmit(bean)){
				return;
			}
			let obj = {};
			obj.aid=bean.fId;
			obj.rst=opType=='pass'?2:3;
			obj.rmk=this.fAuditRemark;
			this.submitting=true;
            let result = await request('/fund/withdraw/auditOutPayment', obj);
            this.submitting=false;
            if(result.data>=0){
            	this.editVisible = false;
            	if(opType!='unpass'){
            		this.$message.success("审核成功");
            	}
				this.$parent.getData();
            }else if(!commonUtils.isEmpty(result.errMsg)){
				this.$message.error(result.errMsg);
			}else{
				this.$message.error("操作失败");
			}
        },
		checkSubmit(bean){
			if(!commonUtils.isEmpty(this.fAuditRemark)&&this.fAuditRemark.length>64){
				this.$message.error("备注太长了，不能超过64个字符");
				return false;
			}
			return true;
		}
    }
};
</script>

