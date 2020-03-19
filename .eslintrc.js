module.exports = {
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:prettier/recommended",
        "plugin:json/recommended",
    ],
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

        // may conflict with prettier
        "@typescript-eslint/member-delimiter-style": "off",
        "@typescript-eslint/type-annotation-spacing": "off",

        "@typescript-eslint/ban-ts-comment": "error",
        "@typescript-eslint/consistent-type-definitions": ["error", "type"],
        "@typescript-eslint/explicit-function-return-type": "off",
        "@typescript-eslint/explicit-member-accessibility": "off",
        "@typescript-eslint/explicit-module-boundary-types": "off",
    },
    overrides: [
        {
            files: ["*.ts", "*.tsx"],
            rules: {
                "@typescript-eslint/explicit-function-return-type": ["error"],
                "@typescript-eslint/explicit-member-accessibility": [
                    "error",
                    { overrides: { constructors: "no-public" } },
                ],
                "@typescript-eslint/explicit-module-boundary-types": ["error"],
            },
        },
    ],
};
