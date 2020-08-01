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
					    <div class="title">经纪人编号/简称：</div>
					    <el-input v-model="query.brokerCodeName" maxlength="32" style="width:170px"></el-input>
					</div>
                </div>
                <div class="head-two">
					<div class="input2">
					    <div class="title">经纪人账号：</div>
					    <el-input v-model="query.fAccount"  style="width:170px"></el-input>
					</div>
					<div class="input2">
					    <div class="title">账号状态：</div>
					    <el-select
					        v-model="query.fAccountStatus"
					        class="handle-select"
					        style="width:170px"
							@change="$forceUpdate()"
					    >
							<el-option key="-1" label="全部" value="-1"></el-option>
					        <el-option key="1" label="启用" value="1"></el-option>
					        <el-option key="2" label="禁用" value="2"></el-option>
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
				<!-- <el-table-column :show-overflow-tooltip="true" prop="orgCodeName" label="机构编号/简称" width="220" align="center"></el-table-column> -->
				<el-table-column :show-overflow-tooltip="true" prop="brokerCodeName" label="经纪人编号/简称" width="220" align="center"></el-table-column>
                <el-table-column :show-overflow-tooltip="true" prop="fMobile" label="经纪人账号" width="140" align="center"></el-table-column>
                <el-table-column :show-overflow-tooltip="true" prop="fAccountStatus" :formatter="statusFormat" label="账号状态" width="100" align="center"></el-table-column>
                <el-table-column :show-overflow-tooltip="true" prop="fCertifyStatus" :formatter="certifyFormat" label="是否实名认证" width="120" align="center"></el-table-column>
				<el-table-column :show-overflow-tooltip="true" prop="fSignStatus" :formatter="signFormat" label="是否已签约" width="100" align="center"></el-table-column>
                <!-- <el-table-column :show-overflow-tooltip="true" prop="fGroup" :formatter="groupFormat" label="经纪人分组" width="140" align="center"></el-table-column> -->
                <el-table-column :show-overflow-tooltip="true" prop="fCreateTime" label="开户时间" width="160" align="center"></el-table-column>
				<!-- <el-table-column :show-overflow-tooltip="true" prop="fCancelTime" label="注销时间" align="center"></el-table-column> -->
                <el-table-column :show-overflow-tooltip="true" prop="fDescn" label="描述" align="center"></el-table-column>
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
		<resetPwdPop ref="resetPwdPop"></resetPwdPop>
		<askAuthPop ref="askAuthPop"></askAuthPop>
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
import popup from './popup/brokerPop.vue';
import resetPwdPop from './popup/resetBrokerPwdPop.vue';
import askAuthPop from './popup/askAuthPop.vue';

export default {
    name: 'basetable',
    data() {
        return {
            query: {
                page: 1,
                pageSize: 15
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
            butId: 101007001,
            menu: '',
            loading: true,
            querying:false,
        };
    },
    created() {
		 this.query.fAccountStatus="-1";
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
		   let list = await request('/account/broker/list', this.query);
		   this.querying = false;
		   this.selectedRow='';
            this.tableData = list.data.data;
            this.totalNumber = list.data.total;
        },
		async btnClick(item){
			if(item=='新增'){
				this.$store.commit('setPopup1', {"showType":'add'});
				this.$refs.popup.receipt();
				return;
			}
			if(item=='重置登录密码'||item=='重置资金密码'
				||item=='详情'||item=='修改'||item=='重置登陆密码'
				||item=='申请实名认证'){
				if(this.selectedRow==null||this.selectedRow==''||!(this.selectedRow.fTraderId>0)){
					this.$message.error("请选择数据");
					return;
				}
				var obj = JSON.parse(JSON.stringify(this.selectedRow));
				this.$store.commit('setPopup1', obj);
				if(item=='重置登录密码'||item=='重置资金密码'||item=='重置登陆密码'){
					if(item=='重置资金密码'){
						obj.showType='money';
					}else{
						obj.showType='login';
					}
					this.$refs.resetPwdPop.receipt();
					return;
				}
				if(item=='申请实名认证'){
					let res = await request('/account/certify/checkWaitAuth',
						{"fTableId":this.selectedRow.fTraderId,"fTableType":2,"fType":1});
					if(res.errMsg){
						this.$message.error(res.errMsg);
						return false;
					}else{
						this.$refs.askAuthPop.receipt();
					}
					return;
				}
				let bean = await request('/account/trader/detail', {"fTraderId":this.selectedRow.fTraderId});
				if(item=='修改'){
					bean.data.showType='update';
				}else if(item=='详情'){
					bean.data.showType='detail';
				}
				this.$store.commit('setPopup1', bean.data);
				this.$refs.popup.receipt();
				return;
			}
		},
        //获取按钮数据
        getBut() {
            let actionList = this.$store.state.Login.actionList;
            actionList.map(item => {
                if (item.fParentId == this.butId) {
					if(item.fName!='查询'&&item.fName!='申请注销'&&item.fName!='推广地址'){
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
			this.query.fAccountStatus="-1";
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
		groupFormat(row){
			if(row.fGroupId==1){
				return "客户经纪人分组"
			}
			if(row.fGroupId==2){
				return "车辆经纪人分组"
			}
		},
		signFormat(row){
			if(row.fSignStatus==1){
				return '待签约';
			}
			if(row.fSignStatus==2){
				return '已签约';
			}
			if(row.fSignStatus==3){
				return '已解约';
			}
			return '待签约';
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
		resetPwdPop,
		askAuthPop
	}
};
</script>