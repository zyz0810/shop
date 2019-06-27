<template>
    <div class="warehouse">
        <el-form :inline="true" :model="condition" class="demo-form-inline">
            <el-form-item label="选择渠道">
                <el-select v-model="condition.channel" :size="size" placeholder="请选择渠道">
                    <el-option label="全部渠道" value="4"></el-option>
                    <el-option label="渠道1" value="shanghai"></el-option>
                    <el-option label="渠道2" value="beijing"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="门店类型">
                <el-select v-model="condition.category" :size="size" placeholder="请选择门店类型">
                    <el-option label="直营门店" value="shanghai"></el-option>
                    <el-option label="加盟门店" value="beijing"></el-option>
                    <el-option label="商盟门店" value="beijing"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="预警状态">
                <el-select v-model="condition.state" :size="size" placeholder="请选择预警状态">
                    <el-option label="直营门店" value="shanghai"></el-option>
                    <el-option label="加盟门店" value="beijing"></el-option>
                    <el-option label="商盟门店" value="beijing"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" :size="size" @click="onSubmit">筛选</el-button>
            </el-form-item>
            <el-button type="text" @click="clearCondition" style="padding-top: 17px; padding-bottom: 0">清空筛选条件</el-button>
        </el-form>

        <!--列表-->
        <el-table stripe :data="shelfList" :header-row-class-name="headClass" :size="size" ref="table" highlight-current-row v-loading="listLoading" style="width: 100%; margin-top: 20px;" :height="tableHeight">
            <el-table-column prop="num" label="货架号"></el-table-column>
            <el-table-column label="渠道商">
                <template slot-scope="scope">
                    <span class="baseColor">{{scope.row.channel}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="shop" label="门店名称"></el-table-column>
            <el-table-column label="预警状态">
                <template slot-scope="scope">
                    <span :class="scope.row.state?'red01':''">{{ scope.row.state?'库存预警':'正常库存'}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="address" label="门店地址" width="320"></el-table-column>
            <el-table-column prop="phone" label="门店电话"></el-table-column>
            <el-table-column fixed="right" label="操作" width="130">
                <template slot-scope="scope">
                    <el-button :size="size" type="text" @click="replenish(scope.$index)">补货</el-button>
                    <el-button :size="size" type="text" @click="set(scope.$index)">设置预警</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    //import NProgress from 'nprogress'
    import { getUserListPage, removeUser, batchRemoveUser, editUser, addUser } from '../../../../api/api';
    export default {
        data() {
            return {
                size:this.GLOBAL.size,
                condition: {
                    channel:'',
                    category: '',
                    state: ''
                },
                screenHeight: document.body.clientHeight, // 这里是给到了一个默认值 （这个很重要）
                tableHeight: null, // 表格高度
                shelfList:[{
                    num:'201906038715',
                    channel:'怡菲·肇庆1店',
                    shop:'怡菲·宝贝优品',
                    state:true,
                    address:'广东省佛山市禅城区南庄上元农行旁宝贝优品',
                    phone:'15212795610',
                },{
                    num:'201906038715',
                    channel:'怡菲·肇庆1店',
                    shop:'怡菲·宝贝优品',
                    state:true,
                    address:'广东省佛山市禅城区南庄上元农行旁宝贝优品',
                    phone:'15212795610',
                },{
                    num:'201906038715',
                    channel:'怡菲·肇庆1店',
                    shop:'怡菲·宝贝优品',
                    state:false,
                    address:'广东省佛山市禅城区南庄上元农行旁宝贝优品',
                    phone:'15212795610',
                },{
                    num:'201906038715',
                    channel:'怡菲·肇庆1店',
                    shop:'怡菲·宝贝优品',
                    state:true,
                    address:'广东省佛山市禅城区南庄上元农行旁宝贝优品',
                    phone:'15212795610',
                },{
                    num:'201906038715',
                    channel:'怡菲·肇庆1店',
                    shop:'怡菲·宝贝优品',
                    state:false,
                    address:'广东省佛山市禅城区南庄上元农行旁宝贝优品',
                    phone:'15212795610',
                },],
                total: 0,
                page: 1,
                listLoading: false,
            }
        },

        watch: {
            // 监听屏幕高度改变表格高度
            screenHeight(val) {
                // 初始化表格高度
                this.tableHeight = window.innerHeight - this.$refs.table.$el.offsetTop - 60;
            }
        },
        methods: {
            onSubmit() {
                this.$validator.validateAll().then((result) => {
                    if (result) {
                        // // eslint-disable-next-line
                        // alert('Form Submitted!');
                        return;
                    }
                });
            },

            clearCondition(){
                this.condition.warehouse=''
                this.condition.category=''
                this.condition.product=''
            },
            //补货
            replenish(){
                this.$router.push({
                    path:'/warehouse/warning/replenish',
                    query:{
                        index:'4',
                        leaf:'0'
                    }
                });
            },
            //设置预警
            set(){
                this.$router.push({
                    path:'/warehouse/warning/set',
                    query:{
                        index:'4',
                        leaf:'0'
                    }
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
            this.tableHeight = window.innerHeight - this.$refs.table.$el.offsetTop - 80;
            console.log(this.$refs.table.$el.offsetTop)
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