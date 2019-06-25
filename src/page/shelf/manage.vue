<template>
    <div class="shelf">

        <el-row v-show="showAdd == false && showEdit == false" :gutter="10">
            <el-col class="hidden-sm-and-down" :md="6" :lg="6" :xl="6">
                <el-menu :default-openeds="openeds" class="el-menu-vertical-demo shop">
                    <el-submenu index="1" class="gray08">
                        <template slot="title" class="gray08">
                            <i class="el-icon-s-shop"></i>
                            <span>南极人衣锦坊</span>
                        </template>
                        <el-menu-item index="1-1"><i class="el-icon-menu"></i>北京
                            <el-badge class="mark" :value="1"/>
                        </el-menu-item>
                        <el-submenu index="1-2">
                            <template slot="title">
                                <i class="el-icon-menu"></i>
                                <span @click.stop="myclick1">安徽<el-badge class="mark" :value="12"/></span>
                            </template>
                            <el-submenu index="1-2-1">
                                <template slot="title"><i class="el-icon-s-help"></i>合肥
                                    <el-badge class="mark" :value="8"/>
                                </template>
                                <el-menu-item index="1-2-1-1"><i class="el-icon-location"></i>瑶海区
                                    <el-badge class="mark" :value="2"/>
                                </el-menu-item>
                                <el-menu-item index="1-2-1-2"><i class="el-icon-location"></i>庐阳区
                                    <el-badge class="mark" :value="2"/>
                                </el-menu-item>
                                <el-menu-item index="1-2-1-3"><i class="el-icon-location"></i>经开区
                                    <el-badge class="mark" :value="4"/>
                                </el-menu-item>
                            </el-submenu>
                            <el-menu-item index="1-2-2"><i class="el-icon-s-help"></i>淮北
                                <el-badge class="mark" :value="2"/>
                            </el-menu-item>
                            <el-menu-item index="1-2-3"><i class="el-icon-s-help"></i>六安
                                <el-badge class="mark" :value="5"/>
                            </el-menu-item>
                        </el-submenu>
                        <el-submenu index="1-3">
                            <template slot="title"><i class="el-icon-menu"></i>四川
                                <el-badge class="mark" :value="2"/>
                            </template>
                            <el-menu-item index="1-3-1"><i class="el-icon-s-help"></i>眉山
                                <el-badge class="mark" :value="2"/>
                            </el-menu-item>
                        </el-submenu>
                        <el-submenu index="1-4">
                            <template slot="title"><i class="el-icon-menu"></i>福建
                                <el-badge class="mark" :value="12"/>
                            </template>
                            <el-submenu index="1-4-1">
                                <template slot="title"><i class="el-icon-s-help"></i>泉州
                                    <el-badge class="mark" :value="12"/>
                                </template>
                                <el-menu-item index="1-4-1-1"><i class="el-icon-location"></i>惠安
                                    <el-badge class="mark" :value="12"/>
                                </el-menu-item>
                            </el-submenu>
                        </el-submenu>
                    </el-submenu>
                </el-menu>
            </el-col>
            <el-col :xs="24" :sm="24" :md="18" :lg="18" :xl="18">
                <div>
                    <el-button type="primary" :size="size" icon="el-icon-plus" @click="addShelf">添加</el-button>
                    <el-button type="danger" :size="size" icon="el-icon-close">删除</el-button>
                    <el-button :size="size" icon="el-icon-refresh">刷新</el-button>
                    <el-input class="search fr" placeholder="请输入内容" :size="size" v-model="keyWord"><i slot="prefix" class="el-input__icon el-icon-search"></i></el-input>
                </div>
                <el-table stripe :data="shelfList" ref="table" highlight-current-row v-loading="listLoading"
                          style="width: 100%; margin-top: 20px;" :header-row-class-name="headClass" :height="tableHeight">
                    <el-table-column type="selection" fixed width="55"></el-table-column>
                    <el-table-column prop="num" label="货架号"></el-table-column>
                    <el-table-column prop="name" label="门店名称"></el-table-column>
                    <el-table-column label="渠道商">
                        <template slot-scope="scope">
                            <span class="baseColor" @click="profitChannel()">{{scope.row.name2}}</span>
                            <!--<el-button :size="size" type="text" @click="profitChannel">{{scope.row.name2}}</el-button>-->
                        </template>
                    </el-table-column>
                    <el-table-column prop="address" label="地址"></el-table-column>
                    <el-table-column prop="phone" label="门店联系方式"></el-table-column>
                    <el-table-column prop="time" label="上架时间"></el-table-column>
                    <el-table-column label="货架二维码">
                        <template slot-scope="scope">
                            <span class="baseColor" @click="shelfCode()">{{scope.row.code}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column fixed="right" label="操作" width="100">
                        <template slot-scope="scope">
                            <el-button :size="size" type="text" @click="handleEdit(scope.$index, scope.row)">管理</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination background layout="prev, pager, next" :total="100" :hide-on-single-page="true" class="fr">
                </el-pagination>
            </el-col>
        </el-row>
        <!--<Add v-show="showAdd"></Add>-->
        <transition name="fade" mode="out-in">
            <router-view></router-view>
        </transition>




        <!--<div v-if="pageType=='add'">-->
            <!--<p class="title">添加布点商家</p>-->
            <!--<el-form ref="form" :model="addForm" hideRequiredSterisk="true" label-width="160px">-->
                <!--<el-form-item required label="公司名称">-->
                    <!--<el-input :size="size" v-model="addForm.name" class="inputOne" :disabled="true"></el-input>-->
                    <!--&lt;!&ndash;<el-input :size="size" v-model="addForm.name" v-validate="'required'" data-vv-as="公司名称" name="addForm.name" :class="{'input': true, 'is-danger': errors.has('name') }" class="inputOne"  :disabled="true"></el-input>&ndash;&gt;-->
                    <!--&lt;!&ndash;<span class="help is-danger">{{ errors.first('addForm.name') }}</span>&ndash;&gt;-->
                <!--</el-form-item>-->
                <!--<el-form-item required label="绑定货架所在门店">-->
                    <!--<el-select :size="size" v-model="addForm.shop" class="inputOne" placeholder="绑定货架所在门店">-->
                        <!--<el-option label="区域一" value="shanghai"></el-option>-->
                        <!--<el-option label="区域二" value="beijing"></el-option>-->
                    <!--</el-select>-->
                    <!--<el-button :size="size" type="text" style="margin-left: 20px;">刷新</el-button>-->
                    <!--<el-button :size="size" type="text" style="margin-left: 20px;">新建门店</el-button>-->
                <!--</el-form-item>-->
                <!--<el-form-item required label="推广渠道">-->
                    <!--<el-select :size="size" v-model="addForm.channel" class="inputOne" placeholder="绑定货架所在门店">-->
                        <!--<el-option label="区域一" value="shanghai"></el-option>-->
                        <!--<el-option label="区域二" value="beijing"></el-option>-->
                    <!--</el-select>-->
                    <!--<el-button :size="size" type="text" style="margin-left: 20px;">刷新</el-button>-->
                    <!--<el-button :size="size" type="text" style="margin-left: 20px;">新建门店</el-button>-->
                <!--</el-form-item>-->
                <!--<el-form-item required label="选择图片展示模板">-->
                    <!--<el-radio-group :size="size" v-model="addForm.show">-->
                        <!--<el-radio label="big">大图</el-radio>-->
                        <!--<el-radio label="small">小图</el-radio>-->
                    <!--</el-radio-group>-->
                    <!--<el-button :size="size" type="text" style="margin-left: 20px;" @click="dialogExample = true">查看示例</el-button>-->
                <!--</el-form-item>-->
                <!--<el-form-item required label="分润模板">-->
                    <!--<el-button :size="size" type="primary" @click="myProfit('addForm')">{{addForm.profit}}</el-button>-->
                    <!--<el-button :size="size" type="text" @click="delProfit">取消</el-button>-->
                    <!--<el-button :size="size" type="text">新建模板</el-button>-->
                <!--</el-form-item>-->
                <!--<el-form-item v-if="addForm.profit != '选择模板'" required label="分配角色">-->
                    <!--<p>-->
                        <!--<el-input :size="size" v-model="addForm.role1" :disabled="true" style="width: 200px;"></el-input>-->
                        <!--<el-input :size="size" v-model="addForm.role1Profit" :disabled="true" style="width: 200px;"></el-input>-->
                        <!--<span>%</span>-->
                        <!--<el-button type="primary" @click="choosePerson('0','addForm')">选择推广人</el-button>-->
                        <!--<el-button :size="size" type="text" @click="addStaff">添加员工</el-button>-->
                    <!--</p>-->
                    <!--<p v-if="addForm.role1Name">姓名<el-input :size="size" v-model="addForm.role1Name" :disabled="true" style="width: 200px; margin-left: 10px"></el-input></p>-->
                    <!--<p>-->
                        <!--<el-input :size="size" v-model="addForm.role2" :disabled="true" style="width: 200px;"></el-input>-->
                        <!--<el-input :size="size" v-model="addForm.role2Profit" :disabled="true" style="width: 200px;"></el-input>-->
                        <!--<span>%</span>-->
                        <!--<el-button type="primary" @click="choosePerson('1','addForm')">选择推广人</el-button>-->
                        <!--<el-button :size="size" type="text" @click="addStaff">添加员工</el-button>-->
                    <!--</p>-->
                    <!--<p v-if="addForm.role2Name">姓名<el-input :size="size" v-model="addForm.role2Name" :disabled="true" style="width: 200px; margin-left: 10px"></el-input></p>-->
                <!--</el-form-item>-->
                <!--<el-form-item required label="货架分润">-->
                    <!--<p>店主：<el-input :size="size" v-model="addForm.adminProfit" style="width: 200px;"></el-input><span>%(分润比例：0~100，例如：10)</span></p>-->
                    <!--<p>员工：<el-input :size="size" v-model="addForm.staffProfit" style="width: 200px;"></el-input><span>%(分润比例：0~100，例如：10)</span></p>-->
                <!--</el-form-item>-->
                <!--<el-form-item label="货架绑定二维码">-->
                    <!--<el-input :size="size" v-model="addForm.code" class="inputOne"></el-input>-->
                    <!--<el-button :size="size" type="text" style="margin-left: 20px;">申请二维码编号</el-button>-->
                    <!--&lt;!&ndash;<span class="baseColor">申请二维码编号</span>&ndash;&gt;-->
                <!--</el-form-item>-->
                <!--<el-form-item label="关联货架套餐订单">-->
                    <!--<el-select :size="size" v-model="addForm.package" placeholder="绑定货架所在门店" class="inputOne">-->
                        <!--<el-option label="区域一" value="shanghai"></el-option>-->
                        <!--<el-option label="区域二" value="beijing"></el-option>-->
                    <!--</el-select>-->
                    <!--<p class="gray10">关联货架套餐订单后，可方便管理店铺库存</p>-->
                <!--</el-form-item>-->
                <!--<el-form-item label="关联商品信息">-->
                    <!--<p>无相关商品</p>-->
                <!--</el-form-item>-->

                <!--<el-form-item>-->
                    <!--<el-button type="primary" @click="addSubmit">提 交</el-button>-->
                    <!--<el-button @click="pageType = 'index'">返 回</el-button>-->
                <!--</el-form-item>-->
            <!--</el-form>-->
        <!--</div>-->
        <div v-if="pageType=='edit'">
            <el-tabs v-model="activeTab">
                <el-tab-pane label="基本资料" name="first">
                    <el-form ref="form" :model="editForm" hideRequiredSterisk="true" label-width="160px">
                        <el-form-item label="企业名称">
                            <el-input :size="size" v-model="editForm.name" class="inputOne" :disabled="true"></el-input>
                            <!--<el-input :size="size" v-model="addForm.name" v-validate="'required'" data-vv-as="公司名称" name="addForm.name" :class="{'input': true, 'is-danger': errors.has('name') }" class="inputOne"  :disabled="true"></el-input>-->
                            <!--<span class="help is-danger">{{ errors.first('addForm.name') }}</span>-->
                        </el-form-item>
                        <el-form-item required label="绑定货架所在门店">
                            <el-input :size="size" v-model="editForm.shop" class="inputOne" :disabled="true"></el-input>
                        </el-form-item>
                        <el-form-item label="门店地址">
                            <el-input :size="size" v-model="editForm.address" class="inputOne" :disabled="true"></el-input>
                        </el-form-item>
                        <el-form-item label="门店联系人">
                            <el-input :size="size" v-model="editForm.person" class="inputOne" :disabled="true"></el-input>
                        </el-form-item>
                        <el-form-item label="联系电话">
                            <el-input :size="size" v-model="editForm.phone" class="inputOne" :disabled="true"></el-input>
                        </el-form-item>
                        <el-form-item label="货架号">
                            <el-input :size="size" v-model="editForm.shelfNum" class="inputOne" :disabled="true"></el-input>
                        </el-form-item>
                        <el-form-item label="布架时间">
                            <el-input :size="size" v-model="editForm.shelfTime" class="inputOne" :disabled="true"></el-input>
                        </el-form-item>
                        <el-form-item required label="渠道商">
                            <el-select :size="size" v-model="editForm.channel" class="inputOne" placeholder="绑定货架所在门店">
                                <el-option label="区域一" value="shanghai"></el-option>
                                <el-option label="区域二" value="beijing"></el-option>
                            </el-select>
                            <el-button :size="size" type="text" style="margin-left: 20px;">刷新</el-button>
                            <el-button :size="size" type="text" style="margin-left: 20px;">新建门店</el-button>
                        </el-form-item>
                        <el-form-item required label="选择图片展示模板">
                            <el-radio-group :size="size" v-model="editForm.show">
                                <el-radio label="big">大图</el-radio>
                                <el-radio label="small">小图</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item required label="分润模板">
                            <el-button :size="size" type="primary" @click="myProfit('editForm')">{{editForm.profit}}</el-button>
                            <el-button :size="size" type="text" @click="delProfit">取消</el-button>
                            <el-button :size="size" type="text">新建模板</el-button>
                        </el-form-item>
                        <el-form-item required v-if="editForm.profit != '选择模板'" required label="分配角色">
                            <p>
                                <el-input :size="size" v-model="editForm.role1" :disabled="true" style="width: 200px;"></el-input>
                                <el-input :size="size" v-model="editForm.role1Profit" :disabled="true" style="width: 200px;"></el-input>
                                <span>%</span>
                                <el-button type="primary" @click="choosePerson('0','editForm')">选择推广人</el-button>
                                <el-button :size="size" type="text" @click="addStaff">添加员工</el-button>
                            </p>
                            <p v-if="editForm.role1Name">姓名<el-input :size="size" v-model="editForm.role1Name" :disabled="true" style="width: 200px; margin-left: 10px"></el-input></p>
                            <p>
                                <el-input :size="size" v-model="editForm.role2" :disabled="true" style="width: 200px;"></el-input>
                                <el-input :size="size" v-model="editForm.role2Profit" :disabled="true" style="width: 200px;"></el-input>
                                <span>%</span>
                                <el-button type="primary" @click="choosePerson('1','editForm')">选择推广人</el-button>
                                <el-button :size="size" type="text" @click="addStaff">添加员工</el-button>
                            </p>
                            <p v-if="editForm.role2Name">姓名<el-input :size="size" v-model="editForm.role2Name" :disabled="true" style="width: 200px; margin-left: 10px"></el-input></p>
                        </el-form-item>
                        <el-form-item required label="货架分润">
                            <p>店主：<el-input :size="size" v-model="editForm.adminProfit" style="width: 200px;"></el-input><span>%(分润比例：0~100，例如：10)</span></p>
                            <p>员工：<el-input :size="size" v-model="editForm.staffProfit" style="width: 200px;"></el-input><span>%(分润比例：0~100，例如：10)</span></p>
                        </el-form-item>
                        <el-form-item label="货架绑定二维码">
                            <el-input :size="size" v-model="addForm.code" class="inputOne"></el-input>
                            <el-button :size="size" type="text" style="margin-left: 20px;">申请二维码编号</el-button>
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
                            <el-button type="primary" @click="editSubmit">提 交</el-button>
                            <el-button @click="pageType = 'index'">返 回</el-button>
                        </el-form-item>
                    </el-form>
                </el-tab-pane>
                <el-tab-pane label="商品管理" name="second">
                    <div>
                        <el-button type="primary" :size="size" icon="el-icon-plus" @click="addProduct">添加</el-button>
                        <el-button type="danger" :size="size" icon="el-icon-close">删除</el-button>
                        <el-button :size="size" icon="el-icon-refresh">刷新</el-button>
                        <el-button :size="size" @click="allAddStock = true">补货</el-button>
                        <el-input class="search fr" placeholder="请输入内容" :size="size" v-model="keyWord"><i slot="prefix" class="el-input__icon el-icon-search"></i></el-input>
                    </div>
                    <el-table stripe :data="productList" ref="table" highlight-current-row v-loading="listLoading"
                              style="width: 100%; margin-top: 20px;" :header-row-class-name="headClass" :height="tableHeight">
                        <el-table-column type="selection" fixed width="55"></el-table-column>
                        <el-table-column prop="name" label="商品名" width="300"></el-table-column>
                        <el-table-column prop="spec" label="规格"></el-table-column>
                        <el-table-column prop="price" label="单价"></el-table-column>
                        <el-table-column prop="sales" label="销售量"></el-table-column>
                        <el-table-column prop="money" label="销售额"></el-table-column>

                        <!--<el-table-column prop="stock" label="库存" v-if="allAddStock==false"></el-table-column>-->

                        <el-table-column label="库存">
                            <template slot-scope="scope">
                                <span v-if="allAddStock==false">{{scope.row.stock}}</span>
                                <el-input :size="size" v-model="scope.row.stockInput" v-if="allAddStock==true"></el-input>
                            </template>
                        </el-table-column>

                        <el-table-column prop="floor" label="层数"></el-table-column>
                        <el-table-column label="补货">
                            <template slot-scope="scope">
                                <!--<span class="baseColor" @click="profitChannel()">{{scope.row.name2}}</span>-->
                                <el-button :size="size" type="text" @click="replenish(scope.$index)">补货</el-button>
                            </template>
                        </el-table-column>
                        <el-table-column label="价签打印" width="140">
                            <template slot-scope="scope">
                                <!--<span class="baseColor" @click="shelfCode()">{{scope.row.code}}</span>-->
                                <el-button :size="size" type="text" @click="productCode">商品码</el-button>
                                <el-button :size="size" type="text" @click="payCode">支付码</el-button>
                            </template>
                        </el-table-column>
                        <el-table-column fixed="right" label="操作" width="60">
                            <template slot-scope="scope">
                                <el-button :size="size" type="text" @click="productEditBtn(scope.$index, scope.row)">编辑</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div v-if="allAddStock==true">
                        <el-button type="primary" :size="size" @click="stockSubmit">提交</el-button>
                        <el-button :size="size" @click="allAddStock = false">返回</el-button>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>
        <div v-if="pageType=='productEdit'">
            <el-form ref="form" :model="productForm" hideRequiredSterisk="true" label-width="160px">

                <el-form-item required label="商品名称">
                    <el-input :size="size" v-model="productForm.name" class="inputOne" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item required label="层数">
                    <el-select :size="size" v-model="productForm.floor" class="inputOne" placeholder="层数">
                        <el-option label="挂层" value="0"></el-option>
                        <el-option label="一层" value="1"></el-option>
                        <el-option label="二层" value="2"></el-option>
                        <el-option label="三层" value="3"></el-option>
                        <el-option label="四层" value="4"></el-option>
                        <el-option label="五层" value="5"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item required label="货架编号">
                    <el-input :size="size" v-model="productForm.num" class="inputOne" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="productSubmit">确 定</el-button>
                    <el-button @click="pageType = 'edit'">返 回</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div v-if="pageType=='productAdd'">
            <el-form ref="form" :model="productAddForm" hideRequiredSterisk="true" label-width="160px">

                <el-form-item required label="商品名称">
                    <el-input :size="size" v-model="productAddForm.name" class="inputOne"></el-input>
                    <el-button :size="size">搜索</el-button>
                </el-form-item>
                <el-form-item required label="">

                    <el-tree :data="productData" show-checkbox node-key="id" :default-expanded-keys="[1, 2]" :props="defaultProps"></el-tree>


                </el-form-item>

                <el-form-item required label="层数">
                    <el-select :size="size" v-model="productAddForm.floor" class="inputOne" placeholder="层数">
                        <el-option label="挂层" value="0"></el-option>
                        <el-option label="一层" value="1"></el-option>
                        <el-option label="二层" value="2"></el-option>
                        <el-option label="三层" value="3"></el-option>
                        <el-option label="四层" value="4"></el-option>
                        <el-option label="五层" value="5"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item required label="货架编号">
                    <el-input :size="size" v-model="productAddForm.num" class="inputOne" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="productSubmit">确 定</el-button>
                    <el-button @click="pageType = 'edit'">返 回</el-button>
                </el-form-item>
            </el-form>
        </div>

        <!--补货单-->
        <el-dialog title="模板" :visible.sync="dialogStockPrint" width="800px">
            <el-table :data="productStock" :header-row-class-name="headClass">
                <el-table-column type="index" width="100" label="编号" align="center"></el-table-column>
                <el-table-column property="id" label="创建时间" align="center"></el-table-column>
                <el-table-column property="name" label="商品名称" align="center" width="300"></el-table-column>
                <el-table-column property="floor" label="所属层" align="center"></el-table-column>
                <el-table-column property="num" label="配货数量" align="center"></el-table-column>
            </el-table>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogStockPrint = false">取 消</el-button>
                <el-button type="primary" @click="goAddStock()">确定并打印</el-button>

            </span>
        </el-dialog>
        <!--补货-->
        <el-dialog title="补货" :visible.sync="dialogStockVisible" width="600px">
            <el-form :model="form">
                <el-form-item label="加库存" label-width="100">
                    <el-input v-model="addStock" autocomplete="off" class="inputOne"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogStockVisible = false">取 消</el-button>
                <el-button type="primary" @click="addStockBtn()">确 定</el-button>
            </div>
        </el-dialog>
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
        <!--选择员工-->
        <el-dialog title="模板" :visible.sync="dialogStaff" width="600px">
            <el-table :data="staffData" :header-row-class-name="headClass">
                <el-table-column type="radio" width="100" align="center">
                    <template slot-scope="scope">
                        <el-radio :label="scope.row.id" v-model="templateRadio" @change="getStaffRow(scope.$index,scope.row)"></el-radio>
                    </template>
                </el-table-column>
                <el-table-column property="id" label="员工ID" align="center"></el-table-column>
                <el-table-column property="name" label="员工昵称" align="center"></el-table-column>
            </el-table>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogStaff = false">取 消</el-button>
                <el-button type="primary" @click="choosedStaff()">确 定</el-button>

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
        <!--渠道商分润-->
        <el-dialog title="渠道商分润" :visible.sync="dialogTableVisible" width="540px">
            <el-table :data="gridData" style="width: 500px;" :header-row-class-name="headClass">
                <el-table-column type="index" width="100" align="center"></el-table-column>
                <el-table-column property="name" label="推广人" align="center" width="300"></el-table-column>
                <el-table-column label="分润比例" width="100" align="center">
                    <template slot-scope="scope">
                        <el-badge :value="scope.row.address" class="block"></el-badge>
                    </template>
                </el-table-column>
            </el-table>
        </el-dialog>
        <!--货架二维码-->
        <el-dialog title="查看二维码" :visible.sync="dialogVisible" width="30%">
            <span><img src="http://cdn.tiaohuo.com/upload/image/201904/1dc3ee49-8b1b-4e15-8be0-04e77e4c3464.jpg"/></span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">关 闭</el-button>
                <el-button type="primary" @click="download()">下 载</el-button>
            </span>
        </el-dialog>
    </div>

</template>
<script>
    import util from '../../common/js/util'
    //import NProgress from 'nprogress'
    import {getUserListPage, removeUser, batchRemoveUser, editUser, addUser} from '../../api/api';
    import Add from '../view/shelf/manage/add.vue'
    export default {
        data() {
            return {
                showAdd:false,
                showEdit:false,
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
                screenHeight: document.body.clientHeight, // 这里是给到了一个默认值 （这个很重要）
                tableHeight: null, // 表格高度
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
        components:{Add},
        watch: {
            // 监听屏幕高度改变表格高度
            screenHeight(val) {
                // 初始化表格高度
                this.tableHeight = window.innerHeight - this.$refs.table.$el.offsetTop - 100 - 60 -32;
            }
        },
        methods: {
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
                // this.showAdd = true
                console.log(565)
                this.$router.push({
                    path:'/shelf/index/add',
                    query:{
                        index:'2',
                        leaf:'0'
                    }
                });


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
                this.shelfList = []
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
            this.tableHeight = window.innerHeight - this.$refs.table.$el.offsetTop - 100 - 60 -32;
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

