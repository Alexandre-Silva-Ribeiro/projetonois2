const botaoIniciar = document.getElementById("botaoIniciar");
const intro = document.getElementById("intro");
const experiencia = document.getElementById("experiencia");
const musicaFundo = document.getElementById("musicaFundo");

const horasEl = document.getElementById("horas");
const minutosEl = document.getElementById("minutos");
const segundosEl = document.getElementById("segundos");

const botaoMensagem = document.getElementById("botaoMensagem");
const painelMensagem = document.getElementById("painelMensagem");
const textoMensagem = document.getElementById("textoMensagem");

const faixaMemorias = document.getElementById("faixaMemorias");
const indicadoresMemorias = document.getElementById("indicadoresMemorias");
const botaoAnteriorMemoria = document.getElementById("anteriorMemoria");
const botaoProximaMemoria = document.getElementById("proximaMemoria");

const botaoPresente = document.getElementById("botaoPresente");
const declaracaoFinal = document.getElementById("declaracaoFinal");
const botaoFecharFinal = document.getElementById("botaoFecharFinal");
const camadaConfete = document.getElementById("camadaConfete");
const coracoesFinal = document.getElementById("coracoesFinal");
const botaoRemoverMemoria = document.getElementById("removerMemoria");

const particulasIntro = document.getElementById("particulasIntro");
const coracoesIntro = document.getElementById("coracoesIntro");
const particulasFundo = document.getElementById("particulasFundo");

const DIA_ANIVERSARIO = 14;
const MES_ANIVERSARIO = 10;

const mensagensRomanticas = [
  {
    texto:
      "Você entrou na minha rotina e, sem pedir nada, deixou tudo mais leve e mais bonito.",
  },
  {
    texto:
      "Se eu pudesse transformar presença em linguagem, cada linha escreveria seu nome com carinho.",
  },
  {
    texto:
      "Tem algo em você que me acalma, me inspira e me faz querer construir dias melhores.",
  },
  {
    texto:
      "Entre todos os caminhos, eu gosto desse em que a gente se encontra no meio e sorri.",
    digitando: true,
  },
  {
    texto:
      "Que hoje e sempre você se lembre: você merece amor bonito, paz no coração e tudo aquilo que sonha.",
  },
];

// Para substituir as imagens:
// 1) Coloque suas fotos em uma pasta (ex.: ./imagens/foto1.jpg)
// 2) Troque o valor de "src" abaixo para o caminho real de cada foto
let MEMORIAS = [
  {
    src: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=1200&q=80",
    titulo: "Primeiras lembranças",
    legenda: "Tudo começou em detalhes que ninguém mais percebia.",
  },
  {
    src: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=80",
    titulo: "Dias que viraram especiais",
    legenda: "Momentos simples que ganharam significado com você.",
  },
  {
    src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=1200&q=80",
    titulo: "Sorrisos inesquecíveis",
    legenda: "Tem sorriso que a memória guarda para sempre.",
  },
  {
    src: "https://images.unsplash.com/photo-1513279922550-250c2129b13a?auto=format&fit=crop&w=1200&q=80",
    titulo: "Nosso capítulo favorito",
    legenda: "O presente mais bonito continua sendo te ter por perto.",
  },
];

let iniciou = false;
let indiceMensagemAtual = -1;
let intervaloDigitacao = null;
let indiceMemoriaAtual = 0;
let autoplayMemoriasId = null;

function criarParticulas() {
  const total = 34;
  for (let i = 0; i < total; i += 1) {
    const particula = document.createElement("span");
    particula.className = "particula";
    particula.style.left = `${Math.random() * 100}%`;
    particula.style.width = `${4 + Math.random() * 8}px`;
    particula.style.height = particula.style.width;
    particula.style.animationDuration = `${8 + Math.random() * 8}s`;
    particula.style.animationDelay = `${Math.random() * 4}s`;
    particulasIntro.appendChild(particula);
  }
}

function criarParticulasFundo() {
  if (!particulasFundo) {
    return;
  }

  const total = 30;
  for (let i = 0; i < total; i += 1) {
    const particula = document.createElement("span");
    particula.className = "particula-fundo";
    particula.style.left = `${Math.random() * 100}%`;
    particula.style.width = `${5 + Math.random() * 12}px`;
    particula.style.height = particula.style.width;
    particula.style.animationDuration = `${14 + Math.random() * 14}s`;
    particula.style.animationDelay = `${Math.random() * 8}s`;
    particulasFundo.appendChild(particula);
  }
}

