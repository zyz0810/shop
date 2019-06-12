<template>
    <div class="addProduct">
        <el-steps :active="active" class="stepProduct" simple>
            <el-step title="1.编辑商品分类信息"></el-step>
            <el-step title="2.编辑商品信息"></el-step>
            <el-step title="3.编辑商品详情"></el-step>
        </el-steps>

        <el-form ref="form" :model="form" label-width="150px" hideRequiredSterisk="true" l>
            <div class="product_tit">类目信息</div>
            <el-form-item required label="选择常用类目">
                <el-select v-model="value" placeholder="选择常用类目">
                    <el-option v-for="item in options" :key="item.value" :label="item.label"
                               :value="item.value"></el-option>
                </el-select>
                <el-button type="danger">清空数据</el-button>
            </el-form-item>
            <el-form-item label="您当前选择的是">
                <span class="red01 bold choosecCategory">{{oneCategory[categoryOneIndex].name}}<span>/</span>{{oneCategory[categoryOneIndex].children[categoryTwoIndex].name}}<span>/{{oneCategory[categoryOneIndex].children[categoryTwoIndex].children[categoryThreeIndex].name}}</span></span>
                <el-button>加入常用类目</el-button>
            </el-form-item>
            <el-form-item label="选择类目">
                <el-row :gutter="10">
                    <el-col :xs="7" :sm="7" :md="7" :lg="7" :xl="7">
                        <div>
                            <el-autocomplete v-model="form.categoryOneSearch" :fetch-suggestions="querySearchAsync"
                                             placeholder="请输入内容" @select="handleSelect"></el-autocomplete>
                            <el-button class="categorySearch">搜索</el-button>
                        </div>
                        <ul class="categoryUl">
                            <li v-for="(item,index) in oneCategory" :class="categoryOneIndex == index?'selected':''"
                                @click="categoryOne(index)">{{item.name}}
                            </li>
                        </ul>
                    </el-col>
                    <el-col :xs="7" :sm="7" :md="7" :lg="7" :xl="7">
                        <div>
                            <el-autocomplete v-model="form.categoryTwoSearch" :fetch-suggestions="querySearchAsync"
                                             placeholder="请输入内容" @select="handleSelect"></el-autocomplete>
                            <el-button class="categorySearch">搜索</el-button>
                        </div>
                        <template v-for="(item,index) in oneCategory">
                            <ul class="categoryUl" v-if="index == categoryOneIndex">
                                <li v-for="(two,idx) in item.children" :class="categoryTwoIndex == idx?'selected':''"
                                    @click="categoryTwo(idx)">{{two.name}}
                                </li>
                            </ul>
                        </template>


                    </el-col>
                    <el-col :xs="7" :sm="7" :md="7" :lg="7" :xl="7">
                        <div>
                            <el-autocomplete v-model="form.categoryThreeSearch" :fetch-suggestions="querySearchAsync"
                                             placeholder="请输入内容" @select="handleSelect"></el-autocomplete>
                            <el-button class="categorySearch">搜索</el-button>
                        </div>
                        <template v-for="(item,index) in oneCategory" v-if="index == categoryOneIndex">
                            <template v-for="(two,idx) in item.children" v-if="idx == categoryTwoIndex">
                                <ul class="categoryUl" :data-id="idx">
                                    <li v-for="(three,tindex) in two.children"
                                        :class="categoryThreeIndex == tindex?'selected':''"
                                        @click="categoryThree(tindex)">{{three.name}}
                                    </li>
                                </ul>
                            </template>
                        </template>

                    </el-col>
                </el-row>
            </el-form-item>
            <div class="product_tit">基本信息</div>
            <el-form-item label="商品类目" class="intro">
                <p>潮流女装/女士内衣/保暖内衣</p>
                <p class="gray11">(商品上架后不可修改，请谨慎选择)</p>
            </el-form-item>
            <el-form-item label="条形码">
                <el-input v-model="form.code" class="inputOne"></el-input>
            </el-form-item>
            <el-form-item label="名称">
                <el-input v-model="form.name" class="inputOne"></el-input>
            </el-form-item>
            <el-form-item label="单位">
                <el-input v-model="form.unit" class="inputOne"></el-input>
                <span>计量单位，例：盒、件、箱、瓶。</span>
            </el-form-item>
            <div class="product_tit">分润信息</div>
            <el-form-item label="商品分润">
                <el-checkbox-group v-model="form.type">
                    <el-checkbox label="使用分润模板" name="type"></el-checkbox>
                </el-checkbox-group>
            </el-form-item>
            <el-form-item label="推广佣金率">
                <el-input v-model="form.unit" class="inputOne"></el-input>
                <span>%</span>
            </el-form-item>
            <el-form-item label="返利比例">
                <el-input v-model="form.unit" class="inputOne"></el-input>
                <span>%</span>
            </el-form-item>
            <el-form-item label="发展者佣金率">
                <el-input v-model="form.unit" class="inputOne"></el-input>
                <span>%</span>
            </el-form-item>
            <el-form-item label="换算规则">
                <span>1=</span>
                <el-input v-model="form.unit" class="" style="width: 50px"></el-input>
                <el-input v-model="form.unit" class="" style="width: 50px"></el-input>
                <el-button type="primary">清空</el-button>
            </el-form-item>
            <div class="product_tit">价格库存</div>
            <el-form-item label="商品规格">
                <el-radio-group v-model="specsLabel" @change="specsButton($event)">
                    <el-radio label="0">统一规格</el-radio>
                    <el-radio label="1">多规格</el-radio>
                </el-radio-group>
                <div class="specifications" v-if="specsLabel == '1'">
                    <div class="specifications_tit">颜色</div>
                    <ul>
                        <li class="relative" v-for="(item,index) in colorSpec">
                            <el-checkbox @change="choose($event,index)">
                                <el-input v-model="colorSpec[index].name" class="color_input"
                                          @focus="inputFocus(index)" @change="inputChange($event,index)"></el-input>
                                <span class="spec_img tc f20">+</span>
                                <el-button @click="dialogVisible = true">上传图片</el-button>
                            </el-checkbox>
                            <!--选择颜色-->
                            <div class="color_choose clearfix" v-show="item.show">
                                <ul class="fl color_title">
                                    <li v-for="(item,idx) in list" @click="tab(idx)"><span class="color_bg"
                                                                                           :style="{background: item.color}"></span>{{item.name}}
                                    </li>
                                </ul>
                                <ul class="color_cont fl">
                                    <li v-for="(item,idx) in list" v-if="item.show">
                                        <p>常用标准颜色</p>
                                        <ul>
                                            <template v-for="child in item.cont">
                                                <li class="fl" @click="chooseColor($event,index)"><span class="color_bg"
                                                                                                        :style="{background: child.color}"></span>{{child.name}}
                                                </li>
                                            </template>
                                        </ul>
                                    </li>
                                </ul>
                            </div>
                        </li>

                    </ul>
                    <div class="specifications_tit">尺码</div>
                    <ul class="size_product">
                        <li v-for="(item,index) in sizeSpec">
                            <el-checkbox @change="chooseSize($event,index)" v-if="!item.custom">{{item.name}}
                            </el-checkbox>
                            <el-checkbox @change="chooseSize($event,index)" v-if="item.custom">
                                <el-input v-model="item.value" size="small" placeholder="自定义尺码"
                                          style="width: 100px" @change="sizeChange($event,index)"></el-input>
                            </el-checkbox>
                        </li>

                    </ul>
                    <div class="specifications_tit">宝贝销售规格</div>
                    <ul class="batch_product">
                        <li>批量填充</li>
                        <li>
                            <el-input placeholder="条形码" size="small"></el-input>
                        </li>
                        <li>
                            <el-input placeholder="合伙人" size="small"></el-input>
                        </li>
                        <li>
                            <el-input placeholder="销售价" size="small"></el-input>
                        </li>
                        <li>
                            <el-input placeholder="市场价" size="small"></el-input>
                        </li>
                        <li>
                            <el-input placeholder="库存" size="small"></el-input>
                        </li>
                        <li>
                            <el-input placeholder="成本价" size="small"></el-input>
                        </li>
                        <li>
                            <el-input placeholder="起订量" size="small"></el-input>
                        </li>
                        <li>
                            <el-input size="small"></el-input>
                        </li>
                        <li>
                            <el-button size="small">确定</el-button>
                        </li>
                    </ul>

                    <!--<el-table :data="tableData" :span-method="objectSpanMethod" @cell-mouse-leave="cellMouseLeave" @cell-mouse-center="cellMouseCenter" :row-class-name="tableRowClassName" border stripe-->
                    <!--style="width: 100%; margin-top: 20px">-->
                    <el-table :data="tableData" border stripe :span-method="objectSpanMethod" style="width: 100%; margin-top: 20px">
                        <el-table-column align="center" prop="color" label="颜色"></el-table-column>
                        <el-table-column align="center" prop="size" label="尺码"></el-table-column>
                        <el-table-column align="center" label="条形码">
                            <template slot-scope="scope">
                                <el-input v-model="scope.row.code" clearable size="mini"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column align="center" label="合伙人价">
                            <template slot-scope="scope">
                                <el-input v-model="scope.row.price1" clearable size="mini"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column align="center" label="销售价">
                            <template slot-scope="scope">
                                <el-input v-model="scope.row.price2" clearable size="mini"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column align="center" label="市场价">
                            <template slot-scope="scope">
                                <el-input v-model="scope.row.price3" clearable size="mini"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column align="center" label="库存">
                            <template slot-scope="scope">
                                <el-input v-model="scope.row.stock" clearable size="mini"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column align="center" label="成本价">
                            <template slot-scope="scope">
                                <el-input v-model="scope.row.price4" clearable size="mini"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column align="center" label="起订量">
                            <template slot-scope="scope">
                                <!--<div v-html="scope.row.miniOrder"></div>-->
                                <el-input v-model="scope.row.miniOrder" clearable size="mini"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column align="center" label="">
                            <template slot-scope="scope">
                                <el-input v-model="scope.row.price5" clearable size="mini"></el-input>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </el-form-item>


            <el-form-item label="启用会员卡">
                <el-checkbox-group v-model="form.type">
                    <el-checkbox label="启用会员卡" name="type"></el-checkbox>
                </el-checkbox-group>
            </el-form-item>
            <el-form-item label="商品图片">
                <el-upload action="https://jsonplaceholder.typicode.com/posts/" list-type="picture-card"
                           :on-preview="handlePictureCardPreview">
                    <i class="el-icon-plus"></i>
                </el-upload>
                <!--<el-dialog :visible.sync="dialogVisible">-->
                <!--<img width="100%" :src="dialogImageUrl" alt="">-->
                <!--</el-dialog>-->
            </el-form-item>

            <!--<div class="setMore">-->
            <!--<p>更多设置</p>-->
            <!--<el-form-item label="好的的打">-->
            <!--<el-input v-model="form.unit" class="" style="width: 50px"></el-input>-->
            <!--</el-form-item>-->
            <!--</div>-->


            <el-collapse class="setMore bornone" v-model="activeNames" @change="handleChange">
                <el-collapse-item title="更多设置" name="1" class="baseColor">
                    <el-form-item label="推广佣金率">
                        <el-input v-model="form.unit" class="inputOne"></el-input>
                    </el-form-item>
                    <el-form-item label="返利比例">
                        <el-input v-model="form.unit" class="inputOne"></el-input>
                    </el-form-item>
                </el-collapse-item>
            </el-collapse>
            <el-form-item>
                <el-button style="margin-top: 12px;" @click="next">下一步</el-button>
            </el-form-item>

        </el-form>

        <!--上传图片弹框-->
        <el-dialog title="选择文件" :visible.sync="dialogVisible" width="50%" :before-close="handleClose">
			<span>
				<img v-if="imageUrl" :src="imageUrl" class="avatar">
				<i v-else class="el-icon-plus avatar-uploader-icon"></i>
			</span>
            <span slot="footer" class="dialog-footer">
			<el-upload class="upload-demo" ref="upload" action="https://jsonplaceholder.typicode.com/posts/"
                       :on-preview="handlePreview" :on-change="onchange" :auto-upload="false" :show-file-list="false">

				<!--<el-button @click="dialogVisible = false">取 消</el-button>-->
                <!--<el-button @click="dialogVisible = false">确定上传</el-button>-->
                <!--<el-button type="primary" @click="">选择文件</el-button>-->
					<el-button slot="trigger" size="small" type="primary">选择文件</el-button>
					<el-button style="margin-left: 10px;" size="small" type="success"
                               @click="submitUpload">确定上传</el-button>

			</el-upload>
				</span>

        </el-dialog>
        <div class="mask" v-if="maskShow" @click="closeMask"></div>
    </div>
