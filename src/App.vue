<template>
    <div class="d_layout">
        <!--<img src="./assets/logo.png">-->
        <div class="d_header-wrap">
            <uv-header :seller="seller"></uv-header>
            <uv-nav></uv-nav>
        </div>
        <transition :name="transitionName">
            <keep-alive>
                <router-view :seller="seller" :navId="navId"></router-view>
            </keep-alive>
        </transition>
    </div>
</template>
<script>
    import header from 'components/header/header';
    import nav from 'components/nav/nav';

    export default {
        name: 'app',
        data() {
            return {
                seller: {},
                navId: 0,
                transitionName: 'bounceInLeft'
            };
        },
        created() {
            var _vue = this;
            this.S_http.post({}, 'seller').then(function (back) {
                var response = back.body,
                    tempHeader = response && response.responseHeader,
                    tempBody = response.responseBody;
                if (tempHeader.returnStatus == '0') {
                    return false;
                }
                if (tempBody) {
                    _vue.seller = tempBody;
                }
            });
            this.navId = this.$route.name;
            this.fetchData();
        },
        watch: {
            '$route' (to, from) {
                // const toDepth = to.path.split('/').length;
                // const fromDepth = from.path.split('/').length;
                // console.log(from.path, to.path);
                // this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left';
                // console.log(this.$route.name);
                // var _id = this._getUrlId(to.path);
                this.switchNav(this.$route.name);
            }
            // '$route' (to, from) {
            //     this.fetchData(to, from);
            // }
        },
        methods: {
            switchNav(id) {
                var _vue = this;
                var _transitionName = '';
                if (this.navId > id) {
                    _transitionName = 'bounceInRight';
                } else if (this.navId < id) {
                    _transitionName = 'bounceInLeft';
                }
                _vue.transitionName = _transitionName;
                this.navId = id;
            },
            fetchData (to, from) {
                // const toDepth = to.path.split('/');
                // const fromDepth = from.path.split('/');
                // console.log(toDepth, fromDepth);
                // this.error = this.post = null;
                // this.loading = true;
                // replace getPost with your data fetching util / API wrapper
                // getPost(this.$route.params.id, (err, post) => {
                //     this.loading = false
                //     if (err) {
                //     this.error = err.toString()
                //     } else {
                //     this.post = post
                //     }
                // })
                // console.log(this.$route.params.id);
                // console.log(this.$route.query);
            }
        },
        components: {
            uvHeader: header,
            uvNav: nav
        }
    };

</script>

<style lang="scss">
    html,body,.d_layout{
        width: 100%;
        height: 100%;
        overflow: hidden;
        display: block;
        a{
            width: 50px;
        }
        div{
            display:block;
        }
    }
</style>
