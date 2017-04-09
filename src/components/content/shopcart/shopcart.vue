<template>
    <div>
        <div class="d_shopcart">
            <div class="d_shopcart-wrap">
                <div class="d_shopcart-left" @click="toggleList()"  :class="{'d_Highlight':totalCount > 0}">
                    <div class="d_shopcart-log-wrap">
                        <span class="d_shopcart-log font-icon">
                            &#xe608;
                        </span>
                        <span class="d_shopcart-count" v-if="totalCount > 0">{{totalCount}}</span>
                    </div>
                    <div class="d_shopcart-price">￥{{totalPrice}}</div>
                    <div class="d_shopcart-desc">另需配送费￥{{seller.deliveryPrice}}元</div>
                </div>
                <div class="d_shopcart-right">
                    <span class="d_shopcart-pay" @click="pay()" :class="{'d_shopcart-payclass':totalPrice >= minPrice}">{{dispatch}}</span>
                    <!-- 停止事件冒泡和阻止默认事件<span class="d_shopcart-pay" @click.stop.prevent="pay()" :class="{'d_shopcart-payclass':totalPrice >= minPrice}">{{dispatch}}</span>-->
                </div>
            </div>
            <div class="d_ball-container">
                <transition name="ballList" v-bind:key="ball" v-on:before-enter="beforeEnter" v-on:enter="enter" v-on:after-enter="afterEnter" v-for="ball in balls">
                    <div class="d_ball" v-show="ball.show">
                        <span class="d_ball-inner inner-hook"></span>
                    </div>
                </transition>
            </div>
            <transition name="shopcartFood">
                <div class="d_shopcart-list" v-show="isShowList">
                    <div class="d_shopcart-list-header">
                        <h3 class="d_shopcart-list-title">购物车</h3>
                        <span class="d_shopcart-list-empty" @click="empty()">清空</span>
                    </div>
                        <div ref="listContent" class="d_shopcart-list-content">
                            <ul class="listContent">
                                <li class="d_selectFood" v-for="food in selectFood">
                                    <span class="d_selectFood-name">{{food.name}}</span>
                                    <div class="d_selectFood-price">￥{{food.price*food.count}}</div>
                                    <uv-cartcontrol @cart-add="drop" :food="food"></uv-cartcontrol>
                                </li>
                            </ul>
                        </div>
                </div>
            </transition>
        </div>
        <transition name="shopcartbg">
            <div class="d_shopcart-list-bg" @click="hideList()" v-if="isShowList"></div>
        </transition>
    </div>
</template>

<script>
    import Cartcontrol from '../cartcontrol/cartcontrol';
    import IScroll from '../../../common/js/iscroll-probe';
    export default {
        components: {
            uvCartcontrol: Cartcontrol
        },
        data() {
            return {
                minPrice: 20,
                flag: false,
                balls: [{
                    show: false
                }, {
                    show: false
                }, {
                    show: false
                }, {
                    show: false
                }, {
                    show: false
                }],
                dropBalls: []
            };
        },
        props: {
            seller: {
                type: Object,
                default() {
                    return {};
                }
            },
            selectFood: {
                type: Array,
                default: []
            }
        },
        created() {
            console.log(this.seller);
        },
        methods: {
            pay() {
                let _vue = this;
                _vue.hideList();
                if (_vue.totalPrice >= _vue.minPrice) {
                    _vue.$nextTick(() => {
                        window.alert('支付' + _vue.totalPrice + '元');
                    });
                }
            },
            empty() {
                this.selectFood.forEach((food) => {
                    food.count = 0;
                });
            },
            hideList() {
                let _vue = this;
                _vue.flag = false;
            },
            toggleList() {
                let _vue = this;
                if (!_vue.totalCount) {
                    return false;
                }
                _vue.flag = !_vue.flag;
            },
            beforeEnter: function (el) {
                let count = this.balls.length;
                while (count--) {
                    let ball = this.balls[count];
                    if (ball.show) {
                        let rect = ball._el.getBoundingClientRect();
                        let x = rect.left - 32;
                        let y = 0 - (window.innerHeight - rect.top - 40);
                        el.style.display = '';
                        el.style.webkitTransform = 'translate3d(0,' + y + 'px,0)';
                        el.style.kitTransform = 'translate3d(0,' + y + 'px,0)';
                        let inner = el.getElementsByClassName('inner-hook')[0];
                        inner.style.webkitTransform = `translate3d(${x}px,0,0)`;
                        inner.style.kitTransform = `translate3d(${x}px,0,0)`;
                    }
                }
            },
            // 此回调函数是可选项的设置
            // 与 CSS 结合时使用
            enter: function (el, done) {
                /* eslint-disable no-unused-vars */
                let rf = el.offsetHeight;
                this.$nextTick(() => {
                    el.style.webkitTransform = 'translate3d(0,0,0)';
                    el.style.kitTransform = 'translate3d(0,0,0)';
                    let inner = el.getElementsByClassName('inner-hook')[0];
                    inner.style.webkitTransform = 'translate3d(0,0,0)';
                    inner.style.kitTransform = 'translate3d(0,0,0)';
                    el.addEventListener('transitionend', done);
                });
            },
            afterEnter: function (el) {
                let ball = this.dropBalls.shift();
                if (ball) {
                    ball.show = false;
                    el.style.display = 'none';
                }
            },
            drop(event) {
                if (!event._constructed) {
                    return;
                }
                var el = event.target;
                for (let i = 0; i < this.balls.length; i++) {
                    let ball = this.balls[i];
                    if (!ball.show) {
                        ball.show = true;
                        ball._el = el;
                        this.dropBalls.push(ball);
                        return;
                    }
                }
            }
        },
        computed: {
            isShowList() {
                if (!this.totalCount) {
                    this.flag = false;
                    return false;
                }
                let show = !!this.flag;
                if (show) {
                    this.$nextTick(() => {
                        if (!this.scroll) {
                            this.scroll = new IScroll(this.$refs.listContent, {
                                click: true
                            });
                        } else {
                            this.scroll.refresh();
                        }
                    });
                }
                return show;
            },
            totalCount() {
                let _vue = this,
                    _count = 0,
                    _price = 0,
                    _start = _vue.minPrice,
                    _goodList = [],
                    _dispatch = _start + '元起送';
                _vue.selectFood.forEach((food) => {
                    _count += (food.count || 0);
                    if (food.count > 0) {
                        _goodList.push(food);
                    }
                    _price += ((food.count || 0) * food.price) || 0;
                });

                _vue.payclass = false;
                if (_price >= _start) {
                    _dispatch = '去结算';
                    _vue.payclass = true;
                } else if (_price > 0) {
                    _dispatch = '还差￥' + (_start - _price) + '起送';
                }
                _vue.goodList = _goodList;
                _vue.dispatch = _dispatch;
                _vue.totalPrice = _price;
                return _count;
            }// ,
            // dispatch() {
            //     let _vue = this,
            //         start = 20,
            //         res = start + '元起送';
            //     if (_vue.price >= start) {
            //         res = '去结算';
            //     } else if (_vue.price > 0) {
            //         res = '还差 ￥' + (start - _vue.price) + '起送';
            //     }
            //     return res;
            // }
            // price() {
            //     let _vue = this,
            //         _price = 0;
            //     _vue.goods.forEach((good) => {
            //         good.foods.forEach((food) => {
            //             _price += ((food.count || 0) * food.price) || 0;
            //         });
            //     });
            //     return _price;
            // }
        }
    };
</script>

<style lang="scss">
    @import "../../../common/sass/mixin";
    @import 'shopcart';
</style>