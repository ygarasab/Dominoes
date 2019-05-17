class Player:

    def __init__(self, nome):

        self.nome = nome
        self.bones = []


    def display(self):

        return ' '.join(str(self.bones))