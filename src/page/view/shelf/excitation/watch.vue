<template>
    <div class="shelf">
        <el-table stripe :data="rangeList" ref="table" highlight-current-row v-loading="listLoading"
                  style="width: 100%;" :header-row-class-name="headClass" :height="tableHeight">
            <el-table-column type="selection" fixed width="55"></el-table-column>
            <el-table-column prop="name" label="用户名"></el-table-column>
            <el-table-column prop="phone" label="手机号"></el-table-column>
            <el-table-column prop="area" label="地区"></el-table-column>
            <el-table-column prop="shop" label="门店名称"></el-table-column>
            <el-table-column prop="money" label="销售额（元）"></el-table-column>
            <el-table-column prop="orderNum" label="订单数（笔）"></el-table-column>
            <el-table-column prop="profit" label="获得分润"></el-table-column>
            <el-table-column prop="bonus" label="预计奖金"></el-table-column>
            <el-table-column fixed="right" label="操作" width="100">
                <template slot-scope="scope">
                    <el-button :size="size" type="text" @click="detail(scope.$index, scope.row)">查看明细</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!--分润模板-->
        <el-dialog title="激励活动明细" :visible.sync="dialogActivity" width="840px">
            <el-table :data="activityDetail" :header-row-class-name="headClass">
                <el-table-column property="orderNum" label="订单编号" align="center" width="160"></el-table-column>
                <el-table-column property="time" label="下单时间" align="center" width="160"></el-table-column>
                <el-table-column property="shop" label="所属门店" align="center" width="160"></el-table-column>
                <el-table-column property="money" label="成交金额" align="center"></el-table-column>
                <el-table-column property="commission" label="佣金" align="center"></el-table-column>
                <el-table-column property="state" label="状态" align="center">
                    <template slot-scope="scope">
                        <el-badge v-if="scope.row.state" type="primary" value="已入账" class="block"></el-badge>
                        <el-badge v-else type="danger" value="未入账" class="block"></el-badge>
                    </template>
                </el-table-column>
            </el-table>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogActivity = false">关 闭</el-button>
            </span>
        </el-dialog>
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
                TableEditTemplate:[{
                    range:'5'
                },{
                    range:'3'
                },{
                    range:'1'
                },{
                    range:'1'
                },],
                editTemplate:{
                    name:'激励',
                    num:'4',
                },
                TableAddTemplate:[],
                addTemplate:{
                    name:'',
                    num:'',
                },

                dialogActivity:false,
                activityDetail:[{
                    orderNum:'2019060473133',
                    time:'2019-06-04 09:50:18',
                    shop:'南极人华美窗帘店',
                    money:'168',
                    commission:'38.94',
                    state:false
                },{
                    orderNum:'2019060373042',
                    time:'2019-06-03 15:43:43',
                    shop:'南极人华美窗帘店',
                    money:'198',
                    commission:'45.89',
                    state:true
                },{
                    orderNum:'2019060373026',
                    time:'2019-06-03 07:15:54',
                    shop:'南极人华美窗帘店',
                    money:'45',
                    commission:'6.86',
                    state:false
                }],
                pageType:'index',
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
                rangeList:[{
                    name: '熊美华',
                    phone: '15256358309',
                    area: '宣城广德',
                    shop: '南极人华美窗帘店',
                    money: '411',
                    orderNum:'3',
                    profit:'91.69',
                    bonus:'1040.95652',
                },{
                    name: '左金辉',
                    phone: '18297881183',
                    area: '六安裕安',
                    shop: '南极人形象设计店',
                    money: '290.6',
                    orderNum:'8',
                    profit:'63.44',
                    bonus:'618.94712',
                },],
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
            detail(index,row){
                this.dialogActivity = true
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
