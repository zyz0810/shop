<template>
    <div class="shelf">
        <div>
            <p class="title">添加布点商家</p>
            <el-form ref="form" :model="addForm" hideRequiredSterisk="true" label-width="160px">
                <el-form-item required label="公司名称">
                    <el-input :size="size" v-model="addForm.name" class="inputOne" :disabled="true"></el-input>
                    <!--<el-input :size="size" v-model="addForm.name" v-validate="'required'" data-vv-as="公司名称" name="addForm.name" :class="{'input': true, 'is-danger': errors.has('name') }" class="inputOne"  :disabled="true"></el-input>-->
                    <!--<span class="help is-danger">{{ errors.first('addForm.name') }}</span>-->
                </el-form-item>
                <el-form-item required label="绑定货架所在门店">
                    <el-select :size="size" v-model="addForm.shop" class="inputOne" placeholder="绑定货架所在门店">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                    <el-button :size="size" type="text" style="margin-left: 20px;">刷新</el-button>
                    <el-button :size="size" type="text" style="margin-left: 20px;">新建门店</el-button>
                </el-form-item>
                <el-form-item required label="推广渠道">
                    <el-select :size="size" v-model="addForm.channel" class="inputOne" placeholder="绑定货架所在门店">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                    <el-button :size="size" type="text" style="margin-left: 20px;">刷新</el-button>
                    <el-button :size="size" type="text" style="margin-left: 20px;">新建门店</el-button>
                </el-form-item>
                <el-form-item required label="选择图片展示模板">
                    <el-radio-group :size="size" v-model="addForm.show">
                        <el-radio label="big">大图</el-radio>
                        <el-radio label="small">小图</el-radio>
                    </el-radio-group>
                    <el-button :size="size" type="text" style="margin-left: 20px;" @click="dialogExample = true">查看示例</el-button>
                </el-form-item>
                <el-form-item required label="分润模板">
                    <el-button :size="size" type="primary" @click="myProfit('addForm')">{{addForm.profit}}</el-button>
                    <el-button :size="size" type="text" @click="delProfit">取消</el-button>
                    <el-button :size="size" type="text">新建模板</el-button>
                </el-form-item>
                <el-form-item v-if="addForm.profit != '选择模板'" required label="分配角色">
                    <p>
                        <el-input :size="size" v-model="addForm.role1" :disabled="true" style="width: 200px;"></el-input>
                        <el-input :size="size" v-model="addForm.role1Profit" :disabled="true" style="width: 200px;"></el-input>
                        <span>%</span>
                        <el-button type="primary" @click="choosePerson('0','addForm')">选择推广人</el-button>
                        <el-button :size="size" type="text" @click="addStaff">添加员工</el-button>
                    </p>
                    <p v-if="addForm.role1Name">姓名<el-input :size="size" v-model="addForm.role1Name" :disabled="true" style="width: 200px; margin-left: 10px"></el-input></p>
                    <p>
                        <el-input :size="size" v-model="addForm.role2" :disabled="true" style="width: 200px;"></el-input>
                        <el-input :size="size" v-model="addForm.role2Profit" :disabled="true" style="width: 200px;"></el-input>
                        <span>%</span>
                        <el-button type="primary" @click="choosePerson('1','addForm')">选择推广人</el-button>
                        <el-button :size="size" type="text" @click="addStaff">添加员工</el-button>
                    </p>
                    <p v-if="addForm.role2Name">姓名<el-input :size="size" v-model="addForm.role2Name" :disabled="true" style="width: 200px; margin-left: 10px"></el-input></p>
                </el-form-item>
                <el-form-item required label="货架分润">
                    <p>店主：<el-input :size="size" v-model="addForm.adminProfit" style="width: 200px;"></el-input><span>%(分润比例：0~100，例如：10)</span></p>
                    <p>员工：<el-input :size="size" v-model="addForm.staffProfit" style="width: 200px;"></el-input><span>%(分润比例：0~100，例如：10)</span></p>
                </el-form-item>
                <el-form-item label="货架绑定二维码">
                    <el-input :size="size" v-model="addForm.code" class="inputOne"></el-input>
                    <el-button :size="size" type="text" style="margin-left: 20px;" @click="ApplyCode">申请二维码编号</el-button>
                    <!--<span class="baseColor">申请二维码编号</span>-->
                </el-form-item>
                <el-form-item label="关联货架套餐订单">
                    <el-select :size="size" v-model="addForm.package" placeholder="绑定货架所在门店" class="inputOne">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                    <p class="gray10">关联货架套餐订单后，可方便管理店铺库存</p>
                </el-form-item>
                <el-form-item label="关联商品信息">
                    <p>无相关商品</p>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="addSubmit">提 交</el-button>
                    <el-button @click="$router.back(-1)">返 回</el-button>
                </el-form-item>
            </el-form>
        </div>

        <!--查看示例-->
        <el-dialog title="" :visible.sync="dialogExample" width="50%" center>
            <span>
                <el-row :gutter="20">
                  <el-col :span="12">
                      <p class="f26 baseColor tc mb20">大图模式</p>
                      <img src="http://cdn.laiyijia.com/upload/image/201905/34402fdf-15ba-41f7-af40-e17ec9bda591.png"/>
                  </el-col>
                  <el-col :span="12">
                      <p class="f26 baseColor tc mb20">小图模式</p>
                      <img src="http://cdn.laiyijia.com/upload/image/201905/c8e52b47-d187-4002-b9fd-9635585988fa.png"/>
                  </el-col>
                </el-row>
            </span>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="dialogExample = false">关 闭</el-button>
            </span>
        </el-dialog>
        <!--分润模板-->
        <el-dialog title="模板" :visible.sync="dialogTableProfit" width="840px">
            <el-table :data="TableProfitData" :header-row-class-name="headClass">
                <el-table-column type="radio" width="100" align="center">
                    <template slot-scope="scope">
                        <el-radio :label="scope.row.messageTemplateId" v-model="templateRadio" @change="getTemplateRow(scope.$index,scope.row)">&nbsp</el-radio>
                    </template>
                </el-table-column>
                <el-table-column property="name" label="模板名称" align="center"></el-table-column>
                <el-table-column property="time" label="创建时间" align="center"></el-table-column>
                <el-table-column property="num" label="角色数量" align="center" width="100"></el-table-column>
            </el-table>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogTableProfit = false">取 消</el-button>
                <el-button type="primary" @click="chooseProfit()">确 定</el-button>

            </span>
        </el-dialog>
    </div>
