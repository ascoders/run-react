import * as path from 'path'
import * as fs from 'fs'
import * as process from 'process'
import * as crypto from 'crypto'

function md5(text: string) {
    return crypto.createHash('md5').update(text).digest('hex')
}

interface ProjectConfig {
    // 入口文件
    entrys: string[]
    // 本地 server 端口号
    localPort: number
    // webpack 文件服务端口号
    webpackPort: number
    // 需要 dll 的包名
    dlls: string[]
    // 自定义规则
    rules?: Array<{
        test: string
        use: string[]
        include?: string[]
        exclude?: string[]
    }>
}

// 读取当前项目的配置文件
let projectConfig: ProjectConfig

const runReactPath = path.join(process.cwd(), 'run-react.json')
const packageJsonPath = path.join(process.cwd(), 'package.json')

if (fs.existsSync(runReactPath)) {
    projectConfig = JSON.parse(fs.readFileSync(runReactPath).toString())
}

if (fs.existsSync(packageJsonPath)) {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath).toString())
    if (packageJson['run-react']) {
        projectConfig = packageJson['run-react']
    }
}

if (!projectConfig) {
    throw Error(`add run-react to package.json or create 'run-react.json' in root directory.`)
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

/**
 * 当前路径的 md5
 */
export const dirMd5 = md5(process.cwd())

/**
 * 自定义规则
 */
export const rules = projectConfig.rules || []