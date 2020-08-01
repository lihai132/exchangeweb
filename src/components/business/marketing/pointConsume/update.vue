<template>
    <div class="Popup">
        <!-- <el-button type="success" size="mini" @click="receipt()">接单</el-button> -->
        <el-dialog  v-bind:title="title"   :visible.sync="editVisible" width="700px" :close-on-click-modal="false">
            <el-container>
                <el-main>
                    <div class="information">
                        <div class="news-noe">
                            <div class="formatLine">
                                <div class="formatTittleleft"></div>
                                <div class="formatTittle">- 基本信息</div>
                                <div class="formatTittleright"></div>
                            </div>
                            <el-form ref="dataForm" :rules="rules" label-suffix=":" :model="data" label-width="130px">
                                <el-form-item label="投诉类型" disabled="true" prop="fType"  required>
                                    <el-select style="width:200px;" v-model="data.fType" >
                                        <el-option
                                        v-for="item in this.feedbackType"
                                        :key="item.key"
                                        :label="item.value"
                                        :value="item.key">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="投诉人类型" prop="fTraderType" required>
                                    <el-select style="width:200px;" disabled="true" v-model="data.fTraderType" >
                                        <el-option
                                        v-for="item in this.traderType"
                                        :key="item.key"
                                        :label="item.value"
                                        :value="item.key">
                                        </el-option>
                                    </el-select>
                                </el-form-item>

                                <el-form-item label="投诉人"  prop="fName" required>
                                    <el-input style="width:200px" disabled="true"  placeholder="请输入内容" width="32"  v-model="data.fName"></el-input>
                                </el-form-item>
                                <el-form-item label="投诉人电话" prop="fMobile" required>
                                    <el-input style="width:200px" disabled="true" placeholder="请输入内容" width="32" v-model="data.fMobile"></el-input>
                                </el-form-item>
                                
                                <el-form-item label="投诉时间" prop="fCreateTime" required>
                                    <el-date-picker type="datetime"  disabled="true"  v-model="data.fCreateTime" style="width: 200px;"></el-date-picker>
                                </el-form-item>
                                <el-form-item label="投诉内容">
                                    <el-input type="textarea" disabled="true" :rows="5" style="width:400px;" v-model="data.fContent"></el-input>
                                </el-form-item>
                                <div class="formatLine">
                                    <div class="formatTittleleft"></div>
                                    <div class="formatTittle">- 处理结果</div>
                                    <div class="formatTittleright"></div>
                                </div>
                                <el-form-item prop="fReplyContent" label="处理结果">
                                        <el-input type="textarea" :rows="5" style="width:400px;" v-model="data.fReplyContent"></el-input>
                                    </el-form-item>
                            </el-form>
                            
                              
                        </div>
                        
                        
                        
                    </div>
                </el-main>
                <el-footer>
                    <el-button size="small" @click="determine('dataForm')">确定</el-button>
                    <el-button size="small" @click="cancel">取消</el-button>
                </el-footer>
            </el-container>
        </el-dialog>
    </div>
</template>
<script>
import commonUtils from '../../../../utils/commonUtils.js';
import request from '../../../../assets/Public/request.js';
import '../../../../assets/css/popup/popup.css';
import check from '../../../../assets/Public/check.js';
export default {
    // props:["show"],
    data() {
        return {
            editVisible: false,
            maxlenthCharge: "",
            data:{
                fId:"",
                fName:'',
                fContent:'',
                fType:"",
                fStatus:'',
                fImage:'',
                fUrl:"",
                fStartDate:"",
                fEndDate:""
            },
            imgUploadUrl:"",
            feedbackType:"",
            traderType:"",
            title:"",
            type:[],
            status:[],
            memberlist:{},
            fDealerCateIdType:[{"key":"3","value":"运营商方案"}],
            rules: {
            fReplyContent: [
                { required: true, message: '请输入处理结果', trigger: 'blur' },
                { max: 32, message: '长度在256个字符内', trigger: 'blur' }
            ]
            }
        };
    },
    created() {
        this.init();
        
    },
    mounted() {
        // console.log(this.editVisible);
    },
    methods: {
        async init() {
            this.imgUploadUrl = commonUtils.imgUploadUrl;
            this.feedbackType = (await request('/enum/feedbackType/api', '')).data;
            this.traderType = (await request('/enum/traderType/api', '')).data;
        },
        async getData() {
		   
			this.data = (await request('/businessManagement/feedback/reply', this.data)).data;
			this.data.fTraderType = this.data.fTraderType.toString();
            this.data.fType = this.data.fType.toString();
        },
        async commitData(){
            
            var jsonData = await request('/businessManagement/feedback/replyDo', this.data);
            if(jsonData.errCode != 0){
                return false;
            }else{
				this.$parent.getData();
                return true;
            }
            
        }
        ,
        receipt(index, row) {
            this.editVisible = true;
            let popup1 = this.$store.state.Popup.popup1;
            this.data.fId = popup1.fId;
            this.title = "投诉处理";
            this.getData();
  
            
        },
        //取消事件
        cancel() {
            this.editVisible = false;
        },
        //确定事件
        determine(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.commitData();
            this.editVisible = false;
          } else {
            console.log('error submit!!');
            return false;
          }
        });
        },
        handleRequest(item){
            console.log(item);
            var formdata = this.formData.append("img",item.file);
            //formdata = ('img',item.file);
            let config={
                header:{'Content-Type':'multipart/form-data'}
            }
            this.$axios.post(this.imgUploadUrl,formdata,config).then((rens)=>{console.log(res)})
        }
        ,
        handleAvatarSuccess(res, file) {
            let jsonData = JSON.parse(res.body);
            this.data.fImage = jsonData.data.url;
        },
        beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg';
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG) {
            this.$message.error('上传头像图片只能是 JPG 格式!');
            }
            if (!isLt2M) {
            this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isJPG && isLt2M;
        
        }
    }
    
}
</script>

<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 100%;
    height: 100%;
    display: block;
  }
</style>