const http = require('http');
const fs = require('fs');
const crypto = require('crypto');
const database = require('./Database.class.js').instance;

database.createConnection();

class Server {

    constructor () {
        this.hostname = '127.0.0.1';
        this.port = 3000;
    }

    start () {
        this.server = http.createServer(this.serverInit.bind(this));
    }

    listen () {
        this.server.listen(this.port, this.hostname, () => {
            console.log(`Server running at http://${this.hostname}:${this.port}/`);
        });
    }

    getBroadcastNewsAPI (request, response) {
        response.end('Here are some new broacasts: 1, 2, 3\n');
    }

    createUserAPI (request, response) {
        if (request.method === 'POST') {
            var algorithm = 'aes-256-ctr',
                password = 'cclylfoxh7',
                fullRequestData = '',
                requestDataObject = {};

            request.on('data', handleDataReceive);
            request.on('end', handleFullDataReceive);
        }

        function handleDataReceive (chunk) {
            fullRequestData += chunk;
        }

        function handleFullDataReceive () {
            requestDataObject = JSON.parse(fullRequestData);

            var salt = Math.random().toString(36).substr(2, 10) + '/',
                formattedRequestData =
                    '("' +
                    requestDataObject.login +
                    '", "' +
                    encrypt(salt + requestDataObject.password)
                    + '");';

            database.query('SELECT * FROM users WHERE email = "' + requestDataObject.login + '";', handleDatabaseSelectQuery(formattedRequestData));
        }

        function handleDatabaseSelectQuery (formattedRequestData) {
            return function (err, rows) {
                if (err) throw err;
                if (rows.length === 0) {
                    database.query('INSERT INTO users (email, password) VALUES ' + formattedRequestData, handleDatabaseInsertQuery);
                    response.writeHeader(200);
                    response.end('User successfully created');
                } else {
                    response.writeHeader(403);
                    response.end('User already exists');
                }
            }
        }

        function handleDatabaseInsertQuery (err, rows) {
            if (err) throw err;
        }

        function encrypt(text){
            var cipher = crypto.createCipher(algorithm, password),
                crypted = cipher.update(text, 'utf8', 'hex');

            crypted += cipher.final('hex');

            return crypted;
        }

        function decrypt(text){
            var decipher = crypto.createDecipher(algorithm, password),
                dec = decipher.update(text, 'hex', 'utf8');

            dec += decipher.final('utf8');

            return dec;
        }
    }

    serverInit (request, response) {
        var url = request.url.replace('/', '');

        if (url === '') {
            url = 'index.html';
        }

        switch (url) {

            case 'getBroadcasts':
                this.getBroadcastNewsAPI(request, response);
            break;

            case 'users/create':
                this.createUserAPI(request, response);
            break;

            default:
                var self = this;

                fs.readFile(url, function (err, fileContent) {
                    if (!fileContent) {
                        response.writeHeader(404);
                        response.end();
                        return;
                    }
                    response.writeHeader(200, {'Content-Type':  self.getFileExtension(url)});
                    response.write(fileContent);
                    response.end();
                    self = null;
                });
            break;
        }
    }

    getFileExtension (fileDirectory) {
        var fileTypeMatches = fileDirectory.match(/\w+\.\w+$/);

        if (!fileTypeMatches) return null;

        var fileType = fileTypeMatches[0].replace(/^\w+\./, '');

        if (!fileType) return null;

        switch (fileType) {
            case 'js':
                return 'text/javascript';
            break;

            case 'html':
                return 'text/html';
            break;

            case 'css':
                return 'text/css';
            break;

            case 'woff':
            case 'woff2':
            case 'otf':
            case 'eot':
                return 'application/x-font-opentype';
            break;

            default:
                console.log('Unknown filetype: ', fileType);
                return null;
            break;
        }
    }

}

module.exports.server = Server;