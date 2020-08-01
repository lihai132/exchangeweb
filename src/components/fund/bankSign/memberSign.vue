<template>
    <div class="BaseTable" @click="onMouseDown">
        <div class="container">
            <div class="head">
                <div class="head-one">
                    <div class="input1">
                        <div class="title">运营商编号/简称：</div>
                        <el-input v-model="query.dealerCodeName"  style="width:170px"></el-input>
                    </div>
                    <div class="input1">
                        <div class="title">签约状态：</div>
                        <el-select
                            v-model="query.fSignStatus"
                            class="handle-select"
                            style="width:170px"
							@change="$forceUpdate()"
                        >
                            <el-option key="-1" label="全部" value="-1"></el-option>
                            <el-option key="2" label="已签约" value="2"></el-option>
                        	<el-option key="1" label="待签约" value="1"></el-option>
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
					@click="btnClick(item,index)"
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
                <el-table-column :show-overflow-tooltip="true" prop="fCode" :formatter="codeNameFormat" label="运营商编号/简称" width="200" align="center"></el-table-column>
				<el-table-column :show-overflow-tooltip="true" prop="fTypeChild" :formatter="typeFormat" label="运营商类型" width="100" align="center"></el-table-column>
                <el-table-column :show-overflow-tooltip="true" prop="fStatus" :formatter="statusFormat" label="运营商状态" width="100" align="center"></el-table-column>
				<el-table-column :show-overflow-tooltip="true" prop="fSignStatus" :formatter="signFormat" label="签约状态" width="100" align="center"></el-table-column>
				<el-table-column :show-overflow-tooltip="true" prop="fSignAccount" label="市场签约号" width="140" align="center"></el-table-column>
				<el-table-column :show-overflow-tooltip="true" prop="fBankSignAccount" label="银行签约号" width="130" align="center"></el-table-column>
				<el-table-column :show-overflow-tooltip="true" prop="fBankName" label="签约银行" width="160" align="center"></el-table-column>
                <el-table-column :show-overflow-tooltip="true" prop="fAccountType" :formatter="fAccountTypeFormat" label="银行卡类型" width="100" align="center"></el-table-column>
                <el-table-column :show-overflow-tooltip="true" prop="fBankAccount" label="银行卡号" width="180" align="center"></el-table-column>
                <el-table-column :show-overflow-tooltip="true" prop="fAccountName" label="持卡人名称" width="110" align="center"></el-table-column>				
				<el-table-column :show-overflow-tooltip="true" prop="fLegalIdcard" label="证件号码" width="170" align="center"></el-table-column>
				<el-table-column :show-overflow-tooltip="true" prop="fBankMobile" label="银行预留手机" width="120" align="center"></el-table-column>
				<el-table-column :show-overflow-tooltip="true" prop="fSignTime" label="签约时间" width="160" align="center"></el-table-column>
				<el-table-column :show-overflow-tooltip="true" prop="fFescissionTime" label="解约时间" width="160" align="center"></el-table-column>
				<el-table-column :show-overflow-tooltip="true" prop="fAccountStatus" :formatter="accountStatusFormat" label="账户状态" width="120" align="center"></el-table-column>
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

		<el-dialog
		  title="解约提示"
		  :visible.sync="dialogVisible"
		  width="30%"
		  >
		  <span  style="font-size: 15px; padding-left: 10px;">确定对该运营商进行解约吗？</span>
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="dialogVisible = false">取 消</el-button>
		    <el-button type="primary" @click="unSign" :disabled="submitting">确 定</el-button>
		  </span>
		</el-dialog>
		
		<el-dialog
		  title="余额信息"
		  :visible.sync="balanceDialogVisible"
		  width="30%"
		  >
		  <span style="font-size: 15px; padding-left: 10px;">{{balanceTip}}</span>
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="balanceDialogVisible = false">取 消</el-button>
		    <el-button type="primary" @click="balanceDialogVisible = false">确 定</el-button>
		  </span>
		</el-dialog>

		<popup ref="popup"></popup>
		<balancePopup ref="balancePopup"></balancePopup>
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

import popup from './popup/memberSignPop.vue';
import balancePopup from './popup/memberBalancePop.vue';

