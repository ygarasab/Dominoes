class GraphicDomino{

    /**
     * @param {String} value Valor do dominó
     * @param {GraphicDomino} parent Dominó que precede este
     * @param {Number} direction Sentido deste dominó na corrente
     * @param {Number} rotation Define a rotação do dominó em relação ao parent
     */
    constructor(value,parent, direction, rotation){

        this.img = document.createElement('img')
        this.img.src = 'assets/sprites/'+value+'.png'

        if(parent){

            this.horizontal = !parent.horizontal

            if(!rotation){

                if(parent.heading) this.heading = parent.heading
                else this.heading = direction

                this.horizontal = parent.horizontal
                this.rotation = parent.rotation
                if(!parent.horizontal){
    
                    this.top = parent.top - parent.heading * 140
                    this.left = parent.left
                }
                else{
                    this.top = parent.top
                    this.left = parent.left + direction * 135
                }
            }

            else if(rotation > 0){

                this.heading

                this.rotation = parent.rotation - 90
                if(!parent.horizontal){
                    this.top = parent.top - 35
                }
                else this.top = parent.top + 35
                this.left = parent.left + direction * 100
            }

            else if(rotation < 0){
                this.rotation = parent.rotation - 90
                this.top = parent.top - 35
                if(!parent.horizontal) direction = -direction
                this.left = parent.left + direction * 100
            }

        }

        else{

            var ww = window.innerWidth/2
            var wh = window.innerHeight /2

            this.rotation = 90
            this.top = wh-100
            this.left = ww-30

            this.horizontal = 1

            this.heading = 0

        }

        this.display()

    }

    display(){

        var s = this.img.style
        s.position = 'absolute'
        s.transform =  'rotate('+this.rotation+'deg)'
        s.top = this.top+'px'
        s.left = this.left+'px'
        s.width = '70px'
        

        document.body.appendChild(this.img)

    }

}


class Chain{

    constructor(){
        this.head = null
        this.tail = null
    }

    /**
     * 
     * @param {HTMLImageElement} domino 
     */
    add_root(value){

        var domino = new GraphicDomino(value,0,0,0)

        this.head = domino
        this.tail = domino

        
    }

    add_right(value, rotation){

        var parent = this.tail

        var domino = new GraphicDomino(value,parent,1,rotation)

        parent.next = domino
        this.tail = domino

    }

    add_left(value, rotation){

        var parent = this.head

        var domino = new GraphicDomino(value,parent,-1,rotation)

        domino.next = parent
        this.head = domino

    }

    shift(){

        var domino = this.head

        while(domino){
            console.log(domino)
            domino.left += 120
            var l = parseInt(domino.style.left.slice(0,-2)) + 120
            domino.style.left = l+'px'
            domino = domino.next
        }

    }

}