#!/usr/bin/env node

import { execSync } from 'child_process'
import * as path from 'path'

const concurrentlyPath = path.join(__dirname, '../node_modules/.bin/concurrently')
const webpackDevServerPath = path.join(__dirname, 'src/webpack-dev-server.js')

const child = execSync(`${concurrentlyPath} --kill-others --prefix command "node ${webpackDevServerPath}"`, {
    stdio: 'inherit'
})