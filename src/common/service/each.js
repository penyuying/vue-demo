export default {
    install(Vue, options) {
        const each = (obj, iterator, context) => {
            if (!obj) { return; }
            if (obj.length) {
                for (var i = 0, l = obj.length; i < l; i++) {
                    if (iterator.call(context || obj[i], obj[i], i, obj) === false) {
                        return false;
                    }
                }
            } else {
                for (var j in obj) {
                    if (obj.hasOwnProperty(j)) {
                        if (iterator.call(context || obj[j], obj[j], j, obj) === false) {
                            return false;
                        }
                    }
                }
            }
        };

        Vue.each = each;

        Object.defineProperties(Vue.prototype, {
            each: each
        });
    }
};