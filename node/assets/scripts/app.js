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

    /**
     * Inicia o jogo como dono da sala, dando o sinal para o servidor avisar os demais membros
     */

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

        this.board = new Board(this.player.hand.toArray())
        this.chain = new Chain(this.game.root)
        
        document.documentElement.ondrop = (e) => this.play(e)
            

    }

    /**
     * Função de callback para comando start vindo do servidor
     * Inicia o jogo como membro, tomando do servidor a pilha e as peças de cada jogador gerados pelo dono da sala
     * 
     * @param {Array} info Informações da sala
     */

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
        
            this.board = new Board(this.player.hand.toArray())
            this.chain = new Chain(this.game.root)

            console.log("[ MAIN ]  Jogo iniciado");
            

            document.documentElement.ondrop = (e) => this.play(e)

        }

        this.displayTurn()

    }

    /**
     * Recebe as informções necessárias para iniciar o jogo e indica o dono da sala
     * 
     * @param {Object} info Objeto com informações sobre a sala
     */

    infoCallback(info){

        console.log('[ MAIN ]  Recebendo informações da sala');
            
        this.dono = true
        
        this.sala = info
        this.start()
        

    }

    /**
     * Método para a verificação periódica do status do jogo
     * 
     * @param {Object} sala Estado atual da sala
     */

    statusCallback(sala){

        //Verifica se houve alteração no gamestate
        if(sala.gamestate!=undefined && sala.gamestate.length > this.gamestate.length){
                
            console.log('[ MAIN ]  Atualizando status do jogo');
            
            
            let play = sala.gamestate[this.gamestate.length]
            this.gamestate = sala.gamestate

            if(play.tag == 'win'){
                
                let message = play.player == this.id ? 'Você ganhou!' : this.players[play.player].nome + ' ganhou!'
                alert(message)
                window.location.href = '/'
            }
            

            if(play.player != this.id){

                console.log(`[ MAIN ]  Player ${this.username} salvando jogada feita por ${this.players[play.player].nome}`);

                switch(play.tag){

                    case 'buy':

                        this.game.buy()

                        break


                    case 'pass':

                        this.game.player = this.game.player.next

                        break


                    case 'play':


                        this.game.play(play.valor, play.ponta)
                        
                        
                        if(!play.ponta) 
                            this.chain.addHead(play.valor, play.rotation, play.match)
                        else 
                            this.chain.addTail(play.valor, play.rotation, play.match)
                        break
                    
                }
            }

            this.displayTurn()
        }

    }

    /**
     * Verifica se é possível inserir a peça e se há rotação na inserção
     * 
     * @param {Object} info Objeto com as informações do dominó disponível para conexão
     * @param {Number} x Coordenada x
     * @param {Number} y Coordenada y
     * 
     * @returns {Number} Valor de rotação da peça se a inserção for possível. Se não, null
     */

    placeCheck(info, x, y){

        var r 
        let e = info.edge  
        

        if(info.horizontal){

                          

            if(y>e[0][0] && y < e[1][0]) r = 0
            else if(y<e[0][0] && y > e[0][0]-70) r = 1
            else if(y>e[1][0] && y < e[1][0]+70) r = -1
            else return null

            if(info.heading > 0 && x > e[0][1] && x < e[0][1] + 70) return -r
            else if(info.heading < 0 && x < e[0][1] && x > e[0][1] - 70) return r
            else return null
        }
        else{

            if(x>e[0][1] && x < e[1][1]) r = 0
            else if(x<e[0][1] && x > e[0][1]-70) r = 1
            else if(x>e[1][0] && x < e[1][1]+70) r = -1
            else return null

            if(info.heading > 0 && y > e[0][0] && y < e[0][0] + 70) return r
            else if(info.heading < 0 && y < e[0][0] && y > e[0][0] - 70) return -r
            else return null

        }

    }

    /**
     * 
     * @param {DragEvent} event 
     */

    play(event){

        event.preventDefault()

        if(this.game.player == this.player){

            var value = event.dataTransfer.getData('text')

            var sides = [Number(value[0]), Number(value[1])]

            var rotation, play, match

            rotation = this.placeCheck(this.chain.iHead, event.clientX + window.pageXOffset, event.clientY + window.pageYOffset)

            if(rotation !== null){

                match = this.game.table.head == sides[0] ? -1 : 1

                play = this.game.play(value, 0)
                

                if(play){

                    console.log('[ CTRL ]  Emitindo jogada');
                    
                    let tag = play == 2 ? 'win' : 'play'

                    this.socket.emit('play', [this.sala.nome,{
                        tag : tag,
                        player : this.id,
                        ponta : 0,
                        valor : value,
                        rotation : rotation,
                        match : match
                    }])

                    this.board.removeFromHand(value)

                    return this.chain.addHead(value, rotation, match)
                }

            }

            rotation = this.placeCheck(this.chain.iTail, event.clientX + window.pageXOffset, event.clientY + window.pageYOffset)

            if(rotation !== null){

                match = this.game.table.tail == sides[0] ? -1 : 1

                play = this.game.play(value, 1)
                

                if(play){

                    console.log('[ CTRL ]  Emitindo jogada');
                    
                    let tag = play == 2 ? 'win' : 'play'

                    this.socket.emit('play', [this.sala.nome,{
                        tag : tag,
                        player : this.id,
                        ponta : 1,
                        valor : value,
                        rotation : rotation,
                        match : match
                    }])

                    this.board.removeFromHand(value)

                    return this.chain.addTail(value, rotation, match)
                }

            }

        }

    }

    /**
     * Função que permite ao jogador comprar uma peça da pilha
     */

    buy(){

        if (this.game.player == this.player){

            let domino = this.game.buy()
            
            if(domino){

                this.board.addToHand(domino.value)

                this.socket.emit('play', [this.sala.nome,{
                    tag : 'buy',
                    player : this.id,
                }])
            }
            
            else alert("A pilha está vazia")

        }

        else console.log('[ MAIN ]  Não é sua vez');
    }

    /**
     * Função que permite ao jogador passar a vez
     */
    pass(){

        if (this.game.player == this.player){

            this.game.player = this.game.player.next

            this.socket.emit('play', [this.sala.nome,{
                tag : 'pass',
                player : this.id,
            }])
        }

        else console.log('[ MAIN ]  Não é sua vez');
    }

    /**
     * Função que atualiza o objeto gráfico que indica o jogador na vez
     */
    displayTurn(){

        if(this.game.player == this.player) document.getElementById('turn').innerHTML = 'É a sua vez!'

        else document.getElementById('turn').innerHTML = 'Agora é a vez de '+this.game.player.nome
    }

}
