<template>
    <div>
        <v-touch v-on:swipeleft="wipeSwipe($event)" v-on:swiperight="wipeSwipe($event)">
            <div class="d_goods-wrap">
                <div class="d_goods">
                    <div class="d_goods-menu-wrap" ref="menuWrap">
                        <ul class="d_goods-menu-list">
                            <li class="d_goods-menu-item" v-for="(good,index) in goods" :class="{'d_active':index==menuIndex}"  @click="menuClick(index,$event)">
                                <div class="d_goods-menu-cont">
                                    <div class="d_goods-menu-item-wrap border-bottom-1px">
                                        <span class="d_header-icon" :class="classMap[good.type]" v-if="classMap[good.type]"></span>
                                        <span class="d_header-text" v-text="good.name"></span>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div class="d_goods-foods-wrap" ref="foodsWrap">
                        <ul class="d_goods-list">
                            <li class="d_goods-item goods-item-hook" v-for="(good,index) in goods">
                                <h3 class="d_goods-title"><span v-text="good.name"></span></h3>
                                <ul class="d_goods-foods-list" v-if="good.foods">
                                    <li class="d_goods-foods-item border-bottom-1px" v-for="(food,_index) in good.foods" @click="selectFoodDetails(food,$event)">
                                        <div class="d_goods-foods-item-wrap">
                                            <div class="d_foods-icon"><img :src="food.icon"></div>
                                            <div class="d_foods-info">
                                                <div class="d_foods-name" v-text="food.name"></div>
                                                <div class="d_foods-desc" v-text="food.description"></div>
                                                <div class="d_foods-sellCount">
                                                    <span v-text="'月售'+food.sellCount+'份'"></span>
                                                    <span v-text="'好评'+food.rating+'%'"></span>
                                                </div>
                                                <div class="d_foods-price">
                                                    <span class="d_foods-price-now">
                                                        <span>￥</span>
                                                        <span v-text="food.price"></span>
                                                    </span>
                                                    <span v-if="food.oldPrice" class="d_foods-price-old">
                                                        <span>￥</span>
                                                        <span v-text="food.oldPrice"></span>
                                                    </span>
                                                </div>
                                            </div>
                                            <uv-cartcontrol @cart-add="drop" :food="food"></uv-cartcontrol>
                                        </div>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </v-touch>
        <uv-food @cart-add="drop" ref="uvFood" :food="selectFoods"></uv-food>
        <uv-shopcart ref="dropNode" :seller="seller" :selectFood="selectFood"></uv-shopcart>
    </div>
</template>

<script>
    import good from './_goods';
    export default {
        ...good
    };
</script>
<style lang="scss">
@import "../../../common/sass/mixin";
@import "../../../common/sass/base";
@import "./goods";
</style>