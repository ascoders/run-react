import * as yargs from 'yargs';
import * as fs from 'fs'
import * as path from 'path'
import { md5 } from './math'

class ProjectConfig {
  // 入口文件
  entrys: string[] = ["src/index"]
  // 需要 dll 的包名
  dlls: string[] = []
  // 自定义规则
  rules?: Array<{
    test: string
    use: string[]
    include?: string[]
    exclude?: string[]
  }> = []
  // production 配置
  production?: {
    path?: string
    filename?: string
  } = {
    path: "built",
    filename: "bundle.js"
  }
}

export const projectCwd = yargs.argv.env && yargs.argv.env.projectCwd;
export const cliCwd = yargs.argv.env && yargs.argv.env.cliCwd;

/**
 * 获取项目配置信息
 */
export function getProjectConfig(currentProjectCwd = projectCwd) {
  // 读取当前项目的配置文件
  let projectConfig = new ProjectConfig()

  const runReactPath = path.join(currentProjectCwd, 'run-react.json')
  const packageJsonPath = path.join(currentProjectCwd, 'package.json')

  if (fs.existsSync(runReactPath)) {
    projectConfig = {
      ...JSON.parse(fs.readFileSync(runReactPath).toString()),
      ...projectConfig
    }
  }

  if (fs.existsSync(packageJsonPath)) {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath).toString())
    if (packageJson['run-react']) {
      projectConfig = {
        ...JSON.parse(fs.readFileSync(runReactPath).toString()),
        ...packageJson['run-react']
      }
    }
  }

  if (!projectConfig) {
    throw Error(`add run-react to package.json or create 'run-react.json' in root directory.`)
  }

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