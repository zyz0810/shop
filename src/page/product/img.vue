<template>
    <div class="plublish-goods">
        <el-form :model="formValidate" :rules="ruleValidate" ref="formValidate" label-width="100px" class="demo-ruleForm">

            <el-form-item label="商品附图" prop="subImages">
                <div class="list-img-box">
                    <div class="upload-btn" style="width: 150px;height: 120px;" @click="uploadPicture('subimg',1)">
                        <i class="el-icon-plus" style="font-size: 30px;"></i>
                        <i calss="text">商品附图</i>
                    </div>
                </div>
                <input type="hidden" :size="size" v-model="formValidate.subImages" placeholder="请添加商品附图">
            </el-form-item>

        </el-form>

        <el-dialog
                title="选择图片"
                :visible.sync="cropperModel"
                width="800px"
                center
                @open="show()">
            <vue-cropper :Options="cropperOption" :Name="cropperName"  ref="child"></vue-cropper>
        </el-dialog>

    </div>
</template>
<script>

    import vueCropper from './../../components/vue-cropper.vue';

    export default {
        data() {
            return {
                size:this.GLOBAL.size,
                //裁切图片参数
                cropperModel:false,
                cropperName:'',//裁切图片上传名字
                cropperOption: {
                    img: '',
                    size: 1,
                    full: true,//新增输出原图比例截图 props名full
                    outputType: 'png',
                    canMove: true,
                    original: false,
                    canMoveBox: false,
                    autoCrop: true,
                    autoCropWidth: 200,
                    autoCropHeight: 200,
                    fixedBox: true
                },
                formValidate: {
                    subImages: '',//附图
                },
            };
        },

        methods: {
            show(){
                this.$nextTick(function () {
                    console.log('00:'+this.$refs)
                    this.$refs.child.changeCropBox(200,200);//裁切大小
                })
            },
            uploadPicture(name,num){
                this.cropperName = name;
                this.cropperModel = true;
            },
        },
        components:{
            vueCropper,
        }
    }
</script>
<style scoped lang="scss" type="text/scss">
    .plublish-goods{
        padding: 10px;
    .item-container{
        display: flex;
        max-width: 600px;
    .item-content{
        display: flex;
    >div{
        margin-left:20px;
    }
    >div:first-child{
        margin: 0;
    }
    .ivu-input-wrapper{
        width: auto;
    }
    .check-box{
        width: 80px;
        display: inline-block;
    }
    }
    }
    }
    .list-img{
        display: flex;
    .item{
    img{
        width: 100%;
        height: 100%;
    }
    }
    }
    .list-img-box{
        display: flex;
        flex-wrap:wrap;
    .upload-list{
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        background: #cccccc;
        margin-right: 10px;
        margin-bottom: 10px;
        border-radius: 10px;
        overflow: hidden;
        box-shadow: 0px 0px 2px #cccccc;
    img{
        width: 100%;
        height: 100%;
    }
    .upload-list-cover{
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        padding: 0 40px;
        align-items: center;
        background: rgba(0,0,0,.6);
        opacity: 0;
        transition: opacity 1s;
    i{
        color: #fff;
        font-size: 20px;
        cursor: pointer;
        display: none;
        transition: display 1s;
    }
    }
    }
    .upload-list:hover{
    .upload-list-cover{
        opacity: 1;
    i{
        display: block;
    }
    }
    }
    .upload-btn{
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -ms-flex-wrap: wrap;
        flex-wrap: wrap;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        justify-content: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        /* background-color: #cccccc; */
        border: 1px solid #cccccc;
        border-radius: 5px;
        overflow: hidden;
        box-shadow: 0px 0px 1px #cccccc;
    }
    .upload-btn:hover {
        border: 1px solid #69b7ed;
    }
    .upload-btn i{
        margin: 5px;
    }
    }
    .video-box{
        position: relative;
        max-width: 360px;
    .container{
        width: auto;
    }
    .del-btn{
        position: absolute;
        right: -85px;
        bottom:0;
    }
    }

</style>
