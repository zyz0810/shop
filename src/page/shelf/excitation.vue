<template>
    <div class="shelf">
        <div v-if="pageType=='index'">
            <div>
                <el-button type="primary" :size="size" icon="el-icon-plus" @click="addShelf">添加</el-button>
                <el-button type="danger" :size="size" icon="el-icon-close">删除</el-button>
                <el-button :size="size" icon="el-icon-refresh">刷新</el-button>
                <el-select v-model="valueState" placeholder="活动状态" :size="size" style="margin-right: 10px;width: 100px;">
                    <el-option
                            v-for="item in state"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
                <el-input class="search fr" placeholder="请输入内容" :size="size" v-model="keyWord"><i slot="prefix" class="el-input__icon el-icon-search"></i></el-input>
            </div>
            <el-table stripe :data="orderList" ref="table" highlight-current-row v-loading="listLoading"
                      style="width: 100%; margin-top: 20px;" :header-row-class-name="headClass" :height="tableHeight">
                <el-table-column type="selection" fixed width="55"></el-table-column>
                <el-table-column prop="name" label="活动名称"></el-table-column>
                <el-table-column prop="range" label="活动范围"></el-table-column>
                <el-table-column prop="role" label="参与角色"></el-table-column>
                <el-table-column prop="startTime" label="开始时间"></el-table-column>
                <el-table-column prop="endTime" label="结束时间"></el-table-column>
                <el-table-column prop="state" label="活动状态"></el-table-column>
                <el-table-column prop="template" label="排名模板"></el-table-column>
                <el-table-column prop="money" label="销售额"></el-table-column>
                <el-table-column prop="commission" label="支出佣金"></el-table-column>
                <el-table-column prop="jackpot" label="奖池"></el-table-column>
                <el-table-column fixed="right" label="操作" width="100">
                    <template slot-scope="scope">
                        <el-button :size="size" type="text" @click="handleEdit(scope.$index, scope.row)">查看</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div v-if="pageType=='watch'">
            <el-table stripe :data="rangeList" ref="table" highlight-current-row v-loading="listLoading"
                      style="width: 100%; margin-top: 20px;" :header-row-class-name="headClass" :height="tableHeight">
                <el-table-column type="selection" fixed width="55"></el-table-column>
                <el-table-column prop="name" label="用户名"></el-table-column>
                <el-table-column prop="phone" label="手机号"></el-table-column>
                <el-table-column prop="area" label="地区"></el-table-column>
                <el-table-column prop="shop" label="门店名称"></el-table-column>
                <el-table-column prop="money" label="销售额（元）"></el-table-column>
                <el-table-column prop="orderNum" label="订单数（笔）"></el-table-column>
                <el-table-column prop="profit" label="获得分润"></el-table-column>
                <el-table-column prop="bonus" label="预计奖金"></el-table-column>
                <el-table-column fixed="right" label="操作" width="100">
                    <template slot-scope="scope">
                        <el-button :size="size" type="text" @click="detail(scope.$index, scope.row)">查看明细</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div v-if="pageType=='add'">
            <p class="title">新建销售激励</p>
            <el-form ref="form" :model="addForm" hideRequiredSterisk="true" label-width="160px">
                <el-form-item required label="活动名称">
                    <!--<el-input :size="size" v-model="editForm.name" class="inputOne"></el-input>-->
                    <el-input :size="size" v-model="addForm.name" placeholder="活动名称" v-validate="'required'" data-vv-as="活动名称" name="editForm.name" :class="{'input': true, 'is-danger': errors.has('name') }" class="inputOne"></el-input>
                    <span class="help is-danger">{{ errors.first('addForm.name') }}</span>
                </el-form-item>
                <el-form-item required label="参与角色">
                    <el-input :size="size" v-model="addForm.price" placeholder="请填写金额数字，如：3600" v-validate="'required'" data-vv-as="套餐销售价" name="editForm.price" :class="{'input': true, 'is-danger': errors.has('price') }" class="inputOne"></el-input>
                    <span>元</span>
                    <span class="help is-danger">{{ errors.first('addForm.price') }}</span>
                </el-form-item>
                <el-form-item required label="活动范围">
                    <el-input :size="size" v-model="addForm.num" v-validate="'required'" placeholder="请填写整数数字，如：3600" data-vv-as="货架绑定数量" name="editForm.num" :class="{'input': true, 'is-danger': errors.has('num') }" class="inputOne"></el-input>
                    <span>个</span>
                    <span class="help is-danger">{{ errors.first('addForm.num') }}</span>
                </el-form-item>
                <el-form-item required label="开始时间">
                    <el-radio-group :size="size" v-model="addForm.show">
                        <el-radio label="0">货品保证金</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item required label="结束时间">
                    <el-input :size="size" v-model="addForm.time" placeholder="请填写整数数字，如：24" v-validate="'required'" data-vv-as="保证金时长" name="addForm.time" :class="{'input': true, 'is-danger': errors.has('time') }" class="inputOne"></el-input>
                    <span>月</span>
                    <span class="help is-danger">{{ errors.first('addForm.time') }}</span>
                </el-form-item>
                <el-form-item required label="货架套餐分享佣金">
                    <el-input :size="size" v-model="addForm.money" placeholder="请填写数字，如：20" v-validate="'required'" data-vv-as="货架套餐分享佣金" name="addForm.money" :class="{'input': true, 'is-danger': errors.has('money') }" class="inputOne"></el-input>
                    <span>元</span>
                    <span class="help is-danger">{{ errors.first('addForm.money') }}</span>
                </el-form-item>
                <el-form-item required label="套餐描述">
                    <!--<quillEditor v-model="content"></quillEditor>-->
                    <quillEditor :Content="addForm.describe"></quillEditor>
                    <span class="help is-danger">{{ errors.first('addForm.describe') }}</span>
                </el-form-item>

                <el-form-item required label="微信分享描述">
                    <el-input :size="size" v-model="addForm.extension" v-validate="'required'" placeholder="20个汉字以内" data-vv-as="货架推广话术" name="addForm.extension" :class="{'input': true, 'is-danger': errors.has('extension') }" class="inputOne"></el-input>
                    <span class="help is-danger">{{ errors.first('addForm.extension') }}</span>
                </el-form-item>
                <el-form-item required label="多图上传">
                    <ul class="avatar-uploader">
                        <li v-for="(item,index) in imageUrl" class="fl">
                            <i class="el-icon-error f26 gray10" @click="delImg(index)"></i>
                            <img :src="item" class="avatar">
                        </li>
                    </ul>
                    <el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/" :auto-upload="false" :show-file-list="false" :on-change="onchange" :multiple="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                        <!--<img v-if="imageUrl" :src="imageUrl" class="avatar">-->
                        <i class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                    <p>仅支持gif、jpeg、png、bmp 4种格式，大小不超过3.0MB，数量最多5张，用于幻灯片位置展示</p>
                    <span class="help is-danger">{{ errors.first('addForm.img') }}</span>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="addSubmit">提 交</el-button>
                    <el-button @click="pageType = 'index'">返 回</el-button>
                </el-form-item>
            </el-form>
        </div>
        <!--分润模板-->
        <el-dialog title="激励活动明细" :visible.sync="dialogActivity" width="840px">
            <el-table :data="activityDetail" :header-row-class-name="headClass">
                <el-table-column property="orderNum" label="订单编号" align="center" width="160"></el-table-column>
                <el-table-column property="time" label="下单时间" align="center" width="160"></el-table-column>
                <el-table-column property="shop" label="所属门店" align="center" width="160"></el-table-column>
                <el-table-column property="money" label="成交金额" align="center"></el-table-column>
                <el-table-column property="commission" label="佣金" align="center"></el-table-column>
                <el-table-column property="state" label="状态" align="center">
                    <template slot-scope="scope">
                        <el-badge v-if="scope.row.state" type="primary" value="已入账" class="block"></el-badge>
                        <el-badge v-else type="danger" value="未入账" class="block"></el-badge>
                    </template>
                </el-table-column>
            </el-table>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogActivity = false">关 闭</el-button>
            </span>
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
                    name:'',
                    price:'',
                    num:'',
                    show:'0',
                    time:'',
                    money:'',
                    describe:'',
                    extension:'',
                    img:''
                },
                dialogActivity:false,
                activityDetail:[{
                    orderNum:'2019060473133',
                    time:'2019-06-04 09:50:18',
                    shop:'南极人华美窗帘店',
                    money:'168',
                    commission:'38.94',
                    state:false
                },{
                    orderNum:'2019060373042',
                    time:'2019-06-03 15:43:43',
                    shop:'南极人华美窗帘店',
                    money:'198',
                    commission:'45.89',
                    state:true
                },{
                    orderNum:'2019060373026',
                    time:'2019-06-03 07:15:54',
                    shop:'南极人华美窗帘店',
                    money:'45',
                    commission:'6.86',
                    state:false
                }],
                pageType:'add',
                time:'',
                state:[{
                    label:'未开始',
                    value:'0'
                },{
                    label:'进行中',
                    value:'1'
                },{
                    label:'已结束',
                    value:'2'
                }],
                valueState: '',
                keyWord:'',
                size: this.GLOBAL.size,
                screenHeight: document.body.clientHeight, // 这里是给到了一个默认值 （这个很重要）
                tableHeight: null, // 表格高度
                rangeList:[{
                    name: '熊美华',
                    phone: '15256358309',
                    area: '宣城广德',
                    shop: '南极人华美窗帘店',
                    money: '411',
                    orderNum:'3',
                    profit:'91.69',
                    bonus:'1040.95652',
                },{
                    name: '左金辉',
                    phone: '18297881183',
                    area: '六安裕安',
                    shop: '南极人形象设计店',
                    money: '290.6',
                    orderNum:'8',
                    profit:'63.44',
                    bonus:'618.94712',
                },],
                orderList: [{
                    name: '2019年6月第1周销售排名',
                    range: '中国',
                    role: '货架店主',
                    startTime: '2019-06-03 00:00:00',
                    endTime: '2019-06-09 22:00:00',
                    state:'已结束',
                    mode:'￥1339.60',
                    template:'2019年4月第3周',
                    money:'13965000663 (马剑)',
                    commission:'￥300.03',
                    jackpot:'￥2813.40'
                },{
                    name: '2019年5月第4周销售排名',
                    range: '中国',
                    role: '货架店主',
                    startTime: '2019-06-03 00:00:00',
                    endTime: '2019-06-09 22:00:00',
                    state:'已结束',
                    mode:'￥1339.60',
                    template:'2019年4月第3周',
                    money:'13965000663 (马剑)',
                    commission:'￥300.03',
                    jackpot:'￥2813.40'
                },{
                    name: '2019年5月第3周销售排名',
                    range: '中国',
                    role: '货架店主',
                    startTime: '2019-06-03 00:00:00',
                    endTime: '2019-06-09 22:00:00',
                    state:'已结束',
                    mode:'￥1339.60',
                    template:'2019年4月第3周',
                    money:'13965000663 (马剑)',
                    commission:'￥300.03',
                    jackpot:'￥2813.40'
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
            detail(index,row){
                this.dialogActivity = true
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
