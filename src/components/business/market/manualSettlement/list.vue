<template>
    <div class="BaseTable" @click="onMouseDown">
        <div class="container">
            <div class="formatLine">
                <div class="formatTittleleft"></div>
                <div class="formatTittle">- 手工结算</div>
                <div class="formatTittleright"></div>
            </div>
            <div style="width:100%;margin:5px;padding-left:50px;font-weight:700;">
                <div style="margin:5px;display:inline;color:#009DD9;font-size:18px;">当前结算模式：</div>
                <div style="margin:5px;display:inline;color:red;">{{ modelEx }}</div>
            </div>
            <div style="width:100%;margin:5px;padding-left:50px;font-weight:700;">
                <div style="margin:5px;display:inline;color:#009DD9;font-size:18px;">当前结算状态：</div>
                <div style="margin:5px;display:inline;color:red;">结算中</div>
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
                <el-table-column prop="fId" label="步骤" width="80" align="center"> </el-table-column>
                <el-table-column prop="fDescript" label="描述" width="140" align="center"> </el-table-column>
                <el-table-column prop="fStatus" :formatter="formatfStatus" label="状态" width="100" align="center"> </el-table-column>
                <el-table-column prop="fStartTime" label="开始时间" width="160" align="center"> </el-table-column>
                <el-table-column prop="fCompleteTime" label="结束时间" width="160" align="center"> </el-table-column>
                <el-table-column prop="tempDate" label="计算时长（毫秒）" width="160" align="center"> </el-table-column>
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

        <div id="menu">
            <div class="menu" v-for="(item, index) in menus" :key="index" @click.stop="infoClick(index)">{{ item }}</div>
        </div>
    </div>
</template>

<script>
import request from '../../../../assets/Public/request.js';
import tool from '../../../../assets/Public/tool.js';
import '../../../../assets/css/form/forn.css';
import '../../../../assets/css/popup/popup.css';
export default {
    name: 'basetable',
    data() {
        return {
            query: {
                page: 1,
                pagesize: 20
            },
            status: [],
            models: [],
            data: [],
            modelEx: '',
            tableData: [],
            channel: [],
            calculatelType: [],
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
            butId: 801016003002,
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
        // 获取表格数据
        async init() {
            this.status = (await request('/enum/SettlementStatus/api', '')).data;
            this.models = (await request('/enum/SettlementModel/api', '')).data;
            this.modelEx = tool.getEnumValue(this.models, this.data.model);
			this.getData();
        },
        // 获取表格数据
        async getData() {
			if(this.querying){
						   return;
			}
			this.querying = true;
            var jsonData = await request('/business/handSettlement', this.query);
			this.querying = false;
            this.data = jsonData.data.data;
            this.tableData = jsonData.data.list;

            this.modelEx = tool.getEnumValue(this.models, this.data.model);
  

        },
        selectChage() {
            this.rowData = {};
        },
        reset() {
            //this.type = '';
            this.query.type = '';
            this.getData();
        },
        //按钮点击事件
        buttonClick(item) {
            if (item == '结算') {
                this.$message.success(`结算成功`);
            }
        },
        //获取按钮数据
        getBut() {
            let actionList = this.$store.state.Login.actionList;
            actionList.map(item => {
                if (item.fId == this.butId) {
                    this.menus.push(item.fName);
                }
            });
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
                //console.log(rows);
                this.$refs.multipleTable.clearSelection();
            }
        },
        //鼠标左键点击表格事件
        clickTableRow(row, event, column) {
            this.rowData = row;
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
            /* columns.forEach((column, index) => {
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
            */
            return sums;
        },
        onMouseDown(event) {
            if (event.button == 0) {
                this.menu.style.display = 'none';
            }
        },
        formatfStatus(row) {
            return tool.getEnumValue(this.status, row.fStatus);
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
    components: {}
};
//  固定底部滚动条
//  $(".el-table__body-wrapper").css("height","70%");
//  $(".el-table__body-wrapper").css("overflow-y","auto");
</script>
