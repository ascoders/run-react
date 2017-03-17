#!/usr/bin/env node

import { execSync } from 'child_process'

const child = execSync('npm start', {
    stdio: 'inherit'
})