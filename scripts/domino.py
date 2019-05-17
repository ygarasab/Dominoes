class Domino:

    def __init__(self, a, b):

        self.sides = [a, b]

        self.prev = None
        self.next = None

        self.free = None

        self.site = 'Pile'

    def __repr__(self):

        return "{}:{}".format(*self.sides)