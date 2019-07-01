class Domino:

    #Estrtura básica de manipulação

    def __init__(self, a : int, b : int):


        self.sides = [a, b]

        self.prev = None
        self.next = None

        self.value = "{}:{}".format(*self.sides)


    def __repr__(self):

        return self.value

