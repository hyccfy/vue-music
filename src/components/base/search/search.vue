<template>
    <div class="search">
        <div class="s-search">
            <div class="s-inputcover">
                <i class="back el-icon-back" @click="goBack"></i>
                <input class="s-search-text" placeholder="猜你喜欢我们" id="s-search-text" v-model="message"  @keyup="search">
                <i class="close el-icon-close" @click="searchClose" v-if="state"></i>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import axios             from 'axios'

    export default {
        components: {

        },
        data () {
            return {
                message: '',
                // 关闭按钮显示
                state: false
            }
        },
        props: {

        },
        watch: {},
        methods: {
            // 模糊查询
            search () {
                let searchText = document.getElementById('s-search-text').value
                let sug = document.getElementById('s-sug')
                sug.style.display = searchText =='' ? 'none' : 'block'
                if (searchText =='') {
                    return
                } else {
                    this.state = true
                }
                axios.get('http://localhost:3000/search/suggest?keywords=' + searchText, {}, {headers:{'Content-Type':'application/x-www-form-urlencoded'}})
                    .then((res) => {
                        console.log(res,222)
                        if (res.data.code == 200) {
                            this.$emit('search', res.data.result.allMatch)
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            },
            // 搜索关闭
            searchClose () {
                document.getElementById('s-search-text').value = ''
                document.getElementById('s-sug').style.display = 'none'
                this.$emit('showlist', [true, false])
            },
            // 返回上一页
            goBack () {
                window.history.back()
            }
        },
        filters: {},
        computed: {

        },
        created () {

        },
        mounted () {

        },
        destroyed () {}
    }
</script>
<style lang="less" scoped>
    @import "../../../assets/less/mixin.less";

    .box {
        padding: 0 15px;
        height: 50px;
        line-height: 50px;
        color: #fff;
        font-size: 24px;
    }
    @bgcolor: #df4239;
    .search{
        .s-search{
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            height: 50px;
            z-index: 1000;
            background: @bgcolor;
            .s-inputcover{
                height: 100%;
                display: flex;
                .back{
                    .box
                }
                input{
                    width: 100%;
                    height: 36px;
                    border: 0;
                    background: @bgcolor;
                    color: #fff;
                    opacity: .9;
                    border-bottom: 1px solid #fff;
                    box-sizing: border-box;
                    margin: 7px 10px 7px 0;
                    caret-color: #fff;
                    outline: none;
                }
                input::-webkit-input-placeholder {
                    color: #fff;
                    opacity: .3;
                }
                .close{
                    position: absolute;
                    right: 16px;
                    height: 50px;
                    line-height: 50px;
                    color: #fff;
                    font-size: 24px;
                }
            }
        }
    }
</style>