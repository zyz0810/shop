<template>
    <div class="shelf">
        <div>
            <el-button type="primary" :size="size" icon="el-icon-plus" @click="addShelf">添加</el-button>
            <el-button type="danger" :size="size" icon="el-icon-close">删除</el-button>
            <el-button :size="size" icon="el-icon-refresh">刷新</el-button>
            <el-button :size="size" @click="getExcel(orderList)">导出</el-button>
            <el-select v-model="valueState" placeholder="活动状态" :size="size" style="margin-right: 10px;width: 100px;">
                <el-option
                        v-for="item in state"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </el-option>
            </el-select>
            <el-input class="search fr" placeholder="请输入内容" :size="size" v-model="keyWord"><i slot="prefix" class="el-input__icon el-icon-search"></i></el-input>
        </div>
        <el-table stripe :data="orderList" ref="table" highlight-current-row v-loading="listLoading"
                  style="width: 100%; margin-top: 20px;" :header-row-class-name="headClass" :height="tableHeight">
            <el-table-column type="selection" fixed width="55"></el-table-column>
            <el-table-column prop="name" label="活动名称"></el-table-column>
            <el-table-column prop="range" label="活动范围"></el-table-column>
            <el-table-column prop="role" label="参与角色"></el-table-column>
            <el-table-column prop="startTime" label="开始时间"></el-table-column>
            <el-table-column prop="endTime" label="结束时间"></el-table-column>
            <el-table-column prop="state" label="活动状态"></el-table-column>
            <el-table-column prop="template" label="排名模板"></el-table-column>
            <el-table-column prop="money" label="销售额"></el-table-column>
            <el-table-column prop="commission" label="支出佣金"></el-table-column>
            <el-table-column prop="jackpot" label="奖池"></el-table-column>
            <el-table-column fixed="right" label="操作" width="100">
                <template slot-scope="scope">
                    <el-button :size="size" type="text" @click="handleWatch(scope.$index, scope.row)">查看</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>

</template>
<script>
    import util from '../../../../common/js/util'
    //import NProgress from 'nprogress'
    import {getUserListPage, removeUser, batchRemoveUser, editUser, addUser} from '../../../../api/api';
    import quillEditor from './../../../../components/quill-editor.vue';
    export default {
        data() {
            return {
                time:'',
                state:[{
                    label:'未开始',
                    value:'0'
                },{
                    label:'进行中',
                    value:'1'
                },{
                    label:'已结束',
                    value:'2'
                }],
                valueState: '',
                keyWord:'',
                size: this.GLOBAL.size,
                screenHeight: document.body.clientHeight, // 这里是给到了一个默认值 （这个很重要）
                tableHeight: null, // 表格高度
                orderList: [{
                    name: '2019年6月第1周销售排名',
                    range: '中国',
                    role: '货架店主',
                    startTime: '2019-06-03 00:00:00',
                    endTime: '2019-06-09 22:00:00',
                    state:'已结束',
                    mode:'￥1339.60',
                    template:'2019年4月第3周',
                    money:'13965000663 (马剑)',
                    commission:'￥300.03',
                    jackpot:'￥2813.40'
                },{
                    name: '2019年5月第4周销售排名',
                    range: '中国',
                    role: '货架店主',
                    startTime: '2019-06-03 00:00:00',
                    endTime: '2019-06-09 22:00:00',
                    state:'已结束',
                    mode:'￥1339.60',
                    template:'2019年4月第3周',
                    money:'13965000663 (马剑)',
                    commission:'￥300.03',
                    jackpot:'￥2813.40'
                },{
                    name: '2019年5月第3周销售排名',
                    range: '中国',
                    role: '货架店主',
                    startTime: '2019-06-03 00:00:00',
                    endTime: '2019-06-09 22:00:00',
                    state:'已结束',
                    mode:'￥1339.60',
                    template:'2019年4月第3周',
                    money:'13965000663 (马剑)',
                    commission:'￥300.03',
                    jackpot:'￥2813.40'
                },],
                total: 0,
                page: 1,
                listLoading: false,
                sels: [],//列表选中列
                editLoading: false,
            }
        },
        components:{
            quillEditor,
        },
        watch: {
            // 监听屏幕高度改变表格高度
            screenHeight(val) {
                // 初始化表格高度
                this.tableHeight = window.innerHeight - this.$refs.table.$el.offsetTop - 100 - 60;
            }
        },
        methods: {
            getExcel(res) {
                require.ensure([], () => {
                    const { export_json_to_excel } = require('@/common/js/Export2Excel.js')
                    const tHeader = ['活动名称', '活动范围','参与角色','开始时间','结束时间','活动状态','排名模板','销售额','支出佣金','奖池']
                    const filterVal = ['name', 'range','role', 'startTime','endTime', 'state','mode', 'template','money', 'commission', 'jackpot']
                    const list = res
                    const data = this.formatJson(filterVal, list)
                    export_json_to_excel(tHeader, data, '导出列表名称')
                })
            },
            formatJson(filterVal, jsonData) {
                return jsonData.map(v => filterVal.map(j => v[j]))
            },

            handleWatch(){
                this.$router.push({
                    path:'/shelf/excitation/watch',
                    query:{
                        index:'2',
                        leaf:'0'
                    }
                });
            },
            addShelf(){
                this.$router.push({
                    path:'/shelf/excitation/add',
                    query:{
                        index:'2',
                        leaf:'0'
                    }
                });
            },

            //获取用户列表
            getUsers() {
                let para = {
                    page: this.page,
                    name: this.filters.name
                };
                this.listLoading = true;
                //NProgress.start();
                getUserListPage(para).then((res) => {
                    this.total = res.data.total;
                    this.users = res.data.users;
                    this.listLoading = false;
                    //NProgress.done();
                });
            },
        },
        mounted() {
            this.headClass()
            // this.getUsers();
            this.tableHeight = window.innerHeight - this.$refs.table.$el.offsetTop - 100 - 60;
            // 监听屏幕高度
            window.onresize = () => {
                return (() => {
                    window.screenHeight = document.documentElement.clientHeight || document.body.clientHeight;
                    this.screenHeight = window.screenHeight;
                    console.log('屏幕高度：' + window.screenHeight)
                })();
            };
        }
    }

</script>
