import * as colors from 'colors';
import * as formatJson from 'format-json';
import * as fs from 'fs';
import * as path from 'path';
import * as config from '../config';
import { exec } from './exec';
import * as crypto from 'crypto'

/**
 * 获得一个临时文件夹路径名（每次执行都不一样）
 */
function getTempFolder() {
  const ramdomId = crypto.randomBytes(20).toString('hex');
  return path.join(process.env.HOME, '.runReact' + ramdomId);
};

/**
 * 保存 json 到文件
 */
export function saveJson(filePath: string, json: any) {
  fs.writeFileSync(filePath, formatJson.plain(json));
}

/**
 * 执行一段函数，执行时确保存在临时文件夹，如果执行失败，清空临时文件夹
 */
export async function safeRunWithTempFolder(fn: (tempPath?: string) => any) {
  // 获取一个临时文件夹路径
  const tempFolderPath = getTempFolder();

  if (fs.existsSync(tempFolderPath)) {
    // tslint:disable-next-line:no-console
    console.log(colors.red(`已存在临时文件夹 ${tempFolderPath}`));
    process.exit(0);
  }

  try {
    // 先创建临时文件夹
    await exec(`mkdir -p ${tempFolderPath}`);

    // 执行函数
    await fn.apply(null, [tempFolderPath]);

    // 正常执行完了删除临时文件夹
    await exec(`rm -rf ${tempFolderPath}`);
  } catch (error) {
    // 出错了就删除临时文件夹
    await exec(`rm -rf ${tempFolderPath}`);
  }
}
