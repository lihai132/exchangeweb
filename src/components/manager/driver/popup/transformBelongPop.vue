<template>
    <div class="Popup">
        <el-dialog title="司机转移" :visible.sync="editVisible" width="700px"  :close-on-click-modal="false">
            <el-container>
                <el-main>
                    <div class="information">
                        <div class="news-noe">
                            <div class="title">
                                <div class="left">- 司机信息</div>
                            </div>
                            <div class="nav">
								<div class="line">
								    <div class="line-center">
								        <div class="name required">所属运营商：</div>
								        <el-select
								            size="small"
								            v-model="bean.fMemberId"
											:disabled="bean.fTraderId>0"
											filterable
								        >
										<el-option
										      v-for="item in members"
										      :key="item.fDealerId"
										      :label="item.dealerCodeName"
										      :value="item.fDealerId">
										    </el-option>
										</el-select>
								    </div>
								</div>
                                <div class="line">
                                    <div class="line-center">
                                        <div class="name">所属机构：</div>
                                        <el-select
                                            size="small"
                                            v-model="bean.fOrgId"
											:disabled="bean.fTraderId>0"
                                        	filterable
                                        >
                                        <el-option
                                              v-for="item in orgs"
                                              :key="item.fDealerId"
                                              :label="item.dealerCodeName"
                                              :value="item.fDealerId">
                                            </el-option>
                                        </el-select>
                                    </div>
									<div class="line-center">
									    <div class="name">所属经纪人：</div>
									    <el-select
									        size="small"
									        v-model="bean.fBrokerId"
											:disabled="true"
											@change="change"
									    	filterable
									    >
									    <el-option
									          v-for="item in brokers"
									          :key="item.fDealerId"
									          :label="item.dealerCodeName"
									          :value="item.fDealerId">
									        </el-option>
									    </el-select>
									</div>
                                </div>
								<div class="line">
									<div class="line-center">
										<div class="name required">客户账号：</div>
										<el-input
											size="small"
											v-model="bean.fMobile"
											style="width:180px"
											maxlength="11"
											:disabled="true"
											@blur="checkMobile"
										></el-input>
									</div>
								    <div class="line-center">
								        <div class="name required">客户简称：</div>
								        <el-input
								            size="small"
								            v-model="bean.fName"
								            style="width:180px"
											maxlength="128"
											:disabled="true"
								        ></el-input>
								    </div>
								</div>
							</div>
                        </div>
						
                        <div class="news-three">
                            <div class="title">
                                <div class="left">- 变更归属</div>
                            </div>
                            <div class="nav">
                                <div class="line">
                                    <div class="line-center">
                                        <div class="name required">所属运营商：</div>
                                        <el-select
                                            size="small"
                                            placeholder="请搜索/选择运营商"
                                            v-model="fMemberId"
                                			@change="memberSelected"
                                			filterable
                                        >
                                		<el-option
                                		      v-for="item in members"
                                		      :key="item.fDealerId"
                                		      :label="item.dealerCodeName"
                                		      :value="item.fDealerId">
                                		    </el-option>
                                		</el-select>
                                    </div>
                                </div>
								<div class="line">
								    <div class="line-center">
								        <div class="name">所属机构：</div>
								        <el-select
								            size="small"
								            :placeholder="orgTip"
								            v-model="fOrgId"
											@change="orgSelected"
								        	filterable
								        >
								        <el-option
								              v-for="item in orgs"
								              :key="item.fDealerId"
								              :label="item.dealerCodeName"
								              :value="item.fDealerId">
								            </el-option>
								        </el-select>
								    </div>
								</div>
								<div class="line">
									<div class="line-center">
									    <div class="name">所属经纪人：</div>
									    <el-select
									        size="small"
									        :placeholder="brokerTip"
									        v-model="fBrokerId"
											@change="change"
									    	filterable
									    >
									    <el-option
									          v-for="item in brokers"
									          :key="item.fDealerId"
									          :label="item.dealerCodeName"
									          :value="item.fDealerId">
									        </el-option>
									    </el-select>
									</div>
								</div>
                            </div>
                        </div>
                    </div>
                </el-main>
                <el-footer>
                    <el-button size="small" @click="determine" :disabled="submitting">确定</el-button>
                    <el-button size="small" @click="cancel">取消</el-button>
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
	input::-webkit-outer-spin-button,
	input::-webkit-inner-spin-button {
	  -webkit-appearance: none;
	}
	input[type="number"]{
	  -moz-appearance: textfield;
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
			bean:{},
			titleName: '',
			submitting:false,
			orgTip:'',
			brokerTip:'',
			members:[],
			orgs:[],
			brokers:[],
			fAccount:'',
			fBusnessReward:'',
			fMemberId:'',
			fOrgId:'',
			fBrokerId:''
        };
    },
    mounted() {
        // console.log(this.editVisible);
    },
    methods: {
       receipt(index, row) {
            this.editVisible = true;
			this.submitting=false;
			this.orgs = [];
			this.fMemberId = '';
			this.fOrgId='';
			this.fBrokerId = '';
			this.parentId='';
			this.orgTip="请先选择运营商";
			this.brokerTip = "请先选择运营商";
            let popup1 = this.$store.state.Popup.popup1;
			this.bean = popup1;
            this.titleName='司机转移';
			this.listMembers();
			if(this.bean.fOrgId>0){
				this.listOrgs(this.bean.fMemberId);
				if(this.bean.fBrokerId>0){
					this.listBrokers(this.bean.fOrgId);
				}else{
					this.bean.fBrokerId='';
				}
			}else{
				this.bean.fOrgId='';
				this.bean.fBrokerId='';
			}
        },
		change (e) {
		      this.$forceUpdate()
		},
		rewardChange(){
			var regu = /^[0-9]+\.?[0-9]*$/;
			if (!regu.test(this.fBusnessReward)) {
				this.fBusnessReward = this.fBusnessReward.substring(0, this.fBusnessReward.length - 1);
				this.$refs.RewardInputRef.$el.children[0].focus();
			}
		},
		orgSelected(fDealerId){
			this.listBrokers(fDealerId);
			this.brokerTip="请选择经纪人";
			this.bean.fBrokerId="";
		},
		memberSelected(fDealerId){
			this.listOrgs(fDealerId);
			this.orgTip="请选择机构";
			this.fOrgId = '';
		},
		async listMembers(){
			let members = await request('/account/org/listMember',{});
			this.members = members.data;
		},
		async listOrgs(fDealerId){
			let orgs = await request('/account/broker/listOrgsByMemberId',{"fDealerId":fDealerId});
			this.orgs = orgs.data;
		},
		async listBrokers(orgId){
			let brokers = await request('/account/broker/listBrokersByOrgId',{"fDealerId":orgId});
			this.brokers = brokers.data;
		},
		rewardChange(){
			var regu = /^[0-9]+\.?[0-9]*$/;
			if (!regu.test(this.fBusnessReward)) {
				this.fBusnessReward = this.fBusnessReward.substring(0, this.fBusnessReward.length - 1);
				this.$refs.RewardInputRef.$el.children[0].focus();
			}
		},
		checkMobile(){
			let val = this.bean.fMobile;
			let invalid = false;
			if(commonUtils.isEmpty(val)||(invalid=commonUtils.isInvalidMobilePhone(val))){
				this.fAccount='';
				if(invalid){
					this.$message.error("手机号格式有误");
				}
			}else{
				this.fAccount=val;
			}
		},
        //取消事件
        cancel() {
            this.editVisible = false;
        },
        //确定事件
        async determine() {
			if(this.bean.showType=='detail'){
				this.editVisible = false;
				return;
			}
			let bean = this.bean;
			if(!this.checkSubmit(bean)){
				return;
			}
			let obj={};
			obj.fTraderId = bean.fTraderId;
			obj.fParentId = this.parentId;
			let url = "/account/trader/transform";
			this.submitting=true;
            let result = await request(url, obj);
            this.submitting=false;
            if(result.data>=0){
            	this.editVisible = false;
            	this.$message.success("司机转移成功");
				this.$parent.getData();
            }else if(!commonUtils.isEmpty(result.errMsg)){
				this.$message.error(result.errMsg);
			}else{
				this.$message.error("操作失败");
			}
        },
		checkSubmit(bean){
			if(commonUtils.isEmpty(this.fMemberId)||this.fMemberId<=0){
				this.$message.error("请选择变更后所属运营商");
				return false;
			}
			this.parentId = this.fMemberId;
			if(this.fOrgId>0){
				this.parentId = this.fOrgId;
			}
			if(this.fBrokerId>0){
				this.parentId = this.fBrokerId;
			}
			return true;
		}
    }
};
</script>

