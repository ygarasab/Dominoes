from game import Game
from player import Player

class App:

    def __init__(self):

        self.menu()

    def menu(self):

        print("\n###########################################")
        print("                 DOMINOES              ")
        print("###########################################\n")

        print("Pressione Enter para começar um novo jogo!\n")

        input()

        players = []

        while not players:

            print("Entre com o nome dos players:\n")

            nome = input("Player 1: ")

            i = 2

            while nome:

                players.append(Player(nome))

                nome = input("Player %d: " %i)

                i += 1

                if i == 5: break


        self.game = Game(players)

        input()


App()