</template>
<script>

    //import NProgress from 'nprogress'

    export default {
        data() {
            return {
                openeds:['1'],
                productData:[{
                    id: 1,
                    label: '草本精华国产组合套装含（1盒日用/1盒夜用/1盒护垫）',
                    children: [{
                        id: 4,
                        label: '草本精华国产组合套装含（1盒日用/1盒夜用/1盒护垫',
                    }]
                }, {
                    id: 2,
                    label: ' 国产组合套装含（1盒日用/1盒夜用/1盒护垫',
                    children: [{
                        id: 5,
                        label: ' 国产组合套装含（1盒日用/1盒夜用/1盒护垫'
                    }]
                }],
                defaultProps: {
                    children: 'children',
                    label: 'label'
                },
                productAddForm:{
                    name:'',
                    floor:'三层',
                    num:'201906038715'
                },
                productForm:{
                    name:'草本精华夜用330mm*6片/盒纯天然中药芯片防异味独立包装防止二次污染',
                    floor:'三层',
                    num:'201906038715'
                },
                dialogStockPrint:false,
                allAddStock:false,
                dialogStockVisible:false,
                addStock:'',
                productStock:[{
                    time:'2019-06-19 18:40:19',
                    name:'草本精华夜用330mm*6片/盒纯天然中药芯片防异味独立包装防止二次污染',
                    floor:'挂层',
                    num:''
                },{
                    time:'2019-06-19 18:40:19',
                    name:'草本精华夜用330mm*6片/盒纯天然中药芯片防异味独立包装防止二次污染',
                    floor:'挂层',
                    num:''
                },{
                    time:'2019-06-19 18:40:19',
                    name:'草本精华夜用330mm*6片/盒纯天然中药芯片防异味独立包装防止二次污染',
                    floor:'挂层',
                    num:''
                },{
                    time:'2019-06-19 18:40:19',
                    name:'草本精华夜用330mm*6片/盒纯天然中药芯片防异味独立包装防止二次污染',
                    floor:'挂层',
                    num:''
                }],
                productList:[{
                    name:'草本精华夜用330mm*6片/盒纯天然中药芯片防异味独立包装防止二次污染',
                    desc:'',
                    price:'19.8',
                    sales:'0',
                    money:'0',
                    stock:'45',
                    stockInput:'',
                    floor:'挂层'
                },{
                    name:'草本精华夜用330mm*6片/盒纯天然中药芯片防异味独立包装防止二次污染',
                    desc:'',
                    price:'19.8',
                    sales:'0',
                    money:'0',
                    stock:'45',
                    stockInput:'',
                    floor:'挂层'
                },{
                    name:'草本精华夜用330mm*6片/盒纯天然中药芯片防异味独立包装防止二次污染',
                    desc:'',
                    price:'19.8',
                    sales:'0',
                    money:'0',
                    stock:'45',
                    stockInput:'',
                    floor:'挂层'
                },{
                    name:'草本精华夜用330mm*6片/盒纯天然中药芯片防异味独立包装防止二次污染',
                    desc:'',
                    price:'19.8',
                    sales:'0',
                    money:'0',
                    stock:'45',
                    stockInput:'',
                    floor:'挂层'
                }],
                editForm:{
                    name:'健康艾宝',
                    shop:'怡菲·宝贝优品',
                    address:'广东省佛山市禅城区南庄上元农行旁宝贝优品',
                    person:'陆炽亮',
                    phone:'18575778368',
                    shelfNum:'201906038715',
                    shelfTime:'2019-06-03 16:40:04',
                    channel:'',
                    show:'big',
                    profit:'选择模板',
                    adminProfit:'',
                    staffProfit:'',
                    code:'',
                    package:'',
                    profitTemplate:'',
                    role1:'城市运营',
                    role1Profit:'5',
                    role1Name:'',
                    role1NameChoose:'',
                    role2:'区域运营',
                    role2Profit:'3',
                    role2Name:'',
                    role2NameChoose:'',
                    role:''
                },
                activeTab:'first',
                dialogExample:false,
                dialogStaff:false,
                templateRadio:1,
                dialogTableProfit:false,
                staffData:[{
                    id:13585,
                    name:'农小丽'
                },{
                    id:13583,
                    name:'伍敏青'
                },{
                    id:13578,
                    name:'牟伦友'
                },{
                    id:13561,
                    name:'陈艺杰'
                },],
                TableProfitData:[{
                    messageTemplateId:1,
                    name:'全国运营中心（城市运营、区域运营）',
                    time:'2019-05-15 17:28:25',
                    num:'3'
                },{
                    messageTemplateId:2,
                    name:'区域运营（城市运营.店推店）',
                    time:'2019-05-15 17:28:25',
                    num:'3'
                },{
                    messageTemplateId:3,
                    name:'区域运营商分润',
                    time:'2019-05-15 17:28:25',
                    num:'3'
                },{
                    messageTemplateId:4,
                    name:'城市运营',
                    time:'2019-05-15 17:28:25',
                    num:'3'
                }],
                addForm:{
                    name:'爱宝',
                    shop:'',
                    channel:'',
                    show:'big',
                    profit:'选择模板',
                    adminProfit:'',
                    staffProfit:'',
                    code:'',
                    package:'',
                    profitTemplate:'',
                    role1:'城市运营',
                    role1Profit:'5',
                    role1Name:'',
                    role1NameChoose:'',
                    role2:'区域运营',
                    role2Profit:'3',
                    role2Name:'',
                    role2NameChoose:'',
                    role:''
                },
                pageType:'index',
                keyWord:'',
                size: this.GLOBAL.size,
                filters: {
                    name: ''
                },
                shelfList: [{
                    num: '201906038715',
                    name: '怡菲·宝贝优品',
                    name2: '怡菲·肇庆1店',
                    address: '广东省佛山市禅城区南庄上元农行旁宝贝优品',
                    phone: '18575778368',
                    time: '2019-06-03 16:40:04',
                    code: '100698'
                },],
                total: 0,
                page: 1,
                listLoading: false,
                sels: [],//列表选中列


                editLoading: false,
                editFormRules: {
                    name: [
                        {required: true, message: '请输入姓名', trigger: 'blur'}
                    ]
                },

                addFormVisible: false,//新增界面是否显示
                addLoading: false,
                gridData: [{
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '5%'
                }, {
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '4%'
                }, {
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '6%'
                }, {
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '10%'
                }],
                dialogTableVisible: false,
                dialogVisible: false,
                personForm:'',
                form:''
            }
        },
        methods: {
            //申请二维码
            ApplyCode(){
                this.$router.push({
                    path:'shelf/code/add',
                    query:{
                        index:'2',
                        leaf:'0'
                    }
                });
            },
            addProduct(){
                this.pageType = 'productAdd'
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
                if(val == 'editForm'){
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
                if(this.form == 'editForm'){
                    this.editForm.profitTemplate = row.name
                }else {
                    this.addForm.profitTemplate = row.name
                }
            },
            addSubmit(){
                this.$router.go(-1);//返回上一层
            },
            download() {
               console.log('下载')
            },


        },
        mounted() {
            this.headClass()
        }
    }
</script>

