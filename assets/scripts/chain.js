class GraphicDomino{

    /**
     * @param {String} value Valor do dominó
     * @param {GraphicDomino} parent Dominó que precede este
     * @param {Number} direction Sentido deste dominó na corrente
     * @param {Number} rotation Define a rotação do dominó em relação ao parent
     */
    constructor(value,parent, direction, rotation, match){

        this.img = document.createElement('img')
        this.img.src = 'assets/sprites/'+value+'.png'

        console.log(match);
        

        if(parent){

            this.horizontal = !parent.horizontal

            if(!rotation){

                if(parent.heading) this.heading = parent.heading
                else this.heading = direction

                this.horizontal = parent.horizontal
                this.rotation = match * direction * parent.rotation
                
                if(!parent.horizontal){
                    this.top = parent.top + this.heading * 135
                    this.left = parent.left
                }
                else{
                    this.top = parent.top
                    this.left = parent.left + this.heading * 135
                }
            }

            else{
                this.heading = rotation*parent.heading
                if(!parent.horizontal) this.heading = -this.heading 
                
                this.horizontal = !parent.horizontal

                if(!parent.horizontal){
                    this.top = parent.top + parent.heading * 35
                    this.left = parent.left - rotation * parent.heading * 100
                }
                else{
        
                    this.top = parent.top + rotation * parent.heading * 35
                    this.left = parent.left + parent.heading * 100
                }

                this.rotation = parent.rotation + rotation * 90

            }

            var aux = this.heading+1

            if(this.horizontal) 
                this.edge = [[this.top + 35, this.left + aux * 55],
                             [this.top + 105, this.left + aux * 55]]
            else
                this.edge = [[this.top + aux * 35, this.left],
                             [this.top + aux * 35, this.left + 70]]

        }

        else{

            var ww = window.innerWidth/2
            var wh = window.innerHeight /2

            this.rotation = 90
            this.top = wh-100
            this.left = ww-30

            this.edge = [[[this.top + 35,this.left-35],[this.top+105,this.left-35]],
                         [[this.top + 35,this.left+105],[this.top+105, this.left+105]]]

            this.horizontal = 1

            this.heading = 0

        }

        this.display()

    }

    display(){

        console.log(this);
        

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

    /**
     * 
     * @param {String} root 
     */

    constructor(root){
        this.head = null
        this.tail = null

        this.addRoot(root)
    }

    /**
     * 
     * @param {String} domino 
     */
    addRoot(value){

        var domino = new GraphicDomino(value,0,0,0)

        this.head = domino
        this.tail = domino

        this.iHead = {
            horizontal : domino.horizontal,
            heading : -1,
            edge : domino.edge[0]
        }

        this.iTail = {
            horizontal : domino.horizontal,
            heading : 1,
            edge : domino.edge[1]
        }

        
    }
    
    /**
     * 
     * @param {String} value 
     * @param {Number} rotation 
     */

    addTail(value, rotation, match){

        var parent = this.tail

        var domino = new GraphicDomino(value,parent,1,rotation, match)

        parent.next = domino
        this.tail = domino

        this.iTail = {
            horizontal : domino.horizontal,
            heading : domino.heading,
            edge : domino.edge
        }
        

    }

    /**
     * 
     * @param {String} value 
     * @param {Number} rotation 
     */    

    addHead(value, rotation, match){

        var parent = this.head

        var domino = new GraphicDomino(value,parent,-1,rotation, match)

        domino.next = parent
        this.head = domino

        this.iHead = {
            horizontal : domino.horizontal,
            heading : domino.heading,
            edge : domino.edge
        }

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