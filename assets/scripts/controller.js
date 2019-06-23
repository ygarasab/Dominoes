class Controller{

    /**
     * 
     * @param {Player[]} players 
     * @param {Number} me 
     */

    constructor(players, me){

        this.players = players

        var i

        var old = 0

        for(i of this.players){
            if(old) old.next = i
            old = i
        }

        old.next = this.players[0]

        this.me = this.players[me]

        this.game = new Game(players)

        this.board = new Board(this.me.hand.toArray())

        this.chain = new Chain(this.game.root)

        document.documentElement.ondrop = (e) => this.play(e)

    }

    /**
     * 
     * @param {DragEvent} event 
     */

    play(event){

        event.preventDefault()

        if (this.game.player == this.me || 1){

            var value = event.dataTransfer.getData('text')

            var sides = [Number(value[0]), Number(value[1])]

            var rotation, play, match


            rotation = this.placeCheck(this.chain.iHead, event.clientX, event.clientY)
            if(rotation !== null) {

                match = this.game.table.head == sides[0] ? -1 : 1

                play = this.game.play(value, 0)
                

                if(play) return this.chain.addHead(value, rotation, match)
            }

            rotation = this.placeCheck(this.chain.iTail, event.clientX, event.clientY)
            if(rotation !== null) {

                match = this.game.table.tail == sides[0] ? -1 : 1
                
                play = this.game.play(value, 1)

                if(play) return this.chain.addTail(value, rotation, match)
            }
        }

        else console.log("Não é sua vez");
        

    }

    /**
     * 
     * @param {Object} info 
     * @param {Number} x 
     * @param {Number} y 
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

}