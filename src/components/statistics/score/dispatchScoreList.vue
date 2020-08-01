<template>
    <div class="BaseTable" @click="onMouseDown">
        <div class="container">
            <div class="head">
                <div class="head-one">
					<div class="input1">
					<div class="title">运营商：</div>
						<el-select
						    v-model="query.fDealerId"
						    class="handle-select"
						    style="width:180px"
							placeholder="请搜索/选择运营商"
							filterable
							ref="fDealerId"
							@change="dealerChange"
						>
							<el-option
							      v-for="item in members"
							      :key="item.fDealerId"
							      :label="item.dealerCodeName"
							      :value="item.fDealerId">
							    </el-option>
						</el-select>
					</div>
					<div class="input1">
					  <div class="title">调度员：</div>
						<el-select
						    v-model="query.fTraderId"
						    class="handle-select"
						    style="width:180px"
							placeholder="请搜索/选择调度员"
							filterable
							ref="fTraderId"
							@change="change()"
						>
							<el-option
							      v-for="item in traders"
							      :key="item.fTraderId"
							      :label="item.traderMobileName"
							      :value="item.fTraderId">
							    </el-option>
						</el-select>
					</div>
					<div class="but">
					    <el-button type="primary" @click="query.page=1;getData()" style="width:100px">查询</el-button>
					    <el-button type="primary" @click="reset" style="width:100px">重置</el-button>
					</div>
                </div>
            </div>

            <!-- <div class="from-head">
                <el-button
                    style="height:26px; line-height: 26px;padding:0 8px;"
                    v-for="(item,index) in menus"
                    :key="index"
					@click="btnClick(item)"
                >{{item}}</el-button>
            </div> -->
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
                <el-table-column :show-overflow-tooltip="true" prop="fMobile" label="调度员账号"  align="center"></el-table-column>
				<el-table-column :show-overflow-tooltip="true" prop="fName" label="调度员简称"  align="center"></el-table-column>
				<el-table-column :show-overflow-tooltip="true" prop="fTotalCount" label="总评价数量" align="center"></el-table-column>
				<el-table-column :show-overflow-tooltip="true" prop="fTotalScore" label="总评分"  align="center"></el-table-column>
                <el-table-column :show-overflow-tooltip="true" prop="fAvgScore" :formatter="avgScoreFormat" label="平均评分"  align="center"></el-table-column>
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

        <div id="menu">
            <div
                class="menu"
                v-for="(item,index) in menus"
                :key="index"
                @click.stop="infoClick(index)"
            >{{item}}</div>
        </div>
    </div>
</template>

<script>
import { fetchData } from '../../../api/index';
import  "../../../assets/css/form/forn.css";
import request from '../../../assets/Public/request.js';
import commonUtils from '../../../utils/commonUtils.js';

export default {
    name: 'basetable',
    data() {
        return {
            query: {
                page: 1,
                pageSize: 15
            },
			members:[],
			traders:[],
			selectedRow:'',
            tableData: [],
            totalNumber: 0,
            form: {},
            idx: -1,
            id: -1,
            currentPage: 1,
            clickData: {},
            rightData: [],
            currentRowIndex: 0, // 获取当前右键点击的table行下标
            menus: [],
            butId: -1,
            menu: '',
            loading: true,
        };
    },
    created() {
        this.init();
        this.getBut();
    },
    methods: {
		indexMethod(index){
			return index+1 + (this.query.page-1)*this.query.pageSize;
		},
		async init(){
		    this.members = (await request('/statistics/users/member/listAllMembers', {})).data;
		    if(this.members.length>0){
		    	this.query.fDealerId = this.members[0].fDealerId;
		    	this.dealerChange(true);
		    }
		},
		change(){
			this.$forceUpdate();
			this.getData();
		},
        // 获取表格数据
       async getData() {
		   if(!(this.query.fDealerId>0)){
			   this.$refs.fDealerId.$el.children[0].children[0].focus();
			   return false;
		   }
		   let res = await request('/statistics/score/customerService/dispatchScoreList', this.query);
           var datas = res.data;
           this.tableData = datas.data;
           this.totalNumber = datas.total;
        },
		async btnClick(item){
			
		},
		async dealerChange(isInit){
			var id = this.query.fDealerId;
			this.query.fTraderId = '';
			var all = {"fTraderId":-1,"traderMobileName":"全部"};
			if(!(id>0)){
				this.traders = [];
				return;
			}
			try{
				this.traders = (await request('/statistics/trans/traders/listDispatchers', {'fDealerId':id})).data;
			}catch(e){
				this.traders = [];
				console.error(e);
			}
			this.traders.unshift(all);
			this.query.fTraderId = this.traders[0].fTraderId;
			if(isInit){
				this.getData();
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
			this.tableData = [];
			this.totalNumber = 0;
			if(this.members.length>0){
				this.query.fDealerId = this.members[0].fDealerId;
				this.dealerChange(true);
			}
		},
		avgScoreFormat(row) {
			var arg = 0;
            if (row.fTotalCount>0&&row.fTotalScore>0) {
				var arg = parseFloat(row.fTotalScore/row.fTotalCount).toFixed(2);
            }
            return arg;
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
        infoClick(index) {
            this.$alert('当前table的下标为' + this.currentRowIndex, '你点击了自定义菜单的' + this.menus[index] + '功能', {
                confirmButtonText: '确定',
                callback: action => {
                    var menu = document.querySelector('#menu');
                    menu.style.display = 'none';
                }
            });
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
	components: {}
};
</script>