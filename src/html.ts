import * as config from '../config'

export default `
<!DOCTYPE html>
<html lang="zh-cn">
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible"
      content="IE=edge">
<meta name="format-detection"
      content="telephone=no">
<title>run-react</title>

<body>
    <div id='react-dom'></div>
</body>

${config.dlls.length > 0
      && `<script src='http://localhost:${config.webpackPort}/dlls/${config.dirMd5}.dll.js'></script>`}
<script src='http://localhost:${config.webpackPort}/bundle.js'></script>
</html>
`