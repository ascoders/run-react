import * as webpackDevServer from 'webpack-dev-server'
import * as webpack from 'webpack'
import webpackDevConfig from './webpack.dev.config'
import * as config from '../config'
import * as fs from 'fs'
import * as path from 'path'

const server = new webpackDevServer(webpack(webpackDevConfig), {
    publicPath: webpackDevConfig.output.publicPath,
    hot: true,
    compress: true,
    historyApiFallback: true,
    stats: {
        colors: true
    }
})

server.listen(config.localWebpackPort, 'localhost', () => {
    console.log(`webpack hot bundle: http://localhost:${config.localWebpackPort}/bundle.js`)
})