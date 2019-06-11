from scripts.structures import Hand

class Player:

    def __init__(self, nome):

        self.nome = nome
        self.hand = Hand()
        self.next = None

