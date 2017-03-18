import * as path from 'path'
import * as webpack from 'webpack'
import * as config from '../config'
import * as crypto from 'crypto'

export default {
    entry: {
        library: config.dlls
    },

    output: {
        filename: `${config.dirMd5}.dll.js`,
        path: path.join(__dirname, '../../dlls'),
        library: 'library'
    },

    plugins: [
        new webpack.DllPlugin({
            path: path.join(__dirname, '../../dlls', `${config.dirMd5}-mainfest.json`),
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
    }
}