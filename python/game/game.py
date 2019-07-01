from nodes.domino import Domino
from structures.pile import Pile
from structures.table import  Table

from random import choice


class Game:

    
    #Estrutura básica do jogo de Dominó
    

    def __init__(self, players : list):

        self.dominoes = []
        self.players = players


        for i in range(7):

            for j in range(i,7):

                self.dominoes.append(Domino(i,j))
        
        self.distribute()

        self.player = self.start()

        print("\nAgora é a vez de",self.player.nome)



    def distribute(self):

        #Distribui os dominós entre os players
        

        copy = self.dominoes[:]

        for i in range(7):

            for player in self.players:

                bone = choice(copy)
                player.hand.add(bone)
                bone.site = player

                copy.remove(bone)

        for player in self.players:

            print("\nPeças de {} :\n".format(player.nome))
            player.hand.display()


        self.pile = Pile(copy)


    def start(self):

        #Seleciona o player com o maior 'carrão' para começar
        

        for i in range(0,7)[::-1]:


            for player in self.players:

                domino = player.hand.get("{}:{}".format(i,i))

                if domino:

                    print("\n{} inicia com carrão de {} !".format(player.nome,i))
                    self.table = Table(domino)
                    return player.next

    def play(self, domino : str, place : bool):

        #Realiza (ou tenta realizar) uma jogada
        

        if self.player.hand.check(domino):

            domino = self.player.hand.get(domino)

            if place and self.table.add_tail(domino) or not place and self.table.add_head(domino):

                if self.player.hand.isEmpty(): return 2

                self.player = self.player.next
                return 1


            else:

                self.player.hand.add(domino)
                return 0

        else: return  -1

    def buy(self):

        #Permite que o jogador compre um dominó da pilha, caso haja

        domino = self.pile.take()

        if domino:

            self.player.hand.add(domino)
            return domino

        return 0

