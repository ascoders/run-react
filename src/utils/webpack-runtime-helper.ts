import * as yargs from 'yargs';
import * as fs from 'fs'
import * as path from 'path'
import { md5 } from './math'

interface IProjectConfig {
  // 入口文件
  entrys: string[]
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

export const projectCwd = yargs.argv.env && yargs.argv.env.projectCwd;
export const cliCwd = yargs.argv.env && yargs.argv.env.cliCwd;

/**
 * 获取项目配置信息
 */
export function getProjectConfig(currentProjectCwd = projectCwd) {
  // 读取当前项目的配置文件
  let projectConfig: IProjectConfig

  const runReactPath = path.join(currentProjectCwd, 'run-react.json')
  const packageJsonPath = path.join(currentProjectCwd, 'package.json')

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

  // 设置默认值
  projectConfig = Object.assign({
    entrys: ['src/index'],
    dlls: [],
    rules: []
  }, projectConfig)

  return projectConfig
}

/**
 * 获取 dll 名称
 */
export function getDllName() {
  return md5(projectCwd);
}

/**
 * 获取 dll 目录
 */
export function getDllDir() {
  return path.join(__dirname, '../dlls')
}