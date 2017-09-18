import * as crypto from 'crypto';
import * as path from 'path';
import * as webpack from 'webpack';
import * as yargs from 'yargs';
import { md5 } from './utils/math';
import * as config from './config';
import { getProjectConfig, getDllName, getDllDir, projectCwd, cliCwd } from './utils/webpack-runtime-helper'

const projectConfig = getProjectConfig()

export default {
    entry: {
        library: projectConfig.dlls
    },

    output: {
        filename: `${getDllName()}.dll.js`,
        path: getDllDir(),
        library: 'library'
    },

    plugins: [
        new webpack.DllPlugin({
            path: path.join(getDllDir(), `${getDllName()}-mainfest.json`),
            name: 'library'
        })
    ],

    module: {
        rules: [
            {
                test: /\.css/,
                use: ['style-loader', 'css-loader']
            }, {
                test: /\.json$/,
                use: ['json-loader']
            }
        ]
    },

    resolve: {
        modules: [
            // 从项目 node_modules 寻找
            path.join(projectCwd, 'node_modules'),
            'node_modules'
        ]
    }
};
