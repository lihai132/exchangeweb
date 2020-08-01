<template>
    <div class="Popup">
        <el-dialog title="申请司机认证" :visible.sync="editVisible" width="700px" :close-on-click-modal="false">
            <el-container>
                <el-main>
                    <div class="information">
                        <div class="news-noe">
                            <div class="title">
                                <div class="left">- 账号信息</div>
                            </div>
                            <div class="nav">
                                <div class="line">
                                    <div class="line-center">
                                        <div class="name required">所属运营商：</div>
                                        <el-select
											style="width:180px"
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
                                        <div class="name">所属机构：</div>
                                        <el-select
											style="width:180px"
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
											style="width:180px"
                                	        size="small"
                                	        v-model="bean.fBrokerId"
                                			:disabled="bean.fTraderId>0"
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
                        				<div class="name required">司机账号：</div>
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
                        		        <div class="name required">司机简称：</div>
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
						        <div class="left">- 司机信息</div>
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
								<el-upload
								  :on-success="fImageCert2UploadSuccess"
								  :action="imgUploadUrl"
								  list-type="picture-card"
								  :on-preview="handlePictureCardPreview"
								  :on-remove="fImageCert2Remove"
								  name="img"
								  :class="{disableUpload:bean.fImageCert2!=null&&bean.fImageCert2!=undefined&&bean.fImageCert2!=''}"
								  ref="fImageCert2-upload"
								  style="margin-left: 183px;"
								  >
								  <i class="el-icon-plus"></i>
								  <div slot="tip" class="el-upload__tip required" align="center">驾驶证</div>
								</el-upload>
								<el-dialog :visible.sync="dialogVisible">
								  <img width="100%" :src="dialogImageUrl" alt="">
								</el-dialog>
						    </div>
							<!-- <div class="nav">
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
									<div class="line-center" style="margin-top:15px;">
									    <div class="name required" style="display: inline-block;">身份证号：</div>
									    <el-input
									        size="small"
									        placeholder="请输入身份证号"
									        v-model="bean.fLegalIdcard"
									        style="width:220px"
											maxlength="18"
									    ></el-input>
									</div>
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
									<div class="line-center" style="margin-top:20px;">
									    <div class="name required" style="display: inline-block;margin-left: 27px;">性别：</div>
									    <el-select
									        size="small"
									        v-model="bean.fSex"
									        
									    >
										<el-option key="1" label="男" value="1"></el-option>
										<el-option key="2" label="女" value="2"></el-option>
										</el-select>
									</div>
								</div>
							</div> -->
							
							<div class="nav">
								<div class="line" style="margin-left: -43px;">
									<div class="line-center" style="margin-top:13px;">
									    <div class="name required" style="display: inline-block;">真实姓名：</div>
									    <el-input
									        size="small"
									        placeholder="请输入真实姓名"
									        v-model="bean.fLegalName"
									        style="width:180px"
											maxlength="64"
											@input="$forceUpdate()"
									    ></el-input>
									</div>
								</div>
								<div class="line" style="margin-left: 35px;">
									<div class="line-center" style="margin-top:13px;">
									    <div class="name required" style="display: inline-block;">身份证号：</div>
									    <el-input
									        size="small"
									        placeholder="请输入身份证号"
									        v-model="bean.fLegalIdcard"
									        style="width:180px"
											maxlength="18"
											@blur="IdcardBlur"
											@input="IdcardChange"
											ref="IdcardInputRef"
									    ></el-input>
									</div>
								</div>
							</div>
						</div>
						
						<div class="news-img" style="margin-top: 10px;">
						    <div class="title">
						        <div class="left">- 车辆信息</div>
						    </div>
						    <div class="nav">
						        <el-upload
						          :action="imgUploadUrl"
						          list-type="picture-card"
						          :on-preview="handlePictureCardPreview"
						          :on-remove="fDrivingPermitFaceRemove"
								  :on-success="fDrivingPermitFaceUploadSuccess"
								  name="img"
								  :class="{disableUpload:bean.fDrivingPermitFace!=null&&bean.fDrivingPermitFace!=undefined&&bean.fDrivingPermitFace!=''}"
								  ref="fDrivingPermitFace-upload"
								  >
						          <i class="el-icon-plus"></i>
								  <div slot="tip" class="el-upload__tip required" align="center">行驶证(正页)</div>
						        </el-upload>
						        <el-dialog :visible.sync="dialogVisible">
						          <img width="100%" :src="dialogImageUrl" alt="">
						        </el-dialog>
								<div class="line" style="margin-left: 60px;">
									<div class="line-center" style="margin-top:8px;">
									    <div class="name required" style="display: inline-block;margin-left: 56px;">车牌号：</div>
									    <el-input
									        size="small"
									        placeholder="请输入车牌号"
									        v-model="bean.fCarNumber"
									        style="width:180px"
											maxlength="64"
											@input="$forceUpdate()"
									    ></el-input>
									</div>
									<div class="line-center" style="margin-top:8px;">
									    <div class="name required" style="display: inline-block;margin-left: 42px;">车牌颜色：</div>
										<el-select v-model="bean.fPlateColor" placeholder="请选择车牌颜色" style="width:180px">
										    <el-option
										      v-for="item in carNoColors"
										      :key="item.value"
										      :label="item.value"
										      :value="item.value">
										    </el-option>
										  </el-select>
									</div>
									<div class="line-center" style="margin-top:8px;">
									    <div class="name required" style="display: inline-block;margin-left: 14px;">车辆识别代码：</div>
									    <el-input
									        size="small"
									        placeholder="请输入车辆识别代码"
									        v-model="bean.fCreditCode"
									        style="width:180px"
											maxlength="17"
											@input="bean.fCreditCode=commonUtils.trimForVIN(bean.fCreditCode);$forceUpdate()"
									    ></el-input>
									</div>
									<div class="line-center" style="margin-top:8px;">
									    <div class="name" style="display: inline-block;margin-left: 50px;">车辆类型：</div>
										<el-input
										    size="small"
										    placeholder="请输入车辆类型"
										    v-model="bean.fCarTypeDesp"
										    style="width:180px"
											maxlength="64"
											@input="$forceUpdate()"
										></el-input>
									</div>
								</div>
						    </div>
							
							<div class="nav">
							    <el-upload
							      :action="imgUploadUrl"
							      list-type="picture-card"
							      :on-preview="handlePictureCardPreview"
							      :on-remove="fDrivingPermitNextRemove"
								  :on-success="fDrivingPermitNextUploadSuccess"
								  name="img"
								  :class="{disableUpload:bean.fDrivingPermitNext!=null&&bean.fDrivingPermitNext!=undefined&&bean.fDrivingPermitNext!=''}"
								  ref="fDrivingPermitNext-upload"
								  >
							      <i class="el-icon-plus"></i>
								  <div slot="tip" class="el-upload__tip required" align="center">行驶证(副页)</div>
							    </el-upload>
							    <el-dialog :visible.sync="dialogVisible">
							      <img width="100%" :src="dialogImageUrl" alt="">
							    </el-dialog>
								<div class="line" style="margin-left: 60px;">
									<div class="line-center" style="margin-top:8px;">
									    <div class="name required" style="display: inline-block;margin-left: 16px;">总质量(千克)：</div>
									    <el-input
									        size="small"
									        placeholder="请输入总质量"
									        v-model="bean.fTotalMass"
											@input="totalMassChange"
											ref="totalMassInputRef"
									        style="width:180px"
											maxlength="64"
									    ></el-input>
									</div>
									<div class="line-center" style="margin-top:8px;">
									    <div class="name required" style="display: inline-block;margin-left: -12px;">核定载质量(千克)：</div>
									    <el-input
									        size="small"
									        placeholder="请输入核定载质量"
									        v-model="bean.fLoadWeight"
											@input="fLoadWeightChange"
											ref="fLoadWeightInputRef"
									        style="width:180px"
											maxlength="64"
									    ></el-input>
									</div>
									<div class="line-center" style="margin-top:8px;margin-left: 20px;">
									    <div class="name" style="display: inline-block;">车辆能源类型：</div>
										<el-input
										    size="small"
										    placeholder="请输入车辆能源类型"
										    v-model="bean.fOilType"
										    style="width:180px"
											maxlength="64"
											@input="$forceUpdate()"
										></el-input>
									</div>
									<div class="line-center" style="margin-top:8px;margin-left: 33px;">
									    <div class="name" style="display: inline-block;">车辆所有人：</div>
									    <el-input
									        size="small"
									        placeholder="请输入车辆所有人"
									        v-model="bean.fOwner"
									        style="width:180px"
											maxlength="64"
											@input="$forceUpdate()"
									    ></el-input>
									</div>
								</div>
							</div>
							
							<div class="nav">
								<!-- <el-upload
								  :action="imgUploadUrl"
								  list-type="picture-card"
								  :on-preview="handlePictureCardPreview"
								  :on-remove="fImageCarRemove"
								  :on-success="fImageCarUploadSuccess"
								  name="img"
								  :class="{disableUpload:bean.fImageCar!=null&&bean.fImageCar!=undefined&&bean.fImageCar!=''}"
								  ref="fImageCar-upload"
								  >
								  <i class="el-icon-plus"></i>
								  <div slot="tip" class="el-upload__tip" align="center">车辆正面照</div>
								</el-upload>
								<el-dialog :visible.sync="dialogVisible">
								  <img width="100%" :src="dialogImageUrl" alt="">
								</el-dialog> -->
								<div class="line-center" style="margin-top:15px;margin-left: -35px;">
								    <div class="name required" style="display: inline-block;margin-left: 27px;">车型：</div>
									<el-select v-model="bean.fCarType" placeholder="请选择车型" style="width:180px">
									    <el-option
									      v-for="item in carTypes"
									      :key="item.key"
									      :label="item.value"
									      :value="item.key">
									    </el-option>
									  </el-select>
								</div>
								<div class="line-center" style="margin-top:15px;">
								    <div class="name required" style="display: inline-block;margin-left: 48px;">车长：</div>
									<el-select v-model="bean.fCarLength" placeholder="请选择车长" style="width:180px">
									    <el-option
									      v-for="item in carLengths"
									      :key="item.key"
									      :label="item.value"
									      :value="item.key">
									    </el-option>
									  </el-select>
								</div>
							</div>
							<div class="nav">
								<div class="line-center" style="margin-top:0px;">
								    <div class="name" style="display: inline-block;margin-left: -42px;">车辆注册地：</div>
								    <el-input
								        size="small"
								        placeholder="请输入车辆注册地"
								        v-model="bean.fAddress"
								        style="width:461px"
										maxlength="128"
								    ></el-input>
								</div>
							</div>
						</div>
						
						<div class="news-img" style="margin-top: 10px;">
							<div class="title">
							    <div class="left" style="width: 130px;">- 道路运输证信息</div>
							</div>
							<div class="nav">
							    <el-upload
							      :action="imgUploadUrl"
							      list-type="picture-card"
							      :on-preview="handlePictureCardPreview"
							      :on-remove="fRoadPermitImageRemove"
								  :on-success="fRoadPermitImageUploadSuccess"
								  name="img"
								  :class="{disableUpload:bean.fRoadPermitImage!=null&&bean.fRoadPermitImage!=undefined&&bean.fRoadPermitImage!=''}"
								  ref="fRoadPermitImage-upload"
								  >
							      <i class="el-icon-plus"></i>
								  <div slot="tip" class="el-upload__tip" align="center">道路运输证</div>
							    </el-upload>
							    <el-dialog :visible.sync="dialogVisible">
							      <img width="100%" :src="dialogImageUrl" alt="">
							    </el-dialog>
								<div class="line" style="margin-left: 60px;">
									<div class="line-center" style="margin-top:5px;">
									    <div class="name" style="display: inline-block;margin-left: -4px;">道路运输证号：</div>
									    <el-input
									        size="small"
									        placeholder="请输入道路运输证号"
									        v-model="bean.fRoadPermitCode"
									        style="width:200px"
											maxlength="64"
											@input="$forceUpdate()"
									    ></el-input>
									</div>
									<div class="line-center" style="margin-top:8px;">
									    <div class="name" style="display: inline-block;margin-left: -33px;">道路运输证有效期：</div>
									    <el-input
									        size="small"
									        placeholder="请输入道路运输证有效期"
									        v-model="bean.fRoadPermitInvalid"
									        style="width:200px"
											maxlength="64"
											@input="$forceUpdate()"
									    ></el-input>
									</div>
									<div class="line-center" style="margin-top:8px;">
									    <div class="name" style="display: inline-block;margin-left: -6px;">经营许可证号：</div>
									    <el-input
									        size="small"
									        placeholder="请输入经营许可证号"
									        v-model="bean.fRoadOperateCode"
									        style="width:200px"
											maxlength="64"
											@input="$forceUpdate()"
									    ></el-input>
									</div>
									<div class="line-center" style="margin-top:8px;">
									    <div class="name" style="display: inline-block;margin-left: 22px;">业户名称：</div>
										<el-input
										    size="small"
										    placeholder="请输入业户名称"
										    v-model="bean.fRoadOperateName"
										    style="width:200px"
											maxlength="64"
											@input="$forceUpdate()"
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
			commonUtils:commonUtils,
            editVisible: false,
            submitting:false,
			bean:{},
			imageUrl:'',
			members:[],
			orgs:[],
			brokers:[],
			brokers:[],
			carTypes:[],
			carLengths:[],
			carNoColors:[],
            dialogImageUrl: '',
            dialogVisible: false,
			imgUploadUrl:commonUtils.imgUploadUrl,
			pickerOptions:{
				disabledDate(time) {
				   return time.getTime() < (Date.now()- 24 * 60 * 60 * 1000);
				},
			},
			_token: '',
        };
    },
	created() {
	    this.getToken();
	},
    methods: {
      async receipt(index, row) {
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
			//this.bean.fSex='1';
			let carLenList = await request('/enum/ioCarLenghtType/api', {});
			this.carLengths = carLenList.data;
			let carTypeList = await request('/enum/ioCarType/api', {});
			this.carTypes = carTypeList.data;
			let carNoTypeList = await request('/enum/ioCarNoColorType/api', {});
			this.carNoColors = carNoTypeList.data;
			this.clearUpload();
        },
		//获取百度识图的token
		getToken() {
			var API_Key = commonUtils.baiduToken.apiKey;
			var Secret_Key = commonUtils.baiduToken.secretKey;
			this.$axios
				.get(`/baidu_token/oauth/2.0/token?grant_type=client_credentials&client_id=${API_Key}&client_secret=${Secret_Key}`)
				.then(res => {
					this._token = res.data.access_token;
				});
		},
		//道路运输证识别
		getTransLicense(file,imgUrl){
			commonUtils.readFileAsDataURL(file.raw).then(res => {
				var imgBase64 = res.replace(/^data:image\/\w+;base64,/, '');
				var code = 60002;
				this.$axios({
					url: commonUtils.distinguishImageBaseUrl+code,
					method: 'POST',
					data: {"hd":{"pi":code,"sq":59},"bd":{"pte":6,"img":imgBase64}},
					headers: {
						'Content-Type': 'application/json'
					}
				}).then(res => {
					imgUrl = JSON.parse(res.data.bd).url;
					code = 11017;
					this.$axios({
						url: commonUtils.distinguishImageBaseUrl+code,
						method: 'POST',
						data: {"hd":{"pi":code,"sq":59},"bd":{"url":imgUrl}},
						headers: {
							'Content-Type': 'application/json'
						}
					}).then(res => {
						if(res.data.bd){
							var obj = JSON.parse(res.data.bd);
							this.bean.fRoadPermitCode=obj.licenseNumber;
							this.bean.fRoadOperateCode=obj.businessCertificate;
							this.bean.fRoadOperateName=obj.ownerName;
							this.$forceUpdate();
						}
					});
				});
			})
			
		},
		//车牌识别
		getPlate(file){
			commonUtils.readFileAsDataURL(file.raw).then(res => {
				var imgBase64 = res.replace(/^data:image\/\w+;base64,/, '');
				this.$axios({
					url: `/baidu_token/rest/2.0/ocr/v1/license_plate?access_token=${this._token}`,
					method: 'POST',
					data: `image=${encodeURIComponent(imgBase64)}`,
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
					}
				}).then(res => {
					var color = res.data.words_result.color;
					if(color=='blue'){
						this.bean.fPlateColor='蓝牌';
					}else if(color=='green'){
						this.bean.fPlateColor='绿牌';
					}else if(color=='yellow'){
						this.bean.fPlateColor='黄牌';
					}
					this.$forceUpdate();
				});
			});
		},
		//驾驶证识别
		getVehicle(file) {
			commonUtils.readFileAsDataURL(file.raw).then(res => {
				var imgBase64 = res.replace(/^data:image\/\w+;base64,/, '');
				this.$axios({
					url: `/baidu_token/rest/2.0/ocr/v1/driving_license?access_token=${this._token}`,
					method: 'POST',
					data: `image=${encodeURIComponent(imgBase64)}`,
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
					}
				}).then(res => {
					console.log(res.data);
				});
			});
		},
		//行驶证识别
		getDrive(file,isFront) {
			commonUtils.readFileAsDataURL(file.raw).then(res => {
				var imgBase64 = res.replace(/^data:image\/\w+;base64,/, '');
				this.$axios({
					url: `/baidu_token/rest/2.0/ocr/v1/vehicle_license?access_token=${this._token}`,
					method: 'POST',
					data: `image=${encodeURIComponent(imgBase64)}`+'&vehicle_license_side='+(isFront?'front':'back'),
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
					}
				}).then(res => {
					if(isFront){
						this.bean.fCarNumber=res.data.words_result.号牌号码.words;
						this.bean.fCreditCode=res.data.words_result.车辆识别代号.words;
						this.bean.fCarTypeDesp=res.data.words_result.车辆类型.words;
					}else{
						this.bean.fTotalMass=res.data.words_result.总质量.words;
						this.bean.fLoadWeight=res.data.words_result.核定载质量.words;
						this.bean.fOilType=res.data.words_result.燃油类型.words;
						this.totalMassChange();
						this.fLoadWeightChange();
					}
					this.$forceUpdate();
				});
			});
		},
		//身份证识别
		getIdCard(file, isFront) {
			commonUtils.readFileAsDataURL(file.raw).then(res => {
				var imgBase64 = res.replace(/^data:image\/\w+;base64,/, '');
				this.$axios({
					url: `/baidu_token/rest/2.0/ocr/v1/idcard?access_token=${this._token}`,
					method: 'POST',
					data: `image=${encodeURIComponent(imgBase64)}`+'&id_card_side='+(isFront?'front':'back'),
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
					}
				}).then(res => {
					this.bean.fLegalName = res.data.words_result.姓名.words;
					this.bean.fLegalIdcard = res.data.words_result.公民身份号码.words;
					this.$forceUpdate();
				});
			});
		},
		clearUpload(){
			let uploadRef;
			let removed = false;
			if((uploadRef=this.$refs['fImageCert1-upload'])){
				uploadRef.clearFiles();
				this.fImageCert1Remove();
				removed = true;
			}
			if((uploadRef=this.$refs['fImageCert2-upload'])){
				uploadRef.clearFiles();
				this.fImageCert2Remove();
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
			//
			if((uploadRef=this.$refs['fDrivingPermitFace-upload'])){
				uploadRef.clearFiles();
				this.fDrivingPermitFaceRemove();
				removed = true;
			}
			if((uploadRef=this.$refs['fDrivingPermitNext-upload'])){
				uploadRef.clearFiles();
				this.fDrivingPermitNextRemove();
				removed = true;
			}
			if((uploadRef=this.$refs['fRoadPermitImage-upload'])){
				uploadRef.clearFiles();
				this.fRoadPermitImageRemove();
				removed = true;
			}
			if((uploadRef=this.$refs['fImageCar-upload'])){
				uploadRef.clearFiles();
				this.fImageCarRemove();
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
		      this.$forceUpdate();
		},
		totalMassChange(){
			this.bean.fTotalMass = commonUtils.trimForDigit(this.bean.fTotalMass,{'allowDecimal':true});
			this.$forceUpdate();
		},
		fLoadWeightChange(){
			this.bean.fLoadWeight = commonUtils.trimForDigit(this.bean.fLoadWeight,{'allowDecimal':true});
			this.$forceUpdate();
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
		 //  this.getVehicle(file);
		},
		fImageCert1Remove(file, fileList) {
		    this.bean.fImageCert1 = "";
			this.$forceUpdate();
		},
		fImageCert2UploadSuccess(res, file) {
			let result = JSON.parse(res.body);
		   this.bean.fImageCert2 = result.data.url;
		   this.$forceUpdate();
		 //  this.getVehicle(file);
		},
		fImageCert2Remove(file, fileList) {
		    this.bean.fImageCert2 = "";
			this.$forceUpdate();
		},
		fImageIdcardFUploadSuccess(res, file) {
			let result = JSON.parse(res.body);
		   this.bean.fImageIdcardF = result.data.url;
		   this.$forceUpdate();
		   this.getIdCard(file,true);
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
		//
		fDrivingPermitFaceUploadSuccess(res, file) {
			let result = JSON.parse(res.body);
		   this.bean.fDrivingPermitFace = result.data.url;
		   this.$forceUpdate();
		   this.getDrive(file,true);
		},
		fDrivingPermitFaceRemove(file, fileList) {
		    this.bean.fDrivingPermitFace = "";
			this.$forceUpdate();
		},
		fDrivingPermitNextUploadSuccess(res, file) {
			let result = JSON.parse(res.body);
		   this.bean.fDrivingPermitNext = result.data.url;
		   this.$forceUpdate();
		   this.getDrive(file,false);
		},
		fDrivingPermitNextRemove(file, fileList) {
		    this.bean.fDrivingPermitNext = "";
			this.$forceUpdate();
		},
		fRoadPermitImageUploadSuccess(res, file) {
			let result = JSON.parse(res.body);
		   this.bean.fRoadPermitImage = result.data.url;
		   this.$forceUpdate();
		   this.getTransLicense(file,this.bean.fRoadPermitImage);
		},
		fRoadPermitImageRemove(file, fileList) {
		    this.bean.fRoadPermitImage = "";
			this.$forceUpdate();
		},
		fImageCarUploadSuccess(res, file) {
			let result = JSON.parse(res.body);
		   this.bean.fImageCar = result.data.url;
		   this.$forceUpdate();
		   this.getPlate(file);
		},
		fImageCarRemove(file, fileList) {
		    this.bean.fImageCar = "";
			this.$forceUpdate();
		},
        //确定事件
        async determine() {
			let bean = this.bean;
			if(!this.checkSubmit(bean)){
				return;
			}
			this.submitting=true;
			let result = await request('/account/driver/askAuth', this.bean);
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
			// if(commonUtils.isEmpty(bean.fIdcardValidTime)){
			// 	this.$message.error("身份证号有效期不能为空");
			// 	return false;
			// }
			// if(bean.fIdcardValidTime.length>32){
			// 	this.$message.error("身份证号有效期不能超过32个字符");
			// 	return false;
			// }
			if(commonUtils.isEmpty(bean.fImageIdcardF)){
				this.$message.error("请上传身份证照(正面)");
				return false;
			}
			// if(commonUtils.isEmpty(bean.fImageIdcardN)){
			// 	this.$message.error("请上传身份证照(反面)");
			// 	return false;
			// }
			if(commonUtils.isEmpty(bean.fImageCert2)){
				this.$message.error("请上传驾驶证照片");
				return false;
			}
			
			//
			if(commonUtils.isEmpty(bean.fCarNumber)){
				this.$message.error("车牌号不能为空");
				return false;
			}
			if(!commonUtils.plateNumberRegTest(bean.fCarNumber)){
				this.$message.error("车牌号格式有误");
				return false;
			}
			if(commonUtils.isEmpty(bean.fCreditCode)){
				this.$message.error("车辆识别代码不能为空");
				return false;
			}
			if(!commonUtils.VINRegTest(bean.fCreditCode)){
				this.$message.error("车辆识别代码格式有误");
				return false;
			}
			// if(commonUtils.isEmpty(bean.fCarTypeDesp)){
			// 	this.$message.error("车辆类型不能为空");
			// 	return false;
			// }
			if(!commonUtils.isEmpty(bean.fCarTypeDesp)&&bean.fCarTypeDesp.length>64){
				this.$message.error("车辆类型不能超过64个字符");
				return false;
			}
			if(commonUtils.isEmpty(bean.fTotalMass)){
				this.$message.error("总质量不能为空");
				return false;
			}
			if(isNaN(bean.fTotalMass)){
				this.$message.error("总质量须是数字");
				return false;
			}
			if(parseFloat(bean.fTotalMass)<=0){
				this.$message.error("总质量需要大于0");
				return false;
			}
			if(commonUtils.isEmpty(bean.fLoadWeight)){
				this.$message.error("核定载质量不能为空");
				return false;
			}
			if(isNaN(bean.fLoadWeight)){
				this.$message.error("核定载质量须是数字");
				return false;
			}
			if(parseFloat(bean.fLoadWeight)<=0){
				this.$message.error("核定载质量需要大于0");
				return false;
			}
			// if(commonUtils.isEmpty(bean.fOilType)){
			// 	this.$message.error("车辆能源类型不能为空");
			// 	return false;
			// }
			if(!commonUtils.isEmpty(bean.fOilType)&&bean.fOilType.length>64){
				this.$message.error("车辆能源类型不能超过64个字符");
				return false;
			}
			// if(commonUtils.isEmpty(bean.fRoadPermitCode)){
			// 	this.$message.error("道路运输证号不能为空");
			// 	return false;
			// }
			if(!commonUtils.isEmpty(bean.fRoadPermitCode)&&bean.fRoadPermitCode.length>64){
				this.$message.error("道路运输证号不能超过64个字符");
				return false;
			}
			// if(commonUtils.isEmpty(bean.fRoadOperateCode)){
			// 	this.$message.error("经营许可证号不能为空");
			// 	return false;
			// }
			if(!commonUtils.isEmpty(bean.fRoadOperateCode)&&bean.fRoadOperateCode.length>64){
				this.$message.error("经营许可证号不能超过64个字符");
				return false;
			}
			//
			// if(commonUtils.isEmpty(bean.fRoadOperateName)){
			// 	this.$message.error("业户名称不能为空");
			// 	return false;
			// }
			if(!commonUtils.isEmpty(bean.fRoadOperateName)&&bean.fRoadOperateName.length>64){
				this.$message.error("业户名称不能超过64个字符");
				return false;
			}
			if(commonUtils.isEmpty(bean.fCarType)||!(bean.fCarType>0)){
				this.$message.error("请选择车型");
				return false;
			}
			if(commonUtils.isEmpty(bean.fCarLength)||!(bean.fCarLength>0)){
				this.$message.error("请选择车长");
				return false;
			}
			if(commonUtils.isEmpty(bean.fPlateColor)){
				this.$message.error("请选择车牌颜色");
				return false;
			}
			//
			if(commonUtils.isEmpty(bean.fDrivingPermitFace)){
				this.$message.error("请上传行驶证(正页)");
				return false;
			}
			if(commonUtils.isEmpty(bean.fDrivingPermitNext)){
				this.$message.error("请上传行驶证(副页)");
				return false;
			}
			if(!commonUtils.isEmpty(bean.fOwner)&&bean.fOwner.length>64){
				this.$message.error("车辆所有人不能超过64个字符");
				return false;
			}
			if(!commonUtils.isEmpty(bean.fAddress)&&bean.fAddress.length>128){
				this.$message.error("车辆注册地不能超过128个字符");
				return false;
			}
			if(!commonUtils.isEmpty(bean.fRoadPermitInvalid)&&bean.fRoadPermitInvalid.length>32){
				this.$message.error("道路运输证有效期不能超过32个字符");
				return false;
			}
			// if(commonUtils.isEmpty(bean.fRoadPermitImage)){
			// 	this.$message.error("请上传道路运输证");
			// 	return false;
			// }
			// if(commonUtils.isEmpty(bean.fImageCar)){
			// 	this.$message.error("请上传车辆正面照");
			// 	return false;
			// }
			return true;
		}
    }
};
</script>

