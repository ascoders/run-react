import * as webpackDevServer from 'webpack-dev-server'
import { getWebpackConfig } from './webpack.dev.config';
import * as config from './config'
import * as fs from 'fs'
import * as path from 'path'
import * as colors from 'colors'
import { createCompiler } from './utils/webpack-dev-server-utils';
import * as portfinder from 'portfinder';
import { cliCwd } from './utils/webpack-runtime-helper'

async function startServer() {
    const validatePort = await portfinder.getPortPromise();

    const webpackDevConfig = await getWebpackConfig(validatePort);

    const compiler = await createCompiler(validatePort);

    const devServer = new webpackDevServer(compiler, {
        // 让其可以 server 所有当前目录下的文件，比如 dlls
        contentBase: path.join(cliCwd, 'built'),
        publicPath: webpackDevConfig.output.publicPath,
        hot: true,
        // Enable gzip compression of generated files.
        compress: true,
        historyApiFallback: true,
        // Silence WebpackDevServer's own logs since they're generally not useful.
        // It will still show compile warnings and errors with this setting.
        clientLogLevel: 'none',
        stats: {
            assets: true,
            colors: true,
            version: false,
            hash: false,
            timings: false,
            chunks: false,
            chunkModules: false
        },
        watchOptions: {
            ignored: /node_modules/,
        },
        // By default files from `contentBase` will not trigger a page reload.
        watchContentBase: true,
        headers: { 'Access-Control-Allow-Origin': '*' }
    } as any);

    devServer.listen(validatePort, '127.0.0.1', () => {
        // tslint:disable-next-line:no-console
        console.log(colors.green(`Webpack hot bundle: http://localhost:${validatePort}/bundle.js`));
    });
}

startServer();