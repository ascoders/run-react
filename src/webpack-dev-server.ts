import * as webpackDevServer from 'webpack-dev-server'
import * as webpack from 'webpack'
import webpackDevConfig from './webpack.dev.config'
import * as config from '../config'
import * as fs from 'fs'
import * as path from 'path'
import * as colors from 'colors'

const server = new webpackDevServer(webpack(webpackDevConfig), {
    // 让其可以 server 所有当前目录下的文件，比如 dlls
    contentBase: path.join(__dirname, '../../'),
    publicPath: webpackDevConfig.output.publicPath,
    hot: true,
    compress: true,
    historyApiFallback: true,
    stats: {
        colors: true
    },
    headers: { "Access-Control-Allow-Origin": "*" }
})

server.listen(config.webpackPort, 'localhost', () => {
    console.log(colors.green(`Webpack hot bundle: http://localhost:${config.webpackPort}/bundle.js`))
})