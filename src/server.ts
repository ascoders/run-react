import * as http from 'http'
import * as config from '../config'
import * as color from 'colors'

const server = http.createServer((req, res) => {
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/html')
    res.end('Hello World\n')
})

server.listen(config.serverPort, () => {
    console.log(color.green(`Server: http://localhost:${config.serverPort}`))
})