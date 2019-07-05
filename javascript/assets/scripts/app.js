class App{
    
    /**
     * 
     * @param {String} username nome do usuário
     * @param {String} sala nome da sala
     */

    constructor(username, sala){

        this.username = username
        this.sala = sala

        this.gamestate = [0]
        this.dono = false

        this.players = []

        this.socket = io.connect()

        .on('info', (info) => this.infoCallback(info))

        .on('start', (info) => this.startCallback(info))

        .on('status', (sala) => this.statusCallback(sala))

        this.socket.emit('info', [this.sala, this.username])

    }

    start(){

        console.log("[ MAIN ]  Iniciando jogo como dono da sala");
            
        for(let player of this.sala.membros) 
            this.players.push(new Player(player, this.sala.membros.indexOf(player)))

        //Moldando a estrutura básica dos players

        var old = 0

        for(let i of this.players){
            if(old) old.next = i
            old = i
        }

        old.next = this.players[0]

        this.player = this.players[0]
        this.id = 0

        this.game = new Game(this.players)

        let pile = this.game.pile.toArray()

        let hands = []

        for(let player of this.players){

            let hand = player.hand.toArray()
            if(hand.length<7) hand.push(this.game.table.first.value)
            
            hands.push(hand)
            
        }

        console.log('[ CTRL ]  Emitindo status inicial das estruturas para a sala', this.sala.nome)

        setTimeout(() => this.socket.emit('start', [this.sala.nome, hands, pile]), 500)

        this.graphics = new Graphics(this.player.hand.toArray(), this.game.root)
        
        document.documentElement.ondrop = (e) => this.play(e)
            

    }

    startCallback(info){

        if(!this.dono){

            console.log('[ MAIN ]  Iniciando jogo como membro');
            

            this.sala = info[0]

            let hands = info[1]
            let pile = info[2]


            for(let player of this.sala.membros) 
                
                this.players.push(new Player(player, this.sala.membros.indexOf(player)))

            var old = 0

            for(let i of this.players){
                if(old) old.next = i
                old = i
            }
    
            old.next = this.players[0]

            this.id = this.sala.membros.indexOf(this.username)
            this.player = this.players[this.id]

            this.game = new Game(this.players, hands, pile)
            
            this.graphics = new Graphics(this.player.hand.toArray(), this.game.root)

            document.documentElement.ondrop = (e) => this.play(e)

        }

    }

    infoCallback(info){

        console.log('[ MAIN ]  Recebendo informações da sala');
            
        this.dono = true
        
        this.sala = info
        this.start()
        

    }

    /**
     * 
     * @param {DragEvent} event 
     */

    play(event){

        event.preventDefault()

        if(this.game.player = this.player){

            var value = event.dataTransfer.getData('text')

            var sides = [Number(value[0]), Number(value[1])]

            var rotation, play, match

            rotation = this.graphics.placeCheck(this.graphics.chain.iHead, event.clientX, event.clientY)

            if(rotation !== null){

                match = this.game.table.head == sides[0] ? -1 : 1

                play = this.game.play(value, 0)
                

                if(play){

                    console.log('[ CTRL ]  Emitindo jogada');
                    

                    this.socket.emit('play', [this.sala.nome,{
                        tag : 'play',
                        player : this.id,
                        ponta : 0,
                        valor : value,
                        rotation : rotation,
                        match : match
                    }])

                    this.graphics.board.removeFromHand(value)

                    return this.graphics.chain.addHead(value, rotation, match)
                }

            }

            rotation = this.graphics.placeCheck(this.graphics.chain.iTail, event.clientX, event.clientY)

            if(rotation !== null){

                match = this.game.table.tail == sides[0] ? -1 : 1

                play = this.game.play(value, 1)
                

                if(play){

                    console.log('[ CTRL ]  Emitindo jogada');
                    

                    this.socket.emit('play', [this.sala.nome,{
                        tag : 'play',
                        player : this.id,
                        ponta : 1,
                        valor : value,
                        rotation : rotation,
                        match : match
                    }])

                    this.graphics.board.removeFromHand(value)

                    return this.graphics.chain.addTail(value, rotation, match)
                }

            }

        }

    }


    statusCallback(sala){

        if(sala.gamestate!=undefined && sala.gamestate.length > this.gamestate.length){
                
            console.log('[ MAIN ]  Atualizando status do jogo');
            
            
            let play = sala.gamestate[this.gamestate.length]
            this.gamestate = sala.gamestate
            

            if(play.player != this.id){

                console.log(`[ MAIN ]  Player ${this.username} salvando jogada feita por ${this.players[play.player].nome}`);

                switch(play.tag){

                    case 'buy':

                        this.game.buy()

                        break



                    case 'play':


                        this.game.play(play.valor, play.ponta)
                        
                        
                        if(!play.ponta) 
                            this.graphics.chain.addHead(play.valor, play.rotation, play.match)
                        else 
                            this.graphics.chain.addTail(play.valor, play.rotation, play.match)
                        break
                    
                }
            } 
        }

    }

    buy(){

        if (this.game.player == this.player){

            let domino = this.game.buy()

            this.graphics.board.addToHand(domino.value)

            this.socket.emit('play', [this.sala.nome,{
                tag : 'buy',
                player : this.id,
            }])

        }

        else console.log('Não é sua vez');
    }

}