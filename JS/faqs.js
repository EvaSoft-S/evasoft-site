// ================================
// ACORDEÃO DE FAQS
// ================================
// Abre e fecha cada pergunta ao clicar.
// Fecha automaticamente as outras
// quando uma nova é aberta.
// ================================

document.querySelectorAll('.faq-pergunta').forEach(function (btn) {
  btn.addEventListener('click', function () {
    const item = this.closest('.faq-item');
    const estaAberto = item.classList.contains('aberto');

    document.querySelectorAll('.faq-item').forEach(function (i) {
      i.classList.remove('aberto');
    });

    if (!estaAberto) {
      item.classList.add('aberto');
    }
  });
});