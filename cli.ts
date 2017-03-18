#!/usr/bin/env node

import { execSync } from 'child_process'
import * as path from 'path'
const packageJson = require('../package.json')

const webpackPath = path.join(__dirname, '../node_modules/.bin/webpack')
const concurrentlyPath = path.join(__dirname, '../node_modules/.bin/concurrently')
const avaPath = path.join(__dirname, '../node_modules/.bin/ava')
const webpackDevServerPath = path.join(__dirname, 'src/webpack-dev-server.js')
const webpackDllPath = path.join(__dirname, 'src/webpack.dll.config.js')
const serverPath = path.join(__dirname, 'src/server.js')

const commander = require('commander')

commander
    .version(packageJson.version)
    .option('-d, --dev', 'Start dev server')
    .option('-t, --test', 'Run test')
    .parse(process.argv)

if (commander.dev) {
    execSync(`${webpackPath} --config ${webpackDllPath}`)

    const child = execSync(`${concurrentlyPath} --kill-others --prefix command "node ${webpackDevServerPath}" "node ${serverPath}"`, {
        stdio: 'inherit'
    })
}

if (commander.test) {
    const child = execSync(`${avaPath} **/*.test.ts`, {
        stdio: 'inherit'
    })
}