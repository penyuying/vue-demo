<template>
    <div>
        <v-touch v-on:swipeleft="wipeSwipe($event)" v-on:swiperight="wipeSwipe($event)">
            <div class="d_ratings-wrap">
                ratings
            </div>
        </v-touch>
    </div>
</template>

<script>
    export default {
        methods: {
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
        }
    };
</script>
<style lang="scss">
.d_ratings-wrap{
    position: fixed;
    display: block;
    width: 100%;
    top: 176px;
    bottom: 44px;
    overflow: hidden;
    background:#f00;
}
</style>