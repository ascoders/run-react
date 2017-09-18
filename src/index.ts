#!/usr/bin/env node

import { execSync } from 'child_process'
import * as path from 'path'
import * as fs from 'fs'
import { spinner } from './utils/log'
import { exec } from './utils/exec'

const packageJson = require('../package.json')

// 当前项目目录
const projectCwd = process.cwd();

// 当前 cli 的目录。
// 让所有 webpack 命令都在 cli 目录执行，否则 webpack 会自动寻找当前目录 webpack，会受到当前目录 webpack 影响
const cliCwd = path.join(__dirname, '..');

const webpackPath = getPathInNodeModules('.bin/webpack')
const concurrentlyPath = getPathInNodeModules('.bin/concurrently')
const avaPath = getPathInNodeModules('.bin/ava')

const webpackDevServerPath = path.join(__dirname, 'webpack-dev-server.js')
const webpackDllPath = path.join(__dirname, 'webpack.dll.config.js')
const serverPath = path.join(__dirname, 'server.js')

const commander = require('commander')

// 获取 node_modules 中文件
function getPathInNodeModules(targetPath: string) {
    const path1 = path.join(__dirname, '../node_modules', targetPath)
    const path2 = path.join(__dirname, '../../node_modules', targetPath)
    const path3 = path.join(__dirname, '../../../node_modules', targetPath)
    if (fs.existsSync(path1)) {
        return path1
    } else if (fs.existsSync(path2)) {
        return path2
    } else {
        return path3
    }
}

commander.version(packageJson.version)

commander.command('start')
    .description('Start dev server')
    .action(async () => {
        // 设置了 dll 才会解析
        // if (config.dlls.length > 0) {
        await spinner('编译 dlls', async () => {
            await exec(`${webpackPath} --config ${webpackDllPath} --env.projectCwd ${projectCwd} --env.cliCwd ${cliCwd}`, {
                cwd: cliCwd
            })
        })
        // }

        execSync(`${concurrentlyPath} -r --kill-others --prefix command "node ${webpackDevServerPath} --progress --env.projectCwd ${projectCwd} --env.cliCwd ${cliCwd}"`, {
            stdio: 'inherit',
            cwd: cliCwd
        })
    })

commander.command('test')
    .description('Start dev server')
    .action(() => {
        const child = execSync(`${avaPath} **/*.test.ts`, {
            stdio: 'inherit'
        })
    })

commander.parse(process.argv)