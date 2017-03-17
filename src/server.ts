import * as http from 'http'
import * as color from 'colors'

import * as config from '../config'
import html from './html'

const server = http.createServer((req, res) => {
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/html')
    res.end(html)
})

server.listen(config.serverPort, () => {
    console.log(color.green(`Server: http://localhost:${config.serverPort}`))
})