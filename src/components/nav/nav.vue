<template>
    <div class="d_nav">
        <ul class="d_nav-tab border-bottom-1px">
            <li class="d_nav-item">
                <router-link :to="{path:'./goods',query: { plan: 'private' }}" replace>商品</router-link>
            </li>
            <li class="d_nav-item">
                <router-link to="./seller" replace>评价</router-link>
            </li>
            <li class="d_nav-item">
                <router-link to="./ratings" replace>商家</router-link>
            </li>
        </ul>
    </div>
</template>
<script>
    export default {};
</script>
<style lang="scss">
    .d_nav {
        height: 40px;
        .d_nav-tab {
            display: flex;
        }
        .d_nav-item {
            flex: 1;
            text-align: center;
            line-height: 40px;
            height: 40px;
            a {
                display: block;
                width: 100%;
                height: 100%;
                font-size: 14px;
            }
            .nav-active {
                color: rgb(240, 20, 20);
            }
        }
    }
</style>