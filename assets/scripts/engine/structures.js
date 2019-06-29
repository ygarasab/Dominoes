class Hand{

    constructor(){

        this.root = null

    }

    /**
     * 
     * @param {Domino} domino 
     */

    add(domino){

        if( !this.root ) this.root = domino

        else{

            domino.next = this.root
            this.root = domino

        }

    }

    display(){

        var domino = this.root

        while(domino){

            console.log(domino)
            domino = domino.next

        }

        return 1

    }

    /**
     * 
     * @param {String} value 
     */

    check(value){

        var domino = this.root

        while(domino){

            if(domino.value == value) return domino
            domino = domino.next

        }

        return 0

    }

    /**
     * 
     * @param {String} value 
     */

    get(value){

        var domino = this.root

        if(domino.value == value){

            this.root = domino.next
            domino.next = null
            return domino
        
        }
        
        while(domino.next){
            
            if (domino.next.value == value){
            

                var chosen = domino.next
                domino.next = chosen.next
                chosen.next = null
            
                return chosen
            }
    
            domino = domino.next
    
        }
        return 0
    
    }

    isEmpty(){
    
        return ! this.root
    
    }

    /**
     * @returns {String[]}
     */

    toArray(){
        var array = []
        var domino = this.root
        while(domino){
            array.push(domino.value)
            domino = domino.next
        }

        return array
    }


}

class Pile{

    constructor(set){

        this.top = null

        for(let domino of set) this.add(domino)

    }

    add(domino){

        if(! this.top) this.top = domino

        else{

            domino.next = this.top
            this.top = domino
        }
    

    }
    take(){

        if(! this.top) return 0

        var domino = this.top
        this.top = domino.next
        domino.next = null

        return domino

    }

    toArray(){
        var array = []
        var domino = this.top
        while(domino){
            array.push(domino.value)
            domino = domino.next
        }

        return array
    }

}
class Table{

    constructor(domino){

        this.first = domino
        this.last = domino
        this.head = domino.sides[0]
        this.tail = domino.sides[1]
        
    }

    add_head(domino){

        
        
        
        for (let i of domino.sides){
            
            if(i==this.head){


                this.first.prev = domino
                domino.next = this.first
                this.first = domino
                this.head = domino.sides[Math.abs(domino.sides.indexOf(i)-1)]
                domino.sides = [this.head, i]
                return 1
            
            }

        }
       
        return 0
    
    } 
    add_tail(domino){
        
        for(let i of domino.sides){

            if (i==this.tail){

                this.last.next = domino
                domino.prev = this.last
                this.last = domino
                this.tail = domino.sides[Math.abs(domino.sides.indexOf(i)-1)]
                domino.sides = [i,this.tail]
                return 1
            }
       
        }
        
        return 0
        
    }
    
    display(){

        console.log()

        var domino = this.first

        while(domino){

            console.log(domino.sides[0]+":"+domino.sides[1])
            domino = domino.next

        }
        console.log()
        return 1
    }

}