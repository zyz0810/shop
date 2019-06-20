<template>
    <div class="shelf">
        <div>
            <el-button :size="size" icon="el-icon-refresh" style="margin-right: 10px;">刷新</el-button>
            <el-select v-model="valueState" placeholder="订单状态" :size="size" style="margin-right: 10px;width: 100px;">
                <el-option
                        v-for="item in state"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </el-option>
            </el-select>
            <el-date-picker v-model="time" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :size="size">
            </el-date-picker>
            <el-button :size="size" style="margin-right: 20px;">查询</el-button>
            <el-button :size="size">今</el-button>
            <el-button :size="size">昨</el-button>
            <el-button :size="size">最近7天</el-button>
            <el-button :size="size">最近30天</el-button>
            <el-button :size="size" style="margin-right: 10px;">查看全部</el-button>
            <el-input class="search fr" placeholder="请输入内容" :size="size" v-model="keyWord"><i slot="prefix" class="el-input__icon el-icon-search"></i></el-input>
        </div>
        <el-table stripe :data="orderList" ref="table" highlight-current-row v-loading="listLoading"
                  style="width: 100%; margin-top: 20px;" :header-row-class-name="headClass" :height="tableHeight">
            <el-table-column type="selection" fixed width="55"></el-table-column>
            <el-table-column prop="orderNum" label="订单编号"></el-table-column>
            <el-table-column label="订单状态">
                <template slot-scope="scope">
                    <span class="red01" v-if="scope.row.state == true">已支付</span>
                    <span class="baseColor" v-else>待支付</span>
                </template>
            </el-table-column>
            <el-table-column prop="person" label="购买人"></el-table-column>
            <el-table-column prop="num" label="购买数量"></el-table-column>
            <el-table-column prop="money" label="购买金额"></el-table-column>
            <el-table-column prop="phone" label="联系方式"></el-table-column>
            <el-table-column label="布点方式">
                <template slot-scope="scope">
                    <span>{{scope.row.mode?scope.row.mode:'--'}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="name" label="套餐名称"></el-table-column>
            <el-table-column prop="inviter" label="邀请人（代理）"></el-table-column>
            <el-table-column prop="time" label="创建时间"></el-table-column>
        </el-table>
    </div>

</template>
<script>
    import util from '../../common/js/util'
    //import NProgress from 'nprogress'
    import {getUserListPage, removeUser, batchRemoveUser, editUser, addUser} from '../../api/api';
    export default {
        data() {
            return {
                time:'',
                state:[{
                    label:'全部',
                    value:'0'
                },{
                    label:'待支付',
                    value:'1'
                },{
                    label:'已支付',
                    value:'2'
                }],
                valueState: '',
                keyWord:'',
                size: this.GLOBAL.size,
                screenHeight: document.body.clientHeight, // 这里是给到了一个默认值 （这个很重要）
                tableHeight: null, // 表格高度

                orderList: [{
                    orderNum: '2019062076356',
                    state: true,
                    person: '小调儿',
                    num: '1',
                    money: '0',
                    phone:'18655772218',
                    mode:'',
                    name:'南极人新零售内衣货架套餐',
                    inviter:'13965000663 (马剑)',
                    time:'2019-05-10 14:31:15'
                },{
                    orderNum: '2019062076356',
                    state: true,
                    person: '小调儿',
                    num: '1',
                    money: '0',
                    phone:'18655772218',
                    mode:'',
                    name:'南极人新零售内衣货架套餐',
                    inviter:'13965000663 (马剑)',
                    time:'2019-05-10 14:31:15'
                },{
                    orderNum: '2019062076356',
                    state: false,
                    person: '小调儿',
                    num: '1',
                    money: '0',
                    phone:'18655772218',
                    mode:'',
                    name:'南极人新零售内衣货架套餐',
                    inviter:'13965000663 (马剑)',
                    time:'2019-05-10 14:31:15'
                },],
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

            getStaffRow(index,row){
                if(this.personForm == 'addForm'){
                    if(this.addForm.role == '0'){
                        this.addForm.role1NameChoose = row.name
                    }else {
                        this.addForm.role2NameChoose = row.name
                    }
                }else{
                    if(this.editForm.role == '0'){
                        this.editForm.role1NameChoose = row.name
                    }else {
                        this.editForm.role2NameChoose = row.name
                    }
                }

            },
            getTemplateRow(index,row){                                 //获取选中数据
                console.log(row)
                if(this.form == 'editForm'){
                    this.editForm.profitTemplate = row.name
                }else {
                    this.addForm.profitTemplate = row.name
                }
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

<style lang="scss" type="text/scss">
    @import '../../styles/color.scss';

    .shelf {
        padding: 10px;
        background: $white01;
        .search{
            width: 200px;
        }
        .title{
            margin-bottom: 20px;
        }
    }
    //添加多张图片
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader{
        li{
            position: relative;
            margin-right: 20px;
            i{
                position: absolute;
                top: 0;
                right: 0;
                z-index: 99;
            }
        }
    }
    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }
    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
</style>
