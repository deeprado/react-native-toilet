var express = require('express');
var router = express.Router();
var fs = require('fs');
var xss = require('xss');
var util = require('../utils/common');
var PATH = './public/data/';

// 读取数据模块
// data/read?type=it
// data/read?type=it.json
router.get('/read', function(req, res, next) {
  var type = req.param('type') || 'it';
  fs.readFile(PATH + type + '.json', function(err, data) {
    if (err) {
      return res.send({
        status: 0,
        info: '读取文件出现异常',
      });
    }
    var COUNT = 50;
    var obj = [];
    try {
      obj = JSON.parse(data.toString());
    } catch(err) {
      console.log(err);
    }
    if (obj.length > COUNT) {
      obj = obj.slice(0, COUNT);
    }
    return res.send({
      status: 1,
      data: obj,
    });
  });
});

// 存储数据模块
router.post('/write', function(req, res, next) {
 
  let {type, title, url, img} = req.body;
  // // 指定文件名
  // var type = req.param('type') || 'it';
  // //  关键字段：
  // var url = req.param('url') || '';
  // var title = req.param('title') || '';
  // var img = req.param('img') || '';

  if (!type || !url || !title || !img) {
    return res.send({
      status: 0,
      info: '参数错误',
    });
  }

  var targetFile = PATH + type + '.json';
  // 需要拿到文件信息，解析
  fs.readFile(targetFile, function(err, data) {
    if (err) {
      return res.send({
        status: 0,
        info: '读取文件出现异常',
      });
    }
    // 历史数据
    var arr = JSON.parse(data.toString());
    // 新记录
    var obj = {
      img: img,
      url: url,
      title: title,
      id: util.guidGenerate(),
      time: new Date(),
    };
    arr.splice(0, 0, obj);
    // 写入修改后数据
    var newData = JSON.stringify(arr);
    fs.writeFile(targetFile, newData, function(err, data) {
      if (err) {
        return res.send({
          status: 0,
          info: '写入文件出现异常',
        });
      }
      return res.send({
        status: 1,
        info: '写入成功',
        data: obj,
      });
    });
  });
});

// 阅读模块
router.post('/write_config', function(req, res, next) {
   //TODO:后期进行提交数据的验证
  //防xss攻击 xss
  // npm install xss
  // require('xss')
  // var str = xss(name);
  var data = req.body.data;
  //TODO ： try catch
  var obj = JSON.parse(data);
  var newData = JSON.stringify(obj);
  //写入
  fs.writeFile(PATH + 'config.json', newData, function(err){
    if(err){
      return res.send({
        status: 0,
        info: '写入数据失败'
      });
    }
    return res.send({
      status: 1,
      info: obj
    });
  });
});

module.exports = router;
