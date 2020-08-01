<template>
    <div class="BaseTable" @click="onMouseDown">
        <div class="container">
            <div class="head">
                <div class="head-one">
                    <div class="input1">
                        <div class="title">运营商编号：</div>
                        <el-input v-model="query.fCode" placeholder="请输入内容" style="width:170px"></el-input>
                    </div>
                    <div class="input1">
                        <div class="title">运营商简称：</div>
                        <el-input v-model="query.fName" placeholder="请输入内容" style="width:170px"></el-input>
                    </div>
                </div>
                <div class="head-two">
                    <div class="input2">
                        <div class="title">运营商类型：</div>
                        <el-select  v-model="query.fChildType" placeholder="请选择" style="width:170px">
							<el-option label="全部" value="-1"> </el-option>
                            <el-option v-for="item in memberChild" :key="item.key" :label="item.value" :value="item.key"> </el-option>
                        </el-select>
                    </div>
                    <div class="input2">
                        <div class="title">运营商状态：</div>
                        <el-select  v-model="query.fStatus" placeholder="请选择" style="width:170px">
							<el-option label="全部"  value="-1"> </el-option>
                            <el-option v-for="item in dealerStatus" :key="item.key" :label="item.value" :value="item.key"> </el-option>
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
                    v-for="(item, index) in menus"
                    :key="index"
                    @click="buttonClick(item)"
                    >{{ item }}</el-button
                >
            </div>
            <el-table
                :data="tableData"
                border
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
                highlight-current-row
                @row-click="clickTableRow"
                @current-change="selectChage"
                @row-contextmenu="rightClick"
                :summary-method="getSummaries"
                show-summary
            >
				<el-table-column :show-overflow-tooltip="true" label="序号" type="index" width="80" :index='indexMethod' align="center"></el-table-column>
                <el-table-column :show-overflow-tooltip="true" prop="fCode" label="运营商编号" width="120" align="center"></el-table-column>
                <el-table-column :show-overflow-tooltip="true" prop="fName" label="运营商简称" width="160" align="center"></el-table-column>

                <el-table-column :show-overflow-tooltip="true" prop="fTypeChild" :formatter="formatChild" label="运营商类型" width="120" align="center"></el-table-column>

                <el-table-column :show-overflow-tooltip="true" prop="fStatus" :formatter="formatStatus" label="运营商状态" width="120" align="center"></el-table-column>
                <el-table-column :show-overflow-tooltip="true" prop="fTaxRate" :formatter="formatFTaxRate" label="税率" width="120" align="center"></el-table-column>
                <el-table-column :show-overflow-tooltip="true" prop="fMOutFundThreshold" label="运营商出金阈值" width="150" align="center"></el-table-column>

                <el-table-column :show-overflow-tooltip="true" prop="fOperatorCharge" :formatter="formatfOperatorCharge" label="客服服务费比例" width="160" align="center"></el-table-column>
                <el-table-column :show-overflow-tooltip="true" 
                    prop="fDriverAutoAudit"
                    :formatter="formatFlag"
                    label="是否自动审核司机"
                    width="160"
                    align="center"
                ></el-table-column>
            </el-table>
            <div class="page">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-size="query.pagesize"
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

        <update ref="update"></update>

        <div id="menu">
            <div class="menu" v-for="(item, index) in menus" :key="index" @click.stop="infoClick(index)">{{ item }}</div>
        </div>
    </div>
</template>

<script>
import request from '../../../assets/Public/request.js';
import tool from '../../../assets/Public/tool.js';
import '../../../assets/css/form/forn.css';
import update from './update.vue';

