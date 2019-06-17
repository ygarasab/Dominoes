class Game{

    constructor(players){

        this.dominoes = []
        this.players = players

        for(let i=0; i<7; i++){

            for(let j = i; j<7; j++)

                this.dominoes.push(new Domino(i,j))

        }

        this.distribute()

        this.players = this.start()

    }

    distribute(){


        var copy = this.dominoes

        for (let i=0; i<7; i++){

            for(let player of this.players){

                var index = Math.floor(Math.random() * copy.length)
                var bone = copy[index]
                player.hand.add(bone)
                bone.site = player

                copy.splice(index,1)

            }
        } 
        for(let player of this.players){

            console.log("Peças de " +player.nome+":")
            player.hand.display()

        }

        this.pile = new Pile(copy)

    }

    start(){

        for(let i=6; i>=0 ;i--){

            for (let player of this.players){

                var domino = player.hand.get(i+":"+i)

                if(domino){

                    console.log(player.nome+" inicia com o carrão de "+i)
                    this.table = new Table(domino)
                    return player.next

                }
            }
        }
    }
    play(domino, place){

        if (this.player.hand.check(domino)){

            var domino = this.player.hand.get(domino)

            if (place && this.table.add_tail(domino) || ! place && this.table.add_head(domino)){
            
                if (this.player.hand.isEmpty()) return 2

                this.player = this.player.next
                return 1
        
            }

            else{

                this.player.hand.add(domino)
                return 0

            }

        }
        else return -1

    }
    buy(){

        var domino = this.pile.take()

        if (domino){

            this.player.hand.add(domino)

        }
        return 0
    }
}   