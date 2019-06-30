class Player{
    
    constructor(nome, id){
 
        this.id = id

        this.nome = nome
        this.hand = new Hand()
        this.next = null

    }

}