const express = require('express')
const socket = require('socket.io')
const bodyParser = require('body-parser')
var session = require('express-session');

class Server{

    constructor(){

        this.port = process.env.PORT || 5000

        this.urlParser = bodyParser.urlencoded({extended:false})

        this.players = []
        this.salas = []

        this.app = express()

            .use(express.static('assets'))

            .use(session({secret:'XASDASDA'}))

            .set('view engine', 'ejs')

            .get('/', (req, res) => this.getIndex(req, res))

            .get('/username', (req, res) => this.getUsername(req, res))

            .post('/username', this.urlParser, (req, res) => this.postUsername(req, res))

            .get('/lobby/:nome', (req, res) => this.getLobby(req, res))

            .get('/game/:nome', (req, res) => this.getGame(req, res))

            .get('/salas', (req, res) => this.getSalas(req, res))
        
        
        this.server = this.app.listen(this.port, () => console.log(`[ node ]  Ouvindo à porta ${ this.port }`))
        
        this.io = socket(this.server).on('connection', (socket) => this.ioConnect(socket))

        this.loop = setInterval(() => this.updateLoop() , 500)

    }

    getIndex(req, res){

        let username = req.session.username

        if(!username) res.redirect('/username')

        else res.render('index', req.session)

    }

    getUsername(req,res){

        let username = req.session.username

        if(username) res.redirect('/')

        else res.render('username')

    }

    postUsername(req,res){

        let username = req.body.username
        

        if(this.players.includes(username)) res.redirect('/username')

        else{

            req.session.username = username

            this.players.push(username)


            console.log(`[ node ]  Novo login de ${ username }`)
            console.log(`[ node ]  Players no servidor : ${ this.players }`)

            res.redirect('/')     
        }   

    }

    getLobby(req, res){

        let username = req.session.username

        if(!username) res.redirect('/username')

        else res.render('lobby', {username : username, sala : req.params.nome})

    }

    getGame(req, res){
        
        let username = req.session.username

        if(!username) res.redirect('/username')

        else res.render('gameboard', {username : username, sala : req.params.nome})

    }

    getSalas(req, res){

        let username = req.session.username

        if(!username) res.redirect('/username')

        else res.render('salas', {salas : this.salas})

    }

    ioConnect(socket){

        socket

            .on('sala', (arg) => this.salaCallback(arg, socket))

            .on('looking', () => socket.join('salas'))

            .on('go', (arg) => this.goCallback(arg, socket))

            .on('info', (arg) => this.infoCallback(arg, socket))

            .on('start', (arg) => this.startCallback(arg, socket))

            .on('play', (arg) => this.playCallback(arg, socket))

    }

    salaCallback(data, socket){
        
        var sala = data.sala
        let nome = data.nome

        sala = {nome : sala, dono : nome, membros : [nome], ingame : false}


        if(!this.salas.filter((value) => {return value.nome == sala.nome}).length){
            this.salas.push(sala)
            console.log('[ sock ]  Nova sala registrada por '+ nome);
        }

        sala = this.salas.filter((value) => {return value.nome == sala.nome})[0]
        socket.join(sala.nome)
        
        if(!sala.membros.includes(nome)) sala.membros.push(nome)

        if(sala.dono == nome) socket.emit('dono')
    }

    goCallback(nome, socket){

        var sala = this.salas.filter((value) => {return value.nome == nome})[0]
        sala.ingame = true

        this.io.to(nome).emit('go', nome)

    }

    infoCallback(data, socket){

        var sala = this.salas.filter((value) => {return value.nome == data[0]})[0]
        console.log(data[1]+" pedindo informação");

        socket.join(data[0])

        console.log(data[1]+' está em '+socket.rooms);
        
        
        if(sala.dono == data[1]) socket.emit('info', sala)

    }

    startCallback(data, socket){

            
        var sala = this.salas.filter((value) => {return value.nome == data[0]})[0]
        sala.gamestate = [0]
        this.io.to(data[0]).emit('start', [sala,data[1], data[2]] )

    }

    playCallback(data, socket){

        console.log(data[0])

        var sala = this.salas.filter((value) => {return value.nome == data[0]})[0]

        let play = data[1]
        sala.gamestate.push(play)

        console.log(play.player+" acabou de jogar");

    }

    updateLoop(){
        
        this.io.to('salas').emit('salas', this.salas)
        for(let sala of this.salas) this.io.to(sala.nome).emit('status', sala)

    }
    


}


new Server()