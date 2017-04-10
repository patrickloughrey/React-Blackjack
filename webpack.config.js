const path = require('path');

module.exports = {
    entry: "./app/index.js",
    output: {
        path: path.join(__dirname, "build"),
        filename: "bundle.js"
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            }
        ]
    },
};