<template>
    <div>
        <div class="d_header">
            <div class="d_header-content-wrap">
                <div class="d_header-avatar">
                    <img :src="seller.avatar">
                </div>
                <div class="d_header-info">
                    <div class="d_header-title">
                        <span class="d_header-brand"></span>
                        <span class="d_header-name" v-text="seller.name"></span>
                    </div>
                    <div class="d_header-description" v-text="seller.description+'/'+seller.deliveryTime+'分钟送达'"></div>
                    <div class="d_header-supports" v-if="seller.supports">
                        <span class="d_header-icon" :class="classMap[seller.supports[0].type]"></span>
                        <span class="d_header-text" v-text="seller.supports[0].description"></span>
                    </div>
                </div>
                <div class="d_header-more" v-if="seller.supports" v-text="seller.supports.length+'个'" @click="showMsg(true)"></div>
            </div>
            <div class="d_header-bulletin-wrap" @click="showMsg(true)">
                <span class="d_header-bulletin-title"></span>
                <span class="d_header-bulletin-text" v-text="seller.bulletin"></span>
                <span class="d_header-bulletin-icon"></span>
            </div>
            <div class="d_header-bg">
                <img :src="seller.avatar">
            </div>
        </div>
        <uv-msgbox ref="msgbox" :seller="seller"></uv-msgbox>
    </div>
</template>
<script>
    import stickFooter from '../stickFooter/stickFooter';
    export default {
        data() {
            return {};
        },
        props: {
            seller: {
                type: Object
            }
        },
        methods: {
            showMsg(val) {
                var _vue = this;
                _vue.$refs.msgbox.showMsg();
                // console.log(val);
                // this.isShowMsg = !!val;
            }
        },
        created() {
            this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
        },
        components: {
            uvMsgbox: stickFooter
        },
        watch: {
            seller(now, old) {
                console.log(now, old);
            }
        }
    };
</script>
<style lang="scss">
    @import "../../common/sass/mixin";
    @import "../../common/sass/base";
    @import "./header";
</style>