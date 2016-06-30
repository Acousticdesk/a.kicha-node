var mysql = require('mysql');

class Database {

    constructor (host, user, password, database) {
        this.connectionOptions = {
            host     : host,
            user     : user,
            password : password,
            database : database
        };
    }

    query (queryString, queryHandler) {
        this.connection.query(queryString, queryHandler);
    }

    connect () {
        if (this.connection) {
            this.connection.connect();
        }
    }

    end () {
        if (this.connection) {
            this.connection.end();
        }
    }

    createConnection () {
        this.connection = mysql.createConnection(this.connectionOptions);
    }

}

const database = new Database('localhost', 'root', '', 'personal_cabinet');

module.exports.instance = database;