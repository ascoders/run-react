import * as color from 'colors';
import * as http from 'http';
import * as open from 'opn';
import * as portfinder from 'portfinder';

import html from '../html';

export async function runServer(webpackPort: number) {
    const server = http.createServer((req, res) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        res.end(html(webpackPort));
    });

    const serverPort = await portfinder.getPortPromise();

    server.listen(serverPort, () => {
        // tslint:disable-next-line:no-console
        console.log(color.green(`Server: http://localhost:${serverPort}`));
        open(`http://localhost:${serverPort}`);
    });
}
