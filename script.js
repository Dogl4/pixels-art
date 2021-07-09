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

function createColumn(number) {
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
  botao.innerText = 'Limpar';
  document.querySelector('header').appendChild(botao);
  document.querySelector('button').addEventListener('click', () => {
    const array = document.querySelectorAll('#pixel-board .tr .td');
    array.forEach((e) => {
      e.style.backgroundColor = 'rgb(250,250,250)';
    });
  });
}

function createInput() { // Cria entrada de tabela
  const entrada = document.createElement('input');
  entrada.type = 'number';
  entrada.min = '5';
  entrada.max = '25';
  document.querySelector('header').appendChild(entrada);
}

function recriaColuna() {
  const elementoInput = document.querySelector('input');
  elementoInput.addEventListener('change', () => {
    const pai = document.querySelector('#pixel-board');
    if (pai.children.length > 0) {
      while (pai.firstChild) {
        pai.removeChild(pai.firstChild);
      }
    }
    if (elementoInput.value <= 5) {
      elementoInput.value = 5;
    }
    if (elementoInput.value >= 50) {
      elementoInput.value = 50;
    }
    createColumn(elementoInput.value);
  });
}

window.onload = () => {
  createPaletteLine(); // 2, 3
  createColumn(5); // 4, 5
  selectBlack(); // 6
  removeAndAddingClass(); // 7
  getCorSelected(); // 8
  createButton(); // 9
  createInput(); // 10
  recriaColuna(); // 10
};
