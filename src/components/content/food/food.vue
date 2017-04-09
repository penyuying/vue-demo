<template>
    <transition name="showFoodDetails">
        <div v-if="isShowFood" class="d_food-warp">
            <div class="d_foodDetails" ref="foodDetail">
                <div>
                    <div class="d_food-back" @click="hide()">
                        <i class="d_food-back-icon"></i>
                    </div>
                    <div class="d_food-pic">
                        <img :src="food.image" />
                    </div>
                    <div class="d_food-content">
                        <h2 class="d_food-title">{{food.name}}</h2>
                        <div class="d_food-detail">
                            <span>月销{{food.sellCount}}份</span>
                            <span class="d_food-rating">好评率{{food.rating}}%</span>
                        </div>
                        <div class="d_food-price">
                            <span class="d_food-now">
                                <span>￥</span>
                                <span v-text="food.price"></span>
                            </span>
                            <span v-if="food.oldPrice" class="d_food-old">
                                <span>￥</span>
                                <span v-text="food.oldPrice"></span>
                            </span>
                        </div>
                        <uv-cartcontrol @cart-add="add" :food="food"></uv-cartcontrol>
                        <transition name="foodCount">
                            <div v-if="!food.count||food.count<=0" class="d_cart-add" @click="add">加入购物车</div>
                        </transition>
                    </div>


                    <uv-split></uv-split>

                    <div class="d_food-content" v-if="food.info">
                        <h2 class="d_info-title">商品介绍</h2>
                        <p class="d_food-text" v-text="food.info"></p>
                    </div>

                    <uv-split v-if="food.info"></uv-split>

                    <div class="d_food-ratingList">
                        <h2 class="d_info-title">商品评价</h2>

                        <rating-select :ratings="food.ratings" :only-content="onlyContent" @select="select" @toggle="toggleContent" :select-type="selectType"></rating-select>

                        <div class="d_rating-wrap">
                            <ul class="d_rating-list" v-if="food.ratings && food.ratings.length > 0">
                                <li class="d_rating-item" v-if="isShowRating(rating.rateType,rating.text)" v-for="rating in food.ratings">
                                    <div class="d_rating-time-wrap">
                                        <span class="d_rating-time">{{rating.rateTime}}</span>
                                        <div class="d_rating-user">
                                            <span class="d_rating-name">{{rating.username}}</span>
                                            <span class="d_rating-pic">
                                                <img  :src="rating.avatar">
                                            </span>
                                        </div>
                                    </div>
                                    <div class="d_rating-text-wrap">
                                        <span :class="{'d_rating-icon-up':rating.rateType===0,'d_rating-icon-down':rating.rateType===1}"></span>
                                        <span class="d_rating-text">{{rating.text}}</span>
                                    </div>
                                </li>
                            </ul>
                            <div class="d-rating-empty" v-if="!food.ratings || food.ratings.length<=0">
                                暂无评价！
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>
<script>
    import food from './_food';
    export default {
        ...food
    };
</script>
<style lang="scss">
    @import "../../../common/sass/mixin";
    @import "../../../common/sass/base";
    @import "./food";
</style>