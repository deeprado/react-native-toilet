var express = require("express")
var router = express.Router()
var fs = require('fs')
const PATH = "./public/data/"

/* 首页 */
router.get("/", function(req, res, next) {
  res.render("index", { title: "Express Awesome" })
})

router.get("/login", function(req, res, next) {
  res.render("login", {})
})

router.get("/tuijian", function(req, res, next) {
  res.render("tuijian", {})
})

router.get("/edit", function(req, res, next) {
  var type = req.query.type
  if (type) {
    var obj = {}
    switch (type) {
      case "prose":
        obj = {}
        break
      case "it":
        obj = {}
        break
      case "manager":
        obj = {}
        break
      case "joke":
        obj = {}
        break
      default:
        return res.send({
          status: 0,
          info: "参数错误"
        })
        break
    }
    let targetFile = PATH + type + ".json"
    fs.readFile(targetFile, (err, data) => {
      if (err) {
        return res.send({
          status: 0,
          info: "失败....."
        })
      }
      var obj = JSON.parse(data.toString())
      return res.render("edit", {
        data: obj
      })
    })
  } else {
    return res.send({
      status: 0,
      info: "参数错误"
    })
  }
})

module.exports = router
