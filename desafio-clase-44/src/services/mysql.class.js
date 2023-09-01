
import mysql from 'mysql2/promise';
import config from '../config.js';


class MysqlSingleton {
    constructor() {
        this.connection = null;
        this.connect();
    }

    async connect() {
        if (this.connection === null) {
            this.connection = await mysql.createConnection({
                host: config.MYSQL_URL,
                user: config.MYSQL_USER,
                password: config.MYSQL_PASS,
                database: config.MYSQL_DB
            })
            
            console.log('Instancia singleton Mysql creada')
        }
    }

    async getInstance() {
        return this.connection;
      }
}

export default new MysqlSingleton();