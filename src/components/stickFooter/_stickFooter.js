import star from '../star/star';
export default {
    data() {
        return {
            cisShowMsg: false
        };
    },
    created() {
        this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
    },
    components: {
        uvStar: star
    },
    methods: {
        showMsg() {
            var _vue = this;
            _vue.cisShowMsg = true;
        },
        hideMsg() {
            var _vue = this;
            _vue.cisShowMsg = false;
            this.$emit('show-chenge', false);
        }
    },
    props: {
        isShowMsg: {
            type: Boolean
        },
        seller: {
            type: Object
        }
    },
    watch: {
        isShowMsg(now, old) {
            var _vue = this;
            if (now != old && now != _vue.cisShowMsg) {
                _vue.cisShowMsg = now;
            }
        }
    }
};