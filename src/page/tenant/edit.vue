<template>
    <el-form ref="form" :model="form" hideRequiredSterisk="true" label-width="150px" class="tenantInput"
             @submit.prevent="onSubmit" style="min-width:600px;">
        <el-form-item required label="店铺名称">
            <el-input :size="size" v-model="form.name" clearable class="inputOne"></el-input>
        </el-form-item>
        <el-form-item required label="联系人">
            <el-input :size="size" :class="{'input': true, 'is-danger': errors.has('email') }" v-model="form.person"
                      v-validate="'required|email'" name="email" type="text" clearable class="inputOne"></el-input>
            <span class="help is-danger">{{ errors.first('email') }}</span>
        </el-form-item>
        <el-form-item required label="联系电话">
            <!--<el-input v-model="form.phone" type="number" oninput="if(value.length>11)value=value.slice(0,11)"-->
            <!--clearable></el-input>-->
            <el-input :size="size" v-validate="'required|phone'" name="phone" type="number" placeholder="Mobile"
                      v-model="form.phone" :class="{'input': true, 'is-danger': errors.has('phone') }"
                      class="inputOne"></el-input>
            <span class="help is-danger">{{ errors.first('phone') }}</span>
        </el-form-item>
        <el-form-item label="QQ">
            <el-input :size="size" v-model="form.qq" class="inputOne"></el-input>
        </el-form-item>
        <el-form-item label="绑定域名">
            <el-input :size="size" v-model="form.url" class="inputOne" v-validate="{url: {require_protocol: true }}"
                      data-vv-as="field" name="url_field"></el-input>
            <span>如：www.tiaohuo.com</span>
        </el-form-item>
        <el-form-item :size="size" required label="店铺简介">
            <!--<quill-editor-->
            <!--class="info-editor"-->
            <!--v-model="content"-->
            <!--ref="VueQuillEditor">-->
            <!--</quill-editor>-->
            <quillEditor :Content="content"></quillEditor>
        </el-form-item>
        <el-form-item required label="店铺地址">
            <el-input :size="size" v-model="form.address" class="inputOne"></el-input>
        </el-form-item>
        <el-form-item required label="所属地区">
            <el-select :size="size" v-model="form.area" placeholder="请选择所属地区">
                <el-option label="安徽" value="shanghai"></el-option>
                <el-option label="江苏" value="beijing"></el-option>
            </el-select>
        </el-form-item>

        <el-form-item required label="主营类目">
            <el-select :size="size" v-model="form.category" placeholder="请选择主营类目">
                <el-option label="零食饮料" value="category01"></el-option>
                <el-option label="商品百货" value="category02"></el-option>
            </el-select>
        </el-form-item>

        <!--<el-form-item label="活动时间">-->
        <!--<el-col :span="11">-->
        <!--<el-date-picker type="date" placeholder="选择日期" v-model="form.date1"-->
        <!--style="width: 100%;"></el-date-picker>-->
        <!--</el-col>-->
        <!--<el-col class="line" :span="2">-</el-col>-->
        <!--<el-col :span="11">-->
        <!--<el-time-picker type="fixed-time" placeholder="选择时间" v-model="form.date2"-->
        <!--style="width: 100%;"></el-time-picker>-->
        <!--</el-col>-->
        <!--</el-form-item>-->
        <el-form-item required label="店铺头像" class="uploadImg">
            <el-input :size="size" v-model="form.headImg" class="fl inputOne"></el-input>
            <el-upload class="upload-demo fl" action="https://jsonplaceholder.typicode.com/posts/">
                <el-button :size="size">选择文件</el-button>
            </el-upload>
            <el-button :size="size" class="fl">查看</el-button>
        </el-form-item>
        <el-form-item label="门店招牌" class="uploadImg">
            <el-input :size="size" v-model="form.shopSign" class="fl inputOne"></el-input>
            <el-upload class="upload-demo fl" action="https://jsonplaceholder.typicode.com/posts/">
                <el-button :size="size">选择文件</el-button>
            </el-upload>
            <el-button :size="size" class="fl">查看</el-button>
        </el-form-item>
        <el-form-item label="全景图" required class="uploadImg">
            <el-input :size="size" v-model="form.panorama" class="fl inputOne"></el-input>
            <el-upload class="upload-demo fl" action="https://jsonplaceholder.typicode.com/posts/">
                <el-button :size="size">选择文件</el-button>
            </el-upload>
            <el-button :size="size" class="fl">查看</el-button>
        </el-form-item>
        <el-form-item label="货架套餐首页banner" class="uploadImg">
            <el-input v-model="form.shelf" class="fl inputOne"></el-input>
            <el-upload class="upload-demo fl" action="https://jsonplaceholder.typicode.com/posts/">
                <el-button :size="size">选择文件</el-button>
            </el-upload>
            <el-button :size="size" class="fl">查看</el-button>
        </el-form-item>
        <el-form-item label="分享海报" class="uploadImg">
            <el-input v-model="form.share" class="fl inputOne"></el-input>
            <el-upload class="upload-demo fl" action="https://jsonplaceholder.typicode.com/posts/">
                <el-button :size="size">选择文件</el-button>
            </el-upload>
            <el-button :size="size" class="fl">查看</el-button>
        </el-form-item>
        <el-form-item label="小程序主色">
            <el-color-picker :size="size" v-model="form.color2" @change="myColor" class="fl"></el-color-picker>
            <el-input :size="size" v-model="form.color2" class="myColor fl" disabled></el-input>
        </el-form-item>


        <el-form-item required label="企业名称">
            <el-input :size="size" v-model="form.name" class="inputOne"></el-input>
        </el-form-item>

        <el-form-item label="营业执照" class="uploadImg">
            <el-input :size="size" v-model="form.share" class="fl inputOne"></el-input>
            <el-upload class="upload-demo fl" action="https://jsonplaceholder.typicode.com/posts/">
                <el-button :size="size">选择文件</el-button>
            </el-upload>
            <el-button :size="size" class="fl">查看</el-button>
        </el-form-item>
        <el-form-item label="是否支持开据发票">
            <el-radio-group :size="size" v-model="form.resource">
                <el-radio label="不支持"></el-radio>
                <el-radio label="支持"></el-radio>
            </el-radio-group>
        </el-form-item>

        <el-form-item label="企业补充资料" style="height: 200px;">
            <!--<quill-editor-->
            <!--class="info-editor"-->
            <!--v-model="content"-->
            <!--ref="VueQuillEditor"-->
            <!--:options="editorOption" style="height: 120px;">-->
            <!--</quill-editor>-->
            <quillEditor :Content="content"></quillEditor>
        </el-form-item>
        <el-form-item label="我要加盟" style="height: 200px;">
            <!--<quill-editor-->
            <!--class="info-editor"-->
            <!--v-model="content"-->
            <!--ref="VueQuillEditor"-->
            <!--style="height: 120px;">-->
            <!--</quill-editor>-->
            <quillEditor :Content="content"></quillEditor>
        </el-form-item>

        <!--<el-form-item label="即时配送">-->
        <!--<el-switch on-text="" off-text="" v-model="form.delivery"></el-switch>-->
        <!--</el-form-item>-->
        <el-form-item label="">
            <el-checkbox-group :size="size" v-model="form.type">
                <el-checkbox label="7天退货" name="type"></el-checkbox>
                <el-checkbox label="担保交易" name="type"></el-checkbox>
                <el-checkbox label="货到付款" name="type"></el-checkbox>
                <el-checkbox label="是否打烊" name="type"></el-checkbox>
            </el-checkbox-group>
        </el-form-item>

        <!--<el-form-item label="活动形式">-->
        <!--<el-input type="textarea" v-model="form.desc"></el-input>-->
        <!--</el-form-item>-->
        <el-col class="form_foot tc" :xs="24" :sm="24" :md="24" :lg="16" :xl="16">
            <el-button :size="size" type="primary" @click="onSubmit()">立即创建</el-button>
            <el-button :size="size" @click.native.prevent>取消</el-button>
        </el-col>
    </el-form>
</template>

<script>
    import quillEditor from './../../components/quill-editor.vue';

    export default {
        data() {
            return {
                size: this.GLOBAL.size,
                form: {
                    name: '',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: '',
                    color2: null,
                    phone: ''
                },
                phoneFocus: false,
                content: '', //富文本内容

            }
        },
        components: {
            quillEditor
        },
        mounted() {
            // this.$addQuillTitle();
        },
        methods: {
            myColor(res) {
                console.log('颜色')
                console.log(res)
                this.data.form.color2 = res
            },
            onSubmit() {

                this.$validator.validateAll().then((result) => {
                    if (result) {
                        // // eslint-disable-next-line
                        // alert('Form Submitted!');
                        return;
                    }
                    // alert('Correct them errors!');
                });
            }
        }
    }

</script>