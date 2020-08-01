<template>
    <div class="Popup">
        <el-dialog :title="title" :visible.sync="editVisible" width="700px" :close-on-click-modal="false">
            <el-container>
                <el-main>
                    <div class="information">
                        <div class="news-noe">
                            <div class="title">
                                <div class="left">- {{traderTypeName}}信息</div>
                            </div>
                            <div class="nav">
                                <div class="line">
                                    <div class="line-center">
                                        <div class="name required">所属运营商：</div>
                                        <el-select
                                            size="small"
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
                                        <div class="name required">所属机构：</div>
                                        <el-select
                                            size="small"
                                            v-model="bean.fParentId"
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
                                </div>
                        		<div class="line">
                        			<div class="line-center">
                        				<div class="name required">{{traderTypeName}}账号：</div>
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
                        		        <div class="name required">{{traderTypeName}}简称：</div>
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
						        <div class="left">- 个人信息</div>
						    </div>
						    <div class="nav">
						        <el-upload
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
								  <div slot="tip" class="el-upload__tip required" align="center">身份证照(正面)</div>
						        </el-upload>
						        <el-dialog :visible.sync="dialogVisible">
						          <img width="100%" :src="dialogImageUrl" alt="">
						        </el-dialog>
								<div class="line" style="margin-left: 60px;">
									<div class="line-center" style="margin-top:50px;">
									    <div class="name required" style="display: inline-block;">真实姓名：</div>
									    <el-input
									        size="small"
									        placeholder="请输入真实姓名"
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
								<el-upload
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
								  <div slot="tip" class="el-upload__tip required" align="center">身份证照(反面)</div>
								</el-upload>
								<el-dialog :visible.sync="dialogVisible">
								  <img width="100%" :src="dialogImageUrl" alt="">
								</el-dialog>
								<div class="line" style="margin-left: 60px;">
									<div class="line-center" style="margin-top: 30px;margin-left: -30px;">
									    <div class="name required" style="display: inline-block;">身份证有效期：</div>
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
            dialogImageUrl: '',
            dialogVisible: false,
			imgUploadUrl:commonUtils.imgUploadUrl,
			traderTypeName:'',
			pickerOptions:{
				disabledDate(time) {
				   return time.getTime() < (Date.now()- 24 * 60 * 60 * 1000);
				},
			},
			title:''
        };
    },
    methods: {
         receipt(index, row) {
            this.editVisible = true;
			this.submitting=false;
			this.dialogImageUrl='';
            let popup1 = this.$store.state.Popup.popup1;
			this.bean = popup1;
			if(this.bean.fTraderType==3){
				this.traderTypeName='调度员';
			}else if(this.bean.fTraderType==4){
				this.traderTypeName='客服';
			}
			this.title = this.traderTypeName+"申请实名认证";
			if(this.bean.fParentId>0&&this.bean.fMemberId>0){
				this.listMembers();
				this.listOrgs(this.bean.fMemberId);
			}
			this.clearUpload();
        },
		clearUpload(){
			let uploadRef;
			let removed = false;
			if((uploadRef=this.$refs['fImageCert1-upload'])){
				uploadRef.clearFiles();
				this.fImageCert1Remove();
				removed = true;
			}
			if((uploadRef=this.$refs['fImageIdcardF-upload'])){
				uploadRef.clearFiles();
				this.fImageIdcardFRemove();
				removed = true;
			}
			if((uploadRef=this.$refs['fImageIdcardN-upload'])){
				uploadRef.clearFiles();
				this.fImageIdcardNRemove();
				removed = true;
			}
			if(removed){
				this.$forceUpdate();
			}
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
			this.$forceUpdate();
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
        //取消事件
        cancel() {
            this.editVisible = false;
			this.clearUpload();
        },
		handlePictureCardPreview(file) {
			this.dialogImageUrl = file.url;
			this.dialogVisible = true;
		},
		fImageCert1UploadSuccess(res, file) {
			let result = JSON.parse(res.body);
		   this.bean.fImageCert1 = result.data.url;
		   this.$forceUpdate();
		},
		fImageCert1Remove(file, fileList) {
		    this.bean.fImageCert1 = "";
			this.$forceUpdate();
		},
		fImageIdcardFUploadSuccess(res, file) {
			let result = JSON.parse(res.body);
		   this.bean.fImageIdcardF = result.data.url;
		   this.$forceUpdate();
		},
		fImageIdcardFRemove(file, fileList) {
		    this.bean.fImageIdcardF = "";
			this.$forceUpdate();
		},
		fImageIdcardNUploadSuccess(res, file) {
			let result = JSON.parse(res.body);
		   this.bean.fImageIdcardN = result.data.url;
		   this.$forceUpdate();
		},
		fImageIdcardNRemove(file, fileList) {
		    this.bean.fImageIdcardN = "";
			this.$forceUpdate();
		},
        //确定事件
        async determine() {
			let bean = this.bean;
			if(!this.checkSubmit(bean)){
				return;
			}
			this.submitting=true;
			let result = await request('/account/customerDispatch/authentication', this.bean);
			this.submitting=false;
			if(result.data==1){
				this.editVisible = false;
				this.$message.success("申请成功");
				this.$parent.getData();
				this.clearUpload();
			}else if(!commonUtils.isEmpty(result.errMsg)){
				this.$message.error(result.errMsg);
			}else{
				this.$message.error("操作失败");
			}
        },
		checkSubmit(bean){
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
			if(commonUtils.isEmpty(bean.fIdcardValidTime)){
				this.$message.error("身份证号有效期不能为空");
				return false;
			}
			if(bean.fIdcardValidTime.length>32){
				this.$message.error("身份证号有效期不能超过32个字符");
				return false;
			}
			if(commonUtils.isEmpty(bean.fImageIdcardF)){
				this.$message.error("请上传法人身份证(正面)");
				return false;
			}
			if(commonUtils.isEmpty(bean.fImageIdcardN)){
				this.$message.error("请上传法人身份证(反面)");
				return false;
			}
			return true;
		}
    }
};
</script>

