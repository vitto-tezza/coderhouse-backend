const authMiddleware = (req, res, next) => {
  if (req.headers.role === "admin") {
    next();
  } else {
    console.log(
      `Hubo un acceso en la ruta '${req.path}' método '${req.method}' no autorizada por falta de credenciales`
    );
    res.send({
      error: -1,
      descripcion: `ruta '${req.path}' método '${req.method}' no autorizada`,
    });
  }
};

export default { authMiddleware };