export default {
    name: 'basetable',
    data() {
        return {
            query: {
                fCode: '',
                fName: '',
                fChildType: '',
                fStatus: '-1',
                page: 1,
                pagesize: 15
            },
            dealerStatus: [],
            memberChild: [],
            flag: [],
            tableData: [],
            show: false,
            delList: [],
            editVisible: false,
            totalNumber: 0,
            form: {},
            idx: -1,
            id: -1,
            input1: '',
            input2: '',
            input3: '',
            input4: '',
            type: '',
            currentPage: 1,
            clickData: {},
            rightData: [],
            currentRowIndex: 0, // 获取当前右键点击的table行下标
            menus: [],
            butId: 201009001,
            menu: '',
            loading: true,
            querying:false,
            rowData: {}
        };
    },
    created() {
        this.init();
        this.getBut();
    },
	activated(){
		this.getData();
	},
    methods: {
		indexMethod(index){
			return index+1 + (this.query.page-1)*this.query.pagesize;
		},
        async init() {
            this.dealerStatus = (await request('/enum/dealerStatus/api', this.query)).data;
            this.memberChild = (await request('/enum/memberChildType/api', this.query)).data;
            this.flag = (await request('/enum/numberTransBoolean/api', this.query)).data;
			this.getData();
        },
        // 获取表格数据
        async getData() {
			if(this.querying){
						   return;
			}
			this.querying = true;
            var jsonData = await request('/parameter/member/param/list', this.query);
			this.querying = false;
            this.totalNumber = jsonData.data.total;
            this.tableData = jsonData.data.data;
        },
        reset() {
            //this.type = '';
            this.query.fCode = '';
            this.query.fName = '';
            this.query.fChildType = '';
            this.query.fStatus = '-1';
            this.getData();
        },
        selectChage() {
            this.rowData = {};
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
        //按钮点击事件
        buttonClick(item) {
            if (item == '新增') {
                let popup1 = {
                    title: item + '默认服务费方案',
                    fDealerCateId: 3
                };
                this.$store.commit('setPopup1', popup1);
                this.$refs.add.receipt();
            } else {
                let str = JSON.stringify(this.rowData);

                if (str == '{}') {
                    this.$message.error('请选择行');
                } else {
                    if (item == '修改') {
                        let popup1 = {
                            title: item + '运营商参数',
                            fFundId: this.rowData.fFundId
                        };
                        this.$store.commit('setPopup1', popup1);
                        this.$refs.update.receipt();
                    }
                }
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
            let num = Math.ceil(this.totalNumber / this.query.pagesize);
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
                //console.log(rows);
                this.$refs.multipleTable.clearSelection();
            }
        },
        //鼠标左键点击表格事件
        clickTableRow(row, event, column) {
            this.menu.style.display = 'none';
            this.rowData = row;
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
            //console.log(row, column);
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
            this.buttonClick(this.menus[index]);
        },
        getSummaries(param) {
            const { columns } = param;

            const sums = [];
            columns.forEach((column, index) => {
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
        formatChild(row) {
            return tool.getEnumValue(this.memberChild, row.fTypeChild);
        },
        formatStatus(row) {
            return tool.getEnumValue(this.dealerStatus, row.fStatus);
        },
        formatFlag(row) {
            return tool.getEnumValue(this.flag, row.fDriverAutoAudit);
        },
        formatFTaxRate(row) {
            //return parseFloat(row.fTaxRate).toFixed(2) * 100 + '%';
            return (this.accMul(row.fTaxRate,100)).toFixed(2)+"%";
        },
        formatfOperatorCharge(row){
            //return parseFloat(row.fOperatorCharge).toFixed(2) * 100 + '%';
			return (this.accMul(row.fOperatorCharge,100)).toFixed(2)+"%"
        },
		// 两个浮点数求和
	    accMul(num1,num2){
	        var m=0,s1=num1.toString(),s2=num2.toString(); 
		    try{m+=s1.split(".")[1].length}catch(e){};
		    try{m+=s2.split(".")[1].length}catch(e){};
		    return Number(s1.replace(".",""))*Number(s2.replace(".",""))/Math.pow(10,m);
	    },
        //点击弹窗事件
        receipt(index, row) {
            this.editVisible = true;
        },
        //取消事件
        cancel() {
            this.editVisible = false;
        },
        //确定事件
        determine() {
            this.editVisible = false;
        }
    },
    mounted() {
        this.toggleSelection([this.tableData[0]]);
        this.menu = document.querySelector('#menu');
    },
    components: {
        update
    }
};
</script>
