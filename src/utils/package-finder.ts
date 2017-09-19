import * as fs from 'fs'
import * as path from 'path'

export function findPath(name: string) {
  // 优先从当前目录寻找
  const cliPath = path.join(__dirname, '../../node_modules/.bin', name)
  if (fs.existsSync(cliPath)) {
    return cliPath
  }

  // cli 被本地安装，依赖打平了
  const parentPath = path.join(__dirname, '../../../../node_modules/.bin', name)
  if (fs.existsSync(parentPath)) {
    return parentPath
  }
}