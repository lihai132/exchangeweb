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
                                <el-form-item label="主标题" prop="fName" required>
                                    <el-input style="width:200px"  placeholder="请输入内容" width="32"  v-model="data.fName"></el-input>
                                </el-form-item>
                                <el-form-item label="副标题" prop="fContent" required>
                                    <el-input style="width:200px" placeholder="请输入内容" width="32" v-model="data.fContent"></el-input>
                                </el-form-item>
                                <el-form-item label="活动类型" prop="fType"  required>
                                    <el-select style="width:200px;" v-model="data.fType" >
                                        <el-option
                                        v-for="item in this.type"
                                        :key="item.key"
                                        :label="item.value"
                                        :value="item.key">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="活动状态" prop="fStatus" required>
                                    <el-select style="width:200px;" v-model="data.fStatus" >
                                        <el-option
                                        v-for="item in this.status"
                                        :key="item.key"
                                        :label="item.value"
                                        :value="item.key">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="推广链接" prop="fUrl" required>
                                    <el-input style="width:300px" placeholder="请输入内容" width="32" v-model="data.fUrl"></el-input>
                                </el-form-item>
                                <el-form-item label="开始日期" prop="fStartDate" required>
                                    <el-date-picker type="date"  placeholder="选择日期" v-model="data.fStartDate" style="width: 200px;"></el-date-picker>
                                </el-form-item>
                                <el-form-item label="结束日期" prop="fEndDate" required>
                                    <el-date-picker type="date"  placeholder="选择日期" v-model="data.fEndDate" style="width: 200px;"></el-date-picker>
                                </el-form-item>
                                <el-form-item label="图片" prop="fImage" required>
                                    <el-upload
                                    class="avatar-uploader"
                                    :action="this.imgUploadUrl"
                                    name="img"
                                    :show-file-list="false"
                                    :on-success="handleAvatarSuccess"
                                    
                                    :before-upload="beforeAvatarUpload">
                                    <img v-if="data.fImage" :src="data.fImage" name="img" class="avatar">
                                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                    </el-upload>
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
			imageServerUrl:"",
            title:"",
            type:[],
            status:[],
            memberlist:{},
            fDealerCateIdType:[{"key":"3","value":"运营商方案"}],
            rules: {
            fName: [
                { required: true, message: '请输入主标题', trigger: 'blur' },
                { max: 32, message: '长度在 32个字符内', trigger: 'blur' }
            ],
            fContent: [
                { required: true, message: '请输入副标题', trigger: 'blur' },
                { max: 32, message: '长度在 32个字符内', trigger: 'blur' }
            ],
            fType: [
                { required: true, message: '请选择活动类型', trigger: 'blur' }
            ],
            fStatus: [
                { required: true, message: '请选择活动状态', trigger: 'blur' }
            
            ],
            fImage: [
                { required: true, message: '请上传图片', trigger: 'blur' }
            
            ],
            fUrl: [
                { required: true, message: '请输入链接', trigger: 'blur' },
                { max: 256, message: '长度在 256个字符内', trigger: 'blur' }
            
            ],
            fStartDate: [
                { required: true, message: '请选择开始日期', trigger: 'blur' }
            
            ],
            fEndDate: [
                { required: true, message: '请选择结束日期', trigger: 'blur' }
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
            this.type = (await request('/enum/promotionType/api', '')).data;
            this.status = (await request('/enum/promotionStatus/api', '')).data;
            this.imageServerUrl = (await request('/imageServerUrl/api', '')).data;
        },
        async getData() {
		   
			
			
        },
        commitData(){
            
            var jsonData = request('/businessManagement/planningPromotion/add', this.data);
            if(jsonData.errCode != 0){
                return false;
            }else{
                return true;
            }
            
        }
        ,
        receipt(index, row) {
            this.editVisible = true;
            let popup1 = this.$store.state.Popup.popup1;
            this.fDealerCateId = popup1.fDealerCateId;
            this.title = popup1.title;
            this.getData();
            
        },
        //取消事件
        cancel() {
            this.editVisible = false;
        },
        //确定事件
        determine(formName) {
            // if (!this.commitData()) {
            //     return;
            // }
            // this.editVisible = false;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.commitData();
            this.$parent.getData();
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
            this.data.fImage = this.imageServerUrl+jsonData.data.url;
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