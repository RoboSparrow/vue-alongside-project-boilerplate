// http://eslint.org/docs/user-guide/configuring

module.exports = {
    root: true,
    env: {
        browser: true,
        node: true
    },
    ecmaVersion : 6,
    extends: 'eslint:recommended',

    ////
    // add your custom rules here
    ////

    rules: {
        // allow debugger during development
        'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,

        indent: ['error', 4, { 'SwitchCase': 1 }],
        'no-console': 'off'
    }
}
