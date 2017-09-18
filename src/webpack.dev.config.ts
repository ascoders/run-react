import * as webpack from 'webpack'
import * as path from 'path'
import * as portfinder from 'portfinder';
import { md5 } from './utils/math'
import { projectCwd, getDllName, getDllDir, getProjectConfig, cliCwd } from './utils/webpack-runtime-helper'

export async function getWebpackConfig(validatePort: number) {
    // 项目配置
    const projectConfig = getProjectConfig()

    const webpackConfig: any = {
        devtool: 'cheap-module-source-map' as 'cheap-module-source-map',

        entry: [
            `webpack-dev-server/client?http://localhost:${validatePort}`,
            'webpack/hot/only-dev-server',
            ...projectConfig.entrys
        ],

        output: {
            path: __dirname,
            publicPath: `http://localhost:${validatePort}/`,
            filename: 'bundle.js'
        },

        module: {
            rules: [
                {
                    test: /\.(jsx|js)?$/,
                    exclude: [/node_modules/],
                    use: ['react-hot-loader/webpack']
                }, {
                    test: /\.(tsx|ts)?$/,
                    exclude: [/node_modules/],
                    use: ['react-hot-loader/webpack', 'ts-loader']
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
                path.join(projectCwd),
                path.join(projectCwd, 'node_modules'),
                'node_modules'
            ],
            extensions: ['.js', '.jsx', '.ts', '.tsx']
        },

        plugins: [
            new webpack.DefinePlugin({
                'process.env': {
                    NODE_ENV: JSON.stringify('development'),
                    WEBPACK_PORT: validatePort
                }
            }),
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NoEmitOnErrorsPlugin(),
            new webpack.ProgressPlugin({
                profile: false
            })
        ],

        performance: {
            // 关闭性能提示
            hints: false,
        }
    };

    // 如果有 dll，就添加读取 dll 的插件
    if (projectConfig.dlls.length > 0) {
        webpackConfig.plugins.push(
            new webpack.DllReferencePlugin({
                context: '.',
                manifest: require(path.join(getDllDir(), `${getDllName()}-mainfest.json`))
            })
        );
    }

    // 添加自定义配置
    projectConfig.rules.forEach(rule => {
        const newRule = {
            ...rule,
            test: new RegExp(rule.test),
            include: rule.include ? rule.include.map(str => new RegExp(str)) : null,
            exclude: rule.include ? rule.exclude.map(str => new RegExp(str)) : null
        };

        if (newRule.include === null) {
            delete newRule.include;
        }

        if (newRule.exclude === null) {
            delete newRule.exclude;
        }

        webpackConfig.module.rules.push(newRule);
    });

    return webpackConfig;
}