<template>
    <quill-editor
            class="info-editor ql-editor p0 quill-editor"
            v-model="content"
            ref="VueQuillEditor"
            :options="editorOption" @change="onEditorChange($event)">
    </quill-editor>
</template>
<script>
    import {addQuillTitle} from './../common/js/quill-title.js'
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
    ];
    export default {

        props: ['Content'],
        data() {
            return {
                content: this.Content,
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
            };
        },
        methods: {
            onEditorChange(e) {
                console.log(e)
            }, // 内容改变事件
        },
        mounted() {
            addQuillTitle()
        }
    }
</script>