import winston from "winston";
import { getUsersData } from "../services/users.service.js";

const developmentLogger = winston.createLogger({
  level: "debug",
  transports: [new winston.transports.Console()],
});

const productionLogger = winston.createLogger({
  level: "info",
  transports: [new winston.transports.File({ filename: "errors.log" })],
});

const getLogger = () => {
  return process.env.NODE_ENV === "production"
    ? productionLogger
    : developmentLogger;
};

export const getUsers = (req, res) => {
  const logger = getLogger();

  try {
    const users = getUsersData();

    logger.info("Se obtuvieron los usuarios exitosamente.");

    res.status(200).json({ status: "OK", payload: users });
  } catch (error) {
    logger.error(`Error al obtener los usuarios: ${error.message}`);

    res
      .status(500)
      .json({
        status: "Error",
        message: "Ha ocurrido un error en el servidor.",
      });
  }
};
