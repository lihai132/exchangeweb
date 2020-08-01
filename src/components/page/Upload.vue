<template>
    <div class="load">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-calendar"></i> 表单
                </el-breadcrumb-item>
                <el-breadcrumb-item>图片上传</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="plugins-tips">
                Element UI自带上传组件。
                访问地址：
                <a
                    href="http://element.eleme.io/#/zh-CN/component/upload"
                    target="_blank"
                >Element UI Upload</a>
            </div>
            <!-- 文件上传得主要功能部分 -->
            <el-upload
                action
                list-type="picture-card"
                :on-change="getFile"
                :limit="1"
                :auto-upload="false"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
            >
                <i class="el-icon-plus"></i>
                
            </el-upload>
            <el-dialog :visible.sync="dialogVisible" size="tiny" width="30%">
                <img width="100%" :src="dialogImageUrl" alt />
            </el-dialog>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            dialogImageUrl: '',
            dialogVisible: false
        };
    },
    methods: {
        getBase64(file) {
            return new Promise(function(resolve, reject) {
                let reader = new FileReader();
                let imgResult = '';
                reader.readAsDataURL(file);
                reader.onload = function() {
                    imgResult = reader.result;
                };
                reader.onerror = function(error) {
                    reject(error);
                };
                reader.onloadend = function() {
                    resolve(imgResult);
                };
            });
        },
        getFile(file, fileList) {
            this.getBase64(file.raw).then(res => {
                console.log(res);
            });
        },
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        }
    }
};
</script>