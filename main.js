const tecnologias = document.querySelectorAll(".logoTecnologia");
const imgTecnologia = document.getElementById("imgTecnologia");
const nomeTecnologia = document.getElementById("nomeTecnologia");
const descTecnologia = document.getElementById("descTecnologia");
const abrirMenu = document.getElementById("abrir-menu");
const fecharMenu = document.getElementById("fechar-menu");
const header = document.querySelector("header");
const banner = document.querySelector(".container-banner");
const links = document.querySelectorAll("header nav ul li a");

let versaoMobile = false;
let tecAtual = tecnologias[4];
let infoTecnologias = {
  "html": {
    nome: "HTML 5",
    descricao: "Criação de páginas web semânticas e responsivas, incluindo formulários, multimídia e integração com CSS/JS.",
  },

  "css": {
    nome: "CSS 3",
    descricao: "Estilização de páginas web modernas e responsivas, utilizando layouts flexíveis, grid, animações, transições e design adaptativo para diferentes dispositivos.",
  },

  "js": {
    nome: "JavaScript",
    descricao: "Desenvolvimento de interatividade e funcionalidades dinâmicas em páginas web, manipulação do DOM, requisições a APIs, validação de formulários e implementação de lógica de front-end.",
  },

  "node": {
    nome: "Node",
    descricao: "Desenvolvimento de aplicações back-end escaláveis e rápidas, criação de APIs RESTful, manipulação de arquivos, integração com bancos de dados usando JavaScript no lado do servidor.",
  },

  "react": {
    nome: "React",
    descricao: "Construção de interfaces de usuário dinâmicas e reutilizáveis, gerenciamento de estado com hooks, criação de componentes moduláveis e integração com APIs.",
  },

  "tailwind": {
    nome: "Tailwind",
    descricao: "Desenvolvimento de interfaces web responsivas e organizadas usando classes utilitárias, com controle de estilos em camadas (layers) para design modular, manutenção fácil e prototipagem rápida.",
  }
};

window.addEventListener('load', atualizarVisibilidade)

window.addEventListener('resize', atualizarVisibilidade);

particlesJS.load('particles-js', 'assets/particles.json', function() {
  console.log('callback - particles.js config loaded');
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) {
      header.classList.add("header-scroll");
    }
    else {
      header.classList.remove("header-scroll");
    }
  }, {
    root: null,
    threshold: 0,
  });
});

observer.observe(banner);

tecnologias.forEach(tec => {
  tec.addEventListener('click', () => {
    if (tec != tecAtual) {
      informacoesTec = infoTecnologias[tec.getAttribute("data-id")];
      nomeTecnologia.textContent = informacoesTec.nome;
      imgTecnologia.setAttribute("src", tec.getAttribute("src"));
      imgTecnologia.setAttribute("alt", infoTecnologias.alt);
      descTecnologia.textContent = informacoesTec.descricao
      
      console.log(tec);
      tec.classList.add("selecionada");
      tecAtual.classList.remove("selecionada");
  
      tecAtual = tec;
    }
  });
});

abrirMenu.addEventListener('click', () => {
  fecharMenu.classList.remove("escondido");
  header.classList.remove("escondido");
  abrirMenu.classList.add("escondido");
});

fecharMenu.addEventListener('click', () => {
  esconderMenu();
});

links.forEach(link => {
  link.addEventListener('click', () => {
    if (versaoMobile)
      esconderMenu();
  })
});

function atualizarVisibilidade() {
  if (window.innerWidth <= 700) {
    versaoMobile = true
    header.classList.add("escondido");
    fecharMenu.classList.remove("escondido");
    abrirMenu.classList.remove("escondido");
  }
  else {
    versaoMobile = false;
    header.classList.remove("escondido");
    fecharMenu.classList.add("escondido");
    abrirMenu.classList.add("escondido");
  }
}

function esconderMenu() {
  header.classList.add("escondido");
  fecharMenu.classList.add("escondido");
  abrirMenu.classList.remove("escondido");
}