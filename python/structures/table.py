from nodes.domino import Domino

class Table:

    #Dominós dispostos na mesa
    
    def __init__(self, domino : Domino):

        self.first = domino
        self.last = domino

        self.head = domino.sides[0]
        self.tail = domino.sides[1]

    def add_head(self, domino : Domino):

        #Adiciona ao início do jogo na mesa

        for i in domino.sides:

            if i == self.head:

                self.first.prev = domino
                domino.next = self.first
                self.first = domino

                self.head = domino.sides[not domino.sides.index(i)]

                domino.sides = [self.head, i]

                return 1

        return 0

    def add_tail(self, domino : Domino):

        #Adiciona ao fim do jogo na mesa

        for i in domino.sides:

            if i == self.tail:

                self.last.next = domino
                domino.prev = self.last
                self.last = domino

                self.tail = domino.sides[not domino.sides.index(i)]

                domino.sides = [i,self.tail]

                return 1



        return 0

    def display(self):

        #Exibe os dominós da mesa

        print()

        domino = self.first

        while domino:

            print("{}:{} ".format(*domino.sides),end='')
            domino = domino.next

        print()
