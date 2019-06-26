<template>
    <div class="shelf">
        <div>
            <el-button type="primary" :size="size" icon="el-icon-plus" @click="addCode">添加</el-button>
            <el-button type="danger" :size="size" icon="el-icon-close">删除</el-button>
            <el-button :size="size" icon="el-icon-refresh">刷新</el-button>
            <el-button :size="size">导出</el-button>
            <el-button :size="size">下载</el-button>
            <el-input class="search fr" placeholder="请输入内容" :size="size" v-model="keyWord"><i slot="prefix" class="el-input__icon el-icon-search"></i></el-input>
        </div>
        <el-table stripe :data="codeList" ref="table" highlight-current-row v-loading="listLoading"
                  style="width: 100%; margin-top: 20px;" :header-row-class-name="headClass" :height="tableHeight">
            <el-table-column type="selection" fixed width="55"></el-table-column>
            <el-table-column prop="num" label="编号"></el-table-column>
            <el-table-column label="二维码">
                <template slot-scope="scope">
                    <img :src="scope.row.code" class="code_img"/>
                </template>
            </el-table-column>
            <el-table-column prop="tenant" label="绑定商家"></el-table-column>
            <el-table-column prop="shop" label="绑定门店"></el-table-column>
            <el-table-column label="绑定状态">
                <template slot-scope="scope">
                    <span>{{scope.row.state==true?'已绑定':'未绑定'}}</span>
                </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="100">
                <template slot-scope="scope">
                    <el-button :size="size" type="text" @click="shelfCode">查看</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!--货架二维码-->
        <el-dialog title="查看二维码" :visible.sync="dialogVisible" width="30%">
            <span class="block tc"><img src="http://cdn.tiaohuo.com/upload/image/201904/1dc3ee49-8b1b-4e15-8be0-04e77e4c3464.jpg"/></span>
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
                keyWord:'',
                addForm:{
                    num:''
                },
                dialogVisible:false,
                time:'',
                codeList:[{
                    num:'100871',
                    code:'http://cdn.laiyijia.com/upload/image/201906/a19c4d9a-fea7-47cc-ab47-1f5b4fbc80e0.jpg',
                    tenant:'南极人衣锦坊',
                    shop:'店铺11',
                    state:false,
                },{
                    num:'100871',
                    code:'http://cdn.laiyijia.com/upload/image/201906/a19c4d9a-fea7-47cc-ab47-1f5b4fbc80e0.jpg',
                    tenant:'南极人衣锦坊',
                    shop:'店铺11',
                    state:true,
                },{
                    num:'100871',
                    code:'http://cdn.laiyijia.com/upload/image/201906/a19c4d9a-fea7-47cc-ab47-1f5b4fbc80e0.jpg',
                    tenant:'南极人衣锦坊',
                    shop:'店铺11',
                    state:true,
                },{
                    num:'100871',
                    code:'http://cdn.laiyijia.com/upload/image/201906/a19c4d9a-fea7-47cc-ab47-1f5b4fbc80e0.jpg',
                    tenant:'南极人衣锦坊',
                    shop:'店铺11',
                    state:false,
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
            //打开二维码
            shelfCode() {
                this.dialogVisible = true
            },
            addCode(){
                this.$router.push({
                    path:'/shelf/code/add',
                    query:{
                        index:'2',
                        leaf:'0'
                    }
                });
            },
        },
        mounted() {
            this.headClass()
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


