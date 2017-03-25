////
// Bundles your project as UMD lirary
////

const path = require('path');
const webpack = require('webpack');

// define your project
const PROJECT = {
    slug: 'my-api',
    name: 'MyApi',
    srcDir: './src/lib/'
};

module.exports = {
    entry: {
        [PROJECT.slug]: PROJECT.srcDir + PROJECT.slug + '.js',
        [PROJECT.slug + '.min']: PROJECT.srcDir + PROJECT.slug + '.js',
    },

    output: {
        path: path.resolve(__dirname, './dist/'),
        publicPath: '/dist/' + PROJECT.slug+ '/',
        filename: '[name].js',
        library: PROJECT.name,
        libraryTarget: 'umd' // Possible value - amd, commonjs, commonjs2, commonjs-module, this, var
    },

    module: {
        rules: [
            // eslint-loader (pre!)
            {
                test: /\.(js|vue)$/,
                loader: 'eslint-loader',
                enforce: "pre",
                include: [
                    path.resolve(__dirname, 'src'),
                    path.resolve(__dirname, 'test')
                ],
                options: {
                }
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            }
        ]
    },

    devtool: '#eval-source-map'
}

if (process.env.NODE_ENV === 'production') {
    module.exports.devtool = '#source-map'
    // http://vue-loader.vuejs.org/en/workflow/production.html
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            include: /\.min\.js$/,
            sourceMap: true,
            compress: {
                warnings: false
            }
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true
        })
    ])
}
