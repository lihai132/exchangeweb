<template>
    <div class="BaseTable" @click="onMouseDown">
        <div class="container">
            <div class="head">
                <div class="head-one">
                    <div class="input1">
                        <div class="title">银行：</div>
                        <el-select v-model="query.fId" @change="$forceUpdate()">
							<el-option
							      v-for="item in bankList"
							      :key="item.fId"
							      :label="item.fName"
							      :value="item.fId">
							</el-option>
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
                <el-table-column :show-overflow-tooltip="true" prop="fName" label="银行名称" width="120" align="center"></el-table-column>
                <el-table-column :show-overflow-tooltip="true" prop="fBankCode" label="银行编号" width="180" align="center"></el-table-column>
                <el-table-column :show-overflow-tooltip="true" prop="fStatus" :formatter="statusFormat" label="银行状态" width="120" align="center"></el-table-column>
				<el-table-column :show-overflow-tooltip="true" prop="fInFundFlag" :formatter="fInFundFlagFormat" label="是否允许入金" width="140" align="center"></el-table-column>
				<el-table-column :show-overflow-tooltip="true" prop="fOutFundFlag" :formatter="fOutFundFlagFormat" label="是否允许出金" width="120" align="center"></el-table-column>
				<el-table-column :show-overflow-tooltip="true" prop="fSignFlag" :formatter="fSignFlagFormat" label="是否允许签约" width="140" align="center"></el-table-column>
                <el-table-column :show-overflow-tooltip="true" prop="fUnsignFlag" :formatter="fUnsignFlagFormat" label="是否允许解约" width="140" align="center"></el-table-column>
                <el-table-column :show-overflow-tooltip="true" prop="fUpdateTime" label="更新时间" align="center"></el-table-column>
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
import { fetchData } from '../../../api/index.js';
import  "../../../assets/css/form/forn.css";
import request from '../../../assets/Public/request.js';
import commonUtils from '../../../utils/commonUtils.js';

import popup from './popup/bankPop.vue';

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
			bankList:[],
            show: false,
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
            butId: 301008001,
            menu: '',
            querying:false,
        };
    },
    created() {
		this.query.fId=null;
		this.init();
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
		async init(){
			let ops = await request('/fund/banks/bank/listBanksOption', {});
			if(!ops.data){
				ops.data = [];
			}
			ops.data.unshift({"fId":null,"fName":"全部"});
			this.bankList = ops.data;
		},
        // 获取表格数据
       async getData() {
		   if(this.querying){
		   			   return;
		   }
		   this.querying = true;
		   let list = await request('/fund/banks/bank/list', this.query);
		   this.querying = false;
		   this.selectedRow='';
            this.tableData = list.data.data;
            this.totalNumber = list.data.total;
        },
		async btnClick(item,index){
			if(item=='修改'){
				if(this.selectedRow==null||this.selectedRow==''||!(this.selectedRow.fId>0)){
					this.$message.error("请选择数据");
					return;
				}
				let bean = await request('/fund/banks/bank/detail', {"fId":this.selectedRow.fId});
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
			this.query.fId=null;
		    this.getData();  
		},
		statusFormat(row) {
            if (row.fStatus == 1) {
                return '可用';
            }
            if (row.fStatus == 2) {
                return '不可用';
            }
		 },
		fInFundFlagFormat(row){
			if (row.fInFundFlag == 1) {
                return '是';
            }
            if (row.fInFundFlag == 2) {
                return '否';
            }
		},
		fOutFundFlagFormat(row){
			if (row.fInFundFlag == 1) {
                return '是';
            }
            if (row.fInFundFlag == 2) {
                return '否';
            }
		},
		//
		fSignFlagFormat(row){
			if (row.fSignFlag == 1) {
                return '是';
            }
            if (row.fSignFlag == 2) {
                return '否';
            }
		},
		fUnsignFlagFormat(row){
			if (row.fUnsignFlag == 1) {
                return '是';
            }
            if (row.fUnsignFlag == 2) {
                return '否';
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
	}
};
</script>
