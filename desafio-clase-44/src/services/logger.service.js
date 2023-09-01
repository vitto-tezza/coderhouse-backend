

import dotenv from 'dotenv';
import winston from 'winston';

dotenv.config()

const logger = winston.createLogger({
    format: winston.format.json(),
    transports: [
        new winston.transports.Console({level: process.env.DEFAULT_LOG_LEVEL || 'info' }), 
        new winston.transports.File({level: 'warn', filename: './src/logs/errors.log'}),
    ]
})


const customLevelOptions = {
    levels: { high: 0, medium: 1, low: 2 },
    colors: { high: 'red', medium: 'yellow', low: 'blue' }
}


const custonLogger = winston.createLogger({
    levels: customLevelOptions.levels,
    transports: [
        new winston.transports.Console({
            level: 'low', 
            format: winston.format.combine(
                winston.format.colorize({colors: customLevelOptions.colors}),
                winston.format.simple()
            )
        }),
        new winston.transports.File({ level: 'medium', filename: './src/logs/errors.log' }),
    ]
})


export const loggerService = (req, res, next) => {

    req.logger = logger
    req.logger.log(process.env.DEFAULT_LOG_LEVEL || 'info', `${req.method} ${req.url} ${new Date().toLocaleTimeString()}`)


    next();
}