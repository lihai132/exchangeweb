<template>
<!-- <el-dialog title="出金审核设置" :visible.sync="editVisible" width="700px"> -->
            <el-container>
                <el-main>
                    <div class="information">
                        <div class="news-noe">
                            <div class="title">
                                <div class="left">出金审核设置</div>
                            </div>
                            <div class="nav">
								<el-radio-group v-model="mode">
									<div class="line lineTop">
										<el-radio :label="1">全部通过</el-radio>
										<el-radio :label="2">全部审核</el-radio>
									</div>
									<!-- <div class="line">
										<el-radio :label="3">部分审核</el-radio>
									</div> -->
								</el-radio-group>
								<div class="line">
									<el-radio :label="3">部分审核</el-radio>
									
									<div class="line-center">
										<div class="name">出金金额  ></div>
										<el-input
											size="small"
											v-model="amount"
											style="width:100px"
											@input="amountChange"
											ref="amountInputRef"
										></el-input>元
									</div>
								</div>
                            </div>
							
							<el-button class="submitBtn" type="primary" size="medium" @click="determine" :disabled="submitting">修改</el-button>
                        </div>
                    </div>
                </el-main>
            </el-container>
        <!-- </el-dialog> -->
</template>

<script>
import { fetchData } from '../../../api/index';
import  "../../../assets/css/form/forn.css";
import request from '../../../assets/Public/request.js';
import commonUtils from '../../../utils/commonUtils.js';

export default {
    name: 'basetable',
    data() {
        return {
            query: {
                page: 1,
                pageSize: 15
            },
			amount:"",
            show: false,
            editVisible: true,
			mode:'',
            menus: [],
            butId: 301014007,
            menu: '',
            submitting: false,
        };
    },
    created() {
        this.getData();
        this.getBut();
    },
    methods: {
		indexMethod(index){
			return index+1 + (this.query.page-1)*this.query.pageSize;
		},
        // 获取表格数据
       async getData() {
		   this.submitting=false;
		   let list = await request('/fund/withdraw/setting/checkSetting', this.query);
		   this.mode = list.data.mode;
		   this.amount = list.data.amount;
           if(this.mode){
			   this.mode = parseInt(this.mode);
		   }
        },
		//确定事件
		async  determine() {
			if(!(this.mode)){
				this.$message.error("请选择设置类型");
				return false;
			}
			if(this.mode==3){
				if(commonUtils.isEmpty(this.amount)){
					this.$message.error("请填写出金金额");
					return false;
				}
				if(this.amount<0){
					this.$message.error("出金金额不能小于0");
					return false;
				}
			}
			let obj = {};
			obj.mode=this.mode;
			obj.amount=this.amount;
			this.submitting=true;
			let result = await request('/fund/withdraw/setting/updateCheckSetting', obj);
			this.submitting=false;
			if(result.data==1){
				this.$message.success("修改成功");
			}else if(result.errMsg){
				this.$message.error(result.errMsg);
			}else{
				this.$message.error("操作失败");
			}
		 },
		 amountChange(){
		 	var regu = /^[0-9]+\.?[0-9]*$/;
		 	if (this.amount&&!regu.test(this.amount)) {
		 		let val = this.amount.substring(0, this.amount.length - 1);
		 		if(isNaN(val)){
		 			this.amount = '';
		 		}else{
		 			this.amount = val;
		 		}
		 		this.$refs.amountInputRef.$el.children[0].focus();
		 	}
		 },
        //获取按钮数据
        getBut() {
            let actionList = this.$store.state.Login.actionList;
            actionList.map(item => {
                if (item.fParentId == this.butId) {
                    if(item.fName!='查询'){
                    	this.menus.push(item.fName);
                    }
                }
            });
        },
        
    },
    mounted() {
        this.menu = document.querySelector('#menu');
    },
	components: {
	   
	}
};
</script>
<style scoped>
	.el-container{
		background: #FFFFFF;
		border-radius: 8px;
	}
	.lineTop{
		margin-top: 10px;
	}
	.nav{
		margin-top: 10px;
		padding-left: 20%;
	}
	.news-noe>.title{
		font-size: 22px;
		padding-bottom: 20px;
		border-bottom: 1px solid #C0C0C0;
	}
	.el-radio{
		margin-top: 15px;
		margin-bottom: 15px;
	}
	.line-center{
		display: inline-block;
	}
	.line-center>div{
		font-size: 12px;
	}
	.line-center>div,.line-center>input{
		display: inline-block;
		margin-right: 6px;
	}
	.submitBtn{
		margin-top: 30px;
		margin-left: 30%;
	}
</style>