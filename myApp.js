let express = require('express');
let app = express();
//const mySecret = process.env['MESSAGE_STYLE']

console.log("Hello World")
app.use(function(req, res, next){
  console.log(req.method + " " + req.path + " - " + req.ip)
  next()
})

app.get("/", function(req, res){
  res.sendFile(__dirname + '/views/index.html')
})

app.use("/public", express.static(__dirname + "/public"))

app.get("/json", function(req, res){
  if (process.env['MESSAGE_STYLE'] === "uppercase") {
    res.json({
      "message": "HELLO JSON"
    })
  } else {
    res.json({
      "message": "Hello json"
    })
  }
})

app.get("/now", function(req, res, next){
  req.time = new Date().toString()
  next()
}, function(req, res){
  res.send({
    time: req.time
  })
})

app.get("/:word/echo", function(req, res){
  res.json(
    {
      echo: req.params.word
    }
  )
})

let first, last;
app.get("/name", function(req, res, next){
  first = req.query.first
  last = req.query.last
  next()
}, function(req, res){
  res.json({
    name: first + " " + last
  })
})

































 module.exports = app;
