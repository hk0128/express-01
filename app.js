
const express = require("express")
const bodyParser = require('body-parser')
const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.set('view engine', 'ejs')

const server = app.listen(3001, function() {
    console.log("Node.js is listening to PORT:" + server.address().port)
})

/***  以下に処理を記述 ***/

// サンプルデータ
let animalList = [
    {id: "0", name: "犬"},
    {id: "1", name: "猫"}
]

// 表示
app.get("/", function(req, res) {
    res.render("index", {})
})

// 取得処理
app.get("/animalList", function(req, res) {
    res.json(animalList)
})

// 条件付き取得処理
app.get("/animalList/:id", function(req, res) {
    res.json(animalList.filter(item => item.id == req.params.id))
})

// 追加処理
app.post("/addAnimal", function(req, res) {
    const newAnimalList = []
    // idを振り直す
    for (const [index, animal] of animalList.entries()) {
        newAnimalList.push({id: index, name: animal['name']})
    }
    // 新しいアニマルを追加
    newAnimalList.push({id: newAnimalList.length, name: req.body.name})
    animalList = newAnimalList

    res.render("index", {})
})

// 削除処理
app.post("/deleteAnimal", function(req, res) {
    animalList = animalList.filter((item) => item.id != req.body.id)
    res.render("index", {})
})
