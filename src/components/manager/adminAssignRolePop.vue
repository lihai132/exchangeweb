<template>
    <div class="Popup">
        <el-dialog :title="titleName" :visible.sync="editVisible" width="700px" :close-on-click-modal="false">
            <el-container>
                <el-main>
					<div class="box" style="position: relative; overflow: auto;height:90%;">
					    <el-table
					        :data="tableData"
							row-key="fId"
					        border
					        class="table"
					        ref="multipleTable"
					        header-cell-class-name="table-header"
					        highlight-current-row
					        @row-click="clickTableRow"
					        @row-contextmenu="rightClick"
					        :summary-method="getSummaries"
					        style="position: absolute; width: auto; max-width: none;"
					    >
					        <el-table-column type="selection" width="55"></el-table-column>
					        <el-table-column :show-overflow-tooltip="true" prop="fName" label="角色名称" width="160" align="center"></el-table-column>
					        <el-table-column :show-overflow-tooltip="true" prop="fType" :formatter="typeFormat" label="角色类型" width="120" align="center"></el-table-column>
					        <el-table-column :show-overflow-tooltip="true" prop="fDescn" label="描述" width="160" align="center"></el-table-column>
					    </el-table>
					</div>
					<!-- <div class="page">
					    <el-pagination
					        @size-change="handleSizeChange"
					        @current-change="handleCurrentChange"
					        :current-page="currentPage"
					        :page-size="15"
					        layout="total,  prev, pager, next, jumper"
					        :total="totalNumber"
					        @contextmenu.prevent="rightClick"
					    ></el-pagination>
					</div> -->
                </el-main>
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
import '../../assets/css/popup/popup.css';
import request from '../../assets/Public/request.js';
export default {
    // props:["show"],
    data() {
        return {
            editVisible: false,
			submitting:false,
			tableData: [],
            bean:{},
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
			query: {
			    page: 1,
			    pageSize: 100
			},
            titleName: '',
            value2: '',
            img1: require('../../assets/img/logo.jpg'),
            img2: require('../../assets/img/goods.jpg'),
			ruleForm:{
				fAccount:''
			},
			rules:{
				fAccount: [
					{ required: true, message: '请输入登录账号', trigger: 'blur' },
					{ min: 1, max: 32, message: '长度不能超过{{max}}字符', trigger: 'blur' }
				],
			},
			Total1: '',
			Total2: '',
			currentPage: 1,
			clickData: {},
			rightData: [],
			currentRowIndex: 0, // 获取当前右键点击的table行下标
			totalNumber: 0,
        };
    },
    mounted() {
        // console.log(this.editVisible);
    },
    methods: {
		// 获取表格数据
		async getData() {
			let list = [];
			this.query.mid = this.selectedRow.fAdminId;
			list = await request('/account/admin/roleList', this.query);
		     this.tableData = list.data.roles;
		     this.totalNumber = list.data.roles.length/* list.data.total */;
			 let hasRoleIDs = list.data.hasRoleIDs;
			 let len = hasRoleIDs.length;
			 if(len>0){
				 this.tableData.forEach(item => {
					 for(let i=0;i<len;i++){
						 if(hasRoleIDs[i]==item.fId){
							 this.$nextTick(() => {
							      this.$refs.multipleTable.toggleRowSelection(item, true);
							 });
							 break;
						 }
					 }
				 });
			 }
		 },
        receipt(index, row) {
			if(row==null||row==undefined||row==""||!(row.fAdminId>0)){
				this.$message.error("请选择数据");
				return;
			}
			this.selectedRow = row;
			this.titleName="角色分配";
            this.editVisible = true;
			this.submitting=false;
			this.getData();
            // let popup1 = this.$store.state.Popup.popup1;
            // this.bean = popup1;
        },
		typeFormat(row) {
            if (row.fType == 1) {
                return '系统内置角色';
            }
            if (row.fType == 2) {
                return '用户创建角色';
            }
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
		   let selectedDatas = this.$refs.multipleTable.selection;
		    if(selectedDatas==null||selectedDatas==undefined||selectedDatas==""||selectedDatas.length==0){
				this.$message.error("请选择需要分配的角色");
				return;
			}
			let roleIds = [];
			for(let i=0;i<selectedDatas.length;i++){
				roleIds.push(selectedDatas[i].fId);
			}
			let roleIdStr = roleIds.join(",");
			let obj = {"mid":this.selectedRow.fAdminId,"roleIdStr":roleIdStr};
			this.submitting=true;
			let result = await request('/account/admin/distributeRole', obj);
			this.submitting=false;
			if(result.data>=0){
				this.editVisible = false;
				this.$message.success("分配成功");
				this.$parent.getData();
			}else if(result.errMsg){
				this.$message.error(result.errMsg);
			}else{
				this.$message.error("操作失败");
			}
        },
		getSummaries(param) {
		    const { columns } = param;
		
		    const sums = [];
		    columns.forEach((column, index) => {
		        if (index === 0) {
		            sums[index] = '总计';
		            return;
		        }
		        //this.closeList等等是后台返回的总的数据，然后取值到这里
		        switch (column.property) {
		            case 'marketNumber':
		                sums[index] = this.Total1;
		                break;
		            case 'waybillNumber':
		                sums[index] = this.Total2;
		                break;
		
		            default:
		                break;
		        }
		    });
		
		    return sums;
		},
		//鼠标左键点击表格事件
		clickTableRow(row, event, column) {
			this.$refs.multipleTable.toggleRowSelection(row);
		},
		rightClick(row, column, event) {
		    var menu = document.querySelector('#menu');
		    event.preventDefault();
		    //获取我们自定义的右键菜单
		
		    // 根据事件对象中鼠标点击的位置，进行定位
		    this.menu.style.left = event.clientX - 230 + 'px';
		    this.menu.style.top = event.clientY - 70 + 'px';
		    // 改变自定义菜单的隐藏与显示
		    menu.style.display = 'block';
		    console.log(row, column);
		    // 获取当前右键点击table下标
		    this.tableData.forEach((item, index) => {
		        if (item.name === row.name) {
		            this.currentRowIndex = index;
		            return false;
		        }
		    });
		},
		handleCurrentChange(val) {
		    let num = Math.ceil(this.totalNumber / this.query.pageSize);
		    if (val > num) {
		    } else {
				this.query.page = val;
		        this.getData();
		    }
		},
		// 分页导航
		handleSizeChange(val) {
		    console.log(`每页 ${val} 条`);
		},
    }
};
</script>

