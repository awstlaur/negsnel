/* eslint-disable @typescript-eslint/no-var-requires */
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const common = require("./webpack.common.js");
const merge = require("webpack-merge");

module.exports = merge(common, {
    mode: "production",
    plugins: [new UglifyJSPlugin()],
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"],
                    },
                },
            },
        ],
    },
});
