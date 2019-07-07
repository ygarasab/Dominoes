class HandDomino{

    /**
     * 
     * @param {String} bone Valor do dominó
     * @param {HTMLDivElement} containner Div que representa a mão
     * @returns {HandDomino}
     */

    constructor(bone, containner){

        this.value = bone

        this.img = document.createElement('img')
        this.img.className = 'hand-bone'
        this.img.id = bone
        this.img.src = '/sprites/'+bone+'.png'
        this.img.obj = this
        this.img.draggable = true
        this.img.ondragstart = (e) => this.drag(e)
        

        this.containner = containner
        this.containner.appendChild(this.img)



    }

    /**
     * Guarda o valor do dominó para a posterior chamada de drop
     * 
     * @param {DragEvent} event 
     */

    drag(event){

        event.dataTransfer.setData('text',event.target.id)

    }


}

class Board{

    /**
     * 
     * @param {String[]} dominoes 
     */

    constructor(dominoes){

        this.hand = document.createElement('div')
        this.hand.className = 'hand'

        this.bones = document.createElement('div')
        this.bones.className = 'bones'

        this.hand.appendChild(this.bones)

        this.bone_set = []

        document.body.appendChild(this.hand)

        for(let i of dominoes) this.addToHand(i)

    }


    /**
     * Adiciona um dominó à mão
     * @param {String} value A junção dos números do dominó
     */
    addToHand(value){

        var handbone = new HandDomino(value, this.bones)    

        this.bone_set.push(handbone)

        this.bones.style.width = 70*this.bone_set.length+'px'

    }

    /**
     * Remove um dominó da mão
     * @param {String} value A junção dos números do dominó
     */
    removeFromHand(value){

        var new_set = []

        for(let bone of this.bone_set){

            if(bone.value == value) this.bones.removeChild(bone.img)
            
            else new_set.push(bone)

        }

        this.bone_set = new_set

    }

}