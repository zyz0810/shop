<template>
    <div class="shelf">
        <div v-if="pageType == 'index'">
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
        <div v-if="pageType=='add'">
            <p class="title">新建套餐</p>
            <el-form ref="form" :model="addForm" hideRequiredSterisk="true" label-width="160px">
                <el-form-item required label="套餐名称">
                    <!--<el-input :size="size" v-model="editForm.name" class="inputOne"></el-input>-->
                    <el-input :size="size" v-model="addForm.name" placeholder="20个汉字以内" v-validate="'required'" data-vv-as="公司名称" name="editForm.name" :class="{'input': true, 'is-danger': errors.has('name') }" class="inputOne"></el-input>
                    <span class="help is-danger">{{ errors.first('addForm.name') }}</span>
                </el-form-item>
                <el-form-item required label="套餐销售价">
                    <el-input :size="size" v-model="addForm.price" placeholder="请填写金额数字，如：3600" v-validate="'required'" data-vv-as="套餐销售价" name="editForm.price" :class="{'input': true, 'is-danger': errors.has('price') }" class="inputOne"></el-input>
                    <span>元</span>
                    <span class="help is-danger">{{ errors.first('addForm.price') }}</span>
                </el-form-item>
                <el-form-item required label="货架绑定数量">
                    <el-input :size="size" v-model="addForm.num" v-validate="'required'" placeholder="请填写整数数字，如：3600" data-vv-as="货架绑定数量" name="editForm.num" :class="{'input': true, 'is-danger': errors.has('num') }" class="inputOne"></el-input>
                    <span>个</span>
                    <span class="help is-danger">{{ errors.first('addForm.num') }}</span>
                </el-form-item>
                <el-form-item required label="套餐模式">
                    <el-radio-group :size="size" v-model="addForm.show">
                        <el-radio label="0">货品保证金</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item required label="保证金时长">
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
        <div v-if="pageType=='edit'">
            <p class="title">编辑套餐</p>
            <el-form ref="form" :model="editForm" hideRequiredSterisk="true" label-width="160px">
                <el-form-item required label="套餐名称">
                    <!--<el-input :size="size" v-model="editForm.name" class="inputOne"></el-input>-->
                    <el-input :size="size" v-model="editForm.name" v-validate="'required'" data-vv-as="公司名称" name="editForm.name" :class="{'input': true, 'is-danger': errors.has('name') }" class="inputOne"></el-input>
                    <span class="help is-danger">{{ errors.first('addForm.name') }}</span>
                </el-form-item>
                <el-form-item required label="套餐销售价">
                    <el-input :size="size" v-model="editForm.price" v-validate="'required'" data-vv-as="套餐销售价" name="editForm.price" :class="{'input': true, 'is-danger': errors.has('price') }" class="inputOne"></el-input>
                    <span class="help is-danger">{{ errors.first('editForm.price') }}</span>
                </el-form-item>
                <el-form-item required label="货架绑定数量">
                    <el-input :size="size" v-model="editForm.num" v-validate="'required'" data-vv-as="货架绑定数量" name="editForm.num" :class="{'input': true, 'is-danger': errors.has('num') }" class="inputOne"></el-input>
                    <span class="help is-danger">{{ errors.first('editForm.num') }}</span>
                </el-form-item>
                <el-form-item required label="套餐模式">
                    <el-radio-group :size="size" v-model="editForm.show">
                        <el-radio label="0">押金模式</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item required label="押金时长">
                    <el-input :size="size" v-model="editForm.time" v-validate="'required'" data-vv-as="货架绑定数量" name="editForm.time" :class="{'input': true, 'is-danger': errors.has('time') }" class="inputOne"></el-input>
                    <span>（单位：月）</span>
                    <span class="help is-danger">{{ errors.first('editForm.time') }}</span>
                </el-form-item>
                <el-form-item required label="套餐描述">
                    <!--<quillEditor v-model="content"></quillEditor>-->

                    <quillEditor :Content="content"></quillEditor>


                    <span class="help is-danger">{{ errors.first('editForm.describe') }}</span>
                </el-form-item>

                <el-form-item required label="货架推广话术">
                    <el-input :size="size" v-model="editForm.extension" v-validate="'required'" data-vv-as="货架推广话术" name="editForm.extension" :class="{'input': true, 'is-danger': errors.has('extension') }" class="inputOne"></el-input>
                    <span class="help is-danger">{{ errors.first('editForm.extension') }}</span>
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
                    <span class="help is-danger">{{ errors.first('editForm.img') }}</span>
                </el-form-item>



                <el-form-item>
                    <el-button type="primary" @click="editSubmit">提 交</el-button>
                    <el-button @click="pageType = 'index'">返 回</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>

