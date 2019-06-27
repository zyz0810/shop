<template>
    <div class="warehouse">
        <el-table stripe :data="productSet" :header-row-class-name="headClass" :size="size" ref="table" highlight-current-row v-loading="listLoading" style="width: 100%; margin-top: 20px;" :height="tableHeight" @selection-change="selsChange">
            <el-table-column type="selection" width="55"></el-table-column>
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
            <el-table-column prop="spec" label="规格"></el-table-column>
            <el-table-column label="设置库存预警">
                <template slot-scope="scope">
                    <el-input :size="size" v-model="scope.row.stock"></el-input>
                </template>
            </el-table-column>
            <el-table-column prop="stockSum" label="库存量"></el-table-column>
            <el-table-column prop="salesNum" label="销售量"></el-table-column>
            <el-table-column prop="salesMoney" label="销售额"></el-table-column>
            <el-table-column fixed="right" label="操作" width="80">
                <template slot-scope="scope">
                    <el-button :size="size" type="text" @click="delProduct(scope.$index)">取消</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-col :span="24" class="toolbar mt20">
            <el-button :size="size" type="primary" @click="dialogFormVisible = true" :disabled="this.sels.length===0">批量设置预警</el-button>
            <el-pagination :size="size" background layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total" style="float:right;">
            </el-pagination>
        </el-col>
        <el-col :span="24" class="toolbar mt20 tc">
            <el-button :size="size" type="primary" @click="onSubmit">提交</el-button>
            <el-button :size="size" @click="$router.back(-1)">返回</el-button>
        </el-col>

        <!--批量设置-->
        <el-dialog title="批量设置库存预警数" :visible.sync="dialogFormVisible" width="600px">
            <el-form :model="form" hideRequiredSterisk="true">
                <el-form-item label="库存预警数">
                    <el-input v-model="form.num" autocomplete="off" class="inputOne" v-validate="'required|numeric'" data-vv-as="库存预警数" name="form.num" :class="{'input': true, 'is-danger': errors.has('form.num') }"></el-input>
                    <span class="help is-danger">{{ errors.first('form.num') }}</span>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="stockNum">确 定</el-button>
            </div>
        </el-dialog>
    </div>

</template>
<script>
    import util from '../../../../common/js/util'
    //import NProgress from 'nprogress'
    import {getUserListPage, removeUser, batchRemoveUser, editUser, addUser} from '../../../../api/api';
    export default {
        data() {
            return {
                dialogFormVisible:false,
                keyWord:'',
                form:{
                    num:''
                },
                dialogVisible:false,
                time:'',
                productSet:[{
                    name0:'http://cdn.tiaohuo.com/upload/image/201802/c8e089cb-4ea7-4127-b2c3-7ccd0ca86dcb.jpg',
                    name1:'小米手环2.0黑色款',
                    name2:'P201956205363',
                    spec:'红色',
                    stock:'55',
                    stockSum:'100',
                    salesNum:'50',
                    salesMoney:'2019.00',
                },{
                    name0:'http://cdn.tiaohuo.com/upload/image/201802/c8e089cb-4ea7-4127-b2c3-7ccd0ca86dcb.jpg',
                    name1:'小米手环2.0黑色款',
                    name2:'P201956205363',
                    spec:'红色',
                    stock:'55',
                    stockSum:'100',
                    salesNum:'50',
                    salesMoney:'2019.00',
                },{
                    name0:'http://cdn.tiaohuo.com/upload/image/201802/c8e089cb-4ea7-4127-b2c3-7ccd0ca86dcb.jpg',
                    name1:'小米手环2.0黑色款',
                    name2:'P201956205363',
                    spec:'黄色',
                    stock:'55',
                    stockSum:'100',
                    salesNum:'50',
                    salesMoney:'2019.00',
                },{
                    name0:'http://cdn.tiaohuo.com/upload/image/201802/c8e089cb-4ea7-4127-b2c3-7ccd0ca86dcb.jpg',
                    name1:'小米手环2.0黑色款',
                    name2:'P201956205363',
                    spec:'绿色',
                    stock:'55',
                    stockSum:'100',
                    salesNum:'50',
                    salesMoney:'2019.00',
                },{
                    name0:'http://cdn.tiaohuo.com/upload/image/201802/c8e089cb-4ea7-4127-b2c3-7ccd0ca86dcb.jpg',
                    name1:'小米手环2.0黑色款',
                    name2:'P201956205363',
                    spec:'紫色',
                    stock:'55',
                    stockSum:'100',
                    salesNum:'50',
                    salesMoney:'2019.00',
                },],
                size: this.GLOBAL.size,
                screenHeight: document.body.clientHeight, // 这里是给到了一个默认值 （这个很重要）
                tableHeight: null, // 表格高度
                total: 0,
                page: 1,
                listLoading: false,
                sels: [],//列表选中列
                editLoading: false,
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
            handleCurrentChange(val) {
                this.page = val;
                // this.getUsers();
            },
            onSubmit(){
                this.$message({
                    message: '货架商品库存预警设置成功',
                    type: 'success'
                });
            },
            selsChange: function (sels) {
                this.sels = sels;
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            stockNum(){
                this.$validator.validateAll().then((result) => {
                    if(result == true){


                    }
                })
            }
        },
        mounted() {
            this.headClass();
            this.tableHeight = window.innerHeight - this.$refs.table.$el.offsetTop - 100 - 60;
            // 监听屏幕高度
            window.onresize = () => {
                return (() => {
                    window.screenHeight = document.documentElement.clientHeight || document.body.clientHeight;
                    this.screenHeight = window.screenHeight;
                })();
            };
        }
    }

</script>


