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

    }

    start(){

        console.log("[ MAIN ]  Iniciando jogo como dono da sala");
            
        for(let player of this.sala.membros) 
            this.players.push(new Player(player, this.sala.membros.indexOf(player)))

        this.game = new gameController(this.socket,players, this.sala.membros.indexOf(this.username))

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

            this.socket.sala = sala
            this.game = new gameController(this.socket,players, this.sala.membros.indexOf(this.username), hands, pile)



        }


    }



}