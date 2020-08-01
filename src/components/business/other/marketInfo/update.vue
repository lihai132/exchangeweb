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
                                <div class="formatTittle">- 修改行情</div>
                                <div class="formatTittleright"></div>
                            </div>
                            <el-form ref="dataForm" :rules="rules"  label-suffix=":" :model="data" label-width="130px">
                                
                                <el-form-item prop="fOrderType" label="运输类型" >
                                    <el-select v-model="data.fOrderType" placeholder="请选择">
                                        <el-option
                                        v-for="item in this.ioOrderSendType"
                                        :key="item.key"
                                        :label="item.value"
                                        :value="item.key">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item prop="fInvoiceFlag" label="是否开票" >
                                    <el-select v-model="data.fInvoiceFlag" placeholder="请选择">
                                        <el-option label="是" value="1"></el-option>
                                        <el-option label="否" value="0"></el-option>
                                    </el-select>
                                </el-form-item>
                                
                                <div style="width:800px;">
                                    <el-form-item prop="fSheng"  style="width:270px;display:inline-block;margin-right:20px;" label="起运地 省" >
                                        <el-select v-model="data.fSheng" @change="shengChange" :clearable="true">
                                                <el-option
                                                v-for="item in this.provinces"
                                                :key="item.fId"
                                                :label="item.fName"
                                                :value="item.fId">
                                                </el-option>
                                        </el-select>
                                    </el-form-item>

                                    <el-form-item prop="fCity" label-width="40px" style="width:170px;display:inline-block;margin-right:20px;" label="市" >
                                        <el-select v-model="data.fCity" @change="cityChange" :clearable="true">
                                                <el-option
                                                v-for="item in this.cities"
                                                :key="item.fId"
                                                :label="item.fName"
                                                :value="item.fId">
                                                </el-option>
                                        </el-select>
                                    </el-form-item>


                                    <el-form-item prop="fQun" label-width="40px"  style="width:170px;display:inline-block;margin-right:20px;" label="区" >
                                        <el-select v-model="data.fQun" @change="getdistance" :clearable="true">
                                                <el-option
                                                v-for="item in this.quns"
                                                :key="item.fId"
                                                :label="item.fName"
                                                :value="item.fId">
                                                </el-option>
                                        </el-select>
                                    </el-form-item>
                            </div>

                            <div style="width:800px;">
                                    <el-form-item prop="fSheng1"  style="width:270px;display:inline-block;margin-right:20px;" label="目的地 省" >
                                        <el-select v-model="data.fSheng1" @change="shengChange1" :clearable="true">
                                                <el-option
                                                v-for="item in this.provinces1"
                                                :key="item.fId"
                                                :label="item.fName"
                                                :value="item.fId">
                                                </el-option>
                                        </el-select>
                                    </el-form-item>

                                    <el-form-item prop="fCity1" label-width="40px"  style="width:170px;display:inline-block;margin-right:20px;" label="市" >
                                        <el-select v-model="data.fCity1" @change="cityChange1" :clearable="true">
                                                <el-option
                                                v-for="item in this.cities1"
                                                :key="item.fId"
                                                :label="item.fName"
                                                :value="item.fId">
                                                </el-option>
                                        </el-select>
                                    </el-form-item>


                                    <el-form-item prop="fQun1" label-width="40px"  style="width:170px;display:inline-block;margin-right:20px;" label="区" >
                                        <el-select v-model="data.fQun1" @change="getdistance" :clearable="true">
                                                <el-option
                                                v-for="item in this.quns1"
                                                :key="item.fId"
                                                :label="item.fName"
                                                :value="item.fId">
                                                </el-option>
                                        </el-select>
                                    </el-form-item>
                                </div>
                                <el-form-item prop="fGoodsName" label="货物名称" >
                                    <el-input v-model="data.fGoodsName" style="width:215px;"></el-input>
                                </el-form-item>
                                <el-form-item prop="fFreight" label="价格" >
                                    <el-input v-model.number="data.fFreight" maxlength="10" style="width:215px;"></el-input>元
                                </el-form-item>
                                <el-form-item prop="fWeight" label="重量" >
                                    <el-input v-model.number="data.fWeight" maxlength="9" style="width:215px;"></el-input>吨
                                </el-form-item>
                                <el-form-item prop="fVolume" label="体积" > 
                                    <el-input v-model.number="data.fVolume" maxlength="9" style="width:215px;"></el-input>立方米
                                </el-form-item>
                                <el-form-item prop="fDistance" label="距离" >
                                    <el-input v-model.number="data.fDistance" maxlength="9" style="width:215px;" :disabled="true"></el-input>公里
                                </el-form-item>
                                <el-form-item prop="fTruckType" label="车型" >
                                    <el-select v-model="data.fTruckType"  placeholder="请选择">
                                        <el-option
                                        v-for="item in this.ioCarType"
                                        :key="item.key"
                                        :label="item.value"
                                        :value="item.key">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item prop="fTruckLength" label="车长" >
                                    <el-select v-model="data.fTruckLength" placeholder="请选择">
                                        <el-option
                                        v-for="item in this.ioCarLenghtType"
                                        :key="item.key"
                                        :label="item.value"
                                        :value="item.key">
                                        </el-option>
                                    </el-select>
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
                fQuotationId:"",
                fOrderType:"",
                fInvoiceFlag:"",
                fSheng:"",
                fCity:"",
                fQun:"",
                fSheng1:"",
                fCity1:"",
                fQun1:"",
                fGoodsName:"",
                fFreight:"",
                fWeight:"",
                fVolume:"",
                fDistance:"",
                fTruckType:"",
                fTruckLength:"",
            },
            provinces:[],
            cities:[],
            quns:[],
            provinces1:[],
            cities1:[],
            quns1:[],
            ioOrderSendType:[],
            ioCarType:[],
            ioCarLenghtType:[],
            imgUploadUrl:"",
            title:"",
            type:[],
            status:[],
            memberlist:{},
            flag:false,
            rules: {
            fOrderType: [
                { required: true, message: '请选择运输类型', trigger: 'blur' },
                { max: 32, message: '长度在 32个字符内', trigger: 'blur' }
            ],
            fInvoiceFlag: [
                { required: true, message: '请选择是否开票', trigger: 'blur' },
                { max: 32, message: '长度在 32个字符内', trigger: 'blur' }
            ],
            fSheng: [
                { required: true, message: '请选择省', trigger: 'blur' }
            ],
            fCity: [
                { required: true, message: '请选择市', trigger: 'blur' }
            ],
            fQun: [
                { required: true, message: '请选择区', trigger: 'blur' }
            ],
            fSheng1: [
                { required: true, message: '请选择省', trigger: 'blur' }
            ],
            fCity1: [
                { required: true, message: '请选择市', trigger: 'blur' }
            ],
            fQun1: [
                { required: true, message: '请选择区', trigger: 'blur' }
            ],
            fGoodsName: [
                { required: true, message: '请输入货物名称', trigger: 'blur' },
                { max: 64, message: '长度在 64个字符内', trigger: 'blur' }
            ],
            fFreight: [
                { required: true, message: '请输入价格', trigger: 'blur' }
            ],
            fWeight: [
                { required: true, message: '请输入重量', trigger: 'blur' }
            ],
            fVolume: [
                { required: true, message: '请输入体积', trigger: 'blur' }
            ],
            fDistance: [
                { required: true, message: '请输入距离', trigger: 'blur' }
            ],
            fTruckType: [
                { required: true, message: '请选择车型', trigger: 'blur' }
            ],
            fTruckLength: [
                { required: true, message: '请选择车长', trigger: 'blur' }
            ],
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
        async shengChange(){
            this.data.fQun = "";
            this.data.fCity = "";
            if(this.data.fSheng != ""){
            this.cities = (await request('/address/pid/'+this.data.fSheng, '')).data;
            }
        },
        async cityChange(){
            this.data.fQun = "";
            if(this.data.fCity != ""){
                this.quns = (await request('/address/pid/'+this.data.fCity, '')).data;
            }
        },
        async shengChange1(){
            this.data.fQun1 = "";
            this.data.fCity1 = "";
            if(this.data.fSheng1 != ""){
                this.cities1 = (await request('/address/pid/'+this.data.fSheng1, '')).data;
            }
        },
        async cityChange1(){
            this.data.fQun1 = "";
            if(this.data.fCity1 != ""){
                this.quns1 = (await request('/address/pid/'+this.data.fCity1, '')).data;
            }
        },
        // 获取表格数据
        async init() {
            let temp = (await request('/address/province', '')).data;
            this.provinces = temp;
            this.provinces1 = temp;
            this.ioOrderSendType = (await request('/enum/ioOrderSendType/api', '')).data;
            this.ioCarType = (await request('/enum/ioCarType/api', '')).data;
            this.ioCarLenghtType = (await request('/enum/ioCarLenghtType/api', '')).data;
            
        },
		getdistance(){
			if(this.data.fQun !== '' && this.data.fQun1 !== ''){
				let param = {
					"startId":this.data.fQun+"",
					"endId":this.data.fQun1+""
				}
				request('/getDistinceDTO/api', param).then(res=>{
					let dis = res.data.dis;
					this.data.fDistance = parseFloat(dis).toFixed(0);
				})
			}
			
		}
		,
        async getData() {
		   
			let temp = (await request('/businessManagement/marketQuotation/detail', {"fQuotationId":this.data.fQuotationId.toString()})).data
			if(temp != null){
                this.data = temp;


                this.data.fOrderType = this.data.fOrderType.toString();
                this.data.fInvoiceFlag = this.data.fInvoiceFlag==1?"1":"0";
                this.data.fTruckType = this.data.fTruckType.toString();
                this.data.fTruckLength = this.data.fTruckLength.toString();
                // this.data.fSheng = this.data.fSheng.toString();
                // this.data.fSheng1 = this.data.fSheng1.toString();
                // this.data.fCity = this.data.fCity.toString();
                // this.data.fCity1 = this.data.fCity1.toString();
                // this.data.fQun = this.data.fQun.toString();
                // this.data.fQun1 = this.data.fQun1.toString();

                this.cities = (await request('/address/pid/'+this.data.fSheng, '')).data;
                this.cities1 = (await request('/address/pid/'+this.data.fSheng1, '')).data;
                this.quns = (await request('/address/pid/'+this.data.fCity, '')).data;
                this.quns1 = (await request('/address/pid/'+this.data.fCity1, '')).data;
                

            }
        },
        async commitData(){
            var jsonData = (await request('/businessManagement/marketQuotation/update', this.data));
            if(jsonData.errCode != 0){
                this.$message.error(jsonData.errMsg);
                this.flag = false;
                return false;
            }else{
                this.flag = true;
                return true;
            }
            
        }
        ,
        receipt(index, row) {
            this.editVisible = true;
            let popup1 = this.$store.state.Popup.popup1;
            this.data.fQuotationId = popup1.fQuotationId;
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
              let obj = this;
              //this.commitData();
             request('/businessManagement/marketQuotation/update', this.data).then(response => { 
                 if(response.errCode != "0"){
                     this.$message.error(response.errMsg);
                     return;
                 }else{
                    obj.$parent.getData();
                    obj.editVisible = false;
                 }
             });
             return;
             
            
          } else {
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