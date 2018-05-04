<template>
    <div class="search">
        <s-search @search="search" @showlist="showlist"></s-search>
        <div class="s-default" id="s-default">
            <div class="s-classification" id="s-classification" @click="classification" v-if="showhot">
                <i class="el-icon-mobile-phone"></i>
                <span class="s-name">歌手分类</span>
                <i class="el-icon-arrow-right"></i>
            </div>
            <div class="s-topsearch" v-if="showhot">
                <h3 class="title">热门搜索</h3>
                <ul class="s-list">
                    <li class="s-item" v-for="hot in hots">
                        <a class="s-link" href="javascript:void(0);">{{hot.first}}</a>
                    </li>
                </ul>
            </div>
            <!--搜索框模糊查询-->
            <div class="s-sug" id="s-sug">
                <ul>
                    <li class="title">搜索'{{message}}'</li>
                    <li v-for="item in items" @click="show(item)">
                        <i class="el-icon-time"></i>
                        {{item.keyword}}
                    </li>
                </ul>
            </div>
            <!--搜索历史记录-->
            <div class="s-history" v-if="showhot">
                <ul></ul>
            </div>
        </div>
        <!--歌曲搜索详情-->
        <div class="s-searchresult" v-if="state">
            <div class="s-music-details">
                <div class="s-mv-details"></div>
                <p>你可能感兴趣</p>
                <div class="s-list-details">
                    <s-mvlist :artist="artistData"></s-mvlist>
                    <s-mvlist :artist="albumData"></s-mvlist>
                    <s-musiclist :lists="listData"></s-musiclist>
                </div>
            </div>
        </div>

        <s-tabbar></s-tabbar>
    </div>
</template>

<script type="text/ecmascript-6">
    import axios        from 'axios'
    import search       from '@/components/base/search/search'
    import tabbar       from '@/components/base/tabbar/tabbar'
    import mvlist       from '@/components/base/mvlist/mvlist'
    import musiclist    from '@/components/base/musiclist/musiclist'

    export default {
        components: {
            's-search': search,
            's-tabbar': tabbar,
            's-mvlist': mvlist,
            's-musiclist': musiclist
        },
        data () {
            return {
                items: [],
                hots: [],
                message: '',
                listData: [],
                artistData: {},
                albumData: {},
                showhot: true,
                state: false
            }
        },
        props: {

        },
        watch: {},
        methods: {
            classification () {
                console.log('classification')
            },
            // 子组件传递的数据
            search (...data) {
                this.items = data[0]
            },
            showlist (...data) {
                console.log(data[0], 555)
                this.showhot = data[0][0]
                this.state = data[0][1]
            },
            // 热门搜索
            hot () {
                axios.get('http://localhost:3000/search/hot', {}, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
                    .then((res) => {
                        console.log(res)
                        if (res.data.code == 200) {
                            this.hots = res.data.result.hots
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            },
            show (item) {
                console.log(item,444)
                let searchText = item.keyword
                document.getElementById('s-search-text').value = searchText;
                this.showhot = false
                this.state = true
                axios.get('http://localhost:3000/search/multimatch?keywords=' + searchText, {}, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
                    .then((res) => {
                        console.log(res,111)
                        if (res.data.code == 200) {
                            this.artistData = res.data.result.artist[0]
                            this.albumData  = res.data.result.album[0]
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                    })
                axios.get('http://localhost:3000/search?keywords=' + searchText, {}, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
                    .then((res) => {
                        console.log(res)
                        if (res.data.code == 200) {
                            this.listData = res.data.result.songs
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            }
        },
        filters: {},
        computed: {

        },
        created () {

        },
        mounted () {
            this.hot()
        },
        destroyed () {}
    }
</script>
<style lang="less" scoped>
    @import "../../assets/less/mixin.less";

    .search{
        .s-default{
            .s-classification{
                margin-top: 50px;
                height: 46px;
                line-height: 46px;
                text-align: center;
                .border-1px(#e4e8eb);
            }
            .s-topsearch{
                padding: 15px 10px 0;
                .title{
                    font-size: 12px;
                    line-height: 12px;
                    color: #666;
                    font-weight: 400;
                }
                .s-list{
                    margin:10px 0 7px;
                    padding: 0;
                    .s-item{
                        display: inline-block;
                        height: 32px;
                        margin-right: 8px;
                        margin-bottom: 8px;
                        padding: 0 10px;
                        font-size: 14px;
                        line-height: 32px;
                        color: #333;
                        border: 1px solid #e4e8eb;
                        border-radius: 16px;
                    }
                }
            }
            .s-sug{
                position: fixed;
                left: 24px;
                right: 24px;
                top: 60px;
                background: #fff;
                box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
                display: none;
                z-index: 100;
                ul{
                    li{
                        height: 44px;
                        line-height: 44px;
                        font-size: 13px;
                        .border-1px(#e4e8eb);
                        color: #727272;
                        i{
                            font-size: 14px;
                            color: #bcbcbc;
                            padding:0 10px;
                        }
                    }
                    .title{
                        color: #476194;
                        font-size: 15px;
                        padding: 0 10px;
                    }
                }
            }
        }
        .s-searchresult{
            padding: 50px 0;5
            width: 100%;
            height: 100%;
            display: block;
            .s-music-details{
                p{
                    font-size: 12px;
                    line-height: 16px;
                    color: #666;
                    margin-left: 10px;
                    margin-top: 8px;
                }
            }
        }
    }
</style>