<template>
    <div class="Popup">
        <el-dialog title="修改客户开票信息" :visible.sync="editVisible" width="700px" :close-on-click-modal="false">
            <el-container>
                <el-main>
                    <div class="information">
                        <div class="news-noe">
                            <div class="title">
                                <div class="left">- 客户信息</div>
                            </div>
                            <div class="nav">
                                <div class="line">
                                    <div class="line-center">
                                        <div class="name required">所属运营商：</div>
                                        <el-select
                                            size="small"
											style="width:180px"
                                            v-model="bean.fMemberId"
                                			:disabled="true"
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
											style="width:180px"
                                            v-model="bean.fOrgId"
                                			:disabled="true"
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
											style="width:180px"
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
                        					placeholder="请输入内容"
                        					v-model="bean.fMobile"
                        					style="width:180px"
                        					maxlength="11"
                        					:disabled="true"
                        				></el-input>
                        			</div>
                        		    <div class="line-center">
                        		        <div class="name required">客户简称：</div>
                        		        <el-input
                        		            size="small"
                        		            placeholder="请输入内容"
                        		            v-model="bean.fName"
                        		            style="width:180px"
                        					maxlength="128"
                        					:disabled="true"
                        		        ></el-input>
                        		    </div>
                        		</div>
                            </div>
                        </div>
						
						<div class="news-two">
						    <div class="title">
						        <div class="left">- 发票抬头</div>
						    </div>
						    <div class="nav">
						        <div class="line">
						            <div class="line-center">
						                <div class="name required">企业名称：</div>
						                <el-input
						                    size="small"
						                    placeholder="请输入企业名称"
						                    v-model="bean.fCompanyName"
						                    style="width:180px"
											:disabled="true"
						                ></el-input>
						            </div>
									<div class="line-center">
									    <div class="name required">信用代码：</div>
									    <el-input
									        size="small"
									        placeholder="请输入信用代码"
									        v-model="bean.fTaxCode"
									        style="width:180px"
											:disabled="true"
									    ></el-input>
									</div>
						        </div>
						        <div class="line">
						            <div class="line-center">
						                <div class="name required">单位地址：</div>
						                <el-input
						                    size="small"
						                    placeholder="请输入单位地址"
						                    v-model="bean.fCompanyAddress"
						                    style="width:180px"
											maxlength="128"
						                ></el-input>
						            </div>
									<div class="line-center">
									    <div class="name required">企业电话：</div>
									    <el-input
									        size="small"
									        placeholder="请输入企业电话"
									        v-model="bean.fCompanyPhone"
									        style="width:180px"
											maxlength="18"
									    ></el-input>
									</div>
						        </div>
						        <div class="line">
						            <div class="line-center">
						                <div class="name required">开户银行：</div>
						                <el-input
						                    size="small"
						                    placeholder="请输入开户银行"
						                    v-model="bean.fOpenBank"
						                    style="width:180px"
											maxlength="32"
						                ></el-input>
						            </div>
						            <div class="line-center">
						                <div class="name required">银行账户：</div>
						                <el-input
						                    size="small"
						                    placeholder="请输入银行账户"
						                    v-model="bean.fBankAccount"
						                    style="width:180px"
											maxlength="21"
						                ></el-input>
						            </div>
						        </div>
						    </div>
						</div>
						
						<div class="news-three">
						    <div class="title">
						        <div class="left">- 邮寄信息</div>
						    </div>
						    <div class="nav">
						        <div class="line">
									
						            <div class="line-center">
						                <div class="name">收件人：</div>
						                <el-input
						                    size="small"
						                    placeholder="请输入收件人"
						                    v-model="bean.fReceiveName"
						                    style="width:180px"
											maxlength="64"
						                ></el-input>
						            </div>
									<div class="line-center">
									    <div class="name">收件人电话：</div>
									    <el-input
									        size="small"
									        placeholder="请输入收件人电话"
									        v-model="bean.fReceiveMobile"
									        style="width:180px"
											maxlength="18"
									    ></el-input>
									</div>
						        </div>
						
						        <div class="line">
						            <div class="line-center">
						                <div class="name">邮政编码：</div>
						                <el-input
						                    size="small"
						                    placeholder="请输入邮政编码"
						                    v-model="bean.fPostCode"
						                    style="width:180px"
											maxlength="32"
						                ></el-input>
						            </div>
						        </div>
						        <div class="line">
						            <div class="line-center">
						                <div class="name">邮寄地址：</div>
						                <el-input
						                    size="small"
						                    placeholder="请输入邮寄地址"
						                    v-model="bean.fPostAddress"
						                    style="width:510px"
											maxlength="128"
						                ></el-input>
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
	.disableUpload .el-upload--picture-card {
	    display: none;
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
            submitting:false,
			bean:{},
			imageUrl:'',
			members:[],
			orgs:[],
			brokers:[],
            dialogVisible: false,
        };
    },
    methods: {
         receipt(index, row) {
            this.editVisible = true;
			this.submitting=false;
            let popup1 = this.$store.state.Popup.popup1;
			this.bean = popup1;
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
			this.submitting=true;
			let result = await request('/account/customer/updateInvoice', this.bean);
			this.submitting=false;
			if(result.data==1){
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
			if(commonUtils.isEmpty(bean.fCompanyAddress)){
				this.$message.error("单位地址不能为空");
				return false;
			}
			if(bean.fCompanyAddress.length>128){
				this.$message.error("单位地址不能超过128个字符");
				return false;
			}
			if(commonUtils.isEmpty(bean.fCompanyPhone)){
				this.$message.error("企业电话不能为空");
				return false;
			}
			if(bean.fCompanyPhone.length>18){
				this.$message.error("企业电话不能超过18个字符");
				return false;
			}
			if(commonUtils.isEmpty(bean.fOpenBank)){
				this.$message.error("开户银行不能为空");
				return false;
			}
			if(bean.fOpenBank.length>32){
				this.$message.error("开户银行不能超过32个字符");
				return false;
			}
			if(commonUtils.isEmpty(bean.fBankAccount)){
				this.$message.error("银行账户不能为空");
				return false;
			}
			if(bean.fBankAccount.length>21){
				this.$message.error("银行账户不能超过21个字符");
				return false;
			}
			
			if(!commonUtils.isEmpty(bean.fReceiveName)&&bean.fReceiveName.length>64){
				this.$message.error("收件人不能超过64个字符");
				return false;
			}
			if(!commonUtils.isEmpty(bean.fReceiveMobile)&&bean.fReceiveMobile.length>18){
				this.$message.error("收件人电话不能超过18个字符");
				return false;
			}
			if(!commonUtils.isEmpty(bean.fPostCode)&&bean.fPostCode.length>32){
				this.$message.error("邮政编码不能超过32个字符");
				return false;
			}
			if(!commonUtils.isEmpty(bean.fPostAddress)&&bean.fPostAddress.length>128){
				this.$message.error("邮寄地址不能超过128个字符");
				return false;
			}
			
			return true;
		}
    }
};
</script>
