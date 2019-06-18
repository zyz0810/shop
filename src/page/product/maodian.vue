<template>
    <div class="container">
        <el-steps
                direction="vertical"
                space="2.5rem"
                finish-status="wait"
                :active="activeStep">
            <el-step
                    v-for="(item, index) in steps"
                    :key="index"
                    icon=" "
                    :title="item.title"
                    @click.native="jump(index)">
            </el-step>
        </el-steps>

        <div>
            <div class="step-jump"></div>
            <div style="height: 200px;">dasdasdadsds</div>
            <div class="step-jump"></div>
            <div style="height: 200px;">dasdasdadsds</div>
            <div class="step-jump"></div>
            <div style="height: 200px;">dasdasdadsds</div>
            <div class="step-jump"></div>
            <div style="height: 200px;">dasdasdadsds</div>
            <div class="step-jump"></div>
            <div style="height: 200px;">dasdasdadsds</div>
            <div class="step-jump"></div>
            <div style="height: 200px;">dasdasdadsds</div>
        </div>


    </div>
</template>
<script>
    export default {
        data(){
            return {
                activeStep: 1,
                steps:[{
                    title:'1111 ',
                },{
                    title:'2222 ',
                },{
                    title:'3333 ',
                },{
                    title:'4444 ',
                },]
            }
        },
        methods: {
            jump (index) {
                // 用 class="step-jump" 添加锚点
                let jump = document.querySelectorAll('.step-jump')
                let total = jump[index].offsetTop
                this.currentIndex = index
                this.$emit('viewScroll', total, index)
            },
            onScroll (index) {
                let _article = document.querySelectorAll('.step-jump')
                let arr = []
                _article.forEach((item, index) => {
                    if (this.scrollTop >= item.offsetTop) {
                        this.activeStep = index
                        arr.push(index)
                    }
                })
                let maxIndex = Math.max.apply(null, arr)
                if (index !== undefined && index > maxIndex) {
                    this.activeStep = index
                }
            },
        },
        // 监听滚动条滚动
        props: ['scrollTop'],
        watch: {
            scrollTop (val) {
                this.onScroll()
                this.pageTop = val
            }
        },

        mounted() {

        }
    }
</script>

