// ================================
// CHATBOT EVASOFT — IA
// ================================
// Assistente virtual alimentado pela
// API Claude com conhecimento completo
// sobre os serviços da EvaSoft.
// ================================

const SYSTEM_PROMPT = `És o assistente virtual da EvaSoft Solutions, uma empresa angolana de desenvolvimento de software e soluções digitais, com sede em Huambo, Angola.

O teu papel é responder perguntas de potenciais clientes sobre os serviços, preços, prazos e processos da EvaSoft. Sê sempre simpático, directo e profissional. Responde sempre em português de Angola (podes usar "você" ou "o/a senhor/a").

SERVIÇOS E PREÇOS:

1. WEBSITES INSTITUCIONAIS
- Starter (até 5 páginas): 80.000 Kz (sem domínio) / 104.900 Kz (com domínio .ao ou .com)
- Pro (até 15 páginas): 150.000 Kz (sem domínio) / 174.900 Kz (com domínio)
- Enterprise (até 25 páginas): 280.000 Kz (sem domínio) / 304.900 Kz (com domínio)
- Prazo mínimo: 2 semanas
- Inclui: design responsivo, SSL gratuito, hospedagem 1º ano, e-mails corporativos

2. LANDING PAGES
- Starter (1 página): 35.000 Kz (sem domínio) / 59.900 Kz (com subdomínio EvaSoft)
- Pro (1 página + agradecimento): 65.000 Kz / 89.900 Kz
- Enterprise (até 3 variantes): 110.000 Kz / 134.900 Kz
- Prazo mínimo: 1 semana

3. SISTEMAS WEB PERSONALIZADOS
- Gestão Escolar: 150.000 Kz (só dev) / 300.000 Kz (com domínio + hospedagem 1º ano)
- Gestão Farmácias: 120.000 Kz / 250.000 Kz
- Sistema de Vendas: 90.000 Kz / 200.000 Kz
- Gestão Hospitalar: sob consulta
- Manutenção a partir do 2º ano: 25.000 Kz/mês
- Prazo mínimo: 5 a 8 semanas dependendo do sistema

4. E-COMMERCE
- Starter (até 50 produtos): 120.000 Kz / 144.900 Kz
- Pro (até 200 produtos): 220.000 Kz / 244.900 Kz
- Enterprise (ilimitado): 380.000 Kz / 404.900 Kz
- Prazo mínimo: 3 semanas

CONTACTOS:
- WhatsApp: +244 944 268 357
- Email: contato@evasoft.ao
- Morada: Avª. 11 de Novembro — Rua 5 de Outubro, Huambo, Angola

PROCESSO DE TRABALHO:
1. Análise do negócio
2. Proposta à medida
3. Desenvolvimento
4. Entrega e suporte

PAGAMENTO:
- 50% no início + 50% na entrega
- Aceite transferência bancária e depósito

REGRAS IMPORTANTES:
- Mantém as respostas curtas e objectivas (máximo 3-4 linhas)
- Se não souberes responder, sugere contactar via WhatsApp
- Não inventes informações que não estão acima
- Termina sempre oferecendo ajuda adicional ou sugerindo contacto directo`;

const chatToggle = document.getElementById('chatToggle');
const chatWidget = document.getElementById('chatWidget');
const chatWindow = document.getElementById('chatWindow');
const chatClose = document.getElementById('chatClose');
const chatMessages = document.getElementById('chatMessages');
const chatInput = document.getElementById('chatInput');
const chatSend = document.getElementById('chatSend');
const chatSugestoes = document.getElementById('chatSugestoes');

let historico = [];
let aberto = false;

function abrirChat() {
  aberto = true;
  chatWidget.classList.add('open');
  chatInput.focus();
}

function fecharChat() {
  aberto = false;
  chatWidget.classList.remove('open');
}

chatToggle.addEventListener('click', function () {
  aberto ? fecharChat() : abrirChat();
});

chatClose.addEventListener('click', fecharChat);

document.querySelectorAll('.chat-sugestao').forEach(function (btn) {
  btn.addEventListener('click', function () {
    enviarMensagem(this.textContent);
    if (chatSugestoes) chatSugestoes.remove();
  });
});

chatSend.addEventListener('click', function () {
  const texto = chatInput.value.trim();
  if (texto) {
    enviarMensagem(texto);
    if (chatSugestoes) chatSugestoes.remove();
  }
});

chatInput.addEventListener('keydown', function (e) {
  if (e.key === 'Enter') {
    const texto = chatInput.value.trim();
    if (texto) {
      enviarMensagem(texto);
      if (chatSugestoes) chatSugestoes.remove();
    }
  }
});

function adicionarMensagem(texto, tipo) {
  const div = document.createElement('div');
  div.className = 'chat-msg ' + tipo;
  div.innerHTML = '<div class="chat-bubble">' + texto + '</div>';
  chatMessages.appendChild(div);
  chatMessages.scrollTop = chatMessages.scrollHeight;
  return div;
}

function mostrarTyping() {
  const div = document.createElement('div');
  div.className = 'chat-msg bot';
  div.id = 'chatTyping';
  div.innerHTML = '<div class="chat-typing"><span></span><span></span><span></span></div>';
  chatMessages.appendChild(div);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function removerTyping() {
  const typing = document.getElementById('chatTyping');
  if (typing) typing.remove();
}

async function enviarMensagem(texto) {
  chatInput.value = '';
  adicionarMensagem(texto, 'user');
  historico.push({ role: 'user', content: texto });
  mostrarTyping();

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1000,
        system: SYSTEM_PROMPT,
        messages: historico
      })
    });

    const data = await response.json();
    removerTyping();

    const resposta = data.content[0].text;
    historico.push({ role: 'assistant', content: resposta });
    adicionarMensagem(resposta, 'bot');

  } catch (err) {
    removerTyping();
    adicionarMensagem('Desculpe, ocorreu um erro. Por favor contacte-nos directamente pelo WhatsApp: <a href="https://wa.me/244944268357" target="_blank" style="color:var(--blue)">+244 944 268 357</a>', 'bot');
  }
}