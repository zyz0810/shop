<template>
    <section class="home">
        <div class="home_block">
            <el-row :gutter="20" class="color_block tc">
                <el-col :span="6">
                    <a href="javascript:;" class="white01">
                        <p class="f20">29</p>
                        <p class="f16">待发货</p>
                    </a>
                </el-col>
                <el-col :span="6">
                    <a href="javascript:;" class="white01">
                        <p class="f20">29</p>
                        <p class="f16">待发货</p>
                    </a>
                </el-col>
                <el-col :span="6">
                    <a href="javascript:;" class="white01">
                        <p class="f20">29</p>
                        <p class="f16">待发货</p>
                    </a>
                </el-col>
                <el-col :span="6">
                    <a href="javascript:;" class="white01">
                        <p class="f20">29</p>
                        <p class="f16">待发货</p>
                    </a>
                </el-col>
            </el-row>
        </div>
        <div class="home_block">
            <h2 class="title">实时概况</h2>

            <el-row :gutter="20" class="">
                <el-col :span="12" class=" block_left">
                    <el-col :span="12">
                        <p class="gray07">UV</p>
                        <p class="f28 bold">2123<span class="added f12 normal">+1.8%<i class="el-icon-top green01"></i></span>
                        </p>
                    </el-col>
                    <el-col :span="12">
                        <p class="gray07">PV</p>
                        <p class="f28 bold">2<span class="added f12 normal">+1.8%<i
                                class="el-icon-bottom red01"></i></span></p>
                    </el-col>
                    <el-col :span="12">
                        <p class="gray07">平均停留时间<span class="f12">（分钟）</span></p>
                        <p class="f28 bold">2<span class="added f12 normal">+1.8%<i
                                class="el-icon-top green01"></i></span></p>
                    </el-col>
                    <el-col :span="12">
                        <p class="gray07">新增会员<span class="f12">（个）</span></p>
                        <p class="f28 bold">864<span class="added f12 normal">+16%<i
                                class="el-icon-top green01"></i></span></p>
                    </el-col>
                </el-col>
                <el-col :span="12">
                    <el-col :span="12">
                        <p class="gray07">余额<span class="f12">（元）</span></p>
                        <p class="f28 bold">864.23</p>
                    </el-col>
                    <el-col :span="12">
                        <p class="gray07">冻结金额<span class="f12">（元）</span></p>
                        <p class="f28 bold">864.23</p>
                    </el-col>
                    <el-col :span="12">
                        <p class="gray07">库存金额<span class="f12">（元）</span></p>
                        <p class="f28 bold">864.23</p>
                    </el-col>
                </el-col>
            </el-row>
        </div>
    </section>
</template>

<script>
    import util from '../../common/js/util'
    //import NProgress from 'nprogress'
    import {getUserListPage, removeUser, batchRemoveUser, editUser, addUser} from '../../api/api';

    export default {
        data() {
            return {
                addTemplate: {
                    name: '',
                    num: '',
                },
                size: this.GLOBAL.size,
                filters: {
                    name: ''
                },
                users: [],
                total: 0,
                page: 1,
                listLoading: false,
                sels: [],//列表选中列

                editFormVisible: false,//编辑界面是否显示
                editLoading: false,
                editFormRules: {
                    name: [
                        {required: true, message: '请输入姓名', trigger: 'blur'}
                    ]
                },
                //编辑界面数据
                editForm: {
                    id: 0,
                    name: '',
                    sex: -1,
                    age: 0,
                    birth: '',
                    addr: ''
                },

                addFormVisible: false,//新增界面是否显示
                addLoading: false,
                addFormRules: {
                    name: [
                        {required: true, message: '请输入姓名', trigger: 'blur'}
                    ]
                },
                //新增界面数据
                addForm: {
                    name: '',
                    sex: -1,
                    age: 0,
                    birth: '',
                    addr: ''
                }

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
            this.getUsers();
        }
    }

</script>