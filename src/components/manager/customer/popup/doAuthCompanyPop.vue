<template>
    <div class="Popup">
        <el-dialog title="申请企业实名认证" :visible.sync="editVisible" width="700px" :close-on-click-modal="false">
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
						<div class="news-img">
						    <div class="title">
						        <div class="left">- 企业信息</div>
						    </div>
						    <div class="nav">
						        <!-- <el-upload
								  :on-success="fImageCert1UploadSuccess"
						          :action="imgUploadUrl"
						          list-type="picture-card"
						          :on-preview="handlePictureCardPreview"
						          :on-remove="fImageCert1Remove"
								  name="img"
								  :class="{disableUpload:bean.fImageCert1!=null&&bean.fImageCert1!=undefined&&bean.fImageCert1!=''}"
								  ref="fImageCert1-upload"
								  >
						          <i class="el-icon-plus"></i>
								  <div slot="tip" class="el-upload__tip required" align="center">营业执照</div>
						        </el-upload>
						        <el-dialog :visible.sync="dialogVisible">
						          <img width="100%" :src="dialogImageUrl" alt="">
						        </el-dialog> -->
								<div class="img">
								    <el-image v-if="fImageCert1!=null&&fImageCert1!=undefined&&fImageCert1.length>0" :src="fImageCert1" preview="1" preview-textss alt :preview-src-list="fImageCert1List">
									</el-image>
									<img :src="defualtImage" v-else/>
									<div slot="tip" class="el-upload__tip" align="center">营业执照</div>
								</div>
								<div class="line" style="margin-left: 60px;">
									<div class="line-center" style="margin-top:15px;">
									    <div class="name required" style="display: inline-block;">企业名称：</div>
									    <el-input
									        size="small"
									        placeholder="请输入企业名称"
									        v-model="bean.fFullName"
									        style="width:220px"
											maxlength="128"
									    ></el-input>
									</div>
									<div class="line-center" style="margin-top: 30px;">
									    <div class="name required" style="display: inline-block;">信用代码：</div>
									    <el-input
									        size="small"
									        placeholder="请输入代码"
									        v-model="bean.fCreditCode"
									        style="width:220px"
											maxlength="18"
									    ></el-input>
									</div>
								</div>
						    </div>
						</div>
						<div class="news-img">
						    <div class="title">
						        <div class="left">- 法人信息</div>
						    </div>
						    <div class="nav">
						        <!-- <el-upload
						          :action="imgUploadUrl"
						          list-type="picture-card"
						          :on-preview="handlePictureCardPreview"
						          :on-remove="fImageIdcardFRemove"
								  :on-success="fImageIdcardFUploadSuccess"
								  name="img"
								  :class="{disableUpload:bean.fImageIdcardF!=null&&bean.fImageIdcardF!=undefined&&bean.fImageIdcardF!=''}"
								  ref="fImageIdcardF-upload"
								  >
						          <i class="el-icon-plus"></i>
								  <div slot="tip" class="el-upload__tip required" align="center">法人身份证(正面)</div>
						        </el-upload>
						        <el-dialog :visible.sync="dialogVisible">
						          <img width="100%" :src="dialogImageUrl" alt="">
						        </el-dialog> -->
								<div class="img">
								    <el-image v-if="fImageIdcardF!=null&&fImageIdcardF!=undefined&&fImageIdcardF.length>0" :src="fImageIdcardF" preview="1" preview-text alt :preview-src-list="fImageIdcardFList">
									</el-image>
									<img :src="defualtImage" v-else/>
									<div slot="tip" class="el-upload__tip" align="center">法人身份证(正面)</div>
								</div>
								<div class="line" style="margin-left: 60px;">
									<div class="line-center" style="margin-top:50px;">
									    <div class="name required" style="display: inline-block;">法人姓名：</div>
									    <el-input
									        size="small"
									        placeholder="请输入法人姓名"
									        v-model="bean.fLegalName"
									        style="width:220px"
											maxlength="64"
									    ></el-input>
									</div>
									<div class="line-center" style="margin-top:15px;">
									    <div class="name required" style="display: inline-block;">身份证号：</div>
									    <el-input
									        size="small"
									        placeholder="请输入身份证号"
									        v-model="bean.fLegalIdcard"
									        style="width:220px"
											maxlength="18"
											@blur="IdcardBlur"
											@input="IdcardChange"
											ref="IdcardInputRef"
									    ></el-input>
									</div>
								</div>
						    </div>
							<div class="nav">
								<!-- <el-upload
								  :action="imgUploadUrl"
								  list-type="picture-card"
								  :on-preview="handlePictureCardPreview"
								  :on-remove="fImageIdcardNRemove"
								  :on-success="fImageIdcardNUploadSuccess"
								  name="img"
								  :class="{disableUpload:bean.fImageIdcardN!=null&&bean.fImageIdcardN!=undefined&&bean.fImageIdcardN!=''}"
								  ref="fImageIdcardN-upload"
								  >
								  <i class="el-icon-plus"></i>
								  <div slot="tip" class="el-upload__tip required" align="center">法人身份证(反面)</div>
								</el-upload>
								<el-dialog :visible.sync="dialogVisible">
								  <img width="100%" :src="dialogImageUrl" alt="">
								</el-dialog> -->
								<div class="img">
								    <el-image v-if="fImageIdcardN!=null&&fImageIdcardN!=undefined&&fImageIdcardN.length>0" :src="fImageIdcardN" preview="1" preview-textss alt :preview-src-list="fImageIdcardNList">
									</el-image>
									<img :src="defualtImage" v-else/>
									<div slot="tip" class="el-upload__tip" align="center">法人身份证(反面)</div>
								</div>
								<div class="line" style="margin-left: 60px;">
									<div class="line-center" style="margin-top: 30px;margin-left: -30px;">
									    <div class="name" style="display: inline-block;">身份证有效期：</div>
									    <el-date-picker
									        size="small"
											type="date"
									        placeholder="请选择有效期"
									        v-model="bean.fIdcardValidTime"
									        style="width:220px"
											maxlength="32"
											value-format="yyyy-MM-dd"
											:picker-options="pickerOptions"
											:editable="false"
									    ></el-date-picker>
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
            dialogImageUrl: '',
            dialogVisible: false,
			imgUploadUrl:commonUtils.imgUploadUrl,
			defualtImage: require('../../../../assets/img/logo.jpg'),
			fImageCert1: '',
			fImageIdcardN: '',
			fImageIdcardF: '',
			fImageCert1List:[],
			fImageIdcardNList:[],
			fImageIdcardFList:[],
			pickerOptions:{
				disabledDate(time) {
				   return time.getTime() < (Date.now()- 24 * 60 * 60 * 1000);
				},
			},
        };
    },
    methods: {
         receipt(index, row) {
            this.editVisible = true;
			this.submitting=false;
			this.dialogImageUrl='';
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
			this.fImageCert1 = (this.bean.fImageCert1FullUrl);
			this.fImageIdcardN = (this.bean.fImageIdcardNFullUrl);
			this.fImageIdcardF = this.bean.fImageIdcardFFullUrl;
			this.fImageCert1List = [];
			this.fImageIdcardNList = [];
			this.fImageIdcardFList = [];
			this.fImageCert1List.push(this.fImageCert1);
			this.fImageIdcardNList.push(this.fImageIdcardN);
			this.fImageIdcardFList.push(this.fImageIdcardF);
        },
		IdcardBlur(){
			if(this.bean.fLegalIdcard){
				if(!this.IdcardChange()||commonUtils.isInvalidIDCard(this.bean.fLegalIdcard)){
					var that = this;
					setTimeout(function () {
					  if(that.editVisible){
						  that.$message.error("身份证号格式有误");
						  return false;
					  }
					},300);
				}
			}
		},
		IdcardChange(){
			if(!(this.bean.fLegalIdcard)){
				return;
			}
			var regu = /^([0-9]{1,17})$|^(\d{17}[0-9xX])$/;
			if (!regu.test(this.bean.fLegalIdcard)) {
				while(this.bean.fLegalIdcard.length>0){
					let val = this.bean.fLegalIdcard.substring(0, this.bean.fLegalIdcard.length - 1);
					this.bean.fLegalIdcard = val;
					if(isNaN(val)){
						continue;
					}
					break;
				}
				this.$forceUpdate();
				this.$refs.IdcardInputRef.$el.children[0].focus();
				return false;
			}
			if(this.bean.fLegalIdcard.length==18){
				let last = this.bean.fLegalIdcard.substring(17);
				if(last==='x'){
					this.bean.fLegalIdcard=this.bean.fLegalIdcard.substring(0,17)+'X';
				}
			}
			this.$forceUpdate();
			return true;
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
		handlePictureCardPreview(file) {
			this.dialogImageUrl = file.url;
			this.dialogVisible = true;
		},
		fImageCert1UploadSuccess(res, file) {
			let result = JSON.parse(res.body);
		   this.bean.fImageCert1 = result.data.url;
		},
		fImageCert1Remove(file, fileList) {
		    this.bean.fImageCert1 = "";
		},
		fImageIdcardFUploadSuccess(res, file) {
			let result = JSON.parse(res.body);
		   this.bean.fImageIdcardF = result.data.url;
		},
		fImageIdcardFRemove(file, fileList) {
		    this.bean.fImageIdcardF = "";
		},
		fImageIdcardNUploadSuccess(res, file) {
			let result = JSON.parse(res.body);
		   this.bean.fImageIdcardN = result.data.url;
		},
		fImageIdcardNRemove(file, fileList) {
		    this.bean.fImageIdcardN = "";
		},
        //确定事件
        async determine(opType) {
			if(opType!='pass'&&opType!='unpass'){
				this.$message.error("未知的操作类型");
				return false;
			}
			this.bean.opType=opType;
			let bean = this.bean;
			if(!this.checkSubmit(bean)){
				return;
			}
			this.submitting=true;
			let result = await request('/account/customer/doAuthCompanyCertification', this.bean);
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
			if(commonUtils.isEmpty(bean.fFullName)){
				this.$message.error("企业名称不能为空");
				return false;
			}
			if(bean.fFullName.length>128){
				this.$message.error("企业名称不能超过128个字符");
				return false;
			}
			if(commonUtils.isEmpty(bean.fCreditCode)){
				this.$message.error("信用代码不能为空");
				return false;
			}
			if(bean.fCreditCode.length>64){
				this.$message.error("信用代码不能超过64个字符");
				return false;
			}
			if(commonUtils.isEmpty(bean.fLegalName)){
				this.$message.error("真实姓名不能为空");
				return false;
			}
			if(bean.fLegalName.length>64){
				this.$message.error("真实姓名不能超过64个字符");
				return false;
			}
			if(commonUtils.isEmpty(bean.fLegalIdcard)){
				this.$message.error("身份证号不能为空");
				return false;
			}
			if(commonUtils.isInvalidIDCard(bean.fLegalIdcard)){
				this.$message.error("身份证号格式有误，请输入正确的18位二代身份证号");
				return false;
			}
			// if(commonUtils.isEmpty(bean.fIdcardValidTime)){
			// 	this.$message.error("身份证号有效期不能为空");
			// 	return false;
			// }
			// if(bean.fIdcardValidTime.length>32){
			// 	this.$message.error("身份证号有效期不能超过32个字符");
			// 	return false;
			// }
			if(commonUtils.isEmpty(bean.fImageIdcardF)){
				this.$message.error("请上传法人身份证(正面)");
				return false;
			}
			// if(commonUtils.isEmpty(bean.fImageIdcardN)){
			// 	this.$message.error("请上传法人身份证(反面)");
			// 	return false;
			// }
			return true;
		}
    }
};
</script>

