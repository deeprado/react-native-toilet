const bcrypt = require("bcrypt")

// 公用类库
const PATH = "./public/data/"

function guidGenerate() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx"
    .replace(/[xy]/g, function(c) {
      var r = (Math.random() * 16) | 0,
        v = c === "x" ? r : (r & 0x3) | 0x8
      return v.toString(16)
    })
    .toUpperCase()
}

function writeData(newData, type) {
  var targetFile = PATH + type + ".json"
  // 需要拿到文件信息，解析
  fs.readFile(targetFile, function(err, data) {
    if (err) {
      return res.send({
        status: 0,
        info: "读取文件出现异常"
      })
    }
    // 历史数据
    var arr = JSON.parse(data.toString())
    // 加入新数据
    arr.splice(0, 0, newData)
    // 写入修改后数据
    var newArr = JSON.stringify(arr)
    fs.writeFile(targetFile, newArr, function(err, data) {
      if (err) {
        return {
          status: 0,
          info: "写入文件出现异常"
        }
      }
      return {
        status: 1,
        info: "写入成功",
        data: obj
      }
    })
  })
}

function passwordGenerage(password) {
  var salt = bcrypt.genSaltSync(10)
  var hash = bcrypt.hashSync(password, salt)
  return {
    salt,
    hash
  }
}

function passwordValidate(password, { salt, hash }) {
  return hash === bcrypt.hashSync(password, salt)
}

module.exports = {
  guidGenerate,
  passwordGenerage,
  passwordValidate,
  writeData
}

// export default {
//   guidGenerate,
// };
