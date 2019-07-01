from nodes.domino import Domino

class Hand:
    
    #Mão de cada jogador

    def __init__(self):

        self.root = None

    def add(self, domino : Domino):

        #Adiciona um dominó à mão do jogador

        if not self.root: self.root = domino

        else:

            domino.next = self.root
            self.root = domino

    def display(self):

        #Mostra as peças do jogador

        domino = self.root

        while domino:

            print(domino)
            domino = domino.next

    def check(self, value : str):

        #Verifica se o jogador possui tal peça

        domino = self.root

        while domino:

            if domino.value == value: return domino
            domino = domino.next

        return 0


    def get(self, value : str):

        #Pega a peça de um jogardor, tirando de sua mão

        domino = self.root

        if domino.value == value:

            self.root = domino.next
            domino.next = None

            return domino

        while domino.next:

            if domino.next.value == value:

                chosen = domino.next
                domino.next = chosen.next
                chosen.next = None

                return chosen

            domino = domino.next

        return 0

    def isEmpty(self):

        #Verifica se a mão do jogador está vazia

        return not self.root