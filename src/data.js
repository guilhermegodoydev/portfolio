export const projects = [
  {
    name: "FranchiseOS",
    status: "Em evolução",
    text: "Sistema web de gerenciamento de franquias com autenticação JWT e controle de unidades.",
    stack: "Next · Typescript · .NET · PostgreSQL",
    images: [
        { src: "../public/img/franchiseos/tela_login.png", alt: "Tela de login do Franchiseos" },
        { src: "../public/img/franchiseos/tela_unidades.png", alt: "Tela de unidades do Franchiseos" },
    ],
    alt: "Tela do Franchiseos",
    href: "https://github.com/guilhermegodoydev/franchiseos",
  },
  {
    name: "Snapport",
    status: "",
    text: "Ferramenta que gera a seção de projetos do portfólio a partir do GitHub. Publicada no NPM.",
    stack: "Open source · NPM",
    images: [
        { src: "../public/img/snapport/logo.png", alt: "Logo da biblioteca Snapport" },
    ],
    alt: "Logo do Snap-Port",
    href: "https://github.com/guilhermegodoydev/snapport",
  },
  {
    name: "Nexapulse",
    status: "Em produção",
    text: "CRM web em produção.",
    stack: "React · Vite · TypeScript · Supabase",
    images: [
        { src: "../public/img/nexapulse/tela_inicial.png", alt: "Tela de inicial do Nexapulse" },
        { src: "../public/img/nexapulse/tela_login.png", alt: "Tela de login do Nexapulse" },
    ],
    alt: "Tela do Nexapulse",
    href: "https://github.com/guilhermegodoydev/nexapulse",
  },
];

export const skills = [
  { title: "Front-end", text: "React, TypeScript, Next e Tailwind: interfaces dinâmicas e componentes reutilizáveis." },
  { title: "Back-end", text: "APIs REST em C# e .NET, autenticação JWT e organização de código." },
  { title: "Dados", text: "PostgreSQL e SQL: modelagem, consultas e manutenção dos dados." },
  { title: "Aprendendo", text: "CI/CD com Git Actions", dotted: true },
];

export const timeline = [
  { period: "2022–2024", title: "ETEC Aristóteles Ferreira", detail: "Análise e Desenvolvimento de Sistemas" },
  { period: "2025–2028", title: "Ciência da Computação", detail: "Cursando, período noturno" },
];