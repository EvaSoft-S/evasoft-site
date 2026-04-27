// ================================
// FORMULÁRIO DE ORÇAMENTO
// ================================
// Envia o formulário da página de contacto
// via Formspree e mostra mensagem de sucesso
// sem recarregar a página.
// ================================

const formPage = document.querySelector('.contacto-form-page');

if (formPage) {
  formPage.addEventListener('submit', async function (e) {
    e.preventDefault();

    const btn = formPage.querySelector('.btn-submit-page');
    const sucesso = document.getElementById('formSucesso');

    btn.textContent = 'A enviar...';
    btn.disabled = true;

    const data = new FormData(formPage);

    try {
      const response = await fetch(formPage.action, {
        method: 'POST',
        body: data,
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        formPage.reset();
        sucesso.classList.add('visivel');
        btn.textContent = 'Pedido enviado ✓';
      } else {
        btn.textContent = 'Erro ao enviar. Tente novamente.';
        btn.disabled = false;
      }
    } catch (error) {
      btn.textContent = 'Erro ao enviar. Tente novamente.';
      btn.disabled = false;
    }
  });
}