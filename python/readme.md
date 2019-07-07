# Dominoes - Python

## Sobre

Esta é uma aplicação python que simula um clássico jogo de dominó. O projeto em si tem como fim trabalhar com estruturas de dados; caso você esteja interessado nessas estruturas, aqui está a [documentação](estruturas.md). 

A aplicação conta com uma engine genérica, construída na class [Game](game/game.py), que faz uso das estrutras criadas para simular o fluxo de um jogo de dominó e duas ações. Essa classe é realmente bem genérica, báscia, tanto que foi traduzida e usada no projeto [Node](../javascript/) deste repositótio, funcionando de maneira bem eficiente. 

Assim, para tornar possível implementar a aplicação em cli, foi necessária a criação de uma class intermediária para estabelecer uma relação entre o usuário e a engine.

## A Engine

A classe [Game](game/game.py), tratada nesse tópico simplesmente como "jogo" é o motor primário da aplicação. A classe [App](#A-classe-App) inicia o jogo passando como argumento os jogadores definidos pelo usuário, esses joadroes então, são organizados numa lista encadeada circular estremamenta básica, que a facilita a implementação do fluxo do jogo.

Ainda no método contrutor, todos os 28 dominós são gerados, e então distribuídos aleatóriamente entre os jogadores, 7 para cada um, sendo que o resto dessa divisão é colocado numa [pilha](structures/pile.py), para acesso futuro.

Feito isso, o jogo vai procurar que jogador possui o maior "carrão" (peça de lados iguais), e o sortudo vai ser o primeiro a jogar, dando a vez ao próximo do círculo.

De maneira mais métodica, podemos listar 5 atributos para a classe Game :

- players : Uma lista de instâncias da classe [Player](nodes/player.py), onde cada Player aponta para o próximo.
- player : O Player da vez.
- dominoes : Uma lista com os 28 dominós (por motivos sentimentais).
- pile : Uma instância da classe [Pile](structures/pile.py), para servir de pilha de compra
- table : Uma instância da classe [Table](structures/table.py), para servir de mesa de jogo

E, além dos métodos de inicialização, o jogo conta com apenas 2 métodos para guiar o fluxo do jogo :

#### play( domino : string, place : bool) => integer

Recebe o valor de uma peça e a posição onde ela deve ser jogada (0 = começo, 1 = fim). Esse método faz uma série de verificações : se o player possui a peça que quer jogar, se a peça encaixa em algum lugar ou se o player ganha ao jogar essa peçao, a partir daí, cada possível retorno tem um significado: 

      -1 . O jogador não possui a peça que quer jogar
       0 . A peça não encaixa em nenhuma ponta
       1 . A peça encaixa em uma ponta
       2 . A peça encaixa e o jogador ganha com essa jogada

#### buy( ) => Domino

Realiza a compra de uma peça pelo jogador da vez, retornando-a. Caso a pilha esteja vazia, o método retorna 0
  

## A classe App

A classe [App](dominoes.py) serve de interface para o jogo, contando com um menu principal, onde é possível nomear os jogadores e iniciar o jogo. Depois de iniciado, e feito todos os rituais iniciais da classe [Game](game/game.py), a aplicação entra num estado de pronto, aguardando pelo comando do usuário.

O comando do usuário é mapeado numa ação, caso não haja ação para tal comando, o terminal exibe uma mensgem de comando invlido. Os comandos possíveis são:

#### jogar [peça] no [posição]

Esse comando permite você jogar uma peça no formato a:b (para a e b sendo os lados da peça), numa posição específica, que pode ser "fim" ou "começo". Por exemplo:

      jogar 2:5 no fim

#### mostrar [estrutura]

Esse comando serve para mostrar as peças de uma determinada estrutura, que pode ser a __mesa__ ou as __peças__ do jogador da vez. Por exemplo:

      mostrar peças

#### comprar

Esse comando permite que você compre a peça do topo da pilha de compra, sendo que a aplicação lhe informa a peça comprada

#### passar

Esse comando permite que você passe a vez para o próximo jogador no círculo
