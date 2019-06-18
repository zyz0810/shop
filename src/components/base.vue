<script>
    exports.install = function (Vue, options) {
        Vue.prototype.text1 = function (){//全局函数1
            alert('执行成功1');
        };
        Vue.prototype.headClass = function (){//全局函数2
            return 'headTableBg'
        };
    };
</script>