<template>
    <div>
        <quill-editor
                class="info-editor"
                v-model="content"
                ref="VueQuillEditor"
                :options="editorOption">
        </quill-editor>


        <el-table :data="arr" :header-row-class-name="headClass">
            <el-table-column property="code" label="设备ID" align="center" width="160"></el-table-column>
            <el-table-column property="type" label="设备型号" align="center" width="160"></el-table-column>
        </el-table>

        <el-button @click="getExcel(arr)">导出</el-button>

        <el-upload
                class="upload-demo"
                action=""
                :on-change="handleChange"
                :on-exceed="handleExceed"
                :on-remove="handleRemove"
                :file-list="fileListUpload"
                :limit="limitUpload"
                accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
                :auto-upload="false">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只 能 上 传 xlsx / xls 文 件</div>
        </el-upload>


    </div>
</template>
<script>

    // 工具栏配置
    const toolbarOptions = [
        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
        ['blockquote', 'code-block'],
        [{'header': 1}, {'header': 2}],               // custom button values
        [{'list': 'ordered'}, {'list': 'bullet'}],
        [{'script': 'sub'}, {'script': 'super'}],      // superscript/subscript
        [{'indent': '-1'}, {'indent': '+1'}],          // outdent/indent
        [{'direction': 'rtl'}],                         // text direction
        [{'size': ['small', false, 'large', 'huge']}],  // custom dropdown
        [{'header': [1, 2, 3, 4, 5, 6, false]}],
        [{'color': []}, {'background': []}],          // dropdown with defaults from theme
        [{'font': []}],
        [{'align': []}],
        ['link', 'image', 'video'],
        ['clean']                                         // remove formatting button
    ]

    export default {
        data() {
            return {
                arr:[],
                fileListUpload: [],
                limitUpload:1,
                fileTemp:null,
                editorOption: {
                    placeholder: '请输入编辑内容',
                    theme: 'snow', //主题风格
                    modules: {
                        toolbar: {
                            container: toolbarOptions, // 工具栏
                            handlers: {
                                'image': function (value) {
                                    if (value) {
                                        document.querySelector('#quill-upload input').click()
                                    } else {
                                        this.quill.format('image', false);
                                    }
                                }
                            }
                        }
                    }
                }, // 富文本编辑器配置
                content: '', //富文本内容
            }
        },
        mounted(){
            this.$addQuillTitle();
        },
        methods: {
            handleExceed(files, fileList) {
            },
            getExcel(res) {
                require.ensure([], () => {
                    const { export_json_to_excel } = require('@/common/js/Export2Excel.js')
                    const tHeader = ['设备ID', '设备型号']
                    const filterVal = ['code', 'type']
                    const list = res
                    const data = this.formatJson(filterVal, list)
                    export_json_to_excel(tHeader, data, '导出列表名称')
                })
            },

            formatJson(filterVal, jsonData) {
                return jsonData.map(v => filterVal.map(j => v[j]))
            },
            importfxx(obj) {
                console.log('导入')
                let _this = this;
                // 通过DOM取文件数据
                this.file = obj
                var rABS = false; //是否将文件读取为二进制字符串
                var f = this.file;
                var reader = new FileReader();
                //if (!FileReader.prototype.readAsBinaryString) {
                FileReader.prototype.readAsBinaryString = function(f) {
                    var binary = "";
                    var rABS = false; //是否将文件读取为二进制字符串
                    var pt = this;
                    var wb; //读取完成的数据
                    var outdata;
                    var reader = new FileReader();
                    reader.onload = function(e) {
                        var bytes = new Uint8Array(reader.result);
                        var length = bytes.byteLength;
                        for(var i = 0; i < length; i++) {
                            binary += String.fromCharCode(bytes[i]);
                        }
                        var XLSX = require('xlsx');
                        if(rABS) {
                            wb = XLSX.read(btoa(fixdata(binary)), { //手动转化
                                type: 'base64'
                            });
                        } else {
                            wb = XLSX.read(binary, {
                                type: 'binary'
                            });
                        }
                        outdata = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);//outdata就是你想要的东西
                        console.log('表格')
                        console.log(outdata)
                        this.da = [...outdata]
                        let arr = []
                        this.da.map(v => {
                            let obj = {}
                            obj.code = v['设备ID']
                            obj.type = v['设备型号']
                            arr.push(obj)
                        })
                        console.log(arr)
                        _this.arr = arr
                        return arr
                    }
                    reader.readAsArrayBuffer(f);
                }

                if(rABS) {
                    reader.readAsArrayBuffer(f);
                } else {
                    reader.readAsBinaryString(f);
                }
            },

            handleChange(file, fileList){
                this.fileTemp = file.raw
                if(this.fileTemp){
                    if((this.fileTemp.type == 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') || (this.fileTemp.type == 'application/vnd.ms-excel')){
                        console.log('导入44')
                        this.importfxx(this.fileTemp)
                    } else {
                        this.$message({
                            type:'warning',
                            message:'附件格式错误，请删除后重新上传！'
                        })
                    }
                } else {
                    this.$message({
                        type:'warning',
                        message:'请上传附件！'
                    })
                }
            },

            handleRemove(file,fileList){
                this.fileTemp = null
            },
        }
    }
</script>
