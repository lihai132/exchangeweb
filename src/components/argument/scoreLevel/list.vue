<template>
    <div class="BaseTable" @click="onMouseDown">
        <div class="container">
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
                <el-table-column :show-overflow-tooltip="true" prop="fLevelName" label="积分等级" width="120" align="center"></el-table-column>
                <el-table-column :show-overflow-tooltip="true" prop="fScore" label="所需积分" width="120" align="center"></el-table-column>
                <el-table-column :show-overflow-tooltip="true" prop="fFubiReward" label="福币奖励" width="120" align="center"></el-table-column>
                <el-table-column :show-overflow-tooltip="true" prop="fCustomerTitle" label="货主别名" width="120" align="center"></el-table-column>
                <el-table-column :show-overflow-tooltip="true" prop="fDriverTitle" label="司机别名" width="120" align="center"></el-table-column>
                <el-table-column :show-overflow-tooltip="true" prop="fOperatorTitle" label="客服别名" width="120" align="center"></el-table-column>
                <el-table-column :show-overflow-tooltip="true" prop="fDispatcherTitle" label="调度别名" width="120" align="center"></el-table-column>
                <el-table-column :show-overflow-tooltip="true" prop="fBrokerTitle" label="经纪人别名" width="120" align="center"></el-table-column>

            </el-table>
            <update ref="update"></update>
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
                fStatus: '',
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
            butId: 201012,
            menu: '',
            loading: true,
            querying:false,
            rowData:{}
        };
    },
    created() {
        this.init();
		this.getData();
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
            // this.dealerStatus = (await request('/enum/dealerStatus/api', this.query)).data;
            // this.memberChild = (await request('/enum/memberChildType/api', this.query)).data;
            // this.flag = (await request('/enum/numberTransBoolean/api', this.query)).data;
        },
        // 获取表格数据
        async getData() {
			if(this.querying){
						   return;
			}
			this.querying = true;
            var jsonData = await request('/parameter/scoreLevel/param/list', this.query);
			this.querying = false;
            this.totalNumber = jsonData.data.total;
            this.tableData = jsonData.data.data;
        },
        show(obj) {
            console.log(obj);
        },
        reset() {
            //this.type = '';
            this.query.fCode = '';
            this.query.fName = '';
            this.query.fChildType = '';
            this.query.fStatus = '';
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
                            title: item + '积分规则',
                            fLevelId: this.rowData.fLevelId
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
            this.rowData = row;
            console.log(this.rowData);
            //this.menu.style.display = 'none';
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
                //this.menu.style.display = 'none';
            }
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
