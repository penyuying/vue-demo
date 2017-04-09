import Cartcontrol from '../cartcontrol/cartcontrol';
import IScroll from '../../../common/js/iscroll-probe';
import Vue from 'vue';
export default {
    data() {
        return {
            isShowFood: false,
            onlyContent: false,
            selectType: 0
        };
    },
    props: {
        food: {
            type: Object
        }
    },
    methods: {
        hide() {
            var _vue = this;
            _vue.isShowFood = false;
            _vue._foodDetailScroll = undefined;
        },
        show() {
            var _vue = this;
            _vue.isShowFood = true;
            _vue.onlyContent = false;
            _vue.selectType = 0;
            this.$nextTick(() => {
                _vue._initScroll();
            });
        },
        add(event) {
            if (!event._constructed) {
                return;
            }
            let _vue = this;
            let _count = (_vue.food.count || 0) + 1;
            _vue.$emit('cart-add', event);
            Vue.set(_vue.food, 'count', _count);
            // console.log(_vue.food.count);
            // _vue.$emit('add', _vue.food, _vue.goodIndex, _vue.foodIndex, 1);
        },
        toggleContent() {
            this.onlyContent = !this.onlyContent;
            this.$nextTick(() => {
                this._foodDetailScroll.refresh();
            });
        },
        select(id) {
            this.selectType = id;
            this.$nextTick(() => {
                this._foodDetailScroll.refresh();
            });
        },
        isShowRating(type, txt) {
            if (this.onlyContent && !txt) {
                return false;
            }
            this.$nextTick(() => {
                this._foodDetailScroll.refresh();
            });
            if (this.selectType === 0) {
                return true;
            } else {
                return type === this.selectType;
            }
        },
        _initScroll() {
            let _vue = this;
            if (!_vue._foodDetailScroll) {
                _vue._foodDetailScroll = new IScroll(_vue.$refs.foodDetail, {
                    click: true,
                    scrollbars: true,
                    fadeScrollbars: true,
                    shrinkScrollbars: 'clip',
                    probeType: 3
                });
            } else {
                this._foodDetailScroll.refresh();
            }
        },
        stopPrevent(evt) {
            console.log(evt);
            evt.stopPropagation();
        }
    },
    components: {
        uvCartcontrol: Cartcontrol
    }
};