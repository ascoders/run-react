import * as webpackDevServer from 'webpack-dev-server'
import * as webpack from 'webpack'
import webpackDevConfig from './webpack.dev.config'
import * as config from '../config'
import * as fs from 'fs'
import * as path from 'path'
import * as colors from 'colors'

const server = new webpackDevServer(webpack(webpackDevConfig), {
    publicPath: webpackDevConfig.output.publicPath,
    hot: true,
    compress: true,
    historyApiFallback: true,
    stats: {
        colors: true
    }
})

server.listen(config.webpackPort, 'localhost', () => {
    console.log(colors.green(`Webpack hot bundle: http://localhost:${config.webpackPort}/bundle.js`))
})