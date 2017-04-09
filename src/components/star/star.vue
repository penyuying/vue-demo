<template>
    <div class="d_star" :class="starClass">
        <span class="d_star-item" v-for="item in itemClass" :class="item"></span>
    </div>
</template>

<script>
    export default {
        props: {
            uSize: {
                type: Number
            },
            uNum: {
                type: Number
            },
            uFoodScore: {
                type: Number
            }
        },
        computed: {
            starClass() {
                return 'd_star' + (this.uSize || 24);
            },
            itemClass() {
                let res = [];
                let _vue = this;
                let uNum = _vue.uNum || 5;
                let uFoodScore = ((Math.floor(_vue.uFoodScore * 2) || 0) / 2) || 0;
                let on = Math.floor(uFoodScore) || 0;
                for (let i = 0; i < on; i++) {
                    res.push('d_star-on');
                }
                if (uFoodScore % 1 > 0) {
                    res.push('d_star-half');
                }
                while (res.length < uNum) {
                    res.push('d_star-off');
                }
                return res;
            }
        }
    };
</script>

<style lang="scss">
    @import "../../common/sass/mixin";
    @mixin star($w) {
        $widht: ($w - ($w / 12 * 2px))/2;
        .d_star-item {
            width: $widht;
            height: $widht;
            background-size: $widht $widht;
            margin-right: $widht;
            &:last-child {
                margin-right: 0;
            }
        }
        .d_star-on {
            @include bgImgPng(star#{$w}_on);
        }
        .d_star-half {
            @include bgImgPng(star#{$w}_half);
        }
        .d_star-off {
            @include bgImgPng(star#{$w}_off);
        }
    }
    
    .d_star {
        display: inline-block;
        .d_star-item {
            display: inline-block;
            font-size: 0;
        }
        &.d_star24 {
            @include star(24);
        }
        &.d_star36 {
            @include star(36);
        }
        &.d_star48 {
            @include star(48);
        }
    }
</style>