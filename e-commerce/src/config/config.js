import dotenv from "dotenv";
import { Command } from "commander";

const program = new Command();
program
  .version("2.0.1")
  .option("-p --port <port>", "Execution port", 5000)
  .option(
    "-m --mode <mode>",
    "Execution mode (PRODUCTION / DEVELOPMENT)",
    "DEVELOPMENT"
  )
  .option("-d --debug", "Activate / deactivate debug", false)
  .parse(process.argv);
const cl_options = program.opts();

dotenv.config({
  path:
    cl_options.mode == "DEVELOPMENT"
      ? "./.env.development"
      : "./.env.production",
});

const config = {
  VERSION: process.env.VERSION,
  SERVER_PORT: cl_options.port,
  MONGOOSE_URL: process.env.MONGOOSE_URL,
};

export default config;
