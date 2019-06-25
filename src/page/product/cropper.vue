<template>
    <div>
        <div class="cropper-content">
            <!-- 剪裁框 -->
            <div class="cropper">
                <vueCropper ref="cropper" :img="option.img" :outputSize="option.size" :outputType="option.outputType" :info="true" :full="option.full" :canMove="option.canMove" :canMoveBox="option.canMoveBox" :original="option.original" :autoCrop="option.autoCrop" :autoCropWidth="option.autoCropWidth" :autoCropHeight="option.autoCropHeight" :fixedBox="option.fixedBox" @realTime="realTime" :fixed="option.fixed" :fixedNumber="fixedNumber"></vueCropper>
                <!-- <vueCropper ref="cropper" :img="option.img" :outputSize="option.size" :outputType="option.outputType"></vueCropper> -->
            </div>
            <!-- 预览框 -->
            <div class="show-preview" :style="{'width': '500px', 'height': '400px',  'overflow': 'hidden', 'margin': '0 25px', 'display':'flex', 'align-items' : 'center'}">
                <div :style="previews.div" class="preview">
                    <img :src="previews.url" :style="previews.img">
                </div>
            </div>
        </div>
        <div class="footer-btn">
            <!-- 缩放旋转按钮 -->
            <div class="scope-btn">
                <el-button :size="size" type="primary" icon="el-icon-zoom-in" @click="changeScale(1)"></el-button>
                <el-button :size="size" type="primary" icon="el-icon-zoom-out" @click="changeScale(-1)"></el-button>
                <el-button :size="size" type="primary" @click="rotateLeft">逆时针旋转</el-button>
                <el-button :size="size" type="primary" @click="rotateRight">顺时针旋转</el-button>
            </div>
            <!-- 确认上传按钮 -->
            <div class="upload-btn">
                <!-- <el-button type="primary" @click="uploadImg('blob')">上传</el-button> -->
                <el-button :size="size" type="primary" :disabled="isDisabled" @click="uploadImg('base64')">上传</el-button>
            </div>
        </div>
    </div>
</template>

<script>
    import { VueCropper } from 'vue-cropper';
    // console.log(VueCropper);
    export default {
        data () {
            return {
                size:this.GLOBAL.size,
                previews: {}, // 预览数据
                option: {
                    img: '', // 裁剪图片的地址  (默认：空)
                    outputSize: 1, // 裁剪生成图片的质量  (默认:1)
                    full: false, // 是否输出原图比例的截图 选true生成的图片会非常大  (默认:false)
                    outputType: 'png', // 裁剪生成图片的格式  (默认:jpg)
                    canMove: true, // 上传图片是否可以移动  (默认:true)
                    original: false, // 上传图片按照原始比例渲染  (默认:false)
                    canMoveBox: true, // 截图框能否拖动  (默认:true)
                    autoCrop: true, // 是否默认生成截图框  (默认:false)
                    autoCropWidth: 480, // 默认生成截图框宽度  (默认:80%)
                    autoCropHeight: 320, // 默认生成截图框高度  (默认:80%)
                    fixedBox: false, // 固定截图框大小 不允许改变  (默认:false)
                    fixed: true, // 是否开启截图框宽高固定比例  (默认:true)
                    fixedNumber: [1.5, 1], // 截图框比例  (默认:[1:1])
                    enlarge: 1
                },
                isDisabled: false,
                downImg: '#'
            };
        },
        props: ['imgFile', 'fixedNumber'],
        methods: {
            changeScale (num) {
                // 图片缩放
                num = num || 1;
                this.$refs.cropper.changeScale(num);
            },
            rotateLeft () {
                // 向左旋转
                this.$refs.cropper.rotateLeft();
            },
            rotateRight () {
                // 向右旋转
                this.$refs.cropper.rotateRight();
            },
            Update () {
                // this.file = this.imgFile
                this.option.img = this.imgFile.url;
            },
            realTime (data) {
                // 实时预览
                this.previews = data;
            },
            uploadImg (type) {
                // 将剪裁好的图片回传给父组件
                event.preventDefault();
                this.isDisabled = true;
                let that = this;
                if (type === 'blob') {
                    this.$refs.cropper.getCropBlob(data => {
                        that.$emit('upload', data);
                    });
                } else {
                    this.$refs.cropper.getCropData(data => {
                        that.$emit('upload', data);
                    });
                }
            }
        },
        components: { VueCropper }
    };
</script>