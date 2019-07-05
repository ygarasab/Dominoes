class Graphics{

    constructor(hand, root){

        this.board = new Board(hand)
        this.chain = new Chain(root)

    }

    
    placeCheck(info, x, y){

        var r 
        let e = info.edge  

        if(info.horizontal){

                          

            if(y>e[0][0] && y < e[1][0]) r = 0
            else if(y<e[0][0] && y > e[0][0]-70) r = 1
            else if(y>e[1][0] && y < e[1][0]+70) r = -1
            else return null

            if(info.heading > 0 && x > e[0][1] && x < e[0][1] + 70) return -r
            else if(info.heading < 0 && x < e[0][1] && x > e[0][1] - 70) return r
            else return null
        }
        else{

            if(x>e[0][1] && x < e[1][1]) r = 0
            else if(x<e[0][1] && x > e[0][1]-70) r = 1
            else if(x>e[1][0] && x < e[1][1]+70) r = -1
            else return null

            if(info.heading > 0 && y > e[0][0] && y < e[0][0] + 70) return r
            else if(info.heading < 0 && y < e[0][0] && y > e[0][0] - 70) return -r
            else return null

        }

    }

}  