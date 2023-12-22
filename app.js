
const express = require("express")
const { PrismaClient } = require("@prisma/client")
const bodyParser = require('body-parser')
const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.set('view engine', 'ejs')

const server = app.listen(3001, function() {
    console.log("Node.js is listening to PORT:" + server.address().port)
})

app.get("/", function(req, res) {
    res.render("index", {})
})

/*** バリデーション ***/

const createValidation = async (req, res, next) => {
    if(!req.query.name || !req.query.email) {
        return res.json({message: "必須エラーです。"})
    }

    const users = await prisma.user.findMany({
        where: {
            email: req.query.email
        },
    })

    if(users.length != 0) {
        return res.json({message: "既に登録済みのユーザーです。"})
    }

    next()
}

const updateValidation = async (req, res, next) => {
    if(!req.query.id || !req.query.name || !req.query.email) {
        return res.json({message: "必須エラーです。"})
    }

    const users = await prisma.user.findMany({
        where: {
            id: parseInt(req.query.id)
        },
    })

    if(users.length == 0) {
        return res.json({message: "存在しないユーザーです。"})
    }

    next()
}

const deleteValidation = async (req, res, next) => {
    if(!req.query.id) {
        return res.json({message: "IDは必須です。"})
    }

    const users = await prisma.user.findMany({
        where: {
            id: parseInt(req.query.id)
        },
    })

    if(users.length == 0) {
        return res.json({message: "存在しないユーザーです。"})
    }

    next()
}

/***  CRUD処理 ***/

const prisma = new PrismaClient();

// 取得処理
app.get("/userList", async (req, res) => {
    const users = await prisma.user.findMany()
    return res.json(users)
})

// 条件付き取得処理
app.get("/user/", async (req, res) => {

    if(!req.query.id) {
        return res.json({message: "IDは必須です。"})
    }

    const users = await prisma.user.findMany({
        where: {
            id: parseInt(req.query.id),
        },
    })
    return res.json(users)
})

// 追加処理
app.post("/addUser", createValidation, async (req, res) => {

    const result = await prisma.user.create({
        data: {
            name: req.query.name,
            email: req.query.email
        }
    })

    return res.json(result)
})

// 更新処理
app.put("/updateUser", updateValidation, async (req, res) => {

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
app.delete("/deleteUser", deleteValidation, async (req, res) => {
    const result = await prisma.user.deleteMany({
        where: {
            id: parseInt(req.query.id),
        },
    })
    return res.json(result)
})
