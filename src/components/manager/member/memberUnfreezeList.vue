<template>
    <div class="BaseTable" @click="onMouseDown">
        <div class="container">
            <div class="head">
                <div class="head-one">
                    <div class="input1">
                        <div class="title">运营商编号：</div>
                        <el-input v-model="query.code"  style="width:170px"></el-input>
                    </div>
                    <div class="input1">
                        <div class="title">运营商简称：</div>
                        <el-input v-model="query.name"  style="width:170px"></el-input>
                    </div>
					<div class="input1">
					    <div class="title">运营商类型：</div>
					    <el-select
					        v-model="query.type"
					        class="handle-select"
					        style="width:170px"
							@change="$forceUpdate()"
					    >
							<el-option key="-1" label="全部" value="-1"></el-option>
					        <el-option key="2" label="综合运营商" value="2"></el-option>
					        <el-option key="1" label="特别运营商" value="1"></el-option>
							<el-option key="3" label="经纪运营商" value="3"></el-option>
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
                <el-table-column :show-overflow-tooltip="true" prop="fCode" label="运营商编号" width="250" align="center"></el-table-column>
                <el-table-column :show-overflow-tooltip="true" prop="fName" label="运营商简称" width="300" align="center"></el-table-column>
				<el-table-column :show-overflow-tooltip="true" prop="fTypeChild" :formatter="typeFormat" label="运营商类型" width="150" align="center"></el-table-column>
                <el-table-column :show-overflow-tooltip="true" prop="fStatus" :formatter="statusFormat" label="运营商状态" width="150" align="center"></el-table-column>
                <el-table-column :show-overflow-tooltip="true" prop="fBalance" label="账户资金" align="center"></el-table-column>
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
          title="运营商冻结"
          :visible.sync="dialogVisible"
          width="35%"
          >
          <span>{{tip}}</span>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="doFreeze" :disabled="submitting">确 定</el-button>
          </span>
        </el-dialog>
		
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
            dialogVisible: false,
            totalNumber: 0,
            form: {},
            idx: -1,
            id: -1,
            currentPage: 1,
            clickData: {},
            rightData: [],
            currentRowIndex: 0, // 获取当前右键点击的table行下标
            menus: [],
            butId: 101003005,
            menu: '',
            loading: true,
            querying:false,
			tip:'',
			submitting:false
        };
    },
    created() {
		this.query.type="-1";
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
		   let list = await request('/account/member/unfreezeList', this.query);
		   this.querying = false;
		   this.selectedRow='';
            this.tableData = list.data.data;
            this.totalNumber = list.data.total;
        },
		async btnClick(item,index){
			this.submitting=false;
			if(item=='解冻'){
				if(this.selectedRow==null||this.selectedRow==''||!(this.selectedRow.fDealerId>0)){
					this.$message.error("请选择数据");
					return;
				}
				this.tip='您确定要对运营商['+this.selectedRow.fName+']进行解冻操作吗？';
				this.dialogVisible=true;
				return;
			}
		},
        //获取按钮数据
        getBut() {
            let actionList = this.$store.state.Login.actionList;
            actionList.map(item => {
                if (item.fParentId == this.butId) {
					if(item.fName!='查询'&&item.fName!='解约'){
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
			this.query.type="-1";
		    this.getData();  
		},
		signFormat(row){
			
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
                return '待审核';
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
        // 保存编辑
        async doFreeze() {
			if(this.selectedRow==null||this.selectedRow==''||!(this.selectedRow.fDealerId>0)){
				this.$message.error("请选择数据");
				return;
			}
            this.submitting=true;
			let bean = await request('/account/member/undoFreeze', {"fDealerId":this.selectedRow.fDealerId});
			this.submitting=false;
			this.dialogVisible=false;
			if(bean.data>0){
				this.$message.success("解冻成功");
				this.getData();
			}else if(!commonUtils.isEmpty(bean.errMsg)){
				this.$message.error(bean.errMsg);
			}else{
				this.$message.error("解冻失败！可能由于页面停留时间过长，请刷新确认重试");
			}
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
	}
};
</script>
