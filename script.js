const palette = document.querySelectorAll('#color-palette .tr'); // Constantes globais;

function corAleatoria() {
  const option = '0123456789ABCDEF';
  let hex = '';
  do {
    hex += option[(Math.floor(Math.random() * 16)).toString()];
  } while (hex.length !== 6 || hex === 'FFFFFF');
  return `#${hex}`;
}

function createPaletteLine() {
  for (let i = 0; i < 4; i += 1) {
    const paletteColor = document.createElement('div');
    paletteColor.className = 'color td';
    paletteColor.style.backgroundColor = corAleatoria();
    palette[0].appendChild(paletteColor);
    if (i === 0) {
      paletteColor.style.backgroundColor = '#000000';
    }
  }
}

function createLine(index, number) { // Cria linha dentro coluna
  const column = document.querySelectorAll('#pixel-board .tr');
  let square;
  for (let i = 0; i < number; i += 1) {
    square = document.createElement('div');
    square.className = 'pixel td';
    square.style.backgroundColor = '#ffffff';
    column[index].appendChild(square);
  }
}

function createTable(number) {
  const corpo = document.querySelector('#pixel-board');
  for (let i = 0; i < number; i += 1) {
    const filho = document.createElement('div');
    filho.className = 'tr';
    corpo.appendChild(filho);
    createLine(i, number);
  }
}

function selectBlack() { // Seleciona a cor preto
  const palettaCor = document.querySelectorAll('.tr .color');
  palettaCor[0].classList.add('selected');
}

function removeAndAddingClass() { // Adiciona e remove Selexxted
  const local = document.querySelectorAll('.tr .color');
  for (let i = 0; i < local.length; i += 1) {
    local[i].addEventListener('click', (event) => {
      const corAntiga = document.querySelector('.selected');
      const corAtual = event.target;
      if (corAntiga !== corAtual) {
        corAtual.classList.add('selected');
        corAntiga.classList.remove('selected');
      }
    });
  }
}
// References<https://www.w3schools.com/jsref/met_document_addeventlistener.asp | https://www.w3schools.com/jsref/event_target.asp>

function getCorSelected() {
  const local = document.querySelectorAll('#pixel-board .tr .td');
  local.forEach((item) => {
    item.addEventListener('click', (event) => {
      const quadro = event.target.style;
      quadro.backgroundColor = document.querySelector('.selected').style.backgroundColor;
    });
  });
}
// References <https://flaviocopes.com/how-to-add-event-listener-multiple-elements-javascript/>

function createButton() { // Cria botao Clear
  const botao = document.createElement('button');
  botao.id = 'clear-board';
  botao.innerText = 'Limpar';
  document.querySelector('header').appendChild(botao);
  document.querySelector('button').addEventListener('click', () => {
    const array = document.querySelectorAll('#pixel-board .tr .td');
    array.forEach((e) => {
      e.style.backgroundColor = 'rgb(255,255,255)';
    });
  });
}

function createInput() { // Cria entrada de tabela
  const entrada = document.createElement('input');
  const botao = document.createElement('button');
  botao.id = 'generate-board';
  botao.innerText = 'VQV';
  entrada.type = 'number';
  entrada.id = 'board-size';
  entrada.min = '1';
  entrada.max = '50';
  document.querySelector('header').appendChild(entrada);
  document.querySelector('header').appendChild(botao);
}

function deleta() {
  const pai = document.querySelector('#pixel-board');
  if (pai.children.length > 0) {
    while (pai.firstChild) {
      pai.removeChild(pai.firstChild);
    }
  }
}

function condicoes() {
  const boardSize = document.querySelector('#board-size');
  if (boardSize.value < 5) {
    boardSize.value = 5;
  }
  if (boardSize.value > 50) {
    boardSize.value = 50;
  }
}

function recriaTabela() {
  const vqv = document.querySelector('#generate-board');
  vqv.addEventListener('click', () => {
    const boardSize = document.querySelector('#board-size');
    if (boardSize.value >= 1) {
      condicoes();
      deleta();
      createTable(boardSize.value);
      getCorSelected();
    } else {
      alert('Board inválido!');
    }
  });
}

window.onload = () => {
  createPaletteLine(); // 2, 3 , 12
  createTable(5); // 4, 5
  selectBlack(); // 6
  removeAndAddingClass(); // 7
  getCorSelected(); // 8
  createButton(); // 9
  createInput(); // 10
  recriaTabela(); // 10
};
