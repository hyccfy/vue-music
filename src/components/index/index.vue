<template>
    <div>
        <s-header></s-header>
        <s-sidebar></s-sidebar>
        <s-mask></s-mask>
        <s-tabbar></s-tabbar>
    </div>
</template>

<script type="text/ecmascript-6">
    import header       from '@/components/base/header/header'
    import tabbar       from '@/components/base/tabbar/tabbar'
    import sidebar       from '@/components/base/sidebar/sidebar'
    import mask       from '@/components/base/mask/mask'

    export default {
        components: {
            's-header': header,
            's-tabbar': tabbar,
            // 侧边栏
            's-sidebar': sidebar,
            // 遮罩层
            's-mask': mask
        },
        data () {
            return {

            }
        },
        props: {},
        watch: {},
        methods: {

        },
        filters: {},
        computed: {},
        created () {

        },
        mounted () {

        },
        destroyed () {}
    }
</script> 