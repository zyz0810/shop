<template>
    <div class="shelf">
        <div>
            <el-button :size="size" icon="el-icon-refresh" style="margin-right: 10px;">刷新</el-button>
            <el-date-picker v-model="time" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :size="size">
            </el-date-picker>
            <el-button :size="size" style="margin-right: 20px;">搜索</el-button>
        </div>
        <el-table stripe :data="shelfList" ref="table" highlight-current-row v-loading="listLoading"
                  style="width: 100%; margin-top: 20px;" :header-row-class-name="headClass" :height="tableHeight">
            <el-table-column prop="shelfNum" label="货架号"></el-table-column>
            <el-table-column prop="channel" label="渠道商"></el-table-column>
            <el-table-column prop="shop" label="门店"></el-table-column>
            <el-table-column prop="salesNum" label="销量"></el-table-column>
            <el-table-column prop="money" label="销售额"></el-table-column>
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
                shelfList:[{
                    shelfNum:'201811014461',
                    channel:'南极人',
                    shop:'南极人左岸男装',
                    salesNum:'211',
                    money:'22170.9'
                },{
                    shelfNum:'201811014461',
                    channel:'南极人',
                    shop:'南极人左岸男装',
                    salesNum:'211',
                    money:'22170.9'
                },{
                    shelfNum:'201811014461',
                    channel:'南极人',
                    shop:'南极人左岸男装',
                    salesNum:'211',
                    money:'22170.9'
                },{
                    shelfNum:'201811014461',
                    channel:'南极人',
                    shop:'南极人左岸男装',
                    salesNum:'211',
                    money:'22170.9'
                }],
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
