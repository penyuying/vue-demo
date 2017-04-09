// import BScroll from 'better-scroll';
import Shopcart from '../shopcart/shopcart';
import IScroll from '../../../common/js/iscroll-probe';
import Cartcontrol from '../cartcontrol/cartcontrol';
import Food from '../food/food.vue';
// import Vue from 'vue';
export default {
    data() {
        // var _vue = this;
        return {
            goods: [],
            listHeight: [],
            scrollY: {
                type: Number,
                default: 0
            },
            selectFoods: {}
        };
    },
    props: {
        seller: {
            type: Object
        }
    },
    created() {
        var _vue = this;
        _vue.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
        _vue.S_http.post({}, 'goods').then(function(back) {
            var response = back.body,
                tempHeader = response && response.responseHeader,
                tempBody = response.responseBody;
            if (tempHeader.returnStatus == '0') {
                return false;
            }
            if (tempBody && tempBody.list) {
                _vue.goods = tempBody.list;
                this.$nextTick(() => {
                    _vue._initScroll();
                    _vue._calcGoodsHeight();
                });
            }
        });
    },
    computed: {
        menuIndex() {
            let _vue = this,
                _listHeight = _vue.listHeight;
            for (let i = 0; i < _listHeight.length; i++) {
                let _height = _listHeight[i],
                    _height1 = _listHeight[i + 1];
                if (!_height1 || _vue.scrollY >= _height - 1 && _vue.scrollY < _height1) {
                    return i;
                }
            }
        },
        selectFood() {
            let _vue = this,
                _foods = [];
            _vue.goods.forEach((good) => {
                good.foods.forEach((food) => {
                    if (food.count > 0) {
                        _foods.push(food);
                    }
                });
            });

            return _foods;
        }
    },
    methods: {
        // decreaseFood(goodIndex, foodindex, num) {
        //     let _vue = this;
        //     // food.count = food.count || 0;
        //     // food.count += num;
        //     console.log(_vue.goods[goodIndex][foodindex]);
        // },
        // addFood(food, goodIndex, foodindex, num) {
        //     // let _vue = this;
        //     // let food = _vue.goods[goodIndex].foods[foodindex];
        //     let _count = food.count || 0;
        //     _count += num;
        //     console.log(_count, food);
        //     Vue.set(food.count, _count);
        //     // console.log(_vue.goods[goodIndex].foods[foodindex]);
        //     // console.log(goodIndex, foodindex);
        // },
        selectFoodDetails(food, evt) {
            if (!evt._constructed) {
                return;
            }
            var _vue = this;
            _vue.selectFoods = food;
            _vue.$refs.uvFood.show();
        },
        menuClick(index, event) {
            if (!event._constructed) {
                return;
            }
            let _vue = this,
                _goodList = _vue.$refs.foodsWrap && _vue.$refs.foodsWrap.getElementsByClassName('goods-item-hook');
            _vue.foodsScroll.scrollToElement(_goodList[index], 300);
        },
        _initScroll() {
            let _vue = this;
            _vue.menuScroll = new IScroll(_vue.$refs.menuWrap, {
                click: true
            });
            _vue.foodsScroll = new IScroll(_vue.$refs.foodsWrap, {
                click: true,
                scrollbars: true,
                fadeScrollbars: true,
                shrinkScrollbars: 'clip',
                probeType: 3
            });

            // _vue.$nextTick(() => {
            //     var _scrollY = sessionStorage.getItem('scrollY');
            //     _vue.foodsScroll.scrollTo(0, 0 - _scrollY);
            //     _vue.scrollY = _scrollY;
            // });
            _vue.foodsScroll.on('scroll', function(pos) {
                sessionStorage.setItem('scrollY', Math.abs(this.y));
                _vue.scrollY = Math.abs(this.y);
            });
            _vue.foodsScroll.on('scrollEnd', function(pos) {
                sessionStorage.setItem('scrollY', Math.abs(this.y));
                _vue.scrollY = Math.abs(this.y);
            });
        },
        _calcGoodsHeight() {
            let _vue = this,
                _listHeight = [],
                _height = 0,
                _goodList = _vue.$refs.foodsWrap && _vue.$refs.foodsWrap.getElementsByClassName('goods-item-hook');
            _listHeight.push(_height);

            for (let i = 0; i < _goodList.length; i++) {
                let _item = _goodList[i];
                _height += _item.clientHeight;
                _listHeight.push(_height);
            }
            _vue.listHeight = _listHeight;
        },
        drop(target) {
            this.$nextTick(() => {
                this.$refs.dropNode.drop(target);
            });
            // console.log(target, 111);
        },
        _nextId(count) {
            let _vue = this;
            var _id = (parseInt(_vue.$route.name) || 0) + count;
            if (_id < 0) {
                _id = 0;
            } else if (_id > 2) {
                _id = 2;
            }
            return _id;
        },
        wipeSwipe(evt) {
            let _vue = this;
            let _url = '';

            if (evt.type == 'swipeleft') {
                _url = _vue._nextId(1);
            } else {
                _url = _vue._nextId(-1);
            }
            // _vue.$router.push({name: _url + ''});
            _vue.$router.replace({ name: _url + '' });
        }
    },
    components: {
        uvShopcart: Shopcart,
        uvCartcontrol: Cartcontrol,
        uvFood: Food
    },
    // event: {
    //     'cart.add'(target) {
    //         this._drop(target);
    //     }
    // },
    watch: {
        seller(now) {
            // console.log(now);
        }
    }
};