</template>

<script>
    import util from '../../common/js/util'
    //import NProgress from 'nprogress'
    import {getUserListPage, removeUser, batchRemoveUser, editUser, addUser} from '../../api/api';

    export default {
        data() {
            return {

                maskShow: false,
                options: [{
                    value: '选项1',
                    label: '黄金糕'
                }, {
                    value: '选项2',
                    label: '双皮奶'
                }, {
                    value: '选项3',
                    label: '蚵仔煎'
                }, {
                    value: '选项4',
                    label: '龙须面'
                }, {
                    value: '选项5',
                    label: '北京烤鸭'
                }],
                value: '',
                form: {
                    category: '',
                    categoryOneSearch: '',
                    categoryTwoSearch: '',
                    categoryThreeSearch: '',
                },
                restaurants: [],
                state: '',
                timeout: null,
                active: 0,
                activeNames: ['1'],
                dialogImageUrl: '',
                dialogVisible: false,
                checked: true,
                state1: '',
                formMovie: {
                    posterURL: ''
                },
                imageUrl: '',
                sizeCustom: '',
                tableData: [],
                spanArr: [],
                pos: '',
                list: [{
                    color: '#FF0000',
                    name: "红色",
                    show: true,
                    cont: [{
                        color: "#FF0000",
                        name: "大红色"
                    }, {
                        color: "#8B0000",
                        name: "深红色"
                    }]
                }, {
                    color: '#FFA500',
                    name: "橙色",
                    show: false,
                    cont: [{
                        color: "#FF4500",
                        name: "橙红色"
                    }, {
                        color: "#FFA500",
                        name: "橙色"
                    }, {
                        color: "#FF8C00",
                        name: "深橙色"
                    }, {
                        color: "#FF7F50",
                        name: "荧光橘"
                    }]
                }, {
                    color: '#FFFF00',
                    name: "黄色",
                    show: false,
                    cont: [{
                        color: "#FFFF00",
                        name: "纯黄色"
                    }, {
                        color: "#FFD700",
                        name: "金黄色"
                    }, {
                        color: "#F0E68C",
                        name: "浅黄色"
                    }]
                }],
                colorSpec: [{
                    name: '',
                    show: false,
                    checked: false
                }],
                oneCategory: [{
                    name: '潮流女装',
                    children: [{
                        name: '内衣',
                        children: [{
                            name: '11'
                        }, {
                            name: '22'
                        }, {
                            name: '333'
                        }, {
                            name: '75;'
                        }]
                    }, {
                        name: '袜子',
                        children: [{
                            name: 'fs'
                        }, {
                            name: 'a子'
                        }, {
                            name: 'gdg'
                        }, {
                            name: 'lk;'
                        }]
                    }, {
                        name: '毛衣',
                        children: [{
                            name: 'fs'
                        }, {
                            name: 'a子'
                        }, {
                            name: 'gdg'
                        }, {
                            name: 'lk;'
                        }]
                    }, {
                        name: '上衣',
                        children: [{
                            name: 'fs'
                        }, {
                            name: 'a子'
                        }, {
                            name: 'gdg'
                        }, {
                            name: 'lk;'
                        }]
                    }]
                }, {
                    name: '潮流男装',
                    children: [{
                        name: '男装',
                        children: [{
                            name: 'fs'
                        }, {
                            name: 'a子'
                        }, {
                            name: 'gdg'
                        }, {
                            name: 'lk;'
                        }]
                    }, {
                        name: '袜子',
                        children: [{
                            name: 'fs'
                        }, {
                            name: 'a子'
                        }, {
                            name: 'gdg'
                        }, {
                            name: 'lk;'
                        }]
                    }, {
                        name: '毛衣',
                        children: [{
                            name: 'fs'
                        }, {
                            name: 'a子'
                        }, {
                            name: 'gdg'
                        }, {
                            name: 'lk;'
                        }]
                    }, {
                        name: '上衣',
                        children: [{
                            name: 'fs'
                        }, {
                            name: 'a子'
                        }, {
                            name: 'gdg'
                        }, {
                            name: 'lk;'
                        }]
                    }]
                }, {
                    name: '潮流通装',
                    children: [{
                        name: '童装',
                        children: [{
                            name: '56fs'
                        }, {
                            name: 'a子'
                        }, {
                            name: 'gdg'
                        }, {
                            name: 'lk;'
                        }]
                    }, {
                        name: '袜子',
                        children: [{
                            name: '77fs'
                        }, {
                            name: '99a子'
                        }, {
                            name: 'gdg'
                        }, {
                            name: 'lk;'
                        }]
                    }, {
                        name: '毛衣',
                        children: [{
                            name: '23fs'
                        }, {
                            name: 'a子'
                        }, {
                            name: 'gdg'
                        }, {
                            name: 'lk;'
                        }]
                    }, {
                        name: '上衣',
                        children: [{
                            name: 'fs'
                        }, {
                            name: 'a子'
                        }, {
                            name: 'gdg'
                        }, {
                            name: 'lk;'
                        }]
                    }]
                }, {
                    name: '潮流就装',
                    children: [{
                        name: '就装',
                        children: [{
                            name: 'fs'
                        }, {
                            name: 'a子'
                        }, {
                            name: 'gdg'
                        }, {
                            name: 'lk;'
                        }]
                    }, {
                        name: '袜子',
                        children: [{
                            name: 'fs'
                        }, {
                            name: 'a子'
                        }, {
                            name: 'gdg'
                        }, {
                            name: 'lk;'
                        }]
                    }, {
                        name: '毛衣',
                        children: [{
                            name: 'fs'
                        }, {
                            name: 'a子'
                        }, {
                            name: 'gdg'
                        }, {
                            name: 'lk;'
                        }]
                    }, {
                        name: '上衣',
                        children: [{
                            name: 'fs'
                        }, {
                            name: 'a子'
                        }, {
                            name: 'gdg'
                        }, {
                            name: 'lk;'
                        }]
                    }]
                }],
                categoryOneIndex: '0',
                categoryTwoIndex: '0',
                categoryThreeIndex: '0',
                sizeSpec: [{
                    name: 'XS',
                    custom: false,
                    checked: false
                }, {
                    name: 'S',
                    custom: false,
                    checked: false
                }, {
                    name: 'M',
                    custom: false,
                    checked: false
                }, {
                    name: 'L',
                    custom: false,
                    checked: false
                }, {
                    name: 'XL',
                    custom: false,
                    checked: false
                }, {
                    name: '',
                    custom: true,
                    checked: false
                }],
                specsLabel: '0'
            }
        },
        methods: {
            specsButton(e) {
                var that = this
                that.specsLabel = e
            },
            //点击分类
            categoryOne: function (index) {
                this.categoryOneIndex = index
            },
            categoryTwo: function (idx) {
                this.categoryTwoIndex = idx
            },
            categoryThree: function (tindex) {
                this.categoryThreeIndex = tindex
            },
            //重新对属性颜色排序
            transSort: function (data) {
                let cache = {} // cache存储的键是eid，值是这个eid在indices数组中的下标
                let indices = [] // 数组中的每一个值是一个数组，数组中的每一个元素是原数组中相同eid的下标
                data.forEach((item, i) => {
                    let eid = item.color
                    let index = cache[eid]
                    if (index !== undefined) {
                        indices[index].push(i)
                    } else {
                        cache[eid] = indices.length
                        indices.push([i])
                    }
                })

                let result = []
                indices.forEach(item => {
                    item.forEach(index => {
                        result.push(data[index]) // 依次把index对应的元素data[index]添加进去即可
                    })
                })
                return result
            },
            sortRule(property) {
                return function (a, b) {
                    var value1 = a[property];
                    var value2 = b[property];
                    return value1 - value2;
                }
            },
            chooseSize: function (e, index) {
                var that = this;
                if (e == true) {
                    var mySize = that.sizeSpec[index].name;
                    that.sizeSpec[index].checked = true;
                    for (var i = 0; i < that.colorSpec.length; i++) {
                        if (that.colorSpec[i].checked == true) {
                            that.tableData.push({
                                color: that.colorSpec[i].name,
                                size: mySize,
                                price1: '',
                                price2: '',
                                price3: '',
                                price4: '',
                                price5: '',
                                code: '',
                                stock: '',
                                miniOrder: ''
                            });
                            that.tableData = that.transSort(that.tableData)
                        }
                    }
                    that.$nextTick(function () {
                        that.getSpanArr(that.tableData);
                    });
                } else {
                    var mySize = that.sizeSpec[index].name;
                    that.sizeSpec[index].checked = false;
                    let newArr = [];
                    that.tableData.forEach(function (value, key, arr) {
                        if (value.size != mySize) {
                            newArr.push(value)
                        }
                    });
                    that.tableData = newArr;
                    that.$nextTick(function () {
                        that.getSpanArr(that.tableData);
                    });
                }
            },
            //选取颜色（选取弹框中颜色）
            chooseColor: function (e, index) {
                var that = this
                console.log('选择颜色')
                console.log(e.target.innerText)
                console.log(e)
                this.colorSpec[index].show = false
                this.maskShow = false
                this.colorSpec[index].name = e.target.innerText
                if (index >= this.colorSpec.length - 1) {
                    this.colorSpec.push({
                        name: '',
                        show: false,
                        checked: false
                    });
                }
                if (this.colorSpec[index].checked == true) {
                    for (var i = 0; i < that.sizeSpec.length; i++) {
                        if (that.sizeSpec[i].checked == true) {
                            that.tableData.push({
                                color: e.target.innerText,
                                size: that.sizeSpec[i].name,
                                price1: '',
                                price2: '',
                                price3: '',
                                price4: '',
                                price5: '',
                                code: '',
                                stock: '',
                                miniOrder: ''
                            });
                        }
                    }
                    that.$nextTick(function () {
                        that.getSpanArr(that.tableData);
                    });
                }

            },
            //关闭颜色弹框
            closeMask() {
                var that = this
                for (let i = 0; i < that.colorSpec.length; i++) {
                    if (that.colorSpec[i].show == true) {
                        that.colorSpec[i].show = false
                    }
                }
                this.maskShow = false
            },
            //颜色输入框聚焦事件
            inputFocus: function (index) {
                this.colorSpec[index].show = true
                this.maskShow = true
            },
            //选取颜色（自己填写）
            inputChange: function (e, index) {
                this.colorSpec[index].name = e
                this.colorSpec[index].show = false
                if (index >= this.colorSpec.length - 1) {
                    this.colorSpec.push({
                        name: '',
                        show: false,
                        checked: false
                    });
                }

            },
            //自定义尺码
            sizeChange(e, index) {
                this.sizeSpec[index].name = e
                this.sizeSpec.push({
                    name: '',
                    custom: true,
                    checked: false
                })
            },
            tab: function (index) {
                for (var i = 0; i < this.list.length; i++) {
                    this.list[i].show = false;
                    if (i == index) {
                        this.list[index].show = true;
                    }
                }
            },
            //点击颜色复选框
            choose: function (e, index) {
                var that = this
                if (e == true) {
                    var myColor = that.colorSpec[index].name;
                    that.colorSpec[index].checked = true;
                    if (myColor) {
                        for (var i = 0; i < that.sizeSpec.length; i++) {
                            if (that.sizeSpec[i].checked == true) {
                                that.tableData.push({
                                    color: myColor,
                                    size: that.sizeSpec[i].name,
                                    price1: '',
                                    price2: '',
                                    price3: '',
                                    price4: '',
                                    price5: '',
                                    code: '',
                                    stock: '',
                                    miniOrder: ''
                                });
                            }
                        }
                        that.$nextTick(function () {
                            that.getSpanArr(that.tableData);
                        });
                    }


                } else {
                    // that.tableData.$remove(index)

                    var myColor = that.colorSpec[index].name;

                    let newArr = [];
                    that.tableData.forEach(function (value, key, arr) {
                        if (value.color != myColor) {
                            newArr.push(value)
                        }
                    });
                    that.tableData = newArr;

                    that.$nextTick(function () {
                        that.getSpanArr(that.tableData);
                    });


                }
            },
            getSpanArr(data) {
                this.spanArr = []
                for (var i = 0; i < data.length; i++) {
                    if (i === 0) {
                        this.spanArr.push(1);
                        this.pos = 0
                    } else {
                        // 判断当前元素与上一个元素是否相同
                        if (data[i].color === data[i - 1].color) {
                            this.spanArr[this.pos] += 1;
                            this.spanArr.push(0);
                        } else {
                            this.spanArr.push(1);
                            this.pos = i;
                        }
                    }
                }


            },
            objectSpanMethod({row, column, rowIndex, columnIndex}) {
                if (columnIndex === 0) {
                    const _row = this.spanArr[rowIndex];
                    const _col = _row > 0 ? 1 : 0;
                    return {
                        rowspan: _row,
                        colspan: _col
                    }
                }
            },
            // tableRowClassName({row,rowIndex}){
            //     let temArr = this.curRowArr
            //     for(let i=0;i<temArr.length;i++){
            //         if(rowIndex == temArr[i]){
            //             return 'row_class'
            //         }
            //     }
            // },
            // cellMouseCenter(row,column,cell,event){
            //     this.sameRowArr.forEach((arr,i)=>{
            //         if(arr.indexOf(row.index)!=-1){
            //             this.curRowArr = arr
            //         }
            //     })
            // },
            // cellMouseLeave(row,column,cell,event) {
            //     this.curRowArr = []
            // },

            //关闭弹窗
            handleClose(done) {
                this.dialogVisible = false
            },
            onchange(file, fileList) {
                var _this = this;
                var event = event || window.event;
                var file = event.target.files[0];
                var reader = new FileReader();
                //转base64
                reader.onload = function (e) {
                    _this.imageUrl = e.target.result //将图片路径赋值给src
                }
                reader.readAsDataURL(file);
            },

            submitUpload() {
                this.$refs.upload.submit();
            },
            // handleRemove(file, fileList) {
            //     console.log(file, fileList);
            // },
            handlePreview(file) {
                console.log(file);
            },
            handleLoadError(e) {
                const img = e.srcElement;
                this.imageUrl = this.errorLoadImg;  //  用加载失败的图片替代之
                img.onerror = null; //  清除错误:如果错误时加载时显示的图片出错，将会一直循环，所以我们必须清除掉错误，限制运行一次
            },
            querySearch(queryString, cb) {
                var restaurants = this.restaurants;
                var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
                // 调用 callback 返回建议列表的数据
                cb(results);
            },
            createFilter(queryString) {
                return (restaurant) => {
                    return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
                };
            },
            handleSelect(item) {
                console.log(item);
            },

            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            handleChange(val) {
                console.log(val);
            },
            next() {
                if (this.active++ > 2) this.active = 0;
            },
            loadAll() {
                return [
                    {"value": "三全鲜食（北新泾店）", "address": "长宁区新渔路144号"},
                    {"value": "Hot honey 首尔炸鸡（仙霞路）", "address": "上海市长宁区淞虹路661号"},
                    {"value": "新旺角茶餐厅", "address": "上海市普陀区真北路988号创邑金沙谷6号楼113"},
                    {"value": "泷千家(天山西路店)", "address": "天山西路438号"},
                    {"value": "胖仙女纸杯蛋糕（上海凌空店）", "address": "上海市长宁区金钟路968号1幢18号楼一层商铺18-101"},
                    {"value": "贡茶", "address": "上海市长宁区金钟路633号"},
                    {"value": "豪大大香鸡排超级奶爸", "address": "上海市嘉定区曹安公路曹安路1685号"},
                    {"value": "茶芝兰（奶茶，手抓饼）", "address": "上海市普陀区同普路1435号"},
                    {"value": "十二泷町", "address": "上海市北翟路1444弄81号B幢-107"},
                    {"value": "星移浓缩咖啡", "address": "上海市嘉定区新郁路817号"},
                    {"value": "阿姨奶茶/豪大大", "address": "嘉定区曹安路1611号"},
                    {"value": "新麦甜四季甜品炸鸡", "address": "嘉定区曹安公路2383弄55号"},
                    {"value": "Monica摩托主题咖啡店", "address": "嘉定区江桥镇曹安公路2409号1F，2383弄62号1F"},
                    {"value": "浮生若茶（凌空soho店）", "address": "上海长宁区金钟路968号9号楼地下一层"},
                    {"value": "NONO JUICE  鲜榨果汁", "address": "上海市长宁区天山西路119号"},
                    {"value": "CoCo都可(北新泾店）", "address": "上海市长宁区仙霞西路"},
                    {"value": "快乐柠檬（神州智慧店）", "address": "上海市长宁区天山西路567号1层R117号店铺"},
                    {"value": "Merci Paul cafe", "address": "上海市普陀区光复西路丹巴路28弄6号楼819"},
                    {"value": "猫山王（西郊百联店）", "address": "上海市长宁区仙霞西路88号第一层G05-F01-1-306"},
                    {"value": "枪会山", "address": "上海市普陀区棕榈路"},
                    {"value": "纵食", "address": "元丰天山花园(东门) 双流路267号"},
                    {"value": "钱记", "address": "上海市长宁区天山西路"},
                    {"value": "壹杯加", "address": "上海市长宁区通协路"},
                    {"value": "唦哇嘀咖", "address": "上海市长宁区新泾镇金钟路999号2幢（B幢）第01层第1-02A单元"},
                    {"value": "爱茜茜里(西郊百联)", "address": "长宁区仙霞西路88号1305室"},
                    {"value": "爱茜茜里(近铁广场)", "address": "上海市普陀区真北路818号近铁城市广场北区地下二楼N-B2-O2-C商铺"},
                    {"value": "鲜果榨汁（金沙江路和美广店）", "address": "普陀区金沙江路2239号金沙和美广场B1-10-6"},
                    {"value": "开心丽果（缤谷店）", "address": "上海市长宁区威宁路天山路341号"},
                    {"value": "超级鸡车（丰庄路店）", "address": "上海市嘉定区丰庄路240号"},
                    {"value": "妙生活果园（北新泾店）", "address": "长宁区新渔路144号"},
                    {"value": "香宜度麻辣香锅", "address": "长宁区淞虹路148号"},
                    {"value": "凡仔汉堡（老真北路店）", "address": "上海市普陀区老真北路160号"},
                    {"value": "港式小铺", "address": "上海市长宁区金钟路968号15楼15-105室"},
                    {"value": "蜀香源麻辣香锅（剑河路店）", "address": "剑河路443-1"},
                    {"value": "北京饺子馆", "address": "长宁区北新泾街道天山西路490-1号"},
                    {"value": "饭典*新简餐（凌空SOHO店）", "address": "上海市长宁区金钟路968号9号楼地下一层9-83室"},
                    {"value": "焦耳·川式快餐（金钟路店）", "address": "上海市金钟路633号地下一层甲部"},
                    {"value": "动力鸡车", "address": "长宁区仙霞西路299弄3号101B"},
                    {"value": "浏阳蒸菜", "address": "天山西路430号"},
                    {"value": "四海游龙（天山西路店）", "address": "上海市长宁区天山西路"},
                    {"value": "樱花食堂（凌空店）", "address": "上海市长宁区金钟路968号15楼15-105室"},
                    {"value": "壹分米客家传统调制米粉(天山店)", "address": "天山西路428号"},
                    {"value": "福荣祥烧腊（平溪路店）", "address": "上海市长宁区协和路福泉路255弄57-73号"},
                    {"value": "速记黄焖鸡米饭", "address": "上海市长宁区北新泾街道金钟路180号1层01号摊位"},
                    {"value": "红辣椒麻辣烫", "address": "上海市长宁区天山西路492号"},
                    {"value": "(小杨生煎)西郊百联餐厅", "address": "长宁区仙霞西路88号百联2楼"},
                    {"value": "阳阳麻辣烫", "address": "天山西路389号"},
                    {"value": "南拳妈妈龙虾盖浇饭", "address": "普陀区金沙江路1699号鑫乐惠美食广场A13"}
                ];
            },
            querySearchAsync(queryString, cb) {
                var restaurants = this.restaurants;
                var results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants;

                clearTimeout(this.timeout);
                this.timeout = setTimeout(() => {
                    cb(results);
                }, 3000 * Math.random());
            },
            createStateFilter(queryString) {
                return (state) => {
                    return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
                };
            },
            handleSelect(item) {
                console.log(item);
            }
        },
        mounted() {
            this.getSpanArr(this.tableData);
            this.restaurants = this.loadAll();
        }
    }

