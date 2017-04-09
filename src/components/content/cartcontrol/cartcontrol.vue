<template>
    <div class="d_cartcontrol-wrap">
        <transition name="decrease">
            <span class="d_cartcontrol-handle font-icon" @click.stop.prevent="decrease($event)" v-if="food.count > 0">
                <transition name="inner">
                    <span class="d_inner">&#xe607;</span>
                </transition>
            </span>
        </transition>
        <span class="d_cartcontrol-count" v-text="food.count||''"></span>
        <span class="d_cartcontrol-handle font-icon" @click.stop.prevent="add($event)">&#xe604;</span>
    </div>
</template>

<script>
import Vue from 'vue';
    export default {
        data() {
            return {
            };
        },
        props: {
            food: {
                type: Object
            },
            foodIndex: {
                type: Number
            },
            goodIndex: {
                type: Number
            }
        },
        methods: {
            decrease(event) {
                if (!event._constructed) {
                    return;
                }
                let _vue = this;
                if (_vue.food.count > 0) {
                    let _count = (_vue.food.count || 0) - 1;
                    Vue.set(_vue.food, 'count', _count);
                }
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
            }
        }
    };
</script>

<style lang="scss">
    @import 'cartcontrol';
</style>