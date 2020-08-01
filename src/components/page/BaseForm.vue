<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-calendar"></i> 表单
                </el-breadcrumb-item>
                <el-breadcrumb-item>基本表单</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="form-box">
                <el-form ref="form" :model="form" label-width="80px">
                    <!-- 输入框 -->
                    <el-form-item label="表单名称">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>

                    <!-- 级联选择器 -->
                    <el-form-item label="选择器">
                        <el-select v-model="form.region" placeholder="请选择">
                            <el-option key="bbk" label="步步高" value="bbk"></el-option>
                            <el-option key="xtc" label="小天才" value="xtc"></el-option>
                            <el-option key="imoo" label="imoo" value="imoo"></el-option>
                        </el-select>
                    </el-form-item>

                    <!-- 日期选择器 -->
                    <el-form-item label="日期时间">
                        <el-col :span="11">
                            <el-date-picker
                                type="date"
                                placeholder="选择日期"
                                v-model="form.date1"
                                value-format="yyyy-MM-dd"
                                style="width: 100%;"
                            ></el-date-picker>
                        </el-col>
                        <el-col class="line" :span="2">-</el-col>
                        <el-col :span="11">
                            <el-time-picker
                                placeholder="选择时间"
                                v-model="form.date2"
                                style="width: 100%;"
                            ></el-time-picker>
                        </el-col>
                    </el-form-item>

                    <!-- 地址选择器 -->
                    <el-row class="demo-autocomplete">
                        <el-col :span="12">
                            <div class="sub-title">输入地址后匹配输入建议</div>
                            <el-autocomplete
                                class="inline-input"
                                v-model="state"
                                :fetch-suggestions="querySearch"
                                placeholder="请输入内容"
                                :trigger-on-focus="false"
                                @select="handleSelect"
                            ></el-autocomplete>
                        </el-col>
                    </el-row>
                    <!-- 开关选择器 -->
                    <el-form-item label="选择开关">
                        <el-switch v-model="form.delivery"></el-switch>
                    </el-form-item>

                    <!-- 多选框 -->
                    <el-form-item label="多选框">
                        <el-checkbox-group v-model="form.type">
                            <el-checkbox label="步步高" name="type"></el-checkbox>
                            <el-checkbox label="小天才" name="type"></el-checkbox>
                            <el-checkbox label="imoo" name="type"></el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>

                    <!-- 单选框 -->
                    <el-form-item label="单选框">
                        <el-radio-group v-model="form.resource">
                            <el-radio label="步步高"></el-radio>
                            <el-radio label="小天才"></el-radio>
                            <el-radio label="imoo"></el-radio>
                        </el-radio-group>
                    </el-form-item>

                    <!-- 文本框 -->
                    <el-form-item label="文本框">
                        <el-input type="textarea" rows="5" v-model="form.desc"></el-input>
                    </el-form-item>

                    <!-- 表单提交 -->
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">表单提交</el-button>
                        <el-button>取消</el-button>
                    </el-form-item>

                    <!-- 树形结构 -->
                    <el-tree
                        :data="data3"
                        show-checkbox
                        node-key="id"
                        :default-expanded-keys="[1,2,3,4,5]"
                        :default-checked-keys="[1]"
                        :props="defaultProps"
                    ></el-tree>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'baseform',
    data() {
        return {
            restaurants: [],

            state: '',
            form: {
                name: '',
                region: '',
                date1: '',
                date2: '',
                delivery: true,
                type: ['步步高'],
                resource: '小天才',
                desc: '',
                options: []
            },

            //树形结构的参数
            data3: [
                {
                    id: 1,
                    label: '一级 1',
                    children: [
                        {
                            id: 2,
                            label: '二级 1-1',
                            children: [
                                {
                                    id: 3,
                                    label: '三级 1-1-1'
                                },
                                {
                                    id: 4,
                                    label: '三级 1-1-2',
                                    children: [
                                        {
                                            id: 9,
                                            label: '四级 1-1-1'
                                        },
                                        {
                                            id: 10,
                                            label: '四级 1-1-2'
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ],
            defaultProps: {
                children: 'children',
                label: 'label'
            }
        };
    },
    methods: {
        onSubmit() {
            this.$message.success('提交成功！');
        },
        querySearch(queryString, cb) {
            var restaurants = this.restaurants;
            var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
            // 调用 callback 返回建议列表的数据
            cb(results);
        },
        createFilter(queryString) {
            return restaurant => {
                return restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0;
            };
        },
        loadAll() {
            //这是你的地址列表数据
            return [
                { value: '三全鲜食（北新泾店）', address: '长宁区新渔路144号' },
                { value: 'Hot honey 首尔炸鸡（仙霞路）', address: '上海市长宁区淞虹路661号' },
                { value: '新旺角茶餐厅', address: '上海市普陀区真北路988号创邑金沙谷6号楼113' },
                { value: '泷千家(天山西路店)', address: '天山西路438号' },
                { value: '胖仙女纸杯蛋糕（上海凌空店）', address: '上海市长宁区金钟路968号1幢18号楼一层商铺18-101' },
                { value: '贡茶', address: '上海市长宁区金钟路633号' },
                { value: '豪大大香鸡排超级奶爸', address: '上海市嘉定区曹安公路曹安路1685号' },
                { value: '茶芝兰（奶茶，手抓饼）', address: '上海市普陀区同普路1435号' },
                { value: '十二泷町', address: '上海市北翟路1444弄81号B幢-107' },
                { value: '星移浓缩咖啡', address: '上海市嘉定区新郁路817号' },
                { value: '阿姨奶茶/豪大大', address: '嘉定区曹安路1611号' },
                { value: '新麦甜四季甜品炸鸡', address: '嘉定区曹安公路2383弄55号' },
                { value: 'Monica摩托主题咖啡店', address: '嘉定区江桥镇曹安公路2409号1F，2383弄62号1F' },
                { value: '浮生若茶（凌空soho店）', address: '上海长宁区金钟路968号9号楼地下一层' },
                { value: 'NONO JUICE  鲜榨果汁', address: '上海市长宁区天山西路119号' },
                { value: 'CoCo都可(北新泾店）', address: '上海市长宁区仙霞西路' },
                { value: '快乐柠檬（神州智慧店）', address: '上海市长宁区天山西路567号1层R117号店铺' },
                { value: 'Merci Paul cafe', address: '上海市普陀区光复西路丹巴路28弄6号楼819' },
                { value: '猫山王（西郊百联店）', address: '上海市长宁区仙霞西路88号第一层G05-F01-1-306' },
                { value: '枪会山', address: '上海市普陀区棕榈路' },
                { value: '纵食', address: '元丰天山花园(东门) 双流路267号' },
                { value: '钱记', address: '上海市长宁区天山西路' },
                { value: '壹杯加', address: '上海市长宁区通协路' },
                { value: '唦哇嘀咖', address: '上海市长宁区新泾镇金钟路999号2幢（B幢）第01层第1-02A单元' },
                { value: '爱茜茜里(西郊百联)', address: '长宁区仙霞西路88号1305室' },
                { value: '爱茜茜里(近铁广场)', address: '上海市普陀区真北路818号近铁城市广场北区地下二楼N-B2-O2-C商铺' },
                { value: '鲜果榨汁（金沙江路和美广店）', address: '普陀区金沙江路2239号金沙和美广场B1-10-6' },
                { value: '开心丽果（缤谷店）', address: '上海市长宁区威宁路天山路341号' },
                { value: '超级鸡车（丰庄路店）', address: '上海市嘉定区丰庄路240号' },
                { value: '妙生活果园（北新泾店）', address: '长宁区新渔路144号' },
                { value: '香宜度麻辣香锅', address: '长宁区淞虹路148号' },
                { value: '凡仔汉堡（老真北路店）', address: '上海市普陀区老真北路160号' },
                { value: '港式小铺', address: '上海市长宁区金钟路968号15楼15-105室' },
                { value: '蜀香源麻辣香锅（剑河路店）', address: '剑河路443-1' },
                { value: '北京饺子馆', address: '长宁区北新泾街道天山西路490-1号' },
                { value: '饭典*新简餐（凌空SOHO店）', address: '上海市长宁区金钟路968号9号楼地下一层9-83室' },
                { value: '焦耳·川式快餐（金钟路店）', address: '上海市金钟路633号地下一层甲部' },
                { value: '动力鸡车', address: '长宁区仙霞西路299弄3号101B' },
                { value: '浏阳蒸菜', address: '天山西路430号' },
                { value: '四海游龙（天山西路店）', address: '上海市长宁区天山西路' },
                { value: '樱花食堂（凌空店）', address: '上海市长宁区金钟路968号15楼15-105室' },
                { value: '壹分米客家传统调制米粉(天山店)', address: '天山西路428号' },
                { value: '福荣祥烧腊（平溪路店）', address: '上海市长宁区协和路福泉路255弄57-73号' },
                { value: '速记黄焖鸡米饭', address: '上海市长宁区北新泾街道金钟路180号1层01号摊位' },
                { value: '红辣椒麻辣烫', address: '上海市长宁区天山西路492号' },
                { value: '(小杨生煎)西郊百联餐厅', address: '长宁区仙霞西路88号百联2楼' },
                { value: '阳阳麻辣烫', address: '天山西路389号' },
                { value: '南拳妈妈龙虾盖浇饭', address: '普陀区金沙江路1699号鑫乐惠美食广场A13' }
            ];
        },
        handleSelect(item) {
            console.log(item);
        }
    },
    mounted() {
        this.restaurants = this.loadAll();
    }
};
</script>
<style lang="scss" scoped>
.el-row {
    margin-left: 20px;
    padding-bottom: 20px;
    .sub-title {
        font-size: 14px;
        color: rgba($color: #000000, $alpha: 0.5);
        line-height: 20px;
        padding-bottom: 10px;
    }
}
</style>