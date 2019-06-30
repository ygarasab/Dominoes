class Domino{

    constructor(a, b){

        this.sides = [a, b]

        this.prev = null
        this.next = null

        this.value = String(a)+String(b)

    }

}
