// import Login from './page/Login.vue'
import NotFound from './page/404.vue'
import Home from './page/Home.vue'
import Main from './page/Main.vue'
import Table from './page/nav1/Table.vue'
import Form from './page/nav1/Form.vue'
import user from './page/nav1/user.vue'
import Page4 from './page/nav2/Page4.vue'
import Page5 from './page/nav2/Page5.vue'
import Page6 from './page/nav3/Page6.vue'
import echarts from './page/charts/echarts.vue'
//店铺
import tenantEdit from './page/tenant/edit.vue'
import tenantBind from './page/tenant/bind.vue'
import index from './page/home/index.vue'
//空二级导航框架
import tenant from './page/tenant/tenant.vue'
import shop from './page/tenant/shop.vue'

//营销工具
import coupon from './page/marketing/coupon/coupon.vue'//优惠券
import assembleList from './page/marketing/assemble/list.vue'//拼团列表
import postage from './page/marketing/postage/index.vue'//拼团列表
//库存
import warehouseQuery from './page/warehouse/index/index.vue'//库存查询
import warehouseInput from './page/warehouse/manage/put.vue'//入库单
import warehouseOut from './page/warehouse/manage/out.vue'//出库单
import warehouseManage from './page/warehouse/warehouse/manage.vue'//仓库管理
import warehousePrime from './page/warehouse/warehouse/prime.vue'//仓库管理

//货架管理
import shelfManage from './page/shelf/manage.vue'//货架管理
import shelfPackages from './page/shelf/packages.vue'//货架套餐
import shelfOrder from './page/shelf/order.vue'//货架套餐订单
import shelfExcitation from './page/shelf/excitation.vue'//货架销售激励


//商品
import addProduct from './page/product/add.vue' //新品发布
import img from './page/product/img.vue'
import maodian from './page/product/maodian.vue'

