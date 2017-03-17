import * as path from 'path'
import * as fs from 'fs'
import * as process from 'process'

interface ProjectConfig {
    // 入口文件
    entrys: string[]
}

// 读取当前项目的配置文件
let projectConfig: ProjectConfig

try {
    projectConfig = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'run-react.json')).toString())
} catch (error) {
    throw Error(`create 'run-react.json' in root directory`)
}

// 入口文件
export const entrys = projectConfig.entrys ? projectConfig.entrys.map(entry => {
    return path.join(process.cwd(), entry)
}) : []

// 本地 server 端口号
export const localPort = 8080

// 本地 dev 模式 webpack 文件服务端口号
export const localWebpackPort = 9091

// 静态资源路径前缀
export const publicPath = 'static'

// 发布静态资源路径前缀
export const staticPathPrefixProduction = '/'