<template>
    <el-form ref="form" :model="form" hideRequiredSterisk="true" label-width="80px" class="tenantInput"
             @submit.prevent="onSubmit" style="min-width:600px;">
        <el-form-item required label="券的面额">
            <el-input :size="size" v-model="form.name" clearable class="inputOne"></el-input>
        </el-form-item>
        <el-form-item required label="最低消费">
            <el-input  :size="size":class="{'input': true, 'is-danger': errors.has('email') }" v-model="form.person" v-validate="'required|email'" name="email" type="text" clearable class="inputOne"></el-input>
            <span class="help is-danger">{{ errors.first('email') }}</span>
        </el-form-item>
        <el-form-item required label="券的库存">
            <el-input :size="size" v-validate="'required|phone'" name="phone" type="number" placeholder="Mobile" v-model="form.phone" :class="{'input': true, 'is-danger': errors.has('phone') }" class="inputOne"></el-input>
            <span class="help is-danger">{{ errors.first('phone') }}</span>
        </el-form-item>
        <el-form-item label="领券限制">
            <el-input :size="size" v-model="form.qq" class="inputOne"></el-input>
        </el-form-item>
        <el-form-item label="开始时间">
            <el-input :size="size" v-model="form.url" class="inputOne" v-validate="{url: {require_protocol: true }}" data-vv-as="field" name="url_field"></el-input>
        </el-form-item>

        <el-form-item required label="结束时间">
            <el-input :size="size" v-model="form.address" class="inputOne"></el-input>
        </el-form-item>


        <el-form-item label="分享文案">
            <el-input :size="size" type="textarea" v-model="form.desc"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button :size="size" type="primary" @click="onSubmit()">立即创建</el-button>
            <el-button :size="size" @click.native.prevent>取消</el-button>
        </el-form-item>
    </el-form>

</template>

<script>
    export default {
        data() {
            return {
                size:this.GLOBAL.size,
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


            }
        },
        mounted(){

        },
        methods: {
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