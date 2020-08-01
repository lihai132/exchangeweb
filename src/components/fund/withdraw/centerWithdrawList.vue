<template>
    <div class="BaseTable" @click="onMouseDown">
        <div class="container">
            <div class="head">
				<div class="head-one">
					<div class="but">
					    <el-button type="primary" @click="getData" style="width:100px">刷新</el-button>
					    <!-- <el-button type="primary" @click="reset" style="width:100px">重置</el-button> -->
					</div>
				</div>
            </div>

            <div class="from-head" v-if="menus.length>0">
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
                show-summary
            >
				<el-table-column label="序号" type="index" width="80" :index='indexMethod' align="center"></el-table-column>
				<el-table-column :show-overflow-tooltip="true" prop="fSignAccount" label="市场签约号" width="140" align="center"></el-table-column>
				<el-table-column :show-overflow-tooltip="true" prop="fBankSignAccount" label="银行签约号" width="140" align="center"></el-table-column>
				<el-table-column :show-overflow-tooltip="true" prop="fSignStatus" :formatter="signStatusFormat" label="签约状态" width="120" align="center"></el-table-column>
                <el-table-column :show-overflow-tooltip="true" prop="fBankNameIn" label="收款银行" width="180" align="center"></el-table-column>
				<el-table-column :show-overflow-tooltip="true" prop="fBankAccount" label="收款银行卡号" width="160" align="center"></el-table-column>
				<el-table-column :show-overflow-tooltip="true" prop="fAccountName" label="收款人名称" width="180" align="center"></el-table-column>
				<el-table-column :show-overflow-tooltip="true" prop="fBalance" label="余额" width="140" align="center"></el-table-column>
				<el-table-column :show-overflow-tooltip="true" prop="fAmountOut" label="今日提现金额" width="140" align="center"></el-table-column>
				<el-table-column :show-overflow-tooltip="true" prop="fAmountOutLock" label="提现在途金额" width="140" align="center"></el-table-column>
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

		<withdrawPop ref="withdrawPop"></withdrawPop>
		<pwdPop ref="pwdPop"></pwdPop>
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

import withdrawPop from './popup/centerWithdrawPop.vue';
import pwdPop from './popup/modifyCenterMoneyPwdPop.vue';

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
            butId: 301014002,
            menu: '',
            submitting: false,
            querying:false,
        };
    },
    created() {
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
		   this.submitting=false;
		   let list = await request('/fund/withdraw/center/withdrawList', this.query);
		   this.querying = false;
		   this.selectedRow='';
            this.tableData = list.data;
            this.totalNumber = this.tableData&&this.tableData.length>0?this.tableData.length:0;
			if(this.totalNumber){
				this.sumData = this.tableData[0];
			}
        },
		async btnClick(item,index){
			if(item=='提现'||item=='修改资金密码'){
				if(!(this.selectedRow)){
					if(this.totalNumber!=1){
						this.$message.error("请选择数据");
						return;
					}
					this.selectedRow = this.tableData[0];
				}
				if(item=='提现'){
					this.$store.commit('setPopup1', this.selectedRow);
					this.$refs.withdrawPop.receipt();
					return;
				}
				if(item=='修改资金密码'){
					this.$store.commit('setPopup1', this.selectedRow);
					this.$refs.pwdPop.receipt();
					return;
				}
			}
		},
        //获取按钮数据
        getBut() {
            let actionList = this.$store.state.Login.actionList;
            actionList.map(item => {
                if (item.fParentId == this.butId) {
                    if(item.fName!='查询'){
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
		    this.getData();  
		},
		refundAmountFormat(row){
			if(row.refundAmount==0&&!row.refundCompleteTime){
				return '';
			}
			return row.refundAmount;
		},
		reciverNameFormat(row){
			if(row.reciverInfo&&row.reciverInfo.split){
				let infos = row.reciverInfo.split(",");
				if(infos.length>1){
					return infos[1];
				}
				return row.reciverInfo;
			}
		},
		reciverTypeFormat(row){
			if(row.reciverInfo&&row.reciverInfo.split){
				let infos = row.reciverInfo.split(",");
				return this.doTypeFormat(infos[0]);
			}
		},
		accountNameFormat(row){
			return row.fMobile+'-'+row.fName;
		},
		codeNameFormat(row){
			return row.fDealerCode+'-'+row.fDealerName;
		},
		channelFormat(row){
			if(row.fChannel==2){
				return '微信支付'
			}
			if(row.fChannel==3){
				return '支付宝支付'
			}
			if(row.fChannel==4){
				return '农行支付'
			}
			if(row.fChannel==5){
				return '银联支付'
			}
		},
		ioFlagFormat(row){
			if(row.fIoFlag==8){
				return '运费'
			}
			if(row.fIoFlag==9){
				return '服务费'
			}
		},
		traderTypeFormat(row){
			return this.doTypeFormat(row.fTraderType);
		},
		doTypeFormat(type){
			if(type==1){
				return '客户'
			}
			if(type==2){
				return '司机'
			}
			if(type==3){
				return '调度员'
			}
			if(type==4){
				return '客服'
			}
			if(type==5){
				return '经纪人'
			}
		},
		signStatusFormat(row){
			if (row.fSignStatus == 1) {
                return '未签约';
            }
            if (row.fSignStatus == 2) {
                return '已签约';
            }
		    if (row.fSignStatus == 3) {
                return '已解约';
            }
		},
		statusFormat(row) {
            return this.doStatusFormat(row.fStatus);
		 },
		doStatusFormat(status){
			if (status == 1) {
                return '处理中';
            }
            if (status == 2) {
                return '处理成功';
            }
		    if (status == 3) {
                return '处理失败';
            }
            if (status == 7) {
                return '超时未支付';
            }
			if (status == 8) {
			    return '待审核';
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
				var p = column.property;
				if(p=='fAmountOut'||p=='fBalance'||p=='fAmountOutLock'){
					sums[index] = this.sumData[p];
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
	   withdrawPop,
	   pwdPop
	}
};
</script>
