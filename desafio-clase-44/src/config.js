import dotenv from 'dotenv';
import { Command } from 'commander';

const program = new Command();
program
    .option('-m --mode <mode>', 'Execution mode (PRODUCTION / DEVELOPMENT)')
    .parse(process.argv);
const cl_options = program.opts();

dotenv.config({ path: cl_options.mode == 'DEVEL' ? './.env.development': './.env.production' });

const cors_origins = process.env.ALLOWED_ORIGINS;
const config = {
    SERVER_PORT: process.env.SERVER_PORT,
    MONGOOSE_URL: process.env.MONGOOSE_URL,
    MYSQL_URL: process.env.MYSQL_URL,
    MYSQL_DB: process.env.MYSQL_DB,
    MYSQL_USER: process.env.MYSQL_USER,
    MYSQL_PASS: process.env.MYSQL_PASS,
    SECRET: process.env.SECRET,
    PERSISTENCE: process.env.PERSISTENCE,
    ALLOWED_ORIGINS: cors_origins.includes(',') ? cors_origins.split(',').map(item => item.trim()) : cors_origins,
    UPLOAD_DIR: process.env.UPLOAD_DIR
}

export default config;