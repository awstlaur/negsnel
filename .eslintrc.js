module.exports = {
    "extends": ["eslint:recommended"],
    "env": {
        "es6": true,
        "browser": true,
        "node": true
    },
    "parserOptions": {
        "sourceType": "module"
    },
    "globals": {
        "$": true,
        "Raphael": true,
        "Mousetrap": true
    },
    "rules": {
        "array-bracket-newline": ["error", "consistent"],
        "array-element-newline": ["off",
            {
                "multiline": true,
                "minItems": 4
            }],
        "brace-style": ["error", "stroustrup"],
        "func-names": ["error", "never"],
        "func-style": ["error", "declaration"],
        "function-paren-newline": ["error", "consistent"],
        "indent": ["error",
            4,
            {
                "CallExpression": {"arguments": "first"},
                "SwitchCase": 1
            }],
        "max-len": ["error",
            {
                "code": 100,
                "comments": 80,
                "ignoreComments": false,
                "ignoreTrailingComments": false,
                "ignoreStrings": false
            }],
        "max-lines-per-function": ["error", 100],
        "max-params": ["error", 5],
        "max-statements": ["error", {"max": 50}],
        "multiline-ternary": ["error", "always-multiline"],
        "no-extra-parens": ["error",
            "all",
            {
                "nestedBinaryExpressions": false
            }],
        "no-magic-numbers": ["off", // TODO: make stricter
            {
                "detectObjects": true,
                "ignore": [0, 1]
            }],
        "no-plusplus": ["error",
            {
                "allowForLoopAfterthoughts": true
            }],
        "no-use-before-define": ["error", "nofunc"],
        "object-curly-newline": ["error",
            {
                "consistent": true
            }],
        "object-shorthand": ["error", "consistent-as-needed"],
        "operator-linebreak": ["error", "after"],
        "one-var": ["error", "never"],
        "padded-blocks": ["error", "never"],
        "space-before-function-paren": ["error",
            {
                "asyncArrow": "always",
                "anonymous": "always",
                "named": "always"
            }],
        "strict": ["error", "global"],
        "quotes": ["error", "double"],
        "valid-jsdoc": ["error",
            {
                "requireReturn": false,
                "requireParamDescription": false,
                "requireReturnDescription": false
            }]
    }
};
