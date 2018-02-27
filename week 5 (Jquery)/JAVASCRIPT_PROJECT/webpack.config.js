const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const path = require("path");

const extractSass = new ExtractTextPlugin({
    filename: "styles.css",
});

module.exports = {
    entry: {
        app: [
            "babel-polyfill",
            "./src/app.js"
        ]
    },
    output: {
        path: path.resolve(__dirname, "build"),
        filename: "app.bundle.js"
    },
    module: {
        loaders: [{
                test: /\.js?$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                query: {
                    presets: ["env", "stage-0"]
                }
            },
            {
                test: /\.(scss)$/,
                use: extractSass.extract({
                    fallback: 'style-loader',
                    //resolve-url-loader may be chained before sass-loader if necessary
                    use: [{
                        loader: "css-loader" // translates CSS into CommonJS
                    }, {
                        loader: "sass-loader" // compiles Sass to CSS
                    }]
                })
            }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery", // Used for Bootstrap JavaScript components
            jQuery: "jquery", // Used for Bootstrap JavaScript components
            Popper: ['popper.js', 'default'] // Used for Bootstrap dropdown, popup and tooltip JavaScript components
        }),
        extractSass
    ]
}