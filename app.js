
const express = require("express")
const { PrismaClient } = require("@prisma/client")
const bodyParser = require('body-parser')
const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.set('view engine', 'ejs')

const server = app.listen(3001, function() {
    console.log("Node.js is listening to PORT:" + server.address().port)
})

/***  以下に処理を記述 ***/

const prisma = new PrismaClient();

// 表示
app.get("/", function(req, res) {
    res.render("index", {})
})

// 取得処理
app.get("/userList", async (req, res) => {
    const users = await prisma.user.findMany()
    return res.json(users)
})

// 条件付き取得処理
app.get("/userList/:id", function(req, res) {

})

// 追加処理
app.post("/addUser", function(req, res) {

})

// 追加処理
app.post("/updateUser", function(req, res) {

})

// 削除処理
app.post("/deleteUser", function(req, res) {

})
