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
					    <div class="title">提现流水号：</div>
					    <el-input v-model="query.fCode"  style="width:170px"></el-input>
					</div>
					<!-- <div class="input1">
					    <div class="title">提现状态：</div>
					    <el-select
					        v-model="query.fStatus"
					        class="handle-select"
					        style="width:170px"
					    >
					        <el-option key="" label="全部" value=""></el-option>
							<el-option key="8" label="待审核" value="8"></el-option>
					        <el-option key="1" label="处理中" value="1"></el-option>
					        <el-option key="2" label="处理成功" value="2"></el-option>
					        <el-option key="3" label="处理失败" value="3"></el-option>
					    </el-select>
					</div> -->
                </div>
				
				<div class="head-two">
					<span style="color: rgba(0, 0, 0, 0.8);font-size: 14px;line-height:31px;padding-left: 112px;">日期：</span>
					<div class="input1">
					    <el-date-picker type="daterange" v-model="rangeDate" ref="rangeDate"
					    	  align="right"
					          unlink-panels
					          range-separator="至"
					          start-placeholder="开始日期"
					          end-placeholder="结束日期"
					    	  :picker-options="pickerOptions"
					    	  >
					    </el-date-picker>
					</div>
					<!-- <div class="input2">
					    <div class="title">开始日期：</div>
					    <el-date-picker type="date" v-model="query.startDate"  style="width:170px"></el-date-picker>
					</div>
					<div class="input2">
					    <div class="title">结束日期：</div>
					    <el-date-picker type="date" v-model="query.endDate"  style="width:170px"></el-date-picker>
					</div> -->
					<div class="but">
					    <el-button type="primary" @click="query.page=1;getData()" style="width:100px">查询</el-button>
					    <el-button type="primary" @click="reset" style="width:100px">重置</el-button>
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
				<el-table-column :show-overflow-tooltip="true" prop="fDealerCode" :formatter="codeNameFormat" label="运营商编号/简称" width="200" align="center"></el-table-column>
				<el-table-column :show-overflow-tooltip="true" prop="fIoCode" label="提现流水号" width="140" align="center"></el-table-column>
				<el-table-column :show-overflow-tooltip="true" prop="fFundIo" label="提现金额" width="140" align="center"></el-table-column>
                <el-table-column :show-overflow-tooltip="true" prop="fNameBa" label="提现银行" width="160" align="center"></el-table-column>
                <el-table-column :show-overflow-tooltip="true" prop="fBankNameRel" label="收款银行" width="160" align="center"></el-table-column>
				<el-table-column :show-overflow-tooltip="true" prop="fBankAccount" label="收款银行卡号" width="160" align="center"></el-table-column>
				<el-table-column :show-overflow-tooltip="true" prop="fAccountName" label="收款人名称" width="130" align="center"></el-table-column>
				<el-table-column :show-overflow-tooltip="true" prop="fCreateTime" label="发起时间" align="center"></el-table-column>
				<!-- <el-table-column :show-overflow-tooltip="true" prop="fOperaterName" label="操作员" align="center"></el-table-column> -->
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

import popup from './popup/memberCheckPop.vue';

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
            butId: 301014004,
            menu: '',
            submitting: false,
            rangeDate:'',
            pickerOptions: {
              shortcuts: [{
            	text: '最近一周',
            	onClick(picker) {
            	  const end = new Date();
            	  const start = new Date();
            	  start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            	  picker.$emit('pick', [start, end]);
            	}
              }, {
            	text: '最近一个月',
            	onClick(picker) {
            	  const end = new Date();
            	  const start = new Date();
            	  start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            	  picker.$emit('pick', [start, end]);
            	}
              }, {
            	text: '最近三个月',
            	onClick(picker) {
            	  const end = new Date();
            	  const start = new Date();
            	  start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            	  picker.$emit('pick', [start, end]);
            	}
              }]
            },
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
		   var startDate,endDate;
		   if(this.rangeDate&&this.rangeDate.length==2){
			   startDate = this.rangeDate[0];
			   endDate = this.rangeDate[1];
			   if(startDate>endDate){
				   this.$message.error("开始时间不能大于结束时间");
				   return false;
			   }
		   }
		   this.query.startDate = startDate;
		   this.query.endDate = endDate;
		   if(this.querying){
		   			   return;
		   }
		   this.querying = true;
		   this.submitting=false;
		   let list = await request('/fund/withdraw/member/waitCheckList', this.query);
		   this.querying = false;
		   this.selectedRow='';
            this.tableData = list.data.data;
            this.totalNumber = list.data.total;
			this.sumData = list.data.columnSummary;
        },
		async btnClick(item,index){
			if(item=='出金审核'){
				if(this.selectedRow==null||this.selectedRow==''||!(this.selectedRow.fId>0)){
					this.$message.error("请选择数据");
					return;
				}
				this.$store.commit('setPopup1', this.selectedRow);
				this.$refs.popup.receipt();
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
			this.rangeDate=null;
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
		statusFormat(row) {
            if (row.fStatus == 1) {
                return '处理中';
            }
            if (row.fStatus == 2) {
                return '处理成功';
            }
		    if (row.fStatus == 3) {
                return '处理失败';
            }
            if (row.fStatus == 7) {
                return '超时未支付';
            }
			if (row.fStatus == 8) {
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
				if(p=='fAmount'||p=='fCharge'||p=='refundAmount'){
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
	   popup
	}
};
</script>
