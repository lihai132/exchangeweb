<template>
    <div class="Popup">
        <el-dialog :title="titleName" :visible.sync="editVisible" width="700px" :close-on-click-modal="false">
            <el-container>
                <div class="main">
                    <div class="information">
                        <!-- 树形结构 -->
                        <el-tree
                            :data="tableData"
							ref="tree"
                            show-checkbox
                            node-key="fId"
                            :default-expanded-keys="expandedKeys"
                            :default-checked-keys="hasPermissionIds"
							:default-expand-all="true"
                            :props="defaultProps"
                        ></el-tree>
                    </div>
                </div>
                <el-footer>
                    <el-button size="small" @click="determine('ruleForm')" :disabled="submitting">确定</el-button>
                    <el-button size="small" @click="cancel">取消</el-button>
                </el-footer>
				<!-- </el-form> -->
            </el-container>
        </el-dialog>
    </div>
</template>
<script>
// import '../../assets/css/popup/popup.css';
import request from '../../assets/Public/request.js';
export default {
    // props:["show"],
    data() {
        return {
            editVisible: false,
			submitting:false,
            bean:{},
			expandedKeys:[],
			hasPermissionIds:[],
			selectedRow:{},
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
			//树形结构的参数
			tableData: [],
			defaultProps: {
			    children: 'list',
			    label: 'fName'
			}
        };
    },
    mounted() {
        // console.log(this.editVisible);
    },
    methods: {
		// 获取表格数据
		async getData(item) {
			let list = [];
			list = await request('/account/role/permissionsList', {"fId":item.fId});
		    this.tableData = list.data.permissions;
			this.hasPermissionIds = list.data.hasPermissionIds;
//			this.expandedKeys = list.data.expandedKeys;
		 },
        receipt(index, row) {
			if(row==null||row==undefined||row==""||!(row.fId>0)){
				this.$message.error("请选择数据");
				return;
			}
			this.selectedRow = row;
			this.titleName='选择权限资源';
            this.editVisible = true;
			this.submitting=false;
            let popup1 = this.$store.state.Popup.popup1;
            this.bean = popup1;
			this.getData(row);
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
			let nodes = this.$refs.tree.getCheckedNodes(false, true);
			if(nodes==null||nodes==undefined||nodes==""||nodes.length==0){
				this.$message.error("请勾选权限");
				return;
			}
			let ids = [];
			for(let i=0;i<nodes.length;i++){
				ids.push(nodes[i].fId);
			}
			let permissionIdStr = ids.join(",");
			let obj = {"fId":this.selectedRow.fId,"permissionIdStr":permissionIdStr};
			this.submitting=true;
			let result = await request('/account/role/setPermissions', obj);
			this.submitting=false;
			if(result.data>=0){
				this.editVisible = false;
				this.$message.success("权限分配成功");
				this.$parent.getData();
			}else if(result.errMsg){
				this.$message.error(result.errMsg);
			}else{
				this.$message.error("操作失败");
			}
        }
    }
};
</script>
<style lang="scss" scoped>
.el-dialog__body {
    padding: 0 !important;
}

.el-dialog__header {
    padding: 10px 10px !important;
    background: #409eff;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .el-dialog__title {
        color: #fff;
    }
    .el-dialog__headerbtn {
       
        top: 13px !important;
       
    }
}

.el-icon-close:hover {
    background: #eee;
    color: #fff;
}

.el-dialog__headerbtn .el-dialog__close {
    color: #fff !important;
}

.pswp,
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

.pswp__bg {
    background: rgba($color: #000000, $alpha: 0.6) !important;
}

.el-dialog {
    .el-container {
        height: 600px;

        .main {
            flex: 1;
            padding: 0 10px;
            overflow: scroll;
             overflow-x: hidden;
        }

        .el-footer {
            height: 60px;
            text-align: right;
            border-top: 1px solid #aaaaaa;
            background: #f8f8f8;
            line-height: 60px;
        }
    }

    .information {
        .news-noe {
            margin-top: 10px;
        }

        .news-noe,
        .news-two,
        .news-three {
            // padding: 10px 0px 0px 10px;
            padding: 0 0 10px 0;

            .title {
                border-bottom: 2px solid #0476ce;

                .left {
                    font-size: 16px;
                    line-height: 24px;
                    border-radius: 12px 0 12px 0;
                    background: #0476ce;
                    color: #fff;
                    width: 100px;
                    text-align: center;
                }
            }

            .nav {
                margin-bottom: 10px;
                padding: 0 20px 0 20px;

                .line {
                    display: flex;
                    justify-content: space-between;

                    .line-center {
                        margin-top: 10px;
                        display: flex;
                        align-items: center;

                        .name {
                            width: 120px;
                            text-align: right;
                            margin-right: 8px;
                        }
                    }
                }
            }
        }

        .news-img {
            padding: 0 10px 0px 10px;

            .title {
                border-bottom: 2px solid #0476ce;

                .left {
                    font-size: 16px;
                    line-height: 24px;
                    border-radius: 12px 0 12px 0;
                    background: #0476ce;
                    color: #fff;
                    width: 100px;
                    text-align: center;
                }
            }

            .nav {
                display: flex;
                padding-top: 10px;
                padding-left: 67px;

                .img {
                    img {
                        width: 140px;
                        height: 140px;
                        margin-right: 10px;
                        border: 1px solid #ccc;
                    }
                }
            }
        }
    }

    // .main::-webkit-scrollbar {
    //     display: none;
    // }
}

</style>

