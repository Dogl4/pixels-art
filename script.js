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

window.onload = () => {
  createPaletteLine(); // 2
};
