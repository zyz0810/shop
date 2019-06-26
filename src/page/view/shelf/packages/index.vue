<template>
    <div class="shelf">
        <div>
            <el-button type="primary" :size="size" icon="el-icon-plus" @click="addShelf">添加</el-button>
            <el-button type="danger" :size="size" icon="el-icon-close">删除</el-button>
            <el-button :size="size" icon="el-icon-refresh">刷新</el-button>
            <el-input class="search fr" placeholder="请输入内容" :size="size" v-model="keyWord"><i slot="prefix" class="el-input__icon el-icon-search"></i></el-input>
        </div>
        <el-table stripe :data="shelfList" ref="table" highlight-current-row v-loading="listLoading"
                  style="width: 100%; margin-top: 20px;" :header-row-class-name="headClass" :height="tableHeight">
            <el-table-column type="selection" fixed width="55"></el-table-column>
            <el-table-column prop="name" label="套餐名称"></el-table-column>
            <el-table-column prop="price" label="套餐价格（元）"></el-table-column>
            <el-table-column prop="num" label="绑定货架（个）"></el-table-column>
            <el-table-column prop="saleNum" label="已售数量（个）"></el-table-column>
            <el-table-column prop="time" label="创建时间"></el-table-column>
            <el-table-column fixed="right" label="操作" width="100">
                <template slot-scope="scope">
                    <el-button :size="size" type="text" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>

</template>
<script>
    export default {
        data() {
            return {
                content:'',
                keyWord:'',
                size: this.GLOBAL.size,
                screenHeight: document.body.clientHeight, // 这里是给到了一个默认值 （这个很重要）
                tableHeight: null, // 表格高度
                filters: {
                    name: ''
                },
                shelfList: [{
                    name: '测试',
                    price: '5',
                    num: '56',
                    saleNum: '5',
                    time: '2019-06-03 16:40:04',
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
            //跳转编辑页面
            handleEdit(){
                this.$router.push({
                    path:'/shelf/packages/edit',
                    query:{
                        index:'2',
                        leaf:'0'
                    }
                });
            },
            //跳转新建页面
            addShelf(){
                this.$router.push({
                    path:'/shelf/packages/add',
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