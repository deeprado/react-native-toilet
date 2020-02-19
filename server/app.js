var createError = require("http-errors")
var express = require("express")
var favicon = require('serve-favicon')

var path = require("path")
var cookieParser = require("cookie-parser")
// const bodyParser = require('body-parser');
var session = require("express-session")

var logger = require("morgan")
var validator = require("./middleware/validator")

var indexRouter = require("./routes/index")
var userRouter = require("./routes/user")
var dataRouter = require("./routes/data")
var authRouter = require("./routes/auth")
var apiRouter = require("./routes/api")
var webviewRouter = require('./routes/webview');

var app = express()

let sessionConfig = {
  secret: "asdfasdfsd",
  resave: true,
  saveUninitialized: false,
  cookie: {
    // httpOnly: true,
    maxAge: 7200,
    // sameSite: true,
    // path: "/sessions"
  }
}
if (app.get("env") === "production") {
  app.set("trust proxy", 1) // trust first proxy
  sessionConfig.cookie.secure = true // serve secure cookies
}
app.use(session(sessionConfig))

// view engine setup
app.set("views", path.join(__dirname, "views"))
app.set("view engine", "ejs")

app.use(logger("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, "public")))

app.use(validator.logined)
app.use("/", indexRouter)
app.use("/user", userRouter)
app.use("/data", dataRouter)
app.use("/auth", authRouter)
app.use("/api", apiRouter)
app.use("/webview", webviewRouter)


app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404))
})

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get("env") === "development" ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render("error")
})

module.exports = app
