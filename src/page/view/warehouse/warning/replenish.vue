<template>
    <div class="shelf">
        <el-form ref="form" :model="addForm" hideRequiredSterisk="true" label-width="160px">
            <el-form-item required label="生成数量">
                <el-input :size="size" v-model="addForm.num" placeholder="生成数量" v-validate="'required|numeric'" data-vv-as="生成数量" name="form.num" :class="{'input': true, 'is-danger': errors.has('form.num') }" class="inputOne"></el-input>
                <span class="help is-danger">{{ errors.first('form.num') }}</span>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="addSubmit">确 定</el-button>
                <el-button @click="$router.back(-1)">返 回</el-button>
            </el-form-item>
        </el-form>
    </div>

</template>
<script>
    import util from '../../../../common/js/util'
    //import NProgress from 'nprogress'
    import {getUserListPage, removeUser, batchRemoveUser, editUser, addUser} from '../../../../api/api';
    export default {
        data() {
            return {
                addForm:{
                    num:''
                },
                dialogVisible:false,
                time:'',
                size: this.GLOBAL.size,
            }
        },
        methods: {
            addSubmit(){
                this.$validator.validateAll().then((result) => {
                    if(result == true){
                        this.$router.push({
                            path:'/shelf/code/index',
                            query:{
                                index:'2',
                                leaf:'0'
                            }
                        });

                    }
                })
            },
        },
        mounted() {
            this.headClass()
            // this.getUsers();
        }
    }

</script>


