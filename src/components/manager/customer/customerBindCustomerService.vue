<template>
    <div class="BaseTable" @click="onMouseDown">
        <div class="container">
            <div class="head">
                <div class="head-one">
					<div class="input1">
					    <div class="title">运营商编号/简称：</div>
					    <el-input v-model="query.memberCodeName" maxlength="32"  style="width:170px"></el-input>
					</div>
					<!-- <div class="input1">
					    <div class="title">机构编号/简称：</div>
					    <el-input v-model="query.orgCodeName" maxlength="32" style="width:170px"></el-input>
					</div> -->
					<div class="input1">
					    <div class="title">客户账号/简称：</div>
					    <el-input v-model="query.accountOrName" maxlength="32" style="width:170px"></el-input>
					</div>
					<div class="input1">
					    <div class="title">企业名称：</div>
					    <el-input v-model="query.companyName" maxlength="32" style="width:170px"></el-input>
					</div>
                </div>
				
				<div class="head-two">
					<div class="input2">
					    <div class="title">客服账号/简称：</div>
					    <el-input v-model="query.customerDispatcherAccountOrName"  style="width:170px"></el-input>
					</div>
					<div class="input2">
					    <div class="title">是否分配：</div>
					    <el-select
					        v-model="query.fOperatorIdType"
					        class="handle-select"
					        style="width:170px"
							@change="$forceUpdate()"
					    >
							<el-option key="0" label="全部" value="0"></el-option>
					        <el-option key="1" label="是" value="1"></el-option>
					        <el-option key="2" label="否" value="2"></el-option>
					    </el-select>
					</div>
					<div class="but">
					    <el-button type="primary" @click="query.page=1;getData()" style="width:100px">查询</el-button>
					    <el-button type="primary" @click="reset" style="width:100px">重置</el-button>
					</div>
				</div>
				
            </div>

            <div class="from-head">
                <el-button
                    style="height:26px; line-height: 26px;padding:0 8px;"
                    v-for="(item,index) in menus"
                    :key="index"
					@click="btnClick(item)"
                >{{item}}</el-button>
            </div>
            <el-table
                :data="tableData"
                border
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
                highlight-current-row
                @row-click="clickTableRow"
                @row-contextmenu="rightClick"
                :summary-method="getSummaries"
                
            >
				<el-table-column label="序号" type="index" width="80" :index='indexMethod' align="center"></el-table-column>
				<el-table-column :show-overflow-tooltip="true" prop="memberCodeName" label="运营商编号/简称" width="220" align="center"></el-table-column>
				<!-- <el-table-column :show-overflow-tooltip="true" prop="orgCodeName" label="机构编号/简称" width="220" align="center"></el-table-column>
				<el-table-column :show-overflow-tooltip="true" prop="traderCodeName" label="经纪人编号/简称" width="220" align="center"></el-table-column> -->
                <el-table-column :show-overflow-tooltip="true" prop="fMobile" label="客户账号" width="140" align="center"></el-table-column>
				<el-table-column :show-overflow-tooltip="true" prop="fName" label="客户简称" width="220" align="center"></el-table-column>
				<el-table-column :show-overflow-tooltip="true" prop="fCompanyName" label="企业名称" width="220" align="center"></el-table-column>
				<el-table-column :show-overflow-tooltip="true" prop="customerDispatcherMobile" label="客服账号" width="140" align="center"></el-table-column>
				<el-table-column :show-overflow-tooltip="true" prop="customerDispatcherName" label="客服简称" width="220" align="center"></el-table-column>
            </el-table>
            <div class="page">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-size="15"
                    layout="total,  prev, pager, next, jumper"
                    :total="totalNumber"
                    @contextmenu.prevent="rightClick"
                ></el-pagination>
            </div>
        </div>

        <!-- 编辑弹出框 -->

        <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
            <el-form ref="form" :model="form" label-width="70px">
                <el-form-item label="用户名">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="地址">
                    <el-input v-model="form.address"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>
		<popup ref="popup"></popup>
        <div id="menu">
            <div
                class="menu"
                v-for="(item,index) in menus"
                :key="index"
                @click.stop="infoClick(item,index)"
            >{{item}}</div>
        </div>
    </div>
</template>

<script>
import { fetchData } from '../../../api/index';
import  "../../../assets/css/form/forn.css";
import request from '../../../assets/Public/request.js';
import commonUtils from '../../../utils/commonUtils.js';
import popup from './popup/customerBindServicePop.vue';

