from game.game import Game
from nodes.player import Player

class App:

    #Aplicação do jogo de dominó

    def __init__(self):

        self.game = None

        self.menu()

        self.ingame = 1

        self.dict = {
            "mostrar": self.show,
            "jogar": self.play,
            "comprar": self.buy,
            "passar": self.passs,
            "mesa": self.game.table.display
        }

        while self.ingame: self.listen()
        print()
        print(self.game.player.nome,"bateu\n#######################################\n!")

    def menu(self):

        #Menu inicial da aplicação

        print("\n###########################################")
        print("                 DOMINOES              ")
        print("###########################################\n")

        print("Pressione Enter para começar um novo jogo!\n")

        input()

        players = []

        old = 0

        while not players:

            print("Entre com o nome dos players:\n")

            nome = input("Player 1: ")


            i = 2

            while nome:

                player = Player(nome)

                if old: player.next = old

                players.append(player)

                old = player

                nome = input("Player %d: " %i)

                i += 1

                if i == 5: break

        players[0].next = old


        self.game = Game(players)

    def listen(self):

        #Terminal de comandos

        command = input("\n< ").split()

        if command and command[0] in self.dict:

            self.ingame = self.dict[command[0]](*command[1:])

        else:

            print("\nComando desconhecido\n")

    def show(self, *args):

        if args:

            if args[0] == 'mesa': self.game.table.display()
            elif args[0] == 'peças': self.game.player.hand.display()
            else: print("\nNão sei como mostrar '{}'\n".format(args[0]))

        else:

            print('\nMostrar o quê?\n')

        return 1

    def play(self, *args):

        #Tratador de comandos de jogada

        if args:

            if len(args)>2:

                command = ' '.join(args[1:3])

                places = ['no começo','no fim']

                if command in places:

                    answer = self.game.play(args[0], places.index(command))

                    if not answer:

                        print("\nVocê não pode jogar essa peça aí")

                    elif answer < 0:

                        print("\nVocê não possui essa peça")

                    else:

                        print("\nVocê jogou {} {}!".format(args[0],command))
                        self.show('mesa')

                        if answer == 1: print("\nAgora é a vez de", self.game.player.nome)
                        else: return 0


                else:

                    print("\nNao entendi onde você quer jogar\n")

            else:

                print("\nNao entendi onde você quer jogar\n")

        else: print("\nQue peça e aonde você quer jogar?")

        return 1



    def passs(self, *args):

        #Tratador de comandos de pass

        print("\nVocê passou a vez!")

        self.game.player = self.game.player.next

        print("\nAgora é a vez de", self.game.player.nome)

        return 1


    def buy(self, *args):

        #Tratador de comandos de compra

        compra = self.game.buy()

        if compra:

            print("\nVocê comprou a peça",compra)

        else:

            print("\nA pilha de compra está vazia!")

        return 1


App()