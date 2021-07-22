//Initial Data
  let square = { //cria um objeto que vai receber cada casa do tabuleiro vazio
    a1: '', a2: '', a3:'',
    b1: '', b2: '', b3: '',
    c1: '', c2: '', c3: '' 
  };
  let player = '';// variavel que vai armazenar de quem é a vez de jogar
  let warning = ''; //exibira imagem de vencedor 
  let playing = false; //variavel pra definir se o jogo ta jogando ou não

  reset();

// Events
document.querySelector('.reset').addEventListener('click', reset);/*Cria o evento
de click para resetar */

document.querySelectorAll('.item').forEach(item => {
  item.addEventListener('click', itemClick);
}); /*atraves da funcao forEach vai percorrer todos os itens que tenha a class item e vai criar um evento em cada
de click passando nesse click a funcao itemClick */



// Functions
function itemClick(event) {
  let item = event.target.getAttribute('data-item'); /* pegou a posicao que foi passada
  como parametro no evento atraves do target e salvou na variavel item */
  if(playing && square[item] === '') { // se o item dentro do indice do tabuleiro tiver vazio
    square[item] = player; //preenche ao clicar com o simbolo do player da vez O ou X
    renderSquare(); // renderiza no HTML o que foi salvo 
    togglePlayer();
  }
}

function reset() {
  warning = ''; // limpa os avisos

  let random = Math.floor(Math.random() * 2);/* Utiliza a funcão floor para arredondar
  para baixo e ao multiplicar x 2 ira apresentar um numero entre 0 ou 1 que sera arrendondado
  */
   player = (random === 0) ? 'x' : 'o' ;  /*usa ternario para dizer que se 
  random for 0 player X começa jogar e se for 1 player O começa jogar */

  for (let i in square) { /* cria um loop para percorrer todo o Quadro (square)
    e limpar o tabuleiro */
    square[i] = ''; // usa a variavel indice [i] para percorrer todos os campos do tabuleiro
  };

  playing = true; //informa que o jogo ta iniciado

  renderSquare(); // função vai renderizar o que esta feito no jogo na tela do DOM
  renderInfo(); //funcao vai renderizar as informações do resultado
};

function renderSquare() {
  for(let i in square) { // cria loop para pegar cada item da tabela ja criada
    let item = document.querySelector( `div[data-item=${i}]`); // pega o item que tenha class data-item e o indice emitido pelo I
      if(square[i] === 'x'){
        item.style.color = 'red';
        item.innerHTML = square[i];
      }else {
        item.style.color = 'blue';
        item.innerHTML = square[i];
      };
       //pega o item e preenche no HTML dentro da posicao square[i]
      
    }; 

    checkGame();
  };

function renderInfo() { 
  if (player === 'o'){
    document.querySelector('.vez').innerHTML = player;
    document.querySelector('.vez').style.color = 'blue';
  } else if(player === 'x') {
    document.querySelector('.vez').innerHTML = player;
    document.querySelector('.vez').style.color = 'red';
  }
 document.querySelector('.vez').innerHTML = player;
 document.querySelector('.resultado').innerHTML = warning;
};

function togglePlayer(){ //cria função para alternar o player
  player = (player === 'x') ? 'o' : 'x' ; //se player é X entao poe O caso contrario poe X;
  renderInfo();
};

function checkGame() { //cria função que verifica o ganhador ou empate
  if(checkWinnerFor('x')){ //se a funcao checkWinnerFor indicar o X vencedor
    warning = 'O  "X" venceu';// informa o resultado
    playing = false;// para o jogo

  } else if(checkWinnerFor('o')) { //se a funcao indicar o O vencedor
    warning = 'O  "O" venceu'; // informa o resultado
    playing = false; // para o jogo
 
  } else if (isFull()) { // se a funcao is Full informar o empate
    warning = 'Deu Empate'; // informa o resultadoi
    playing = false; // para o jogo
  };
};

function checkWinnerFor(player) { //funcao consultar quem ganhou
  let pos = [ //cria um array com a sequencias possiveis para vitoria
    'a1,a2,a3' , 
    'b1,b2,b3' ,
    'c1,c2,c3' ,
    
    'a1,b1,c1' , 
    'a2,b2,c2' ,
    'a3,b3,c3' ,

    'a1,b2,c3' ,
    'a3,b2,c1' ,

  ];

  for (let w in pos) {
    let pArray = pos[w].split(','); /*usa o split para picar cada
     sequencia e criar um mini array para consultar cada item */
    let haswon = pArray.every(option => square[option] === player); //percorre o novo mini array com a funcao every e retorna true ou false se esta preenchido
      //se qualque uma das posicoes do array nao retornar true na hora ja retorna false em tudo
    if(haswon) { // se resultado venceu return true
      return true;
    }
  };

  return false; //senao retorna falso
};

function isFull() { // funcao para checar se deu empate
  for(let i in square) {
    if(square[i] === '') {
      return false;
    };
  };
  return true;
};
