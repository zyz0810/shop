<template>
    <div class="shelf">
        <el-row :gutter="10" v-if="pageType == 'index'">
            <el-col class="hidden-sm-and-down" :md="6" :lg="6" :xl="6">
                <el-menu :default-openeds="openeds" class="el-menu-vertical-demo shop">
                    <el-submenu index="1" class="gray08">
                        <template slot="title" class="gray08">
                            <i class="el-icon-s-shop"></i>
                            <span>南极人衣锦坊</span>
                        </template>
                        <el-menu-item index="1-1"><i class="el-icon-menu"></i>北京
                            <el-badge class="mark" :value="1"/>
                        </el-menu-item>
                        <el-submenu index="1-2">
                            <template slot="title"><i class="el-icon-menu"></i><span @click.stop="myclick1">安徽<el-badge
                                    class="mark" :value="12"/></span></template>
                            <el-submenu index="1-2-1">
                                <template slot="title"><i class="el-icon-s-help"></i>合肥
                                    <el-badge class="mark" :value="8"/>
                                </template>
                                <el-menu-item index="1-2-1-1"><i class="el-icon-location"></i>瑶海区
                                    <el-badge class="mark" :value="2"/>
                                </el-menu-item>
                                <el-menu-item index="1-2-1-2"><i class="el-icon-location"></i>庐阳区
                                    <el-badge class="mark" :value="2"/>
                                </el-menu-item>
                                <el-menu-item index="1-2-1-3"><i class="el-icon-location"></i>经开区
                                    <el-badge class="mark" :value="4"/>
                                </el-menu-item>
                            </el-submenu>
                            <el-menu-item index="1-2-2"><i class="el-icon-s-help"></i>淮北
                                <el-badge class="mark" :value="2"/>
                            </el-menu-item>
                            <el-menu-item index="1-2-3"><i class="el-icon-s-help"></i>六安
                                <el-badge class="mark" :value="5"/>
                            </el-menu-item>
                        </el-submenu>
                        <el-submenu index="1-3">
                            <template slot="title"><i class="el-icon-menu"></i>四川
                                <el-badge class="mark" :value="2"/>
                            </template>
                            <el-menu-item index="1-3-1"><i class="el-icon-s-help"></i>眉山
                                <el-badge class="mark" :value="2"/>
                            </el-menu-item>
                        </el-submenu>
                        <el-submenu index="1-4">
                            <template slot="title"><i class="el-icon-menu"></i>福建
                                <el-badge class="mark" :value="12"/>
                            </template>
                            <el-submenu index="1-4-1">
                                <template slot="title"><i class="el-icon-s-help"></i>泉州
                                    <el-badge class="mark" :value="12"/>
                                </template>
                                <el-menu-item index="1-4-1-1"><i class="el-icon-location"></i>惠安
                                    <el-badge class="mark" :value="12"/>
                                </el-menu-item>
                            </el-submenu>
                        </el-submenu>
                    </el-submenu>
                </el-menu>
            </el-col>
            <el-col :xs="24" :sm="24" :md="18" :lg="18" :xl="18">
                <div>
                    <el-button type="primary" :size="size" icon="el-icon-plus">添加</el-button>
                    <el-button type="danger" :size="size" icon="el-icon-close">删除</el-button>
                    <el-button :size="size" icon="el-icon-refresh">刷新</el-button>
                    <el-input class="search fr" placeholder="请输入内容" :size="size" v-model="keyWord"><i slot="prefix" class="el-input__icon el-icon-search"></i></el-input>
                </div>
                <el-table stripe :data="shelfList" ref="table" highlight-current-row v-loading="listLoading"
                          @selection-change="selsChange" style="width: 100%; margin-top: 20px;" :height="tableHeight">
                    <el-table-column type="selection" fixed width="55"></el-table-column>
                    <el-table-column prop="num" label="货架号"></el-table-column>
                    <el-table-column prop="name" label="门店名称"></el-table-column>
                    <el-table-column label="渠道商">
                        <template slot-scope="scope">
                            <span class="baseColor" @click="profitChannel()">{{scope.row.name2}}</span>
                            <!--<el-button :size="size" type="text" @click="profitChannel">{{scope.row.name2}}</el-button>-->
                        </template>
                    </el-table-column>
                    <el-table-column prop="address" label="地址"></el-table-column>
                    <el-table-column prop="phone" label="门店联系方式"></el-table-column>
                    <el-table-column prop="time" label="上架时间"></el-table-column>
                    <el-table-column label="货架二维码">
                        <template slot-scope="scope">
                            <span class="baseColor" @click="shelfCode()">{{scope.row.code}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column fixed="right" label="操作" width="100">
                        <template slot-scope="scope">
                            <el-button :size="size" type="text" @click="handleEdit(scope.$index, scope.row)">管理</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>
        <div v-if="pageType=='add'">
            <p>添加布点商家</p>

            <el-form ref="form" :model="addForm" label-width="80px">
                <el-form-item label="公司名称">
                    <el-input :size="size" v-model="addForm.name"></el-input>
                </el-form-item>
                <el-form-item label="绑定货架所在门店">
                    <el-select :size="size" v-model="addForm.shop" placeholder="绑定货架所在门店">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="推广渠道">
                    <el-select :size="size" v-model="addForm.channel" placeholder="绑定货架所在门店">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="选择图片展示模板">
                    <el-radio-group :size="size" v-model="addForm.show">
                        <el-radio label="大图"></el-radio>
                        <el-radio label="小图"></el-radio>
                    </el-radio-group>
                    <el-button :size="size" type="primary">查看示例</el-button>
                </el-form-item>
                <el-form-item label="分润模板">
                    <el-button :size="size" type="primary">{{addForm.profit}}</el-button>
                    <el-button :size="size" type="text">取消</el-button>
                    <el-button :size="size" type="text">新建模板</el-button>
                </el-form-item>
                <el-form-item label="货架分润">
                    <p>店主：<el-input :size="size" v-model="addForm.adminProfit"></el-input><span>%(分润比例：0~100，例如：10)</span></p>
                    <p>员工：<el-input :size="size" v-model="addForm.staffProfit"></el-input><span>%(分润比例：0~100，例如：10)</span></p>
                </el-form-item>
                <el-form-item label="货架绑定二维码">
                    <el-input :size="size" v-model="addForm.code"></el-input><span class="baseColor">申请二维码编号</span>
                </el-form-item>
                <el-form-item label="关联货架套餐订单">
                    <el-select :size="size" v-model="addForm.package" placeholder="绑定货架所在门店">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                    <p class="gray10">关联货架套餐订单后，可方便管理店铺库存</p>
                </el-form-item>
                <el-form-item label="关联商品信息">
                    <p>无相关商品</p>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="addSubmit">提 交</el-button>
                    <el-button>返 回</el-button>
                </el-form-item>
            </el-form>
        </div>

        <!--渠道商分润-->
        <el-dialog title="渠道商分润" :visible.sync="dialogTableVisible" width="540px">
            <el-table :data="gridData" style="width: 500px;">
                <el-table-column type="index" width="100" align="center"></el-table-column>
                <el-table-column property="name" label="推广人" align="center" width="300"></el-table-column>
                <el-table-column label="分润比例" width="100" align="center">
                    <template slot-scope="scope">
                        <el-badge :value="scope.row.address" class="block"></el-badge>
                    </template>
                </el-table-column>
            </el-table>
        </el-dialog>
        <!--货架二维码-->
        <el-dialog title="查看二维码" :visible.sync="dialogVisible" width="30%">
            <span><img src="http://cdn.tiaohuo.com/upload/image/201904/1dc3ee49-8b1b-4e15-8be0-04e77e4c3464.jpg"/></span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">关 闭</el-button>
                <el-button type="primary" @click="download()">下 载</el-button>

            </span>
        </el-dialog>
    </div>

</template>
<script>
    import util from '../../common/js/util'
    //import NProgress from 'nprogress'
    import {getUserListPage, removeUser, batchRemoveUser, editUser, addUser} from '../../api/api';

    export default {
        data() {
            return {
                addForm:{
                    name:'',
                    shop:'',
                    channel:'',
                    show:'',
                    profit:'选择模板',
                    adminProfit:'',
                    staffProfit:'',
                    code:'',
                    package:''
                },
                pageType:'add',
                keyWord:'',
                size: this.GLOBAL.size,
                screenHeight: document.body.clientHeight, // 这里是给到了一个默认值 （这个很重要）
                tableHeight: null, // 表格高度
                filters: {
                    name: ''
                },
                shelfList: [{
                    num: '201906038715',
                    name: '怡菲·宝贝优品',
                    name2: '怡菲·肇庆1店',
                    address: '广东省佛山市禅城区南庄上元农行旁宝贝优品',
                    phone: '18575778368',
                    time: '2019-06-03 16:40:04',
                    code: '100698'
                },],
                total: 0,
                page: 1,
                listLoading: false,
                sels: [],//列表选中列


                editLoading: false,
                editFormRules: {
                    name: [
                        {required: true, message: '请输入姓名', trigger: 'blur'}
                    ]
                },


                addFormVisible: false,//新增界面是否显示
                addLoading: false,
                gridData: [{
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '5%'
                }, {
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '4%'
                }, {
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '6%'
                }, {
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '10%'
                }],
                dialogTableVisible: false,
                dialogVisible: false
            }
        },

        watch: {
            // 监听屏幕高度改变表格高度
            screenHeight(val) {
                // 初始化表格高度
                this.tableHeight = window.innerHeight - this.$refs.table.$el.offsetTop - 100 - 60;
            }
        },
        methods: {
            addSubmit(){

            },
            download() {
               console.log('下载')
            },
            //渠道商分润
            profitChannel() {
                this.dialogTableVisible = true
            },
            //打开二维码
            shelfCode() {
                this.dialogVisible = true
            },
            myclick1: function () {
                console.log('4455')
                this.$router.push('/tenant/edit')
            },
            handleCurrentChange(val) {
                this.page = val;
                this.getUsers();
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
            //删除
            handleDel: function (index, row) {
                this.$confirm('下架后商品无法被搜索到，确定下架?', '提示', {
                    type: 'warning'
                }).then(() => {
                    this.listLoading = true;
                    //NProgress.start();
                    let para = {id: row.id};
                    removeUser(para).then((res) => {
                        this.listLoading = false;
                        //NProgress.done();
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        });
                        this.getUsers();
                    });
                }).catch(() => {

                });
            },


            //批量删除
            batchRemove: function () {
                var ids = this.sels.map(item => item.id).toString();
                this.$confirm('确认删除选中记录吗？', '提示', {
                    type: 'warning'
                }).then(() => {
                    this.listLoading = true;
                    //NProgress.start();
                    let para = {ids: ids};
                    batchRemoveUser(para).then((res) => {
                        this.listLoading = false;
                        //NProgress.done();
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        });
                        this.getUsers();
                    });
                }).catch(() => {

                });
            },

        },
        mounted() {
            this.getUsers();
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

<style lang="scss" type="text/scss">
    @import '../../styles/color.scss';

    .shelf {
        padding: 10px;
        background: $white01;
        .search{
            width: 200px;
        }
    }
</style>
