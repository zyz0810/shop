<template>
    <div class="shelf">
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
                    <el-button @click="$router.back(-1)">返 回</el-button>
                </el-form-item>
            </el-form>
        </div>


</template>
<script>
    import quillEditor from './../../../../components/quill-editor.vue';
    export default {
        data() {
            return {
                content:'',
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
                filters: {
                    name: ''
                },
                imageUrl:[],
                form:''
            }
        },
        components:{
            quillEditor,
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


            addSubmit(){
                this.$router.go(-1);//返回上一层
            },

        },
        mounted() {
            this.headClass()
        }
    }

</script>