<template>
    <el-row :gutter="10">
        <el-col class="hidden-sm-and-down" :md="6" :lg="6" :xl="6">
            <el-menu :default-openeds="openeds" class="el-menu-vertical-demo shop">
                <el-submenu index="1" class="gray08">
                    <template slot="title" class="gray08">
                        <i class="el-icon-s-shop"></i>
                        <span>南极人衣锦坊</span>
                    </template>
                    <el-menu-item index="1-1"><i class="el-icon-menu"></i>北京<el-badge class="mark" :value="1" /></el-menu-item>
                    <el-submenu index="1-2">
                        <template slot="title"><i class="el-icon-menu"></i><span @click.stop="myclick1">安徽<el-badge class="mark" :value="12" /></span></template>
                        <el-submenu index="1-2-1">
                            <template slot="title"><i class="el-icon-s-help"></i>合肥<el-badge class="mark" :value="8" /></template>
                            <el-menu-item index="1-2-1-1"><i class="el-icon-location"></i>瑶海区<el-badge class="mark" :value="2" /></el-menu-item>
                            <el-menu-item index="1-2-1-2"><i class="el-icon-location"></i>庐阳区<el-badge class="mark" :value="2" /></el-menu-item>
                            <el-menu-item index="1-2-1-3"><i class="el-icon-location"></i>经开区<el-badge class="mark" :value="4" /></el-menu-item>
                        </el-submenu>
                        <el-menu-item index="1-2-2"><i class="el-icon-s-help"></i>淮北<el-badge class="mark" :value="2" /></el-menu-item>
                        <el-menu-item index="1-2-3"><i class="el-icon-s-help"></i>六安<el-badge class="mark" :value="5" /></el-menu-item>
                    </el-submenu>
                    <el-submenu index="1-3">
                        <template slot="title"><i class="el-icon-menu"></i>四川<el-badge class="mark" :value="2" /></template>
                        <el-menu-item index="1-3-1"><i class="el-icon-s-help"></i>眉山<el-badge class="mark" :value="2" /></el-menu-item>
                    </el-submenu>
                    <el-submenu index="1-4">
                        <template slot="title"><i class="el-icon-menu"></i>福建<el-badge class="mark" :value="12" /></template>
                        <el-submenu index="1-4-1">
                            <template slot="title"><i class="el-icon-s-help"></i>泉州<el-badge class="mark" :value="12" /></template>
                            <el-menu-item index="1-4-1-1"><i class="el-icon-location"></i>惠安<el-badge class="mark" :value="12" /></el-menu-item>
                        </el-submenu>
                    </el-submenu>
                </el-submenu>
            </el-menu>
        </el-col>
        <el-col :xs="24" :sm="24" :md="18" :lg="18" :xl="18">
            <el-table stripe :data="users" ref="table" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;" :height="tableHeight">
                <el-table-column type="selection" fixed width="55"></el-table-column>
                <el-table-column type="index" label="编号" width="80"></el-table-column>
                <el-table-column prop="name" label="名称" width="120" sortable></el-table-column>
                <el-table-column prop="sex" label="图片" width="100" :formatter="formatSex" sortable></el-table-column>
                <el-table-column prop="age" label="商品分类" width="100" sortable></el-table-column>
                <el-table-column prop="birth" label="销售价" width="120" sortable></el-table-column>
                <el-table-column prop="addr" label="库存" min-width="180" sortable></el-table-column>
                <el-table-column fixed="right" label="操作" width="80">
                    <template slot-scope="scope">
                        <el-button :size="size" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-col>
    </el-row>
</template>
<script>
    import util from '../../common/js/util'
    //import NProgress from 'nprogress'
    import { getUserListPage, removeUser, batchRemoveUser, editUser, addUser } from '../../api/api';
    export default {
        data() {
            return {
                size:this.GLOBAL.size,
                screenHeight: document.body.clientHeight, // 这里是给到了一个默认值 （这个很重要）
                tableHeight: null, // 表格高度
                filters: {
                    name: ''
                },
                users: [],
                total: 0,
                page: 1,
                listLoading: false,
                sels: [],//列表选中列

                editFormVisible: true,//编辑界面是否显示
                editLoading: false,
                editFormRules: {
                    name: [
                        { required: true, message: '请输入姓名', trigger: 'blur' }
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
                        { required: true, message: '请输入姓名', trigger: 'blur' }
                    ]
                },
                //新增界面数据
                addForm: {
                    name: '',
                    sex: -1,
                    age: 0,
                    birth: '',
                    addr: ''
                },
                openeds:['1']

            }
        },

        watch: {
            // 监听屏幕高度改变表格高度
            screenHeight(val) {
                // 初始化表格高度
                this.tableHeight = window.innerHeight - this.$refs.table.$el.offsetTop - 100 -60;
            }
        },
        methods: {
            myclick1:function () {
                console.log('4455')
                this.$router.push('/tenant/edit')
            },
            //性别显示转换
            formatSex: function (row, column) {
                return row.sex == 1 ? '男' : row.sex == 0 ? '女' : '未知';
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
                    let para = { id: row.id };
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
            //显示编辑界面
            handleEdit: function (index, row) {
                console.log('编辑')
                console.log(index)
                console.log(row)
                this.editFormVisible = true;
                this.editForm = Object.assign({}, row);
            },
            //显示新增界面
            handleAdd: function () {
                this.addFormVisible = true;
                this.addForm = {
                    name: '',
                    sex: -1,
                    age: 0,
                    birth: '',
                    addr: ''
                };
            },
            //编辑
            editSubmit: function () {
                this.$refs.editForm.validate((valid) => {
                    if (valid) {
                        this.$confirm('确认提交吗？', '提示', {}).then(() => {
                            this.editLoading = true;
                            //NProgress.start();
                            let para = Object.assign({}, this.editForm);
                            para.birth = (!para.birth || para.birth == '') ? '' : util.formatDate.format(new Date(para.birth), 'yyyy-MM-dd');
                            editUser(para).then((res) => {
                                this.editLoading = false;
                                //NProgress.done();
                                this.$message({
                                    message: '提交成功',
                                    type: 'success'
                                });
                                this.$refs['editForm'].resetFields();
                                this.editFormVisible = false;
                                this.getUsers();
                            });
                        });
                    }
                });
            },
            //新增
            addSubmit: function () {
                this.$refs.addForm.validate((valid) => {
                    if (valid) {
                        this.$confirm('确认提交吗？', '提示', {}).then(() => {
                            this.addLoading = true;
                            //NProgress.start();
                            let para = Object.assign({}, this.addForm);
                            para.birth = (!para.birth || para.birth == '') ? '' : util.formatDate.format(new Date(para.birth), 'yyyy-MM-dd');
                            addUser(para).then((res) => {
                                this.addLoading = false;
                                //NProgress.done();
                                this.$message({
                                    message: '提交成功',
                                    type: 'success'
                                });
                                this.$refs['addForm'].resetFields();
                                this.addFormVisible = false;
                                this.getUsers();
                            });
                        });
                    }
                });
            },
            selsChange: function (sels) {
                this.sels = sels;
            },
            //批量删除
            batchRemove: function () {
                var ids = this.sels.map(item => item.id).toString();
                this.$confirm('确认删除选中记录吗？', '提示', {
                    type: 'warning'
                }).then(() => {
                    this.listLoading = true;
                    //NProgress.start();
                    let para = { ids: ids };
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
                    console.log('屏幕高度：'+ window.screenHeight)
                })();
            };
        }
    }

</script>
