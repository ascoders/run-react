import * as fs from 'fs';
import * as path from 'path';
import * as yargs from 'yargs';
import * as config from './config';
import { md5 } from './utils/math'
import { getProjectConfig, getDllName } from './utils/webpack-runtime-helper'

const projectConfig = getProjectConfig()

export default (webpackPort: number) => `
<!DOCTYPE html>
<html lang="zh-cn">
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible"
      content="IE=edge">
<meta name="format-detection"
      content="telephone=no">
<title>run-react</title>

<style>
      html, body {
            margin: 0;
            padding: 0;
      }
</style>

<body>
    <div id='react-dom'></div>
</body>

${projectConfig.dlls.length > 0 ? `
      <script src='http://127.0.0.1:${webpackPort}/dlls/${getDllName()}.dll.js'></script>` : ``
      }

<script src='http://127.0.0.1:${webpackPort}/bundle.js'></script>
</html>
`;