function criarCoracoes(container, quantidade) {
  for (let i = 0; i < quantidade; i += 1) {
    const coracao = document.createElement("span");
    coracao.className = "mini-coracao";
    coracao.style.left = `${Math.random() * 100}%`;
    coracao.style.width = `${10 + Math.random() * 14}px`;
    coracao.style.height = coracao.style.width;
    coracao.style.animationDuration = `${8 + Math.random() * 9}s`;
    coracao.style.animationDelay = `${Math.random() * 4}s`;
    container.appendChild(coracao);
  }
}

function proximoAniversario() {
  const agora = new Date();
  let alvo = new Date(agora.getFullYear(), MES_ANIVERSARIO - 1, DIA_ANIVERSARIO, 0, 0, 0);

  if (alvo <= agora) {
    alvo = new Date(
      agora.getFullYear() + 1,
      MES_ANIVERSARIO - 1,
      DIA_ANIVERSARIO,
      0,
      0,
      0
    );
  }

  return alvo;
}

const alvoContagem = proximoAniversario();

function atualizarValorTempo(elemento, valor) {
  if (elemento.textContent === valor) {
    return;
  }

  elemento.textContent = valor;
  elemento.classList.remove("atualizado");
  void elemento.offsetWidth;
  elemento.classList.add("atualizado");
}

function atualizarContagem() {
  const agora = new Date();
  const diferencaSegundos = Math.max(
    0,
    Math.floor((alvoContagem.getTime() - agora.getTime()) / 1000)
  );

  const horas = Math.floor(diferencaSegundos / 3600);
  const minutos = Math.floor((diferencaSegundos % 3600) / 60);
  const segundos = diferencaSegundos % 60;

  atualizarValorTempo(horasEl, String(horas).padStart(2, "0"));
  atualizarValorTempo(minutosEl, String(minutos).padStart(2, "0"));
  atualizarValorTempo(segundosEl, String(segundos).padStart(2, "0"));
}

function revelarMensagem() {
  indiceMensagemAtual = (indiceMensagemAtual + 1) % mensagensRomanticas.length;
  const mensagemAtual = mensagensRomanticas[indiceMensagemAtual];

  painelMensagem.classList.remove("animando");
  void painelMensagem.offsetWidth;
  painelMensagem.classList.add("animando");

  if (intervaloDigitacao) {
    window.clearInterval(intervaloDigitacao);
    intervaloDigitacao = null;
  }

  if (mensagemAtual.digitando) {
    textoMensagem.textContent = "";
    textoMensagem.classList.add("digitando");

    let indice = 0;
    intervaloDigitacao = window.setInterval(() => {
      textoMensagem.textContent += mensagemAtual.texto[indice];
      indice += 1;

      if (indice >= mensagemAtual.texto.length) {
        window.clearInterval(intervaloDigitacao);
        intervaloDigitacao = null;
        textoMensagem.classList.remove("digitando");
      }
    }, 32);
    return;
  }

  textoMensagem.classList.remove("digitando");
  textoMensagem.textContent = mensagemAtual.texto;
}

function renderizarCarrossel() {
  faixaMemorias.innerHTML = "";
  indicadoresMemorias.innerHTML = "";

  if (MEMORIAS.length === 0) {
    faixaMemorias.innerHTML = `
      <article class="slide-vazio">
        Nenhuma imagem disponível no momento.
      </article>
    `;
    if (botaoRemoverMemoria) {
      botaoRemoverMemoria.disabled = true;
    }
    return;
  }

  if (botaoRemoverMemoria) {
    botaoRemoverMemoria.disabled = false;
  }

  MEMORIAS.forEach((memoria, indice) => {
    const slide = document.createElement("article");
    slide.className = "slide-memoria";
    slide.innerHTML = `
      <img src="${memoria.src}" alt="Imagem de memória ${indice + 1}" loading="lazy" />
      <div class="slide-legenda">
        <strong>${memoria.titulo}</strong>
        <span>${memoria.legenda}</span>
      </div>
    `;
    faixaMemorias.appendChild(slide);

    const indicador = document.createElement("button");
    indicador.className = "indicador";
    indicador.type = "button";
    indicador.setAttribute("aria-label", `Ir para memória ${indice + 1}`);
    indicador.addEventListener("click", () => {
      indiceMemoriaAtual = indice;
      atualizarCarrossel();
      reiniciarAutoplayCarrossel();
    });
    indicadoresMemorias.appendChild(indicador);
  });

  atualizarCarrossel();
}

function atualizarCarrossel() {
  if (MEMORIAS.length === 0) {
    faixaMemorias.style.transform = "translateX(0)";
    return;
  }

  faixaMemorias.style.transform = `translateX(-${indiceMemoriaAtual * 100}%)`;

  const indicadores = indicadoresMemorias.querySelectorAll(".indicador");
  indicadores.forEach((indicador, indice) => {
    indicador.classList.toggle("ativo", indice === indiceMemoriaAtual);
  });
}

