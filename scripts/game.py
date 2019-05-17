from domino import Domino
from random import choice

class Game:

    def __init__(self, players):

        self.dominoes = []
        self.players = players

        for i in range(7):

            for j in range(i,7):

                self.dominoes.append(Domino(i,j))

        copy = self.dominoes[:]

        for i in range(7):

            for player in self.players:

                bone = choice(copy)
                player.bones.append(bone)
                bone.site = player

                copy.remove(bone)

        for player in self.players:

            print("\nPeças de {} :\n\n{}\n".format(player.nome, player.display()))


        self.pile = copy
