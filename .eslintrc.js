module.exports = {
    root: true,
    parser: 'babel-eslint',
    'env': {
        'es6': true,
        'browser': true
    },
    parserOptions: {
        "ecmaVersion": 6,
        "ecmaFeatures": {
            "jsx": true,
            "vue": true
        },
        sourceType: 'module'
    },
    // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
    extends: 'standard',
    // required to lint *.vue files
    plugins: [
        'html',
        'vue'
    ],
    // add your custom rules here
    'rules': {
        // allow paren-less arrow functions
        'arrow-parens': 0,
        // allow async-await
        'generator-star-spacing': 0,
        // allow debugger during development
        'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
        "semi": ["error", "always"],
        "indent": 0,
        "eol-last": 0,
        "space-before-function-paren": 0,
        "one-var": 0,
        "eqeqeq": 0,
        "space-before-blocks": 2
    }
};