function proximaMemoria() {
  if (MEMORIAS.length === 0) {
    return;
  }

  indiceMemoriaAtual = (indiceMemoriaAtual + 1) % MEMORIAS.length;
  atualizarCarrossel();
}

function memoriaAnterior() {
  if (MEMORIAS.length === 0) {
    return;
  }

  indiceMemoriaAtual = (indiceMemoriaAtual - 1 + MEMORIAS.length) % MEMORIAS.length;
  atualizarCarrossel();
}

function reiniciarAutoplayCarrossel() {
  if (autoplayMemoriasId) {
    window.clearInterval(autoplayMemoriasId);
  }

  if (MEMORIAS.length > 1) {
    autoplayMemoriasId = window.setInterval(proximaMemoria, 6200);
  }
}

function removerMemoriaAtual() {
  if (MEMORIAS.length === 0) {
    return;
  }

  MEMORIAS.splice(indiceMemoriaAtual, 1);
  if (indiceMemoriaAtual >= MEMORIAS.length) {
    indiceMemoriaAtual = Math.max(0, MEMORIAS.length - 1);
  }

  renderizarCarrossel();
  reiniciarAutoplayCarrossel();
}

function dispararConfete() {
  const cores = ["#f8a4cd", "#ffd7ec", "#cfabff", "#bc8ff5", "#f3b7d8"];
  camadaConfete.innerHTML = "";

  for (let i = 0; i < 140; i += 1) {
    const confete = document.createElement("span");
    confete.className = "confete";
    confete.style.left = `${Math.random() * 100}%`;
    confete.style.background = cores[Math.floor(Math.random() * cores.length)];
    confete.style.animationDuration = `${3.2 + Math.random() * 2.6}s`;
    confete.style.animationDelay = `${Math.random() * 0.7}s`;
    confete.style.transform = `rotate(${Math.random() * 360}deg)`;
    camadaConfete.appendChild(confete);
  }

  window.setTimeout(() => {
    camadaConfete.innerHTML = "";
  }, 6500);
}

function animarCoracoesFinais() {
  coracoesFinal.innerHTML = "";
  criarCoracoes(coracoesFinal, 16);
}

function abrirDeclaracaoFinal() {
  dispararConfete();
  animarCoracoesFinais();
  declaracaoFinal.classList.add("ativa");
}

function fecharDeclaracaoFinal() {
  declaracaoFinal.classList.remove("ativa");
  coracoesFinal.innerHTML = "";
}

function iniciarExperiencia() {
  if (iniciou) {
    return;
  }

  iniciou = true;
  intro.classList.add("encerrou");
  experiencia.classList.remove("escondido");
  window.setTimeout(() => {
    experiencia.classList.add("ativa");
  }, 120);

  musicaFundo.play().catch(() => {
    // User-visible text must remain in Portuguese. Silent fallback.
  });
}

function revelarSecoesAoScroll() {
  const secoes = document.querySelectorAll(".revelar");
  secoes.forEach((secao, indice) => {
    secao.style.transitionDelay = `${indice * 70}ms`;
  });

  const observador = new IntersectionObserver(
    (entradas) => {
      entradas.forEach((entrada) => {
        if (entrada.isIntersecting) {
          entrada.target.classList.add("visivel");
        }
      });
    },
    {
      threshold: 0.15,
    }
  );

  secoes.forEach((secao) => observador.observe(secao));
}

function prepararEventos() {
  botaoIniciar.addEventListener("click", iniciarExperiencia);
  botaoMensagem.addEventListener("click", revelarMensagem);
  botaoPresente.addEventListener("click", abrirDeclaracaoFinal);
  botaoFecharFinal.addEventListener("click", fecharDeclaracaoFinal);
  botaoAnteriorMemoria.addEventListener("click", () => {
    memoriaAnterior();
    reiniciarAutoplayCarrossel();
  });
  botaoProximaMemoria.addEventListener("click", () => {
    proximaMemoria();
    reiniciarAutoplayCarrossel();
  });
  if (botaoRemoverMemoria) {
    botaoRemoverMemoria.addEventListener("click", removerMemoriaAtual);
  }
}

function iniciarSite() {
  criarParticulasFundo();
  criarParticulas();
  criarCoracoes(coracoesIntro, 12);
  atualizarContagem();
  window.setInterval(atualizarContagem, 1000);
  renderizarCarrossel();
  reiniciarAutoplayCarrossel();
  prepararEventos();
  revelarSecoesAoScroll();
}

iniciarSite();
