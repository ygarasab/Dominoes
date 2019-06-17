class Hand{

    constructor(){

        this.root = null

    }

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

    check(value){

        var domino = this.root

        while(domino){

            if(domino.value == value) return domino
            domino = domino.next

        }

        return 0

    }

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



}