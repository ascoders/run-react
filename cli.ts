#!/usr/bin/env node

import { execSync } from 'child_process'

const child = execSync(`./node_modules/.bin/concurrently --kill-others --prefix command "node built/src/webpack-dev-server.js"`, {
    stdio: 'inherit'
})