<template>
    <transition name="showMsg">
        <div class="d_msg-stickfoot-wrap" v-if="cisShowMsg">
            <div class="d_msg-box">
                <div class="d_msg-main">
                    <h2 class="d_msg-title" v-text="seller.name"></h2>
                    <div class="d_star-wrap">
                        <uv-star :u-size="48" :u-num="5" :u-food-score="seller.foodScore"></uv-star>
                    </div>
                    <div class="d_msg-info-title">
                        <span class="d_msg-line"></span>
                        <span class="d_msg-line-text">优惠信息</span>
                        <span class="d_msg-line"></span>
                    </div>
                    <ul class="d_info-content" v-if="seller.supports">
                        <li class="d_header-supports d_info-main" v-for="support in seller.supports">
                            <span class="d_header-icon" :class="classMap[support.type]"></span>
                            <span class="d_header-text" v-text="support.description"></span>
                        </li>
                    </ul>
                    <div class="d_msg-info-title">
                        <span class="d_msg-line"></span>
                        <span class="d_msg-line-text">商家公告</span>
                        <span class="d_msg-line"></span>
                    </div>
                    <div class="d_info-content">
                        <div class="d_info-main">
                            <div class="d_info-bulletin" v-text="seller.bulletin"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="d_msg-close-wrap">
                <span class="font-icon d_msg-close-btn" @click="hideMsg()">&#xe603;</span>
            </div>
        </div>
    </transition>
</template>
<script>
    import stickFooter from './_stickFooter';
    export default {
        ...stickFooter
    };
</script>
<style lang="scss">
    @import "../../common/sass/mixin";
    @import "../../common/sass/base";
    @alias {
        bsz: border-size;
        bst: border-style;
        bcl: border-color;
    }
    @import './stickFooter';
</style>