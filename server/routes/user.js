var express = require("express")
var router = express.Router()

/* 获取用户列表. */
router.get("/", function(req, res, next) {
  res.send("respond with a resource")
})

router.post("/login", function(req, res, next) {
  let { username, password } = req.body

  if (username === "admin" && password === "123456") {
    req.session.user = {
      username: username
    }
    return res.send({
      status: 1
    })
  }
  return res.send({
    status: 0,
    info: "登录失败"
  })
})

module.exports = router
