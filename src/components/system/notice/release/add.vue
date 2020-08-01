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
                                <div class="formatTittle">- 公告详情</div>
                                <div class="formatTittleright"></div>
                            </div>
                            <el-form ref="dataForm" :rules="rules"  label-suffix=":" :model="data" label-width="130px">
                                <el-form-item prop="fSenderAccount" label="发布人" >
                                    <el-input v-model="data.fSenderAccount" :disabled="true" style="width:215px;"></el-input>
                                </el-form-item>
                                <el-form-item prop="fAuthor" label="发布单位" >
                                    <el-input v-model="data.fAuthor" :disabled="true" style="width:215px;"></el-input>
                                </el-form-item>
                                <el-form-item prop="fEndDate" label="结束时间" required>
                                    <el-date-picker
                                    v-model="data.fEndDate"
                                    type="datetime"
                                    placeholder="选择日期时间">
                                    </el-date-picker>
                                </el-form-item>
                                <el-form-item prop="fTitle" label="标题" >
                                    <el-input v-model="data.fTitle" style="width:215px;" required></el-input>
                                </el-form-item>
                                <el-form-item prop="fContent" label="内容" required>
                                    <el-input type="textarea" rows="10" v-model="data.fContent" style="width:400px;"></el-input>
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
                fSenderAccount:"",
                fAuthor:"",
                fTitle:"",
                fContent:"",
                fEndDate:""
            },
            title:"",
            type:[],
            status:[],
            memberlist:{},
            flag:false,
            rules: {
				fEndDate:[{ required: true, message: '结束时间不能为空', trigger: 'blur' }],
            fTitle: [
                { required: true, message: '请输入标题', trigger: 'blur' },
                { max: 64, message: '长度在64个字符内', trigger: 'blur' }
            ],
            fContent: [
                { required: true, message: '请输入内容', trigger: 'blur' },
                { max: 256, message: '长度在256个字符内', trigger: 'blur' }
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
        // 获取表格数据
        async init() {
            let temp = (await request('/systemManager/notice/detailex', "")).data;
            this.data.fAuthor = temp.fAuthor;
            this.data.fSenderAccount = temp.fSenderAccount;
            
        },
        async getData() {
			
        },
        async commitData(){
            var jsonData = (await request('/systemManager/notice/add', this.data));
            //console.log(jsonData);
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
              let obj = this;
              //this.commitData();
             request('/systemManager/notice/add', this.data).then(response => { 
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
        }
    },
        components: {
            
        }
    
}
</script>
