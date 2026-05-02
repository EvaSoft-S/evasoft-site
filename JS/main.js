// ================================
// MENU HAMBURGER — NAVEGAÇÃO MOBILE
// ================================
// Abre e fecha o menu de navegação em ecrãs
// pequenos e gere os dropdowns no mobile
// como submenus expansíveis.
// ================================

const toggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

if (toggle && navMenu) {
  toggle.addEventListener('click', function () {
    toggle.classList.toggle('active');
    navMenu.classList.toggle('open');
    document.body.style.overflow = navMenu.classList.contains('open') ? 'hidden' : '';
  });

  navMenu.querySelectorAll('a:not(.nav-dropdown-trigger)').forEach(function (link) {
    link.addEventListener('click', function () {
      toggle.classList.remove('active');
      navMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

// Dropdowns mobile — expandir ao clicar
document.querySelectorAll('.nav-dropdown-trigger').forEach(function (trigger) {
  trigger.addEventListener('click', function (e) {
    if (window.innerWidth <= 768) {
      e.preventDefault();
      const dropdown = this.closest('.nav-dropdown');
      const isOpen = dropdown.classList.contains('open');
      document.querySelectorAll('.nav-dropdown').forEach(function (d) {
        d.classList.remove('open');
      });
      if (!isOpen) {
        dropdown.classList.add('open');
      }
    }
  });
});

    // ================================
// FORMULÁRIO DE CONTACTO
// ================================
// Envia o formulário via Formspree e mostra
// mensagem de sucesso sem recarregar a página.
// ================================

const form = document.querySelector('.contacto-form');

if (form) {
  form.addEventListener('submit', async function (e) {
    e.preventDefault();

    const btn = form.querySelector('.btn-submit');
    const sucesso = document.getElementById('formSucesso');

    btn.textContent = 'A enviar...';
    btn.disabled = true;

    const data = new FormData(form);

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: data,
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        form.reset();
        sucesso.classList.add('visivel');
        btn.textContent = 'Mensagem enviada ✓';
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

// ================================
// ANIMAÇÕES DE SCROLL
// ================================
// Usa o Intersection Observer para detectar
// quando cada elemento entra no ecrã e
// adiciona a classe 'visivel' para activar
// a animação CSS.
// ================================

const elementosAnimados = document.querySelectorAll(
  '.animar, .animar-esquerda, .animar-direita'
);

const observador = new IntersectionObserver(function (entradas) {
  entradas.forEach(function (entrada) {
    if (entrada.isIntersecting) {
      entrada.target.classList.add('visivel');
      observador.unobserve(entrada.target);
    }
  });
}, {
  threshold: 0.15
});

elementosAnimados.forEach(function (el) {
  observador.observe(el);
});

// ================================
// BOTÃO FLUTUANTE DE WHATSAPP
// ================================
// Cria e injeta o botão de WhatsApp
// automaticamente em todas as páginas.
// ================================

const whatsappBtn = document.createElement('a');
whatsappBtn.href = 'https://wa.me/244944268357?text=Olá%2C%20vim%20do%20site%20e%20gostaria%20de%20saber%20mais%20sobre%20os%20vossos%20serviços';
whatsappBtn.target = '_blank';
whatsappBtn.setAttribute('aria-label', 'Falar pelo WhatsApp');
whatsappBtn.className = 'whatsapp-float';
whatsappBtn.innerHTML = `
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.122 1.531 5.856L.057 23.886l6.196-1.448A11.938 11.938 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.894a9.847 9.847 0 01-5.031-1.378l-.36-.214-3.733.873.936-3.423-.235-.373A9.836 9.836 0 012.106 12C2.106 6.526 6.526 2.106 12 2.106S21.894 6.526 21.894 12 17.474 21.894 12 21.894z"/>
  </svg>
  <span class="whatsapp-float-tooltip">Fale connosco</span>
`;
document.body.appendChild(whatsappBtn);

// ================================
// TOGGLE COM/SEM DOMÍNIO — PLANOS
// ================================
// Alterna entre o preço com domínio
// e sem domínio em cada card de plano.
// ================================

document.querySelectorAll('.plano-toggle').forEach(function (toggle) {
  const card = toggle.closest('.plano-card');
  const btns = toggle.querySelectorAll('.toggle-btn');

  btns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      const opcao = this.getAttribute('data-plano');

      btns.forEach(function (b) { b.classList.remove('active'); });
      this.classList.add('active');

      const valor = card.querySelector('.plano-valor');
      const pagamento = card.querySelector('.plano-pagamento');
      if (valor) valor.textContent = valor.getAttribute('data-' + opcao);
      if (pagamento) pagamento.textContent = pagamento.getAttribute('data-' + opcao);

      card.querySelectorAll('.toggle-item').forEach(function (item) {
        if (item.getAttribute('data-show') === opcao) {
          item.classList.remove('escondido');
        } else {
          item.classList.add('escondido');
        }
      });
    });
  });

  card.querySelectorAll('.toggle-item[data-show="sem"]').forEach(function (item) {
    item.classList.add('escondido');
  });
});

// ================================
// TOGGLE PREÇO — SISTEMAS WEB
// ================================
// Alterna entre preço com domínio+hospedagem
// e só desenvolvimento nas páginas de sistema.
// ================================

document.querySelectorAll('.preco-toggle').forEach(function (toggle) {
  const card = toggle.closest('.preco-card');
  const btns = toggle.querySelectorAll('.toggle-btn');

  btns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      const opcao = this.getAttribute('data-plano');

      btns.forEach(function (b) { b.classList.remove('active'); });
      this.classList.add('active');

      const numero = card.querySelector('.preco-numero');
      if (numero) numero.textContent = numero.getAttribute('data-' + opcao);

      card.querySelectorAll('.toggle-item').forEach(function (item) {
        if (item.getAttribute('data-show') === opcao) {
          item.classList.remove('escondido');
        } else {
          item.classList.add('escondido');
        }
      });
    });
  });

  card.querySelectorAll('.toggle-item[data-show="sem"]').forEach(function (item) {
    item.classList.add('escondido');
  });
});