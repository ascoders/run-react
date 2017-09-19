#!/usr/bin/env node

import { execSync } from 'child_process'
import * as path from 'path'
import * as fs from 'fs'
import { spinner } from './utils/log'
import { exec } from './utils/exec'
import * as commander from 'commander'
import { getProjectConfig } from './utils/webpack-runtime-helper';
import { findPath } from './utils/package-finder'

const cliPackageJson = require('../package.json')
const projectCwd = process.cwd();
const cliCwd = path.join(__dirname, '..');

const webpackPath = findPath('webpack')
const concurrentlyPath = findPath('concurrently')
const avaPath = findPath('ava')

const webpackDevServerPath = path.join(__dirname, 'webpack-dev-server.js')
const webpackDllPath = path.join(__dirname, 'webpack.dll.config.js')
const serverPath = path.join(__dirname, 'server.js')
const webpackProdConfigPath = path.join(__dirname, 'webpack.prod.config.js')

const projectConfig = getProjectConfig(projectCwd)

commander.version(cliPackageJson.version)

commander.command('develop')
    .description('start dev server')
    .action(async () => {
        // 设置了 dll 才会解析
        if (projectConfig.dlls.length > 0) {
            await spinner('编译 dlls', async () => {
                await exec(`${webpackPath} --config ${webpackDllPath} --env.projectCwd ${projectCwd} --env.cliCwd ${cliCwd}`, {
                    cwd: cliCwd
                })
            })
        }

        execSync(`${concurrentlyPath} -r --kill-others --prefix command "node ${webpackDevServerPath} --progress --env.projectCwd ${projectCwd} --env.cliCwd ${cliCwd}"`, {
            stdio: 'inherit',
            cwd: cliCwd
        })
    })

commander.command('production')
    .description('build production bundle')
    .action(async () => {
        execSync(`node ${webpackPath} --config ${webpackProdConfigPath} --progress --env.projectCwd ${projectCwd} --env.cliCwd ${cliCwd}`, {
            stdio: 'inherit',
            cwd: cliCwd
        })
    })

commander.command('test')
    .description('run test')
    .action(() => {
        execSync(`${avaPath} **/*.test.ts`, {
            stdio: 'inherit'
        })
    })

commander.parse(process.argv)