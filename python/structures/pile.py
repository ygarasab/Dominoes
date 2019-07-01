from nodes.domino import Domino

class Pile:

    #Pilha de compra
    
    def __init__(self, set : list):

        self.top = None

        for domino in set: self.add(domino)

    def add(self, domino : Domino):

        #Adiciona um dominó ao topo da pilha

        if not self.top: self.top = domino

        else:

            domino.next = self.top
            self.top = domino

    def take(self):

        #Pega um dominó do topo da pilha

        if not self.top: return 0

        domino = self.top
        self.top = domino.next
        domino.next = None

        return domino