#!/usr/bin/env node

import { execSync } from 'child_process'
import * as path from 'path'
import * as config from './config'
import * as fs from 'fs'
const packageJson = require('../package.json')

const webpackPath = getPathInNodeModules('.bin/webpack')
const concurrentlyPath = getPathInNodeModules('.bin/concurrently')
const avaPath = getPathInNodeModules('.bin/ava')

const webpackDevServerPath = path.join(__dirname, 'src/webpack-dev-server.js')
const webpackDllPath = path.join(__dirname, 'src/webpack.dll.config.js')
const serverPath = path.join(__dirname, 'src/server.js')

const commander = require('commander')

// 获取 node_modules 中文件
function getPathInNodeModules(targetPath: string) {
    const currentPath = path.join(__dirname, '../node_modules', targetPath)
    if (fs.existsSync(currentPath)) {
        return currentPath
    } else {
        return path.join(__dirname, '../../node_modules', targetPath)
    }
}

commander
    .version(packageJson.version)
    .option('-d, --dev', 'Start dev server')
    .option('-t, --test', 'Run test')
    .parse(process.argv)

commander.command('start')
    .description('Start dev server')
    .action(() => {
        // 设置了 dll 才会解析
        if (config.dlls.length > 0) {
            console.log('Start package dlls')
            execSync(`${webpackPath} --config ${webpackDllPath}`, {
                stdio: 'inherit'
            })
            console.log('Finshed package dlls')
        }

        const child = execSync(`${concurrentlyPath} --kill-others --prefix command "node ${webpackDevServerPath}"`, {
            stdio: 'inherit'
        })
    })

commander.command('Run test')
    .description('Start dev server')
    .action(() => {
        const child = execSync(`${avaPath} **/*.test.ts`, {
            stdio: 'inherit'
        })
    })

