// ================================
// FILTROS DO PORTFÓLIO
// ================================
// Filtra os cards por categoria
// ao clicar nos botões de filtro.
// ================================

const filtros = document.querySelectorAll('.filtro-btn');
const cards = document.querySelectorAll('.portfolio-card');

filtros.forEach(function (btn) {
  btn.addEventListener('click', function () {
    filtros.forEach(function (b) { b.classList.remove('active'); });
    this.classList.add('active');

    const filtro = this.getAttribute('data-filtro');

    cards.forEach(function (card) {
      if (filtro === 'todos' || card.getAttribute('data-categoria') === filtro) {
        card.classList.remove('escondido');
      } else {
        card.classList.add('escondido');
      }
    });
  });
});