</script>

<style lang="scss" type="text/scss">
    @import '../../styles/color.scss';
    @import '../../styles/common.scss';
    //颜色选择
    .color_choose {
        position: absolute;
        top: 50px;
        left: 0;
        z-index: 99;
        background: $white01;
        line-height: 2;
        border: 1px solid #f2f2f2;
        .color_title {
            padding: 20px 10px;
            border-right: 1px solid #f2f2f2;
        }
        .color_cont {
            padding: 10px 20px 20px;
            ul {
                li {
                    margin: 0 20px;
                }
            }
        }
    }

    .color_bg {
        display: inline-block;
        margin-right: 5px;
        width: 10px;
        height: 10px;
    }

    .addProduct {
        padding: 10px;
        background: $white01;
    }

    .addProduct {
        .el-form {
            margin-top: 30px;
        }
    }

    .categoryUl {
        padding: 0 10px;
        margin: 10px auto;
        height: 200px;
        border: 1px solid #f2f2f2;
        line-height: 30px;
        li {
            cursor: pointer;
        }
    }

    .intro {
        .el-form-item__content {
            line-height: 1;
        }
    }

    .product_tit {
        padding: 10px;
        margin: 10px 0;
        background: $gray06;
    }

    .setMore {
        padding: 0 20px;
        .el-collapse-item__header {
            color: $baseColor;
        }
    }

    .specifications {
        .el-form-item {
            margin-bottom: 10px;
        }
    }

    .choosecCategory span {
        padding: 0 5px;
    }

    /*颜色规格*/
    .color_input {
        width: 200px;
    }

    .el-dialog__body {
        img {
            display: block;
            width: 90%;
            margin: 0 auto;
        }
    }

    .specifications {
        padding: 2%;
        background: $gray06;
        ul {
            li {
                margin: 10px 0;
            }
            &.size_product {
                li {
                    display: inline-block;
                    margin-right: 20px;
                }
            }
            &.batch_product {
                li {
                    display: inline-block;
                    input {
                        width: 80px;
                    }
                }
            }
        }
    }

    .spec_img {
        display: inline-block;
        width: 50px;
        height: 50px;
        background: $gray11;
        margin: 0 0 0 20px;
        padding: 0;
        border: 1px solid #ccc;
        line-height: 50px;
    }

    .selected {
        color: $white01;
        background: $baseColor;
    }

</style>