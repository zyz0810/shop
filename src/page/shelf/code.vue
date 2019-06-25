<template>
    <div class="shelf">
        <div v-if="pageType == 'index'">
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
        </div>
        <div v-if="pageType == 'add'">
            <el-form ref="form" :model="addForm" hideRequiredSterisk="true" label-width="160px">
                <el-form-item required label="生成数量">
                    <el-input :size="size" v-model="addForm.num" placeholder="生成数量" v-validate="'required|numeric'" data-vv-as="生成数量" name="addForm.name" :class="{'input': true, 'is-danger': errors.has('name') }" class="inputOne"></el-input>
                    <span class="help is-danger">{{ errors.first('addForm.name') }}</span>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="addSubmit">确 定</el-button>
                    <el-button @click="pageType = 'index'">返 回</el-button>
                </el-form-item>
            </el-form>
        </div>
        <!--货架二维码-->
        <el-dialog title="查看二维码" :visible.sync="dialogVisible" width="30%">
            <span><img src="http://cdn.tiaohuo.com/upload/image/201904/1dc3ee49-8b1b-4e15-8be0-04e77e4c3464.jpg"/></span>
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
                pageType:'index'
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
                this.pageType = 'add'
            },
            addSubmit(){
                this.$validator.validateAll().then((result) => {
                    if(result == true){
                        this.pageType = 'index'
                    }
                })
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


