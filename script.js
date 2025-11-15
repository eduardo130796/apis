/* ==========================================================
   SCRIPT.JS FINAL — Colônia de Férias ÁPIS
   Versão otimizada para: Netlify, WhatsApp, Google Sheets
   Criado para máximo desempenho e conversão
   ========================================================== */


/* ==========================================================
   CONFIGURAÇÕES IMPORTANTES
   ========================================================== */

// 👉 Coloque aqui o seu número do WhatsApp EM FORMATO INTERNACIONAL (sem +)
// Exemplo: 55 + DDD + número  
// (61) 99999-9999 = 5561999999999
const WHATSAPP_PHONE = "5561993187274"; // ALTERAR ANTES DE PUBLICAR

// 👉 Se quiser salvar no Google Sheets, cole aqui a URL do Apps Script "/exec"
const SHEETS_URL = "https://script.google.com/macros/s/AKfycbxJtrSVC26LFi5tG5D0w4plszqY85IXdR_h1k9WPA2v_oLEDbM07sTO7i3e1qeMd7zkMg/exec";


/* ==========================================================
   FUNÇÃO — Abrir WhatsApp
   ========================================================== */

function openWhatsApp(msg = null) {
  const defaultMsg =
    "Olá! Quero garantir a vaga do meu filho na Colônia de Férias ÁPIS 2025/2026. Pode me passar as informações?";
  
  const message = encodeURIComponent(msg || defaultMsg);
  const url = `https://wa.me/${WHATSAPP_PHONE}?text=${message}`;

  const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  if (isMobile) {
    window.location.href = url;
  } else {
    window.open(url, "_blank");
  }
}

window.openWhatsApp = openWhatsApp;


/* ==========================================================
   FUNÇÃO — Toast Elegante (alerta bonito)
   ========================================================== */

function showToast(text, duration = 3500) {
  const old = document.getElementById("toast-msg");
  if (old) old.remove();

  const toast = document.createElement("div");
  toast.id = "toast-msg";
  toast.textContent = text;

  Object.assign(toast.style, {
    position: "fixed",
    bottom: "20px",
    left: "50%",
    transform: "translateX(-50%)",
    background: "rgba(0,0,0,0.82)",
    color: "#fff",
    padding: "12px 20px",
    borderRadius: "10px",
    fontSize: "0.95rem",
    zIndex: "99999",
    boxShadow: "0 6px 20px rgba(0,0,0,0.25)",
    opacity: "1",
    transition: "opacity .4s"
  });

  document.body.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    setTimeout(() => toast.remove(), 400);
  }, duration);
}

window.showToast = showToast;


/* ==========================================================
   FUNÇÃO — Scroll suave para o formulário
   ========================================================== */

function scrollToForm() {
  const form = document.querySelector(".hibrido") || document.querySelector("#leadForm");
  if (form) form.scrollIntoView({ behavior: "smooth", block: "start" });
}

window.scrollToForm = scrollToForm;


/* ==========================================================
   CONTAGEM REGRESSIVA — até 27/11/2025
   ========================================================== */

(function countdownInit() {
  const el = document.querySelector("#countdown");
  if (!el) return;

  const deadline = new Date("2025-11-27T23:59:59-03:00").getTime();

  function updateCountdown() {
    const now = Date.now();
    const diff = deadline - now;

    if (diff <= 0) {
      el.textContent = "⏰ Inscrições encerradas!";
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

   el.innerHTML = `
  ⏳ Faltam <strong>${days} dia(s)</strong> para o encerramento das inscrições.<br>
  <span style="color:#ff4d4f; font-weight:700;">⚠ Nenhuma vaga será aberta depois desse prazo.</span>
`;
  }

  updateCountdown();
  setInterval(updateCountdown, 30000);
})();


/* ==========================================================
   ANIMAÇÃO — Fade-in ao rolar
   ========================================================== */

(function fadeInOnScroll() {
  const elements = document.querySelectorAll(".fade-in");
  if (!elements.length) return;

  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) e.target.classList.add("in-view");
      });
    },
    { threshold: 0.12 }
  );

  elements.forEach((el) => obs.observe(el));
})();



/* ==========================================================
   FORMULÁRIO PRINCIPAL (WhatsApp)
   ========================================================== */

(function bindMainForm() {
  const form = document.getElementById("leadForm");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const data = new FormData(form);
    const nome = data.get("nome_responsavel")?.trim();
    const crianca = data.get("nome_crianca")?.trim();
    const tel = data.get("telefone")?.trim();
    const unidade = data.get("unidade")?.trim();

    if (!nome || !crianca || !tel || !unidade) {
      showToast("Preencha todos os campos corretamente.");
      return;
    }

    const msg =
      `Olá! Meu nome é ${nome}. Quero informações sobre a Colônia de Férias ÁPIS.\n` +
      `Criança: ${crianca}\nTelefone: ${tel}\nUnidade: ${unidade}\n`;

    showToast("Abrindo WhatsApp…");
    openWhatsApp(msg);
    form.reset();
  });
})();



/* ==========================================================
   ACESSIBILIDADE — Enter e Espaço ativam botões
   ========================================================== */

(function enableKeyboardClick() {
  const btns = document.querySelectorAll(
    ".btn-primary, .btn-outline, .btn-ghost, .fixed-cta"
  );

  btns.forEach((btn) => {
    btn.setAttribute("tabindex", "0");
    btn.addEventListener("keydown", function (ev) {
      if (ev.key === "Enter" || ev.key === " ") {
        ev.preventDefault();
        btn.click();
      }
    });
  });
})();
