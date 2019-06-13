class Board{


    constructor(){

        this.hand = document.createElement('div')
        this.hand.className = 'hand'

        this.bones = document.createElement('div')
        this.bones.className = 'bones'

        this.hand.appendChild(this.bones)

        this.bone_set = []

        this.display()

    }

    display(){
        
        document.body.innerHTML = ''

        document.body.appendChild(this.hand)

    }

    /**
     * Adiciona um dominó à mão
     * @param {String} bone A junção dos números do dominó
     */
    addToHand(bone){

        var bone_image = document.createElement('img')
        bone_image.className = 'hand-bone'
        bone_image.src = 'assets/sprites/'+bone+'.png'

        this.bone_set.push(bone_image)
        this.bones.appendChild(bone_image)

    }

}