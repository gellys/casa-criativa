// Usei o Express pra criar e configurar meu servidor
const express = require("express")
const server = express()

const ideas = [
    {
        img: "https://image.flaticon.com/icons/svg/2729/2729007.svg",
        title: "Cursos de Programação",
        category: "Estudo",
        description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. adipisicing elit. Eos laboriosam doloribus quidem quasi vero excepturi, rerum eum.",
        url: "https://github.com/gellys"
    },
    {
        img: "https://image.flaticon.com/icons/svg/2729/2729005.svg",
        title: "Exercícios",
        category: "Saúde",
        description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. adipisicing elit. Eos laboriosam doloribus quidem quasi vero excepturi, rerum eum.",
        url: "https://github.com/gellys"
    },
    {
        img: "https://image.flaticon.com/icons/svg/2729/2729032.svg",
        title: "Cantar",
        category: "Diversão",
        description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. adipisicing elit. Eos laboriosam doloribus quidem quasi vero excepturi, rerum eum.",
        url: "https://github.com/gellys"
    },
    {
        img: "https://image.flaticon.com/icons/svg/2729/2729054.svg",
        title: "Brincar com seu animal de Estimação",
        category: "Saúde",
        description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. adipisicing elit. Eos laboriosam doloribus quidem quasi vero excepturi, rerum eum.",
        url: "https://github.com/gellys"
    },
    {
        img: "https://image.flaticon.com/icons/svg/2729/2729056.svg",
        title: "Pintar as unhas",
        category: "Cuidados Pessoais",
        description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eos laboriosam doloribus quidem quasi vero excepturi, rerum eum.",
        url: "https://github.com/gellys"
    },
    {
        img: "https://image.flaticon.com/icons/svg/2729/2729021.svg",
        title: "Jogar",
        category: "Diversão",
        description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit.Eos laboriosam doloribus quidem quasi vero excepturi, rerum eum.",
        url: "https://github.com/gellys"
    }
]




//Configurar arquivos estáticos (css,cript,img)
server.use(express.static("public"))

//Configurando o nunjucks
const nunjucks = require("nunjucks")
nunjucks.configure("views", {
    express: server,
    noCache: true,
})

// Criei uma rota /
// E capturo o pedido do cliente para responder
server.get("/", function (req, res) {

    const reverseIdeas = [...ideas].reverse()

    let lastIdeas = [] // Criando nova coleção
    for (let idea of reverseIdeas) { //Pegar as ultimas ideias
        if ((lastIdeas.length) < 2) { // Limitando a duas ideias
            lastIdeas.push(idea) //Add mais uma idea
        }
    }


    return res.render("index.html", { ideas: lastIdeas })
})

server.get("/ideias", function (req, res) {

    const reverseIdeas = [...ideas].reverse()

    return res.render("ideias.html", { ideas: reverseIdeas })
})

//Liguei meu servidor na porta 3000
server.listen(3000)