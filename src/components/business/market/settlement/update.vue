<template>
    <div>
        <div class="container">
            <div class="formatLine">
                <div class="formatTittleleft"></div>
                <div class="formatTittle">- 结算设置</div>
                <div class="formatTittleright"></div>
            </div>

            <div>
                <el-form ref="form" :model="form" label-width="180px">
                    <el-form-item label=""> </el-form-item>
                </el-form>
                <div style="width:100%;margin:5px;padding-left:100px;font-weight:700;">
                    <div style="margin:5px;display:inline;color:#009DD9;font-size:18px;width:300px;">当前结算模式：</div>
                    <div style="margin:5px;display:inline;color:red;">{{modelEx}}</div>
                </div>
                <div style="width:100%;margin:5px;padding-left:100px;font-weight:700;">
                    <div style="margin:5px;display:inline;color:#009DD9;font-size:18px;">当前结算状态：</div>
                    <div style="margin:5px;display:inline;color:red;">结算中</div>
                </div>
                <div style="width:100%;margin:5px;padding-left:100px;font-weight:700;">
                    <div style="margin:5px;display:inline;color:#009DD9;font-size:18px;">
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;结算模式：
                    </div>
                    <div style="margin:5px;display:inline;color:red;">
                        <el-radio v-model="data.model" label="1">自动</el-radio>
                        <el-radio v-model="data.model" label="2">手动</el-radio>
                    </div>
                </div>
                <div style="width:100%;margin:5px;padding-left:100px;font-weight:700;">
                    <div  @click="show" style="margin:5px;display:inline;color:#009DD9;font-size:18px;">自动结算时间：</div>
                    <div style="margin:5px;display:inline;color:red;">
                        <el-time-select
                        placeholder="起始时间"
                        v-model="data.time"
                        :picker-options="{
                        start: '00:01',
                        step: '00:01',
                        end: '23:59'
                        }">
                        </el-time-select>
                    </div>
                </div>
            </div>
            <div style="width:100%;text-align:center;line-height:40px;">
                <el-button type="primary" @click="submitForm" style="width:120px;height:30px;">设置</el-button>
            </div>
        </div>
    </div>
</template>

<script>
import request from '../../../../assets/Public/request.js';
import '../../../../assets/css/popup/popup.css';
export default {
    data() {
        return {
            data: {
                
            },
            modelEx:'',
            result: ''
        };
    },
    created() {
        this.getData();
    },
    methods: {
        async getData() {
            this.data = (await request('/business/setUp/detail', "")).data;
            console.log(this.data.model);
            if(this.data.model == 1){
                this.modelEx = "自动计算";
            }else{
                this.modelEx = "手动计算";
            }
            console.log(this.modelEx);
        },
        async submitForm() {
            this.result = await request('/business/setUp/settlement', this.data);
            if (this.result.data == 'ok') {
                this.$message.success('修改成功！');
            }
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        show(){
            console.log(this.data.time);
        }
    },
    mounted() {}
};
</script>
<style scoped>
.el-form-item__label {
    width: 180px;
    color: red;
}
.temp {
    font-size: 26px;
}
</style>
