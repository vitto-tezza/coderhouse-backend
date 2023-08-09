const requireAuth = (req, res, next) => {
  if (req.session && req.session.userId) {
    next();
  } else {
    return res
      .status(401)
      .json({ status: "error", message: "Acceso no autorizado" });
  }
};

module.exports = { requireAuth };
