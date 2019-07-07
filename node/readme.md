# Dominoes - Node

## Sobre

Como uma extensão da implementação em [Python](https://github.com/Tubskleyson/Dominoes/tree/master/python) , esta aplicação traz a mesma estrutura básica do modelo em cli com a adição de elementos gráficos e de comunicação entre jogadores de máquinas distintas. Fazendo uso de Node.js e websockets, esse ramo do projeto apresenta um pequeno servidor web para jogar dominós.

## O Servidor

O servidor Node faz uso dos pacotes express, para a estrutura básica, e socket.io para a comunicação em tempo real entre os clientes. Os jogos de dominó se farão possívei com o uso de salas, cada sala representada no sistema por um objetos json com a seguintes estrutura:

```
{
       nome : string que representa o nome da sala
       dono : string com o nome do dono da sala
    membros : array de strings com o nome de cada membro da sala
     ingame : booleano que indica se o jogo já foi iniciado na sala
  gamestate : array com os passos que o jogo tomou caso já tenha sido iniciado.
  
}
```

Dentro do jogo, as ações de cada jogador são repassadas aos demais adicionando a jogada ao atributo gamestate da sala, que vai chegar naturalmente aos jogadores, já que a cada 0.5s o servidor faz a transmissão (via websockets) do status de cada sala para seus membros, de forma que cabe aos membros checar se a array gamestate foi alterada.


## O Jogo

Como já foi dito anteriormente, a estrutura básica, o jogo de dominó em si traz a exata estrutura da implementação e python (traduzida para javascript, é claro), só que agora com algumas ferramentas a mais para possibilitar a interação gráfica.

### App

Primeiramente, temos a classe [App](assets/scripts/app.js), que funciona como um controlador para o fluxo do jogo, é ela que inicia a estrutura básica do dominó, verifica quem é o dono, que é só um membro, organiza a estrutura dos players, a mesa, e responde às jogadas.

Esta classe conta com os seguintes atributos:

  - username : uma string com o nome do jogador local
  - sala : incialmente uma string com o nome da sala, que na inicialização se transforma no objeto JSON que representa a sala com todos os seus atributos
  - gamestate : um array que faz analogia à array gamestate da sala
  - dono : booleano que indentifica se o player local é o dono da sala
  - players : array de instâncias do objeto [Player](assets/scripts/engine/player.js) organizadas de maneira encadeada.
  - socket : instância da classe Socket usada para a comunicação em tempo real entre o jogador local e o servidor
  
  - player : instância da classe Player que representa o jogador local
  - id : inteiro que contém a posição do jogador local no array players
  - game : instância da classe [Game](assets/scripts/engine/game.js) que serve de estrutura básica para o jogo
  
  - board : instância da classe [Board](assets/scripts/board.js) que faz a representação gráfica da mão do jogador
  - chain : instância da classe [Chain](assets/scripts/chain.js) que faz a representação gráfica da corrente de dominós na mesa.
  
Os métodos da class App são uma mistura de ações gráficas, listeners e emissões de sockets. Tudo integrado de forma que a comunicação entre o comando que vem via socket possa ser traduzida facilmente para um evento do jogo. 

Mais informações sobre os métodos podem ser obtidas na documentação do próprio código.

###
