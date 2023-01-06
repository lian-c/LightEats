const authCheck = (req, res, next) => {
  if (!req.session.admin != "admin") res.redirect("/admin/login")
  return next();
}


module.exports = authCheck;