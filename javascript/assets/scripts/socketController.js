class SocketController{

    constructor(username, sala){

        this.sala = sala
        this.username = username

        this.gamestate = [0]
        this.dono = false

        this.players = []

        this.socket = io.connect()

        .on('info', (info) => this.infoCallback(info))

        .on('start', (info) => this.startCallback(info))

        .on('status', (sala) => this.statusCallback(sala))

        this.socket.emit('info', [sala, username])

    }

    start(){

        console.log("[ MAIN ]  Iniciando jogo como dono da sala");
            
        for(let player of this.sala.membros) 
            this.players.push(new Player(player, this.sala.membros.indexOf(player)))
        
        this.gameController = new gameController(this.socket,this.players, this.sala.membros.indexOf(this.username))

    }

    infoCallback(info){

        console.log('[ MAIN ]  Recebendo informações da sala');
            
        this.dono = true
        
        this.sala = info
        this.socket.sala = sala
        this.start()

    }

    startCallback(info){

        if(!this.dono){

            console.log('[ MAIN ]  Iniciando jogo como membro');
            

            this.sala = info[0]

            let hands = info[1]
            let pile = info[2]


            for(let player of this.sala.membros) 
                
                this.players.push(new Player(player, this.sala.membros.indexOf(player)))

            this.socket.sala = this.sala
            this.gameController = new gameController(this.socket, this.players, this.sala.membros.indexOf(this.username), hands, pile)



        }


    }

    statusCallback(sala){

        if(sala.gamestate!=undefined && sala.gamestate.length > this.gamestate.length){
                
            console.log('[ MAIN ]  Atualizando status do jogo');
            
            
            let play = sala.gamestate[this.gamestate.length]
            this.gamestate = sala.gamestate
            
            

            if(this.players[play.player].nome != this.username){

                console.log(`[ MAIN ]  Player ${this.username} salvando jogada feita por ${this.players[play.player].nome}`);

                switch(play.tag){

                    case 'buy':

                        let domino = this.gameController.game.buy()

                        break



                    case 'play':

                        console.log(this.gameController.game.player.nome);

                        this.gameController.game.play(play.valor, play.ponta)
                        
                        
                        if(!play.ponta) 
                            this.gameController.chain.addHead(play.valor, play.rotation, play.match)
                        else 
                            this.gameController.chain.addTail(play.valor, play.rotation, play.match)
                        break
                    
                }
            } 
        }

    }



}