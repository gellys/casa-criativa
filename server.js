// Usei o Express pra criar e configurar meu servidor
const express = require("express")
const server = express()

const db = require("./db")

//Configurar arquivos estáticos (css,cript,img)
server.use(express.static("public"))

// Habilitando uso do req.body
server.use(express.urlencoded({ extended: true }))

//Configurando o nunjucks
const nunjucks = require("nunjucks")
nunjucks.configure("views", {
    express: server,
    noCache: true,
})

// Criei uma rota /
// E capturo o pedido do cliente para responder
server.get("/", function (req, res) {

    db.all(`SELECT * FROM ideas`, function (err, rows) {
        if (err) {
            console.log(err)
            return res.send("Erro no banco de dados")
        }
        const reversedIdeas = [...rows].reverse()

        let lastIdeas = [] // Criando nova coleção
        for (let idea of reversedIdeas) { //Pegar as ultimas ideias
            if ((lastIdeas.length) < 2) { // Limitando a duas ideias
                lastIdeas.push(idea) //Add mais uma idea
            }
        }
        return res.render("index.html", { ideas: lastIdeas })
    })


})

server.get("/ideias", function (req, res) {

    req.query //?title=asdadsad&category
    db.all(`SELECT * FROM ideas`, function (err, rows) {
        if (err) {
            console.log(err)
            return res.send("Erro no banco de dados")
        }

        const reversedIdeas = [...rows].reverse()

        return res.render("ideias.html", { ideas: reversedIdeas })
    })
})

server.post("/", function (req, res) {

    const query = `
        INSERT INTO ideas(
            image,
            title,
            category,
            description,
            link
        ) VALUES (?,?,?,?,?);
    `
    const values = [
        req.body.image,
        req.body.title,
        req.body.category,
        req.body.description,
        req.body.link,

    ]

    db.run(query, values, function (err) {
        if (err) {
            console.log(err)
            return res.send("Erro no banco de dados")
        }

        return res.redirect("/ideias")
    })
})

//Servidor ligado na porta 3000
server.listen(3000)