class Domino:

    def __init__(self, a, b):

        """
        Estrutura básica de manipulação
        :param int a:
        :param int b:
        """

        self.sides = [a, b]

        self.prev = None
        self.next = None

        self.value = "{}:{}".format(*self.sides)


    def __repr__(self):

        return self.value

