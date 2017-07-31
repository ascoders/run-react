import * as webpack from 'webpack'
import * as config from '../config'
import * as path from 'path'
import * as CaseSensitivePathsPlugin from 'case-sensitive-paths-webpack-plugin'

const projectRoot = process.cwd()

const webpackConfig = {
    devtool: 'cheap-module-source-map' as 'cheap-module-source-map',

    entry: [
        `webpack-dev-server/client?http://localhost:${config.webpackPort}`,
        'webpack/hot/only-dev-server',
        ...config.entrys
    ],

    output: {
        path: __dirname,
        publicPath: `http://localhost:${config.webpackPort}/`,
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
                use: ['react-hot-loader', 'awesome-typescript-loader']
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
            // 所有 npm 包都从该项目根目录查找
            path.join(__dirname, '../../node_modules'),
            // 可能是打平安装，所以搜索一下上级目录
            path.join(__dirname, '../../../'),
            // 其他的包和项目文件，得从当前运行的项目中查找
            path.join(projectRoot)
        ],
        extensions: ['.js', '.jsx', '.ts', '.tsx']
    },

    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('development')
            }
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new CaseSensitivePathsPlugin()
    ],

    performance: {
        // 关闭性能提示
        hints: false,
    }
}

// 如果有 dll，就添加读取 dll 的插件
if (config.dlls.length > 0) {
    webpackConfig.plugins.push(
        new webpack.DllReferencePlugin({
            context: '.',
            manifest: require(path.join(__dirname, '../../dlls', `${config.dirMd5}-mainfest.json`))
        })
    )
}

// 添加自定义配置
config.rules.forEach(rule => {
    const newRule = {
        ...rule,
        test: new RegExp(rule.test),
        include: rule.include ? rule.include.map(str => new RegExp(str)) : null,
        exclude: rule.include ? rule.exclude.map(str => new RegExp(str)) : null
    }

    if (newRule.include === null) {
        delete newRule.include
    }

    if (newRule.exclude === null) {
        delete newRule.exclude
    }

    webpackConfig.module.rules.push(newRule)
})

export default webpackConfig