<template>
    <div class="cancel">
        <el-dialog title="修改密码" :visible.sync="editVisible" width="700px" class="dialog" :close-on-click-modal="false">
            <el-container>
                <el-main>
                    <div class="input">
                        <el-form ref="form" :model="form" label-width="80px">
                            <el-form-item label="旧密码">
                                <el-input v-model.trim="form.oldPwd" maxlength="16" type="password"></el-input>
                            </el-form-item>
                            <el-form-item label="新密码">
                                <el-input v-model.trim="form.newPwd" maxlength="16" type="password"></el-input>
                            </el-form-item>
                        </el-form>
                    </div>
                    <div class="but">
                        <el-button type="primary" @click="determine" :disabled="submitting">提交</el-button>
                    </div>
                </el-main>
                <!-- <el-footer style="height:50px;">
                    <el-button size="small" @click="determine">确定</el-button>
                    <el-button size="small" @click="cancel">取消</el-button>
                </el-footer>-->
            </el-container>
        </el-dialog>
    </div>
</template>
<script>
// import '../../assets/css/popup/popup.css';
import pwdmd5 from '../../assets/js/pwdmd5';
import request from '../../assets/Public/request.js';

export default {
    data() {
        return {
            input: '',
            editVisible: false,
            popupData: {},
			submitting:false,
            form: {
                oldPwd: '',
                newPwd: ''
            }
        };
    },
    created() {},
    methods: {
        //点击弹窗事件
        receipt(index, row) {
            this.editVisible = true;
        },
        //取消事件
        cancel() {
            this.editVisible = false;
        },
        //确定事件
        async determine() {
			var account;
			if(!(this.$store.state.Login.loginData)||!(account = this.$store.state.Login.loginData.data.account)){
				this.open3('请重新登录后再操作');
				return false;
			}
            if (this.form.oldPwd.length == 0) {
                this.open3('旧密码不能为空');
				return false;
            }
            if (this.form.newPwd.length == 0) {
                this.open3('新密码不能为空');
				return false;
            }
			var oldPwd = pwdmd5(account + '_' + this.form.oldPwd);
			var newPwd = pwdmd5(account + '_' + this.form.newPwd);
			var param = {};
			param.oldPwd = oldPwd;
			param.newPwd = newPwd;
			this.submitting=true;
			let result = await request('/account/admin/modifyPwd', param);
			this.submitting=false;
			if(result.data==1){
				this.editVisible = false;
				this.$message.success("修改成功");
			}else if(result.errMsg){
				this.$message.error(result.errMsg);
			}else{
				this.$message.error("操作失败");
			}
        },

        open1(text) {
            this.$message({
                message: text,
                type: 'success'
            });
        },
        open2(text) {
            this.$message.error('提交失败：' + text);
        },
        open3(text) {
            this.$message.error(text);
        }
    },
    mounted() {}
};
</script>

<style lang="scss" scoped>
.dialog {
    /deep/.el-dialog__body {
        padding: 0 !important;
    }

    /deep/ .el-dialog__header {
        padding: 6px 10px !important;
        background: #409eff;
        display: flex;
        justify-content: space-between;
        align-items: center;
        /deep/.el-dialog__title {
            line-height: 20px;
            font-size: 14px;
        }
        /deep/.el-dialog__title {
            color: #fff;
        }
        /deep/.el-dialog__headerbtn {
            top: 9px !important;
            font-size: 14px;
        }
    }

    /deep/.el-icon-close:hover {
        background: #eee;
        color: #fff;
    }

    /deep/.el-dialog__headerbtn .el-dialog__close {
        color: #fff !important;
    }

    /deep/.pswp,
    .pswp--supports-fs,
    .pswp--open,
    .pswp--animate_opacity,
    .pswp--notouch,
    .pswp--css_animation,
    .pswp--svg,
    .pswp--zoom-allowed,
    .pswp--visible,
    .pswp--zoom-allowed,
    .pswp--animated-in,
    .pswp--has_mouse {
        z-index: 9999 !important;
    }

    /deep/.pswp__bg {
        background: rgba($color: #000000, $alpha: 0.6) !important;
    }

    .el-container {
        height: 200px;

        .el-main {
            flex: 1;
            padding: 0;
            padding-bottom: 10px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-around;
            padding: 20px 0;
            .title {
                font-size: 18px;
            }
        }

        .el-footer {
            text-align: right;
            border-top: 1px solid #aaaaaa;
            background: #f8f8f8;
            line-height: 50px;
        }
    }

    .el-main::-webkit-scrollbar {
        display: none;
    }
}
</style>

