import * as crypto from 'crypto';

/**
 * 生成字符串 md5
 */
export function md5(str: string) {
  return crypto.createHash('md5').update(str, 'utf8').digest('hex');
}
