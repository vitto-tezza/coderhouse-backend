const sessionMiddleware = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect("/sessions/login.html");
  }
};

export default sessionMiddleware;
