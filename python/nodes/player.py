from structures.hand import Hand

class Player:

    def __init__(self, nome : str):

        self.nome = nome
        self.hand = Hand()
        self.next = None

