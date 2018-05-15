<template>
    <div class="login">
        <div class="s-header">
            <i class="el-icon-back"></i>
            <span class="s-header-title"></span>
        </div>
        <div class="s-content">
            <div class="s-content-phone">
                <i class="el-icon-back"></i>
                <span>+86</span>
                <input class="s-search-text" placeholder="请输入手机号">
                <i class="close el-icon-close"></i>
            </div>
            <div class="s-content-pass">
                <i class="el-icon-back"></i>
                <input class="s-search-text" placeholder="请输入密码">
                <span class="">忘记密码？</span>
            </div>
        </div>
        <div calss="s-submit">登录</div>
    </div>
</template>

<script type="text/ecmascript-6">
    import axios             from 'axios'

    export default {
        components: {

        },
        data () {
            return {
                
            }
        },
        props: {

        },
        watch: {},
        methods: {
            
        },
        filters: {},
        computed: {},
        created () {

        },
        mounted () {},
        destroyed () {}
    }
</script>

<style lang="less" scoped>
    @import "../../assets/less/mixin.less";

    
</style>