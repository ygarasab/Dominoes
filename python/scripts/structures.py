class Hand:

    def __init__(self):

        self.root = None

    def add(self, domino):

        if not self.root: self.root = domino

        else:

            domino.next = self.root
            self.root = domino

    def display(self):

        domino = self.root

        while domino:

            print(domino)
            domino = domino.next

    def check(self, value):

        domino = self.root

        while domino:

            if domino.value == value: return domino
            domino = domino.next

        return 0


    def get(self, value):

        domino = self.root

        if domino.value == value:

            self.root = domino.next
            domino.next = None

            return domino

        while domino.next:

            if domino.next.value == value:

                chosen = domino.next
                domino.next = chosen.next
                chosen.next = None

                return chosen

            domino = domino.next

        return 0

    def isEmpty(self):

        return not self.root

class Pile:

    def __init__(self, set):

        self.top = None

        for domino in set: self.add(domino)

    def add(self, domino):

        if not self.top: self.top = domino

        else:

            domino.next = self.top
            self.top = domino

    def take(self):

        if not self.top: return 0

        domino = self.top
        self.top = domino.next
        domino.next = None

        return domino

class Table:

    def __init__(self, domino):

        self.first = domino
        self.last = domino

        self.head = domino.sides[0]
        self.tail = domino.sides[1]

    def add_head(self, domino):

        for i in domino.sides:

            if i == self.head:

                self.first.prev = domino
                domino.next = self.first
                self.first = domino

                self.head = domino.sides[not domino.sides.index(i)]

                domino.sides = [self.head, i]

                return 1

        return 0

    def add_tail(self, domino):

        for i in domino.sides:

            if i == self.tail:

                self.last.next = domino
                domino.prev = self.last
                self.last = domino

                self.tail = domino.sides[not domino.sides.index(i)]

                domino.sides = [i,self.tail]

                return 1



        return 0

    def display(self):

        print()

        domino = self.first

        while domino:

            print("{}:{} ".format(*domino.sides),end='')
            domino = domino.next

        print()

        return 1
