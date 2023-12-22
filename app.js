
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
app.get("/user/", async (req, res) => {
    const users = await prisma.user.findMany({
        where: {
            id: parseInt(req.query.id),
        },
    })
    return res.json(users)
})

// 追加処理
app.post("/addUser", async (req, res) => {
    const result = await prisma.user.create({
        data: {
            id: parseInt(req.query.id),
            name: req.query.name,
            email: req.query.email
        }
    })
    return res.json(result)
})

// 更新処理
app.put("/updateUser", async (req, res) => {
    const result = await prisma.user.update({
        where: {
            id: parseInt(req.query.id),
        },
        data: {
            name: req.query.name,
            email: req.query.email
        }
    })
    return res.json(result)
})

// 削除処理
app.delete("/deleteUser", async (req, res) => {
    const result = await prisma.user.deleteMany({
        where: {
            id: parseInt(req.query.id),
        },
    })
    return res.json(result)
})
