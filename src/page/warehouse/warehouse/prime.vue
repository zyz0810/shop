<template>
    <div class="warehouse">
        <div v-if="pageType == 'manage'">
            <div class="out_btn">
                <el-button type="primary" :size="size" @click="onCreate">设置期初库存</el-button>
            </div>
            <!--列表-->
            <el-table stripe :data="warehouse" ref="table" highlight-current-row v-loading="listLoading" style="width: 100%;" :cell-class-name="cellStyle" :height="tableHeight">
                <el-table-column prop="name0" label="单据编号" class="baseColor"></el-table-column>
                <el-table-column prop="name1" label="仓库/门店" ></el-table-column>
                <el-table-column prop="name2" label="制单时间"></el-table-column>
                <el-table-column prop="name3" label="入库时间"></el-table-column>
                <el-table-column prop="name4" label="操作人"></el-table-column>
                <el-table-column label="备注">
                    <template slot-scope="scope">
                        <span>{{ scope.row.name5?scope.row.name5:'--' }}</span>
                    </template>
                </el-table-column>
                <el-table-column fixed="right" label="操作" width="100">
                    <template slot-scope="scope">
                        <el-button :size="size" type="text" @click="goView">详情</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <!--编辑初期库存-->
        <div v-if="pageType == 'view'" class="view">
            <p>基本信息</p>
            <el-form ref="form" label-width="160px" :inline="true" :size="size">
                <el-form-item label="单据编号">
                    <span>QYW201906032356</span>
                </el-form-item>
                <el-form-item label="仓库">
                    <span>QYW201906032356</span>
                </el-form-item>
                <el-form-item label="操作人">
                    <span>沙宝亮</span>
                </el-form-item>
                <el-form-item label="制单时间">
                    <span>2019-05-07 12:58:56</span>
                </el-form-item>
                <el-form-item label="入库时间">
                    <span>2019-05-07 12:58:56</span>
                </el-form-item>
                <el-form-item label="备注">
                    <span>--</span>
                </el-form-item>
                <el-divider></el-divider>
            </el-form>
            <b class="sub">合计：8989.00元</b>
            <!--列表-->
            <el-table stripe :data="product" :header-row-class-name="headClass" :size="size" ref="table" highlight-current-row v-loading="listLoading" style="width: 100%;" :height="tableHeight">
                <el-table-column label="商品名称">
                    <template slot-scope="scope">
                        <div class="product">
                            <div class="img fl"><img :src="scope.row.name0"></div>
                            <div class="fl">
                                <p>{{scope.row.name1}}</p>
                                <p class="gray10">{{scope.row.name2}}</p>
                            </div>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="name3" label="单位" ></el-table-column>
                <el-table-column prop="name4" label="期初库存数量"></el-table-column>
                <el-table-column prop="name5" label="期初成本（元）"></el-table-column>
                <el-table-column fixed="right" prop="name6" label="小计（元）" width="100"></el-table-column>
            </el-table>

            <div class="bottom">
                <el-button :size="size" @click="goBack()">返回</el-button>
            </div>

        </div>
        <!--设置初期库存-->
        <div v-if="pageType == 'create'">
            <p>基本信息</p>
            <el-form :inline="true" :model="create" class="demo-form-inline" label-width="100px" hideRequiredSterisk="true">
                <el-form-item label="仓库">
                    <el-select v-model="create.warehouse" :size="size" placeholder="请选择仓库">
                        <el-option label="分店1" value="shanghai"></el-option>
                        <el-option label="分店1" value="beijing"></el-option>
                    </el-select>
                    <span class="baseColor f12 bold">新建</span>
                </el-form-item>
                <el-form-item label="入库时间">
                    <el-date-picker v-model="create.time" type="datetime" placeholder="选择日期时间" default-time="12:00:00"></el-date-picker>
                </el-form-item>
                <el-form-item label="操作人">
                    <el-input v-model="create.person" :size="size" :disabled="true"></el-input>
                </el-form-item>

            </el-form>
            <el-form :inline="true" :model="create" class="demo-form-inline" label-width="100px" hideRequiredSterisk="true">
                <el-form-item label="备注">
                    <el-input v-model="create.desc" :size="size" type="textarea"></el-input>
                </el-form-item>
            </el-form>

            <div class="m18">
                <el-button type="primary" @click="dialogProduct = true">选择商品</el-button>
                <el-button :size="size" type="text" @click="goAddProduct">新建商品</el-button>
            </div>


            <!--列表-->
            <el-table stripe :data="productSet" :header-row-class-name="headClass" :size="size" ref="table" highlight-current-row v-loading="listLoading" style="width: 100%; margin-top: 20px;" :height="tableHeight">
                <el-table-column label="商品名称" width="350">
                    <template slot-scope="scope">
                        <div class="product">
                            <div class="img fl"><img :src="scope.row.name0"></div>
                            <div class="fl">
                                <p>{{scope.row.name1}}</p>
                                <p class="gray10">{{scope.row.name2}}</p>
                            </div>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="name3" label="单位" ></el-table-column>
                <!--<el-table-column  type="index"></el-table-column>-->
                <el-table-column label="期初库存数量">
                    <template slot-scope="scope">
                        <el-input :size="size" v-model="scope.row.name4" @change="inputNum($event,scope.$index)"></el-input>
                    </template>
                </el-table-column>
                <el-table-column label="期初成本（元）">
                    <template slot-scope="scope">
                        <span>{{ scope.row.name5 | money}}</span>
                        <!--<el-input :size="size" type="number" v-model="scope.row.name5"></el-input>-->
                    </template>
                </el-table-column>
                <el-table-column label="小计（元）">
                    <template slot-scope="scope">
                        <span>{{ scope.row.name6 | money}}</span>
                    </template>
                </el-table-column>
                <el-table-column fixed="right" label="操作" width="100">
                    <template slot-scope="scope">
                        <el-button :size="size" type="text" class="red01" @click="delProduct(scope.$index)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>

        </div>





        <!--选择商品-->
        <el-dialog title="选择商品" :visible.sync="dialogProduct" width="900px" :before-close="handleClose" class="category">
            <span class=" clearfix">
                <el-tree :data="category" :props="defaultProps" @node-click="handleNodeClick" class="fl"></el-tree>
                <div class="categoryProduct fr">
                    <p class="baseColor goAddProduct">新建商品</p>
                    <!--列表-->
                    <el-table stripe :data="categoryProduct" :header-row-class-name="headClass" @selection-change="checkedProduct" :size="size" ref="productTable" highlight-current-row v-loading="listLoading" style="width: 100%;" height="500">
                         <el-table-column type="selection" @selection-change="checkedProduct" width="55"></el-table-column>
                        <el-table-column label="商品名称" width="300">
                            <template slot-scope="scope">
                                <div class="product">
                                    <div class="img fl"><img :src="scope.row.name0"></div>
                                    <div class="fl">
                                        <p>{{scope.row.name1}}</p>
                                        <p class="gray10">{{scope.row.name2}}</p>
                                    </div>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="name3" label="单位" ></el-table-column>
                        <el-table-column prop="name4" label="规格"></el-table-column>
                    </el-table>
                </div>
            </span>
            <span slot="footer" class="dialog-footer">
                <span>已选商品：{{selectedProduct.length}}</span>
                <el-button type="primary" @click="goPrime">确定</el-button>
            </span>
        </el-dialog>



        <el-dialog title="仓库创建成功" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
            <span>已成功创建<span class="baseColor">南二环是谁的热</span>，现在就去甚至期初库存吗？</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">暂时放弃</el-button>
                <el-button type="primary" @click="goPrime">去设置</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import util from '../../../common/js/util'
    //import NProgress from 'nprogress'
    import { getUserListPage, removeUser, batchRemoveUser, editUser, addUser } from '../../../api/api';
    import city from './../../../components/city.vue';
    export default {
        data() {
            return {
                categoryProduct:[{
                    name0:'http://cdn.tiaohuo.com/upload/image/201802/c8e089cb-4ea7-4127-b2c3-7ccd0ca86dcb.jpg',
                    name1:'小米手环2.0黑色款',
                    name2:'P201956205363',
                    name3:'个',
                    name4:'黑色，XXL',
                },{
                    name0:'http://cdn.tiaohuo.com/upload/image/201802/c8e089cb-4ea7-4127-b2c3-7ccd0ca86dcb.jpg',
                    name1:'小米手环2.0黑色款',
                    name2:'P201956205363',
                    name3:'个',
                    name4:'黑色，XXL',
                },{
                    name0:'http://cdn.tiaohuo.com/upload/image/201802/c8e089cb-4ea7-4127-b2c3-7ccd0ca86dcb.jpg',
                    name1:'小米手环2.0黑色款',
                    name2:'P201956205363',
                    name3:'个',
                    name4:'黑色，XXL',
                },{
                    name0:'http://cdn.tiaohuo.com/upload/image/201802/c8e089cb-4ea7-4127-b2c3-7ccd0ca86dcb.jpg',
                    name1:'小米手环2.0黑色款',
                    name2:'P201956205363',
                    name3:'个',
                    name4:'黑色，XXL',
                }],
                autosize:{
                    minRows: 2, maxRows: 6
                },
                category: [{
                    label: '一级 1',
                    children: [{
                        label: '二级 1-1',
                        children: [{
                            label: '三级 1-1-1'
                        }]
                    }]
                }, {
                    label: '一级 2',
                    children: [{
                        label: '二级 2-1',
                        children: [{
                            label: '三级 2-1-1'
                        }]
                    }, {
                        label: '二级 2-2',
                        children: [{
                            label: '三级 2-2-1'
                        }]
                    }]
                }, {
                    label: '一级 3',
                    children: [{
                        label: '二级 3-1',
                        children: [{
                            label: '三级 3-1-1'
                        }]
                    }, {
                        label: '二级 3-2',
                        children: [{
                            label: '三级 3-2-1'
                        }]
                    }]
                }],
                defaultProps: {
                    children: 'children',
                    label: 'label'
                },
                form:{
                    name:'',
                    num:'',
                    area:'',
                    address:'',
                    person:'',
                    phone:'',
                    desc:''
                },
                create: {
                    warehouse:'',
                    person:'操作人1',
                    time:'',
                    desc:''
                },
                size:this.GLOBAL.size,
                condition: {
                    warehouse:'',
                    category: '',
                    product: '',
                    person:'',
                    num:''
                },
                dialogProduct:false,
                screenHeight: document.body.clientHeight, // 这里是给到了一个默认值 （这个很重要）
                tableHeight: null, // 表格高度
                warehouse:[{
                    name0:'QCKC2019052486',
                    name1:'国际花都3期仓库',
                    name2:'2019-5-16 15:25:09',
                    name3:'2019-5-16 15:25:09',
                    name4:'1店店长',
                    name5:'黄山奇石第一次设置库存',
                },{
                    name0:'QCKC2019052486',
                    name1:'国际花都3期仓库',
                    name2:'2019-5-16 15:25:09',
                    name3:'2019-5-16 15:25:09',
                    name4:'1店店长',
                    name5:'黄山奇石第一次设置库存',
                },{
                    name0:'QCKC2019052486',
                    name1:'国际花都3期仓库',
                    name2:'2019-5-16 15:25:09',
                    name3:'2019-5-16 15:25:09',
                    name4:'1店店长',
                    name5:'黄山奇石第一次设置库存',
                },{
                    name0:'QCKC2019052486',
                    name1:'国际花都3期仓库',
                    name2:'2019-5-16 15:25:09',
                    name3:'2019-5-16 15:25:09',
                    name4:'1店店长',
                    name5:'',
                },{
                    name0:'QCKC2019052486',
                    name1:'国际花都3期仓库',
                    name2:'2019-5-16 15:25:09',
                    name3:'2019-5-16 15:25:09',
                    name4:'1店店长',
                    name5:'黄山奇石第一次设置库存',
                },],
                product: [{
                    name0:'http://cdn.tiaohuo.com/upload/image/201802/c8e089cb-4ea7-4127-b2c3-7ccd0ca86dcb.jpg',
                    name1:'小米手环2.0黑色款',
                    name2:'P201956205363',
                    name3:'个',
                    name4:'12',
                    name5:'165.00',
                    name6:'2019.00'
                },{
                    name0:'http://cdn.tiaohuo.com/upload/image/201802/c8e089cb-4ea7-4127-b2c3-7ccd0ca86dcb.jpg',
                    name1:'小米手环2.0黑色款',
                    name2:'P201956205363',
                    name3:'个',
                    name4:'12',
                    name5:'165.00',
                    name6:'2019.00'
                },{
                    name0:'http://cdn.tiaohuo.com/upload/image/201802/c8e089cb-4ea7-4127-b2c3-7ccd0ca86dcb.jpg',
                    name1:'小米手环2.0黑色款',
                    name2:'P201956205363',
                    name3:'个',
                    name4:'12',
                    name5:'165.00',
                    name6:'2019.00'
                },{
                    name0:'http://cdn.tiaohuo.com/upload/image/201802/c8e089cb-4ea7-4127-b2c3-7ccd0ca86dcb.jpg',
                    name1:'小米手环2.0黑色款',
                    name2:'P201956205363',
                    name3:'个',
                    name4:'12',
                    name5:'165.00',
                    name6:'2019.00'
                },{
                    name0:'http://cdn.tiaohuo.com/upload/image/201802/c8e089cb-4ea7-4127-b2c3-7ccd0ca86dcb.jpg',
                    name1:'小米手环2.0黑色款',
                    name2:'P201956205363',
                    name3:'个',
                    name4:'12',
                    name5:'165.00',
                    name6:'2019.00'
                }],
                productSet:[{
                    name0:'http://cdn.tiaohuo.com/upload/image/201802/c8e089cb-4ea7-4127-b2c3-7ccd0ca86dcb.jpg',
                    name1:'小米手环2.0黑色款',
                    name2:'P201956205363',
                    name3:'个',
                    name4:'',
                    name5:'10.00',
                    name6:'2019.00'
                },{
                    name0:'http://cdn.tiaohuo.com/upload/image/201802/c8e089cb-4ea7-4127-b2c3-7ccd0ca86dcb.jpg',
                    name1:'小米手环2.0黑色款',
                    name2:'P201956205363',
                    name3:'个',
                    name4:'',
                    name5:'15.00',
                    name6:'2019.00'
                },{
                    name0:'http://cdn.tiaohuo.com/upload/image/201802/c8e089cb-4ea7-4127-b2c3-7ccd0ca86dcb.jpg',
                    name1:'小米手环2.0黑色款',
                    name2:'P201956205363',
                    name3:'个',
                    name4:'',
                    name5:'20.00',
                    name6:'2019.00'
                },{
                    name0:'http://cdn.tiaohuo.com/upload/image/201802/c8e089cb-4ea7-4127-b2c3-7ccd0ca86dcb.jpg',
                    name1:'小米手环2.0黑色款',
                    name2:'P201956205363',
                    name3:'个',
                    name4:'',
                    name5:'5.00',
                    name6:'2019.00'
                },{
                    name0:'http://cdn.tiaohuo.com/upload/image/201802/c8e089cb-4ea7-4127-b2c3-7ccd0ca86dcb.jpg',
                    name1:'小米手环2.0黑色款',
                    name2:'P201956205363',
                    name3:'个',
                    name4:'',
                    name5:'10.00',
                    name6:'2019.00'
                },],
                total: 0,
                page: 1,
                listLoading: false,
                pageType:'manage',
                dialogVisible:false,
                selectedProduct:[]
            }
        },

        watch: {
            // 监听屏幕高度改变表格高度
            screenHeight(val) {
                // 初始化表格高度
                this.tableHeight = window.innerHeight - this.$refs.table.$el.offsetTop - 60;
            }
        },
        components:{
            city,
        },
        methods: {
            goView(){
                this.pageType = 'view'
            },
            //新建商品
            goAddProduct(){
                this.$router.push({  //核心语句
                    path:'/product/add',   //跳转的路径
                    query:{           //路由传参时push和query搭配使用 ，作用时传递参数
                        index:3,
                        leaf:0
                    }
                })
            },
            //设置期初库存时 输入数量计算小计
            inputNum(value,index){
                var that = this
                console.log(value,index)
                that.productSet[index].name6 =  that.productSet[index].name5 * value
            },
            //删除商品
            delProduct(index){
                this.$confirm('确定删除此商品吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {

                    this.productSet.splice(index,1);
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                }).catch(() => {
                    // this.$message({
                    //     type: 'info',
                    //     message: '已取消删除'
                    // });
                });
            },
            //选择商品
            checkedProduct(val){
                this.selectedProduct = val;
                console.log(this.selectedProduct)
            },

            handleNodeClick(data) {
                console.log(data);
            },
            handleClose(done) {
                this.dialogVisible = false
                this.dialogProduct = false
            },

            goBack(){
                this.pageType = 'manage'
            },

            //设置单元格字体颜色
            cellStyle({row, column, rowIndex, columnIndex}){
                if(columnIndex === 0){//指定列号
                    return 'baseColor'
                }else{
                    return ''
                }
            },

            onCreate(){
                console.log('455')
                this.pageType = 'create'
            },
            onSubmit() {
                this.$validator.validateAll().then((result) => {
                    this.dialogVisible = true
                });
            },
            goPrime(){
                this.dialogVisible = false
                this.$router.push({
                    path: '/warehouse/prime',
                    query: {
                        index: 4,leaf:0
                    }
                })

            },
            onCancle(){
                this.pageType = 'manage'
            },

            clearCondition(){
                this.condition.warehouse=''
                this.condition.category=''
                this.condition.product=''
                this.condition.person=''
                this.condition.num=''
            },

            handleCurrentChange(val) {
                this.page = val;
                // this.getUsers();
            },
            //获取用户列表
            // getUsers() {
            //     let para = {
            //         page: this.page,
            //         name: this.filters.name
            //     };
            //     this.listLoading = true;
            //     //NProgress.start();
            //     getUserListPage(para).then((res) => {
            //         this.total = res.data.total;
            //         this.users = res.data.users;
            //         this.listLoading = false;
            //         //NProgress.done();
            //     });
            // },
            //删除
            handleProhibit: function () {
                this.$confirm('确定禁用'+ '南二环' +'吗?', '仓库创建成功', {
                    type: 'warning'
                }).then(() => {
                    this.listLoading = true;
                    //NProgress.start();
                    let para = { id: row.id };
                    removeUser(para).then((res) => {
                        this.listLoading = false;
                        //NProgress.done();
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        });
                        // this.getUsers();
                    });
                }).catch(() => {

                });
            },
        },
        watch: {
            // 监听屏幕高度改变表格高度

            screenHeight(val) {
                console.log('监听')
                // 初始化表格高度
                this.tableHeight = window.innerHeight - this.$refs.table.$el.offsetTop - 80;
                console.log('表格高度：'+this.tableHeight)
            }
        },
        mounted() {
            this.headClass();
            // this.getUsers();
            this.tableHeight = window.innerHeight - this.$refs.table.$el.offsetTop - 80;
            console.log(this.$refs.table.$el.offsetTop)
            // 监听屏幕高度
            window.onresize = () => {
                return (() => {
                    window.screenHeight = document.documentElement.clientHeight || document.body.clientHeight;
                    this.screenHeight = window.screenHeight;
                    // console.log('屏幕高度：'+ window.screenHeight)
                })();
            };
        }
    }

</script>