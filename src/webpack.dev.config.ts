import * as webpack from 'webpack'
import * as config from '../config'
import * as path from 'path'

export default {
    devtool: 'cheap-module-source-map' as 'cheap-module-source-map',

    entry: [
        `webpack-dev-server/client?http://localhost:${config.localWebpackPort}`,
        'webpack/hot/only-dev-server',
        ...config.entrys
    ],

    output: {
        path: __dirname,
        publicPath: `http://localhost:${config.localWebpackPort}/`,
        filename: 'bundle.js'
    },

    module: {
        rules: [
            {
                test: /\.(jsx|js)?$/,
                exclude: [/node_modules/],
                use: ['react-hot-loader']
            }, {
                test: /\.(tsx|ts)?$/,
                exclude: [/node_modules/],
                use: ['react-hot-loader', 'ts-loader']
            }, {
                test: /\.json$/,
                use: ['json-loader']
            }, {
                test: /\.md$/,
                use: ['text-loader']
            }
        ]
    },

    resolve: {
        modules: [
            // 当前项目根目录
            path.join(process.cwd(), 'node_modules'),
            // 该项目根目录
            path.join(__dirname, '../../node_modules')
        ]
    },

    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('development')
            }
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        // new webpack.DllReferencePlugin({
        //     context: '.',
        //     manifest: require(path.join(process.cwd(), 'built/static/dll/library-mainfest.json'))
        // })
    ]
}