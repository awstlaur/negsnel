module.exports = {
    extends: ["eslint:recommended", "plugin:prettier/recommended"],
    env: {
        es6: true,
        browser: true,
        node: true,
    },
    parserOptions: {
        sourceType: "module",
    },
    globals: {
        $: true,
        Raphael: true,
        Mousetrap: true,
    },
    rules: {
        "array-element-newline": [
            "off",
            {
                multiline: true,
                minItems: 4,
            },
        ],
        "func-names": ["error", "never"],
        "func-style": ["error", "declaration"],
        "max-lines-per-function": ["error", 100],
        "max-params": ["error", 5],
        "max-statements": ["error", { max: 50 }],
        "no-console": "off",
        "no-magic-numbers": [
            "off", // TODO: make stricter
            {
                detectObjects: true,
                ignore: [0, 1],
            },
        ],
        "no-plusplus": [
            "error",
            {
                allowForLoopAfterthoughts: true,
            },
        ],
        "no-use-before-define": ["error", "nofunc"],
        "object-shorthand": ["error", "consistent-as-needed"],
        "one-var": ["error", "never"],
        strict: ["error", "global"],
        "valid-jsdoc": [
            "error",
            {
                requireReturn: false,
                requireParamDescription: false,
                requireReturnDescription: false,
            },
        ],
    },
};
