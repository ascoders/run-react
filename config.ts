import * as path from 'path'
import * as process from 'process'

// 入口文件
export const entrys = [
    path.join(process.cwd(), 'index.ts')
]

// 本地 server 端口号
export const localPort = 8080

// 本地 dev 模式 webpack 文件服务端口号
export const localWebpackPort = 9091

// 静态资源路径前缀
export const publicPath = 'static'

// 发布静态资源路径前缀
export const staticPathPrefixProduction = '/'