<template>
    <div class="d_ratingSelect-wrap">
        <div class="d_ratingSelect-box">
            <div class="d_ratingSelect-cont">
                <span class="d_ratingSelect-btn" @click="select($event,0)" :class="{'active':selectType==0}">
                    {{desc.all}}
                    <span class="d_ratingSelect-count">{{ratings.length}}</span>
                </span>
                <span class="d_ratingSelect-btn" @click="select($event,1)" :class="{'active':selectType==1}">
                    {{desc.positive}}
                    <span class="d_ratingSelect-count">{{positive.length}}</span>
                </span>
                <span class="d_ratingSelect-btn d_ratingSelect-negative" @click="select($event,2)" :class="{'active':selectType==2}">
                    {{desc.negative}}
                    <span class="d_ratingSelect-count">{{negative.length}}</span>
                </span>
            </div>
        </div>
        <div class="d_ratingSelect-switch" @click="toggleContent($event)">
            <span class="d_ratingSelect-icon" :class="{'active':onlyContent}"></span>
            <span class="d_ratingSelect-text">只看有内容的评价</span>
        </div>
    </div>
</template>

<script>
    const ALL = 0;
    const POSITIVE = 1;
    const NEGATIVE = 2;
    export default {
        data() {
            return {};
        },
        props: {
            ratings: {
                type: Array,
                default() {
                    return [];
                }
            },
            selectType: {
                type: Number,
                default: ALL
            },
            onlyContent: {
                type: Boolean,
                default: false
            },
            desc: {
                type: Object,
                default() {
                    return {
                        all: '全部',
                        positive: '满意',
                        negative: '不满意'
                    };
                }
            }
        },
        computed: {
            positive() {
                return this.ratings.filter((rating) => {
                    return rating.rateType === POSITIVE;
                });
            },
            negative() {
                return this.ratings.filter((rating) => {
                    return rating.rateType === NEGATIVE;
                });
            }
        },
        methods: {
            toggleContent(event) {
                if (!event._constructed) {
                    return;
                }
                this.$emit('toggle');
            },
            select(evt, id) {
                if (!evt._constructed) {
                    return;
                }
                this.$emit('select', id);
            }
        }
    };
</script>

<style lang="scss">
    @import "../../common/sass/mixin";
    @import "../../common/sass/base";
    @import "ratingSelect";
</style>