</template>
<script>
    import util from '../../common/js/util'
    //import NProgress from 'nprogress'
    import {getUserListPage, removeUser, batchRemoveUser, editUser, addUser} from '../../api/api';
    import quillEditor from './../../components/quill-editor.vue';
    export default {
        data() {
            return {
                content:'',
                editForm:{
                    name:'测试',
                    price:'2',
                    num:'25',
                    show:'0',
                    time:'2',
                    describe:'测试',
                    extension:'测试',
                    img:''
                },
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
                pageType:'index',
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
                imageUrl:[],
                form:''
            }
        },
        components:{
            quillEditor,
        },
        watch: {
            // 监听屏幕高度改变表格高度
            screenHeight(val) {
                // 初始化表格高度
                this.tableHeight = window.innerHeight - this.$refs.table.$el.offsetTop - 100 - 60;
            }
        },
        methods: {
            delImg(index){
                this.imageUrl.splice(index,1)
            },
            onchange(file, fileList) {

                var _this = this;
                var event = event || window.event;
                var file = event.target.files[0];
                var reader = new FileReader();
                //转base64
                reader.onload = function (e) {
                    // _this.imageUrl = e.target.result //将图片路径赋值给src
                    _this.imageUrl.push(e.target.result)
                }
                console.log(_this.imageUrl)
                reader.readAsDataURL(file);
            },
            handleAvatarSuccess(res, file) {
                this.imageUrl = URL.createObjectURL(file.raw);
                console.log(this.imageUrl)
            },
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG) {
                    this.$message.error('上传头像图片只能是 JPG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isJPG && isLt2M;
            },

            addProduct(){
                this.pageType = 'productAdd'
            },
            productEditBtn(){
                this.pageType = 'productEdit'
            },
            handleEdit(){
                this.pageType = 'edit'
            },
            addShelf(){
                this.pageType = 'add'
            },
            productSubmit(){
                this.pageType = 'edit'
            },
            goAddStock(){
                for(let i=0;i<this.productList.length;i++){
                    this.productList[i].stock = this.productList[i].stockInput
                }
                this.dialogStockPrint = false
                this.allAddStock = false
            },
            stockSubmit(){
                for(let i=0;i<this.productList.length;i++){
                    if(this.productList[i].stockInput == ''){
                        this.$message.error('库存不能为空');
                        return
                    }
                    // this.productStock[i].stock = this.productList[i].stockInput
                    this.productStock[i].num = this.productList[i].stockInput
                }
                this.dialogStockPrint = true
            },
            addStockBtn(){
                this.productList[this.addStockNum].stock = this.addStock
                this.dialogStockVisible = false
            },
            replenish(index){
                this.addStockNum = index
                this.dialogStockVisible = true
            },
            myProfit(val){
                if(val = 'editForm'){
                    this.form = 'editForm'
                }else{
                    this.form = 'addForm'
                }
                this.dialogTableProfit = true
            },
            //添加员工
            addStaff(){},
            choosePerson(num,form){

                if(form == 'addForm'){
                    this.addForm.role = num
                }else{
                    this.editForm.role = num
                }
                this.personForm = form
                this.dialogStaff = true
            },
            choosedStaff(){

                if(this.personForm == 'addForm'){
                    this.addForm.role1Name = this.addForm.role1NameChoose
                    this.addForm.role2Name = this.addForm.role2NameChoose
                    this.dialogStaff = false
                }else{
                    this.editForm.role1Name = this.editForm.role1NameChoose
                    this.editForm.role2Name = this.editForm.role2NameChoose
                    this.dialogStaff = false
                }
            },

            //取消选择分润模板
            delProfit(){
                this.addForm.profitTemplate = ''
                this.addForm.profit = '选择模板'
            },
            //选择分润模板
            chooseProfit(){
                this.dialogTableProfit = false
                if(this.form == 'editForm'){
                    this.editForm.profit = this.editForm.profitTemplate
                }else {
                    this.addForm.profit = this.addForm.profitTemplate
                }
            },
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
            addSubmit(){
                this.pageType = 'index'
            },
            editSubmit(){
                this.pageType = 'index'
            },
            download() {
               console.log('下载')
            },
            //渠道商分润
            profitChannel() {
                this.dialogTableVisible = true
            },
            //打开二维码
            shelfCode() {
                this.dialogVisible = true
            },
            myclick1: function () {
                console.log('4455')
                this.$router.push('/tenant/edit')
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
            this.getUsers();
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
