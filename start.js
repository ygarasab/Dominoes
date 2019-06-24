const express = require('express')
const socket = require('socket.io')
const bodyParser = require('body-parser')
var session = require('express-session');

const port = process.env.PORT || 5000

urlParser = bodyParser.urlencoded({extended:false})

var players = []
var salas = []

app = express()

    .use(express.static('assets'))

    .use(session({secret:'XASDASDA'}))

    .set('view engine', 'ejs')

    .get('/', (req,res) => {
        
        let username = req.session.username

        if(!username) res.redirect('/username')

        else res.render('index', req.session)

    })

    .get('/username', (req, res) => {

        let username = req.session.username

        if(username) res.redirect('/')

        else res.render('username')

    })

    .post('/username', urlParser, (req, res) => {
        
        
        let username = req.body.username

        if(players.includes(username)) res.redirect('/username')

        else{

            req.session.username = username

            players.push(username)


            console.log(`[ node ]  Novo login de ${ username }`)
            console.log(`[ node ]  Players no servidor : ${ players }`)

            res.redirect('/')     
        }   

    })

    .get('/lobby/:nome', (req, res) => {

        let username = req.session.username

        if(!username) res.redirect('/username')

        else res.render('lobby', {username : username, sala : req.params.nome})

    })

server = app.listen(port, () => console.log(`[ node ]  Ouvindo à porta ${ port }`))

var io = socket(server)


    .on('connection', (socket) => {

        socket

        .on('sala', (data) => {

            var sala = data.sala
            let nome = data.nome

            sala = {nome : sala, dono : nome}

            

            if(!salas.filter((value) => {return value.nome == sala.nome}).length){
                salas.push(sala)
                console.log('[ sock ]  Nova sala registrada por '+ nome);
            }

            sala = salas.filter((value) => {return value.nome == sala.nome})[0]

            if(sala.dono == nome) socket.emit('dono')

        })

    })