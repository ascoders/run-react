import * as path from 'path'
import * as webpack from 'webpack'
import * as config from '../config'
import * as crypto from 'crypto'

function md5(text: string) {
    return crypto.createHash('md5').update(text).digest('hex')
};

// 当前路径的 md5
const dirMd5 = md5(process.cwd())

console.log('cwd', process.cwd())

export default {
    entry: {
        library: config.dlls
    },

    output: {
        filename: `${dirMd5}.dll.js`,
        path: path.join(__dirname, '../../dlls'),
        library: 'library'
    },

    plugins: [
        new webpack.DllPlugin({
            path: path.join(__dirname, '../../dlls', 'library-mainfest.json'),
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