export default {
    name: 'basetable',
    data() {
        return {
            query: {
                page: 1,
                pageSize: 15
            },
			selectedRow:"",
            tableData: [],
            show: false,
            delList: [],
            editVisible: false,
			dialogVisible:false,
			balanceDialogVisible:false,
			balanceTip:'',
            totalNumber: 0,
            form: {},
            idx: -1,
            id: -1,
            currentPage: 1,
            clickData: {},
            rightData: [],
            currentRowIndex: 0, // 获取当前右键点击的table行下标
            menus: [],
            butId: 301001001,
            menu: '',
            submitting: false,
            listing:false,
			querying:false
        };
    },
    created() {
		this.query.fSignStatus="-1";
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
		   if(this.listing){
		   			   return;
		   }
		   this.listing = true;
		   this.submitting=false;
		   let list = await request('/fund/bankSign/member/list', this.query);
		   this.listing = false;
		   this.selectedRow='';
            this.tableData = list.data.data;
            this.totalNumber = list.data.total;
        },
		async btnClick(item,index){
			if(item=='签约'||item=='解约'||item=='查看银行卡余额'
				||item=='启用账户'||item=='禁用账户'){
				if(this.selectedRow==null||this.selectedRow==''||!(this.selectedRow.fId>0)){
					this.$message.error("请选择数据");
					return;
				}
				if(item=='启用账户'||item=='禁用账户'){
					if(item=='启用账户'&&this.selectedRow.fAccountStatus==1){
						this.$message.error("当前账户已是[启用]状态，无需操作");
						return;
					}
					if(item=='禁用账户'&&this.selectedRow.fAccountStatus==0){
						this.$message.error("当前账户已是[禁用]状态，无需操作");
						return;
					}
					var param = {};
					var accountStatus = item=='启用账户'?1:0;
					param.accountStatus = accountStatus;
					param.fId = this.selectedRow.fId;
					let result = await request('/fund/bankSign/accountStatus/change', param);
					//this.submitting=false;
					if(result.data==1){
						//this.editVisible = false;
						if(param.accountStatus==1){
							this.$message.success("启用成功");
						}else{
							this.$message.success("禁用成功");
						}
						this.getData();
					}else if(result.errMsg){
						this.$message.error(result.errMsg);
					}else{
						this.$message.error("操作失败");
					}
					return;
				}
				if(item=='查看银行卡余额'){
					this.$store.commit('setPopup1', JSON.parse(JSON.stringify(this.selectedRow)));
					this.$refs.balancePopup.receipt();
					return;
				}
				if(item=='签约'){
					if(this.selectedRow.fStatus!=2&&this.selectedRow.fStatus!=4){
						this.$message.error("该运营商状态不是[待签约]、[正常]，不能进行签约操作");
						return;
					}
					if(this.selectedRow.fSignStatus==2){
						this.$message.error("该运营商已签约，请勿重复签约");
						return;
					}
					this.$store.commit('setPopup1', JSON.parse(JSON.stringify(this.selectedRow)));
					this.$refs.popup.receipt();
					return;
				}
				if(item=='解约'){
					if(this.selectedRow.fSignStatus!=2){
						this.$message.error("该运营商未签约，不能进行解约操作");
						return;
					}
					this.dialogVisible=true;
					// this.$confirm('确定对该运营商进行解约吗？'
					// ,{
					// 	confirmButtonText: '确定',
					// 	cancelButtonText: '取消'
					// }
					// ).then(_ => {
					            
					//           })
					//   .catch(_ => {});
				}
				// let bean = await request('/account/member/detail', {"fDealerId":this.selectedRow.fDealerId});
				// if(item=='修改'){
				// 	bean.data.showType='update';
				// 	this.$store.commit('setPopup1', bean.data);
				// 	this.$refs.popup.receipt();
				// }else if(item=='详情'){
				// 	bean.data.showType='detail';
				// 	this.$store.commit('setPopup1', bean.data);
				// 	this.$refs.detailPop.receipt();
				// }
				return;
			}
		},
		async unSign(){
			if(!this.selectedRow){
				this.$message.error("请选择数据");
				return;
			}
			let rowBean = this.selectedRow;
			let obj = {"rId":rowBean.fId,"fDealerOrTraderId":rowBean.fDealerId};
			this.submitting=true;
			let result = await request('/fund/bankSign/dealer/unSign', obj);
			this.submitting=false;
			this.dialogVisible=false;
			if(result.data==1){
				this.$message.success("解约成功");
				this.getData();
			}else if(!commonUtils.isEmpty(result.errMsg)){
				this.$message.error(result.errMsg);
			}else{
				this.$message.error("操作失败");
			}
		},
        //获取按钮数据
        getBut() {
            let actionList = this.$store.state.Login.actionList;
            actionList.map(item => {
                if (item.fParentId == this.butId) {
                    if(item.fName!='查询'&&item.fName!='账号启用'
					&&item.fName!='账号禁用'&&item.fName!='法人签约'
					&&item.fName!='签约信息修改'){
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
			this.query.fSignStatus="-1";
		    this.getData();  
		},
		accountStatusFormat(row){
			if(row.fAccountStatus==1){
				return "启用";
			}
			return "禁用";
		},
		fAccountTypeFormat(row){
			if(row.fAccountType==1){
				return "借记卡";
			}
			if(row.fAccountType==2){
				return "信用卡";
			}
		},
		codeNameFormat(row){
			return row.fCode+'-'+row.fName;
		},
		signFormat(row){
			if(row.fSignStatus==1){
				return '待签约'
			}
			if(row.fSignStatus==2){
				return '已签约'
			}
			if(row.fSignStatus==3){
				return '已解约'
			}
		},
		typeFormat(row){
			if(row.fTypeChild==1){
				return '特别运营商'
			}
			if(row.fTypeChild==2){
				return '综合运营商'
			}
			if(row.fTypeChild==3){
				return '经纪运营商'
			}
		},
		statusFormat(row) {
            if (row.fStatus == 1) {
                return '待认证';
            }
            if (row.fStatus == 2) {
                return '待签约';
            }
		    if (row.fStatus == 3) {
                return '待激活';
            }
            if (row.fStatus == 4) {
                return '正常';
            }
			if (row.fStatus == 5) {
                return '已冻结';
            }
            if (row.fStatus == 6) {
                return '已终止';
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
		balancePopup
	}
};
</script>
