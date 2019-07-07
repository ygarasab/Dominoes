class GraphicDomino{

    /**
     * @param {String} value Valor do dominó
     * @param {GraphicDomino} parent Dominó que precede este
     * @param {Number} direction Sentido deste dominó na corrente
     * @param {Number} rotation Define a rotação do dominó em relação ao parent
     */
    constructor(value,parent, direction, rotation, match){

        this.parent = parent

        this.img = document.createElement('img')
        this.img.src = '/sprites/'+value+'.png'
        

        if(parent){

            this.horizontal = !parent.horizontal

            if(!rotation || !parent.parent){

                if(parent.heading) this.heading = parent.heading
                else this.heading = direction

                this.horizontal = parent.horizontal
                
                if(!parent.horizontal){
                    this.top = parent.top + this.heading * 97
                    this.left = parent.left
                }
                else{
                    this.top = parent.top
                    this.left = parent.left + this.heading * 97
                }
            }

            else{
                this.heading = rotation*parent.heading
                if(!parent.horizontal) this.heading = -this.heading 
                
                this.horizontal = !parent.horizontal

                if(!parent.horizontal){
                    this.top = parent.top + parent.heading * 25
                    this.left = parent.left - rotation * parent.heading *72
                }
                else{
        
                    this.top = parent.top + rotation * parent.heading * 25
                    this.left = parent.left + parent.heading * 72
                }
            }

            var aux = this.heading+1

            if(this.horizontal) {
                this.edge = [[this.top + 25, this.left + aux * 40],
                             [this.top + 75, this.left + aux * 40]]

                let r = 90

                this.rotation = this.heading * match > 0 ? r : -r
                
            }
            else{
                this.edge = [[this.top + aux * 50, this.left],
                             [this.top + aux * 50, this.left + 50]]

                             
                this.rotation = this.heading * match > 0 ? 180 : 0
                
                
            }

        }

        else{

            var ww = window.innerWidth/2
            var wh = window.innerHeight /2

            this.rotation = 90
            this.top = wh-75
            this.left = ww-25

            this.edge = [[[this.top + 25,this.left-25],[this.top+80,this.left-25]],
                         [[this.top + 25,this.left+80],[this.top+80, this.left+80]]]

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
        s.width = '50px'
        

        document.body.appendChild(this.img)

        var audio = new Audio('/audio/play.mp3')
        audio.preload = 4

        audio.play()
       

    }

}


class Chain{

    /**
     * 
     * @param {String} root Valor do dominó que será a raiz da corrente
     */

    constructor(root){

        var domino = new GraphicDomino(root,0,0,0)

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
     * Adiciona um dominó ao fim da corrente
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

        this.checkBoundries(domino)
        

    }

    /**
     * Adiciona um dominó ao início da corrente
     * @param {String} value 
     * @param {Number} rotation 
     */    

    addHead(value, rotation, match){


        var parent = this.head

        var domino = new GraphicDomino(value,parent,-1,rotation, match)

        domino.next = parent
        this.head = domino

        console.log(domino.left);
    

        this.iHead = {
            horizontal : domino.horizontal,
            heading : domino.heading,
            edge : domino.edge
        }

        this.checkBoundries(domino)

    }

    /**
     * Afasta a corrente do topo da tela
     */
    uppush(){

        var domino = this.head

        while(domino){
            domino.top += 100
            var l = parseInt(domino.img.style.top.slice(0,-2)) + 100
            domino.img.style.top = l+'px'
            domino = domino.next
        }

        

        this.iHead.edge[0][0] += 100
        this.iHead.edge[1][0] += 100
        this.iTail.edge[0][0] += 100
        this.iTail.edge[1][0] += 100

        

    }

    /**
     * Afasta a corrente da esquerda da tela
     */
    leftpush(){
        

        var domino = this.head

        while(domino){
            domino.left += 120
            var l = parseInt(domino.img.style.left.slice(0,-2)) + 120
            domino.img.style.left = l+'px'
            domino = domino.next
        }

        

        this.iHead.edge[0][1] += 120
        this.iHead.edge[1][1] += 120
        this.iTail.edge[0][1] += 120
        this.iTail.edge[1][1] += 120

    }

    /**
     * Afasta a corrente da direita da tela
     */
    rightpush(){
        document.body.style.width = document.body.offsetWidth +120 + 'px'

    }

    /**
     * Afasta a corrente da base da tela
     */
    downpush(){
        document.body.style.height = document.body.offsetHeight +150 + 'px'
    }

    /**
     * Checa os limites da tela
     * @param {GraphicDomino} domino Dominó recem adicionado
     */
    checkBoundries(domino){

        if(domino.left <100) this.leftpush()
        if(this.tail.left > document.body.offsetWidth - 120 || this.head.left > document.body.offsetWidth - 120) this.rightpush()

        if(domino.left > document.body.offsetWidth - 120) this.rightpush()

        if(domino.top < 100) this.uppush()
        if(this.tail.top > document.body.offsetHeight - 200 || this.head.top > document.body.offsetHeight - 200) this.downpush()

        if(domino.top > document.body.offsetHeight - 120) this.downpush()

    }

}