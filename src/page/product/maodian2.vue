<template>
    <div>
        <div class="all-title">
            全部应用
            <p class="fr">
                <span v-for="(item, index) in allMenuList" :key="item.id" :class="[index===activeMenu?'active':'']" @click="jump(index)">{{ item.name }}</span>
            </p>
        </div>
        <div id="scrollBox" class="applications-content">
            <div v-for="(val, index) in allMenuList" :key="val.id" class="all-list do-jump">
                <p class="applications-title">{{ val.name }}</p>
                <ul class="applications-list">
                    <li v-for="item in val.children" :key="item.id" class="applications-item" style="margin-bottom: 20px;">
                        <img src="">
                        <span>{{ item.name }}</span>
                        <!--<template v-if="showEdit">-->
                            <!--<i v-if="addOrRemove(item.menuCode)==0" class="el-icon-circle-plus add-btn" @click="addMenu(item.menuCode)" />-->
                            <!--<i v-if="addOrRemove(item.menuCode)==1" class="el-icon-remove remove-btn" @click="removeMenu(item.menuCode)" />-->
                        <!--</template>-->
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data(){
            return {
                allMenuList:[{

                    name:'导航1',
                    children:[{
                        id:0,
                        name:45455
                    },{
                        id:1,
                        name:45455
                    },{
                        id:2,
                        name:45455
                    },{
                        id:3,
                        name:45455
                    }]
                },{
                    name:'导航2',
                    children:[{
                        id:4,
                        name:45455
                    },{
                        id:5,
                        name:45455
                    },{
                        id:6,
                        name:45455
                    },{
                        id:7,
                        name:45455
                    }]
                },{
                    name:'导航3',
                    children:[{
                        id:8,
                        name:45455
                    },{
                        id:9,
                        name:45455
                    },{
                        id:10,
                        name:45455
                    },{
                        id:11,
                        name:45455
                    }]
                },{
                    name:'导航4',
                    children:[{
                        id:12,
                        name:45455
                    },{
                        id:13,
                        name:45455
                    },{
                        id:14,
                        name:45455
                    },{
                        id:15,
                        name:45455
                    }]
                }],
                activeMenu:0
            }
        },
        methods: {
            // 跳转
            jump(index) {
                console.log(index)
                this.activeMenu = index // 当前导航
                const jump = jQuery('.do-jump').eq(index)
                const scrollTop = jump.position().top + this.scrollBox.scrollTop // 获取需要滚动的距离
                console.log(scrollTop)
                // Chrome
                this.scrollBox.scrollTo({
                    top: scrollTop,
                    behavior: 'smooth' // 平滑滚动
                })
            }
        },
        watch: {

        },
        mounted() {
            var that = this
            // 获取滚动dom元素
            this.scrollBox = document.getElementById('scrollBox')
            console.log('haod')
            console.log(this.scrollBox )
            const jump = jQuery('.do-jump')
            const topArr = []
            for (let i = 0; i < jump.length; i++) {
                topArr.push(jump.eq(i).position().top)
            }
            // 监听dom元素的scroll事件
            this.scrollBox.addEventListener('scroll', () => {
                const current_offset_top = that.scrollBox.scrollTop
                for (let i = 0; i < topArr.length; i++) {
                    if (current_offset_top <= topArr[i]) { // 根据滚动距离判断应该滚动到第几个导航的位置
                        that.activeMenu = i
                        break
                    }
                }
            }, true)
        }
    }
</script>

<style>
    * {
        padding: 0;
        margin: 0;
    }
    .nav1 {
        display: block;
        width: 40px;
        height: 40px;
        text-align: center;
        line-height: 40px;
        background: #eee;
        margin: 10px 0;
    }
    .current {
        color: #fff;
        background: red;
    }
</style>