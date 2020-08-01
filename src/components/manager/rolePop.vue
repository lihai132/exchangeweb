<template>
    <div class="Popup">
        <!-- <el-button type="success" size="mini" @click="receipt()">接单</el-button> -->
        <el-dialog :title="titleName" :visible.sync="editVisible" width="700px" :close-on-click-modal="false">
            <el-container>
				<!-- <el-form :rules="rules" :model="ruleForm" ref="ruleForm"> -->
                <el-main>
                    <div class="information">
                        <div class="news-noe">
                            <div class="title">
                                <div class="left">- 基本信息</div>
                            </div>
                            <div class="nav">
                                <div class="line">
                                    <div class="line-center" style="padding-top:15px">
                                        <div class="name required">角色名称：</div>
                                        <el-input
                                            size="small"
											placeholder="请输入角色名称"
                                            v-model.trim="bean.fName"
                                            style="width:180px"
											maxlength="32"
											@input="bean.fName = commonUtils.trimAll(bean.fName)"
                                        ></el-input>
                                    </div>
                                </div>
                            </div>
                        </div>
						
						<div style="margin: 25px;"></div>
						<div class="news-two" v-show="bean.showType!=3">
						    <div class="title">
						        <div class="left">- 描述信息</div>
						    </div>
						    <div class="nav">
						        <div class="line">
						            <div class="line-center" style="padding-top:15px">
						                <div class="name">描述：</div>
						                <el-input
						                    size="small"
						        			type="textarea"
						                    placeholder="请输入内容"
						                    v-model="bean.fDescn"
						                    style="width:420px;"
						        			rows="7"
						        			autoHeight="true"
											maxlength="64"
						                ></el-input>
						            </div>
						        </div>
						    </div>
						</div>
						
                    </div>
                </el-main>
                <el-footer>
                    <el-button size="small" @click="determine('ruleForm')" :disabled="submitting">确定</el-button>
                    <el-button size="small" @click="cancel">取消</el-button>
                </el-footer>
				<!-- </el-form> -->
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
import '../../assets/css/popup/popup.css';
import request from '../../assets/Public/request.js';
import commonUtils from '../../utils/commonUtils.js';

export default {
    data() {
        return {
			commonUtils:commonUtils,
            editVisible: false,
			submitting:false,
            bean:{},
            status: [
                {
                    value: '1',
                    label: '启用'
                },
                {
                    value: '2',
                    label: '禁用'
                }
            ],
            titleName: '',
            value2: '',
            img1: require('../../assets/img/logo.jpg'),
            img2: require('../../assets/img/goods.jpg'),
			ruleForm:{
				fAccount:''
			},
			rules:{
				fAccount: [
					{ required: true, message: '请输入登录账号', trigger: 'blur' },
					{ min: 1, max: 32, message: '长度不能超过{{max}}字符', trigger: 'blur' }
				],
			}
        };
    },
    mounted() {
        // console.log(this.editVisible);
    },
    methods: {
        receipt(index, row) {
            this.editVisible = true;
			this.submitting=false;
            let popup1 = this.$store.state.Popup.popup1;
            this.bean = popup1;
			if(this.bean.showType==1){
				this.titleName='修改角色信息';
			}else{
				this.titleName='新增角色';
			}
        },
		change (e) {
		      this.$forceUpdate()
		},
        //取消事件
        cancel() {
            this.editVisible = false;
        },
        //确定事件
       async  determine(formName) {
			let bean = this.bean;
			if(!this.checkSubmit(bean)){
				return;
			}
			this.submitting=true;
			let url = this.bean.fId>0?'/account/role/update':'/account/role/add';
			let result = await request(url, this.bean);
			this.submitting=false;
			if(result.data==1){
				this.editVisible = false;
				if(this.bean.fId>0){
					this.$message.success("修改成功");
				}else{
					this.$message.success("新增成功");
				}
				this.$parent.getData();
			}else if(result.errMsg){
				this.$message.error(result.errMsg);
			}else{
				this.$message.error("操作失败");
			}
        },
		checkSubmit(bean){
			if(!(bean.fName)){
				this.$message.error("请填写角色名称");
				return false;
			}
			if(bean.fName.length>32){
				this.$message.error("角色名称不能超过32个字符");
				return false;
			}
			if(bean.fDescn&&bean.fDescn.length>64){
				this.$message.error("角色描述不能超过64个字符");
				return false;
			}
			return true;
		}
    }
};
</script>