let routes = [
    // {
    //     path: '/login',
    //     component: Login,
    //     name: '',
    //     hidden: true
    // },
    {
        path: '/index',
        component: index,
        iconCls: 'el-icon-message',//图标样式class
        name: '概况',
        leaf:true,
        hidden: false,
        // children: [
        //     { path: '/index', component: index,leaf: true, name: '概23况' }
        // ]
    },
    {
        path: '/',
        component: tenant,
        name: '店铺',
        iconCls: 'el-icon-message',//图标样式class
        leaf:false,
        children: [
            { path: '/tenant',
                component: tenant,
                leaf: false,
                name: '店铺管理',
                children: [
                    { path: '/tenant/edit', component: tenantEdit, name: '店铺11' },
                    { path: '/tenant/table', component: Table, name: '店铺22' },
                ]},
            { path: '/table', component: Table,leaf: false, name: '运费设置',
                children: [
                    { path: '/yunfei/edit', component: tenantEdit, name: '运费11' },
                    { path: '/yunfei/table', component: Table, name: '运费22' },
                ] },
            { path: '/shop', component: shop,leaf: true, name: '门店管理' },
            { path: '/user', component: user,leaf: true, name: '员工管理' },
            { path: '/tenant/bind', component: tenantBind,leaf: true, name: '分润管理' },
            { path: '/user2', component: Table,leaf: true, name: '购物屏管理' },
            { path: '/user3', component: Table,leaf: true, name: '分润模板' }
        ]
    },
    {
        path: '/',
        component: tenant,
        name: '货架',
        iconCls: 'fa fa-bar-chart',
        children: [
            { path: '/shelf/index', component: shelfManage,leaf: true, name: '货架管理' },
            { path: '/shelf/packages', component: shelfPackages,leaf: true, name: '货架套餐' },
            { path: '/shelf/order', component: shelfOrder,leaf: true, name: '货架套餐订单' },
            { path: '/shelf/excitation', component: shelfExcitation,leaf: true, name: '销售激励' },
            { path: '/shelf5', component: echarts,leaf: true, name: '货架统计' },
            { path: '/shelf6', component: echarts,leaf: true, name: '货架二维码管理' }
        ]
    },
    {
        path: '/',
        component: tenant,
        name: '商品',
        iconCls: 'fa fa-bar-chart',
        children: [
            { path: '/echarts', component: echarts,leaf: true, name: '商品分类' },
            { path: '/product/add', component: addProduct,leaf: true, name: '发布新品' },
            { path: '/echarts2', component: img,leaf: true, name: '商品列表' },
            { path: '/echarts3', component: maodian,leaf: true, name: '商品库' },
            { path: '/echarts4', component: echarts,leaf: true, name: '网店商品' },
            { path: '/echarts5', component: echarts,leaf: true, name: '门店商品' },
            { path: '/echarts6', component: echarts,leaf: true, name: '评论管理' },
            { path: '/echarts7', component: echarts,leaf: true, name: '众卖推荐' },
            { path: '/echarts8', component: echarts,leaf: true, name: '推广文章' },
            { path: '/echarts9', component: echarts,leaf: true, name: '文章分类' },
            { path: '/echarts10', component: echarts,leaf: true, name: '文章管理' }
        ]
    },
    {
        path: '/',
        component: tenant,
        name: '库存',
        iconCls: 'fa fa-bar-chart',
        children: [
            { path: '/warehouse', component: tenant,leaf: false, name: '库存查询',children:[
                {path: '/warehouse/index', component: warehouseQuery,leaf: false, name: '库存查询'}
                ]},
            { path: '/warehouse/manage', component: tenant,leaf: false, name: '库存管理',children:[
                    {path: '/warehouse/put', component: warehouseInput,leaf: false, name: '入库单'},
                    {path: '/warehouse/out', component: warehouseOut,leaf: false, name: '出库单'},
                ]},
            { path: '/warehouse/warehouse', component: tenant,leaf: false, name: '仓库管理' ,children:[
                    {path: '/warehouse/warehouse', component: warehouseManage,leaf: false, name: '仓库管理'},
                    {path: '/warehouse/prime', component: warehousePrime,leaf: false, name: '期初库存'},
                ]}
        ]
    },
    {
        path: '/',
        component: tenant,
        name: '采购',
        iconCls: 'fa fa-bar-chart',
        children: [
            { path: '/echarts', component: echarts,leaf: true, name: '商品分类' },
            { path: '/echarts1', component: echarts,leaf: true, name: '发布新品' },
            { path: '/echarts2', component: echarts,leaf: true, name: '商品列表' },
            { path: '/echarts3', component: echarts,leaf: true, name: '商品库' },
            { path: '/echarts4', component: echarts,leaf: true, name: '网店商品' },
            { path: '/echarts5', component: echarts,leaf: true, name: '门店商品' },
            { path: '/echarts6', component: echarts,leaf: true, name: '评论管理' },
            { path: '/echarts7', component: echarts,leaf: true, name: '众卖推荐' },
            { path: '/echarts8', component: echarts,leaf: true, name: '推广文章' },
            { path: '/echarts9', component: echarts,leaf: true, name: '文章分类' },
            { path: '/echarts10', component: echarts,leaf: true, name: '文章管理' }
        ]
    },
    {
        path: '/',
        component: tenant,
        name: '订单',
        iconCls: 'fa fa-id-card-o',
        children: [
            { path: '/page4', component: Table,leaf: false, name: '订单管理',
                children: [
                    { path: '/1', component: Table, name: '订单1' },
                    { path: '/2', component: Table, name: '订单2' },
                    { path: '/3', component: Table, name: '订单3' }
                ]},
            { path: '/page5', component: Table,leaf: true, name: '退货管理' },
            { path: '/page6', component: Table,leaf: true, name: '往来结算' }
        ]
    },
    {
        path: '/',
        component: tenant,
        name: '客户',
        iconCls: 'fa fa-bar-chart',
        children: [
            { path: '/customer1', component: echarts,leaf: true, name: '我的供应商' },
            { path: '/customer2', component: echarts,leaf: true, name: '我的经销商' },
            { path: '/customer3', component: echarts,leaf: true, name: '客户管理' },
            { path: '/customer4', component: echarts,leaf: true, name: '会员卡管理' },
            { path: '/customer5', component: echarts,leaf: true, name: '我的会员' },
            { path: '/customer6', component: echarts,leaf: true, name: '会员卡充值活动' }
        ]
    },
    {
        path: '/',
        component: tenant,
        name: '数据',
        iconCls: 'fa fa-bar-chart',
        children: [
            { path: '/customer1', component: echarts,leaf: true, name: '我的供应商' },
            { path: '/customer2', component: echarts,leaf: true, name: '我的经销商' },
            { path: '/customer3', component: echarts,leaf: true, name: '客户管理' },
            { path: '/customer4', component: echarts,leaf: true, name: '会员卡管理' },
            { path: '/customer5', component: echarts,leaf: true, name: '我的会员' },
            { path: '/customer6', component: echarts,leaf: true, name: '会员卡充值活动' }
        ]
    },
    {
        path: '/',
        component: tenant,
        name: '资产',
        iconCls: 'fa fa-address-card',
        leaf: false,//true只有一个节点
        children: [
            { path: '/page16', component: Table,leaf: true, name: '销售明细' },
            { path: '/page7', component: Table,leaf: true, name: '销售统计' },
            { path: '/page8', component: Table,leaf: true, name: '退货明细' },
            { path: '/page9', component: Table,leaf: true, name: '退货统计' },
            { path: '/page10', component: Table,leaf: true, name: '收银明细' },
            { path: '/page11', component: Table,leaf: true, name: '收银统计' },
            { path: '/page12', component: Table,leaf: true, name: '我的推广' },
            { path: '/page13', component: Table,leaf: true, name: '会员卡明细' },
            { path: '/page14', component: Table,leaf: true, name: '会员卡统计' },
            { path: '/page15', component: Table,leaf: true, name: '经营统计' }
        ]
    },
    {
        path: '/marketing',
        component: tenant,
        name: '营销',
        iconCls: 'fa fa-bar-chart',
        children: [
            { path: '/coupon', component: coupon,leaf: true, name: '代金券' },
            { path: '/assemble', component: assembleList,leaf: true, name: '拼团' },
            { path: '/postage', component: postage,leaf: true, name: '满包邮' },
            { path: '/customer10', component: echarts,leaf: true, name: '满配送' },
            { path: '/customer11', component: echarts,leaf: true, name: '限时折扣' },
            { path: '/customer12', component: echarts,leaf: true, name: '买赠搭配' },
            { path: '/customer13', component: echarts,leaf: true, name: '优惠买单' },
            { path: '/customer14', component: echarts,leaf: true, name: '商品搭配' },
            { path: '/customer15', component: echarts,leaf: true, name: '消息推送' },
            { path: '/customer16', component: echarts,leaf: true, name: '礼品卡明细' },
            { path: '/customer17', component: echarts,leaf: true, name: '礼品卡模板' }
        ]
    },
    {
        path: '/set',
        component: index,
        iconCls: 'el-icon-message',//图标样式class
        name: '设置',
        leaf:false,
        hidden: false,
        children: [
            { path: '/set/index', component: index,leaf: true, name: '设置中心' },
        ]
    },
    {
        path: '/404',
        component: NotFound,
        iconCls: 'el-icon-message',//图标样式class
        name: '帮助',
        leaf:true,
        hidden: false
    },
    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    }
];

export default routes;