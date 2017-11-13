import { exec } from '../../utils/exec'
import { spinner } from '../../utils/log'
import { safeRunWithTempFolder } from '../../utils/file'
import { typescriptTemplateGit } from '../../config'
import * as process from 'process'

export default async () => {
  await spinner('拉取模版', async () => {
    await safeRunWithTempFolder(async tempPath => {
      // Clone the template code to the temporary folder.
      await exec(`git clone ${typescriptTemplateGit} ${tempPath}`)
      // Copy all the template code to current folder, except .git
      await exec(`rsync -a --exclude='.git/' ${tempPath}/ ${process.cwd()}`);
    })
  });
}