export default {
    name: 'basetable',
    data() {
        return {
            query: {
                page: 1,
                pageSize: 15,
				fOperatorIdType:'0'
            },
			selectedRow:'',
            tableData: [],
            show: false,
            delList: [],
            editVisible: false,
            totalNumber: 0,
            form: {},
            idx: -1,
            id: -1,
            currentPage: 1,
            clickData: {},
            rightData: [],
            currentRowIndex: 0, // 获取当前右键点击的table行下标
            menus: [],
            butId: 101008014,
            menu: '',
            loading: true,
            querying:false,
        };
    },
    created() {
		this.query.fOperatorIdType="0";
		this.getData();
        this.getBut();
    },
	activated(){
		this.getData();
	},
    methods: {
		indexMethod(index){
			return index+1 + (this.query.page-1)*this.query.pageSize;
		},
        // 获取表格数据
       async getData() {
		   if(this.querying){
		   			   return;
		   }
		   this.querying = true;
		   let list = await request('/account/customerDispatch/customerBindList', this.query);
		   this.querying = false;
		   this.selectedRow='';
            this.tableData = list.data.data;
            this.totalNumber = list.data.total;
            this.tableData.map(item => {
                this.Total1 = Number(this.Total1) + Number(item.marketNumber);
                return this.Total1;
            });
            this.tableData.map(item => {
                this.Total2 = Number(this.Total2) + Number(item.waybillNumber);
                return this.Total2;
            });
        },
		async btnClick(item){
			if(item=='分配'){
				if(this.selectedRow==null||this.selectedRow==''||!(this.selectedRow.fTraderId>0)){
					this.$message.error("请选择数据");
					return;
				}
				this.$store.commit('setPopup1', this.selectedRow);
				this.$refs.popup.receipt();
				return;
			}
		},
        //获取按钮数据
        getBut() {
            let actionList = this.$store.state.Login.actionList;
            actionList.map(item => {
                if (item.fParentId == this.butId) {
					if(item.fName!='查询'&&item.fName!='申请实名认证'){
						this.menus.push(item.fName);
					}
                }
            });
        },
		reset(){
			this.query = {
			    page: 1,
			    pageSize: 15
			}
			this.query.fOperatorIdType="0";
		    this.getData();  
		},
		statusFormat(row) {
            if (row.fAccountStatus == 1) {
                return '启用';
            }
            if (row.fAccountStatus == 2) {
                return '禁用';
            }
		},
		certifyFormat(row){
			if(row.fCertifyStatus==1){
				return "未认证"
			}
			if(row.fCertifyStatus==2){
				return "已认证"
			}
		},
		traderTypeFormat(row){
			if(row.fTraderType==3){
				return "调度"
			}
			if(row.fTraderType==4){
				return "客服"
			}
		},
		rewardFormat(row){
			if(typeof (row.fBusnessReward) == 'number'){
				return (row.fBusnessReward * 100).toFixed(2) + '%';
			}
		},
        // 编辑操作
        handleEdit(index, row) {
            this.idx = index;
            this.form = row;
            this.editVisible = true;
        },
        // 保存编辑
        saveEdit() {
            this.editVisible = false;
            this.$message.success(`修改第 ${this.idx + 1} 行成功`);
            this.$set(this.tableData, this.idx, this.form);
        },
        // 分页导航
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            let num = Math.ceil(this.totalNumber / this.query.pageSize);
            if (val > num) {
            } else {
				this.query.page = val;
                this.getData();
            }
        },
        toggleSelection(rows) {
            if (rows) {
                // console.log(rows);
                rows.forEach(row => {
                    this.$refs.multipleTable.toggleRowSelection(row);
                });
            } else {
                console.log(rows);
                this.$refs.multipleTable.clearSelection();
            }
        },
        operation1() {
            console.log(this.multipleSelection);
        },
        //鼠标左键点击表格事件
        clickTableRow(row, event, column) {
			this.selectedRow=row;
            this.menu.style.display = 'none';
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
        // 自定义菜单的点击事件
        infoClick(item,index) {
			this.btnClick(item,index);
		},
        getSummaries(param) {
			const sums = [];
			sums[0] = '总计';
			if(!this.sumData){
				return sums;
			}
            const { columns } = param;

            columns.forEach((column, index) => {
                if (index === 0) {
                    return;
                }
				sums[index] = this.sumData[column.property];
            });

            return sums;
        },
        onMouseDown(event) {
            if (event.button == 0) {
                this.menu.style.display = 'none';
            }
        },
        
    },
    mounted() {
        this.toggleSelection([this.tableData[0]]);
        this.menu = document.querySelector('#menu');
    },
	components: {
	    popup,
	}
};
</script>