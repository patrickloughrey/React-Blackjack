const path = require('path');
const webpack = require('webpack');

module.exports = {
    "entry": [
        'webpack-dev-server/client?http://localhost:8080',
        'webpack/hot/only-dev-server',
        "./app/index.js"
    ],
    "output": {
        "path": path.join(__dirname, "build"),
        "filename": "bundle.js"
    },
    devtool: "source-map",
    "module": {
        "loaders": [
            {
                "test": /\.jsx?$/,
                "loader": 'react-hot-loader!babel-loader',
                "exclude": /node_modules/
            },
            {
                "test": /\.scss$/,
                "loaders": ["style-loader", "css-loader?sourceMap", "sass-loader?sourceMap"]
            }
        ]
    },
    devServer: {
        contentBase: './build',
        hot: true
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ] 
};