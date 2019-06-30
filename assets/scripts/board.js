class HandDomino{

    /**
     * 
     * @param {String} bone Valor do dominó
     * @param {HTMLDivElement} containner Div que representa a mão
     * @returns {HandDomino}
     */

    constructor(bone, containner){

        this.draggin = false

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
     * 
     * @param {DragEvent} event 
     */

    drag(event){

        event.dataTransfer.setData('text',event.target.id)

    }

    /**
     * 
     * @param {MouseEvent} event 
     */

    drop(event){

        if(!this.draggin) return

        this.draggin = false

        this.img.style.display = 'inline-block'

        document.body.removeChild(this.draggable)

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

        this.display()

        for(let i of dominoes) this.addToHand(i)

    }

    display(){
        

        document.body.appendChild(this.hand)

    }

    /**
     * Adiciona um dominó à mão
     * @param {String} bone A junção dos números do dominó
     */
    addToHand(bone){

        var handbone = new HandDomino(bone, this.bones)    

        this.bone_set.push(handbone)

        this.bones.style.width = 70*this.bone_set.length+'px'

    }

    removeFromHand(value){

        var new_set = []

        for(let bone of this.bone_set){

            if(bone.value == value) this.bones.removeChild(bone.img)
            
            else new_set.push(bone)

        }

        this.bone_set = new_set

    }

}