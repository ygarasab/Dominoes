# Dominoes - Estruturas
#### versão python

## Sobre

Este projeto traz a implementação de um jogo tradicional de dominó

O foco deste projeto é exercitar o conhecimento sobre certas estrutura de dados, por meio de algumas estruturas básicas de um jogo de dominó. Sendo elas:

- A mão de cada jogador
- A pilha de compra
- As peças dispostas na mesa

Todas essas estruturas se baseiam na disposição de uma única estrutura básica: o Dominó

## O Dominó

A classe [Domino](python/nodes/domino.py) precisa de dois argumentos para ser construída: "a" e "b". Sendo que cada um representa um lado do dominó. E tem como atributos:

- sides : Um vetor de inteiros, que vai conter a e b
- prev : Uma referência ao dominó anterior a ele na estrutura (iniciado como None)
- next : Uma referência ao dominó anterior a ele na estrutura (iniciado como None)
- value : Uma string para representar o valor da peça de dominó, no formato a:b

Além desses atributos, a classe conta com o método especial __repr__, que retorna o atributo value.

Com essa estrutura básica, vamos poder construir todas as demais

## A Mão do Jogador

A mão de cada jogador, representada aqui pela class [Hand](python/structures/hand.py), é uma lista encadeada que vai conter os dominós que esse jogador possui. Essa classe é inicializada sem qualquer argumento, de modo que os dominós são inseridos em um outro momento.

Essa classe conta com apenas um atributo : root, que contém o dominó raiz da nossa estrutura. 

Seus métodos são : 

#### add( domino : Domino ) => void 

Insere um dominó na estrutura. Se este for o primeiro nó, ele é atribuido a root, se não, ele toma a root como seu atributo next, e aí se transforma na root, como numa pilha.

#### display ( ) => void 

Exibe os dominós da estrutura, começando pelo root, seguido pelos seus subsequentes, atingidos pelo atributo next de cada um, até que esse atributo next se mostre igual a None.

#### check ( value : str ) => Domino  

Recebe um valor, que usa para procurar, percorrendo a lista encadeada, o dominó desejado, retornando-o caso ache; se não achar, retorna 0.

#### get ( value : str ) => Domino 

Parecido o método check, get vai buscar pelo dominó desejado na estrutura, só que nesse caso, ele não vai apenas retorná-lo, ele vai retirá-lo da estrutura, e aí retorná-lo, removendo todas as suas relações de sucessão com os outros dominós da estrutura.

#### isEmpty ( ) => boolean  

Verifica se a mão do jogador está vazio ou não.


## A Pilha de Compra

A pilha de compra, representada pela classe [Pile](python/structures/pile.py), vai conter os dominós que podem ser comprados pelos jogadores ao longo do jogo, sendo que o jogador, obrigatoriamente, deve pegar o dominó do topo.

A estrutura é , sem surpresas, uma pilha, tendo como único atributo um "top", a classe toma como argumento de construção uma lista de dominós, que são adicionados dentro mesmo do construtor, por meio do método add, que veremos a seguir.

Seus métodos são : 

#### add ( domino : Domino ) => void

Insere um dominó na estrutura. Se este for o primeiro nó, ele é atribuido ao top, se não, ele toma o top como seu atributo next, e aí se transforma no próprio top (comportamento básico de uma pilha).

#### take () => Domino

Funcção utilizada na hora da compra, retorna o dominó do topo, retirando este da pilha e transformando seu sucessor no topo da pilha. Caso não haja topo (pilha vazia), o método retorna 0.

## As Peças da Mesa

O conjunto de peças dispostas na mesa, representadas aqui pelas classe [Table](python/structures/table.py), consiste nos dominós que os jogadores põe na mesa em suas jogadas, dispostas daquela maneira específica, onde um lado com três bolinhas se enconsta num lado com três bolinhas, por exemplo. É a mesa de jogo realmente.

A estrutura é basicamente uma lista duplamente encadeada, cujo constutor toma como argumento um dominó, que vai iniciar a seuqencia de dominós na mesa. A classe Table conta com quatro atributos :

- first : o primeiro dominó da sequência
- last : o último dominó da sequencia
- head : O número que fica na cabeça da lista, ou seja, o lado do primeiro dominó que não está em contato com outro dominó, portanto, disponível.
- tail : Segue o mesmo conceito de head, mas se baseando no final da lista, no último dominó

Além disso, a classe conta também com os seguintes métodos :

#### add_head( domino : Domino ) => boolean

Insere um dominó no início da sequência da mesa, verificando antes se o dominó encaixa. Se o dominó encaixa, a peça é adicionada e o método retorna 1, se não, o método simplesmente retorna 0. A verificação é feita checando se algum dos lados do dominó a ser inserido tem valor igual ao atributo head do objeto, e a adição é feita transformando o first do objeto no next do cominó inserido, e o dominó inserido no prev do first do objeto, estabelecendo uma relação entre os dominós. Por fim, o dominó inserido é tomado como first do objeto, e seu lado não encaixado passa a ser o atributo head.

#### add_tail( domino : Domino ) => boolean

Insere um dominó no fim da sequência da mesa, seguindo o mesmo ritual do método descrito acima, só que manipulando os atributos last e tail do objeto, é claro.

#### display( ) => void

Exibe as peças da mesa
