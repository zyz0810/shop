<script>
    exports.install = function (Vue, options) {
        // 表头样式
        Vue.prototype.headClass = function (){
            return 'headTableBg'
        };
    };
</script>