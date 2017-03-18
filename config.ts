import * as path from 'path'
import * as fs from 'fs'
import * as process from 'process'

interface ProjectConfig {
    // 入口文件
    entrys: string[]
    // 本地 server 端口号
    localPort: number
    // webpack 文件服务端口号
    webpackPort: number
    // 需要 dll 的包名
    dlls: string[]
}

// 读取当前项目的配置文件
let projectConfig: ProjectConfig

try {
    projectConfig = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'run-react.json')).toString())
} catch (error) {
    throw Error(`create 'run-react.json' in root directory`)
}

/**
 * 入口文件
 */
export const entrys = projectConfig.entrys ? projectConfig.entrys.map(entry => {
    return path.join(process.cwd(), entry)
}) : []

/**
 * server 端口号
 */
export const serverPort = projectConfig.localPort || 8080

/**
 * webpack 文件服务端口号
 */
export const webpackPort = projectConfig.webpackPort || 9091

/**
 * 需要 dll 的包名
 */
export const dlls = projectConfig.dlls || []