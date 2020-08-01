<template>
    <div>
        <div class="container">
            <div class="formatLine">
                <div class="formatTittleleft"></div>
                <div class="formatTittle">- 开休市管理</div>
                <div class="formatTittleright"></div>
            </div>
            <div class="form-box">
                <el-form ref="data">
                    <div style="width:100%;margin:5px;padding-left:100px;font-weight:700;">
                        <div style="margin:5px;display:inline;color:#009DD9;font-size:18px;">交易日期：</div>
                        <div style="margin:5px;display:inline;color:red;">{{data}}</div>
                    </div>
                    <div style="width:100%;margin:5px;padding-left:100px;font-weight:700;">
                        <div style="margin:5px;display:inline;color:#009DD9;font-size:18px;">交易状态：</div>
                        <div style="margin:5px;display:inline;color:red;">交易中</div>
                    </div>
                </el-form>
            </div>
            <div style="width:100%;text-align:center;line-height:40px;">
                <el-button type="primary" style="width:120px;height:30px;">开始交易</el-button>
                <el-button type="primary" style="width:120px;height:30px;">暂停交易</el-button>
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
                forechange: '1',
                errortimes: '',
                min: '',
                max: '',
                count: '',
                timeout: ''
            },
            result: ''
        };
    },
    created() {
        this.getData();
    },
    methods: {
        async getData() {
			this.data = "";
            this.data = (await request('/business/openingClosing', this.query)).data;
        },
        async submitForm() {
           
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        }
    },
    mounted() {}
};
</script>
<style scoped>
.el-form-item__label {
    width: 180px;
}
.temp {
    font-size: 26px;
}
</style>
