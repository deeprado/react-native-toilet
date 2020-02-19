const passUrls = ["/login", "/user/login"]
const imgUrls = ["/favicon.ico"]

function logined(req, res, next) {
  // var url = req.originalUrl
  // console.log(url)
  // if (passUrls.indexOf(url) < 0 && !req.session.user) {
  //   return res.redirect("/login")
  // }
  // if (passUrls.indexOf(url) > -1 && req.session.user) {
  //   return res.redirect("/")
  // }
  next()
}

module.exports = {
  logined
}
