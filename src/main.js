import "@fontsource/bebas-neue";
import "@fontsource/roboto-mono/400.css";
import "@fontsource/roboto-mono/700.css";
import "@fontsource/playfair-display/400-italic.css";
import "./style.css";
import { projects, skills, timeline } from "./data.js";

const qs = (s) => document.querySelector(s);

qs("#timeline").innerHTML = timeline
  .map((t) => `<li class="mb-5 flex gap-4"><span class="w-28 shrink-0 font-bold text-accent">${t.period}</span><span><strong class="block">${t.title}</strong>${t.detail}</span></li>`)
  .join("");

qs("#skills").innerHTML = skills
  .map((s) => `<div class="${s.dotted ? "border-2 border-dotted border-ink p-5" : "md:border-l md:border-ink md:px-6 md:first:border-0 md:first:pl-0"}">
    <h3 class="mb-2 font-display text-3xl uppercase ${s.dotted ? "text-accent" : ""}">${s.title}</h3><p>${s.text}</p></div>`)
  .join("");

const tabs = qs("#tabs");
const panel = qs("#panel");

tabs.innerHTML = projects
  .map((p, i) => `<button role="tab" id="tab-${i}" aria-controls="panel" aria-selected="${i === 0}" tabindex="${i === 0 ? 0 : -1}"
    class="tab flex w-full items-baseline gap-3 px-3 py-1 text-left font-display text-2xl uppercase transition-colors hover:bg-ink/5">
    <span>${p.name}</span><span class="dots" aria-hidden="true"></span><span aria-hidden="true">0${i + 1}</span></button>`)
  .join("");

let current = 0;

function show(i) {
  current = i;
  const p = projects[i];
  const n = p.images.length;
  tabs.querySelectorAll("[role=tab]").forEach((t, j) => {
    t.setAttribute("aria-selected", j === i);
    t.tabIndex = j === i ? 0 : -1;
  });
  panel.setAttribute("aria-labelledby", `tab-${i}`);

  const media = n
    ? `<button type="button" data-gallery class="group mb-4 block w-full text-left">
         <img src="${p.images[0].src}" alt="${p.images[0].alt}" width="960" height="540" loading="lazy" class="aspect-video w-full border border-ink object-cover transition group-hover:opacity-90">
         <span class="mt-2 inline-block border-b-2 border-accent text-sm font-bold group-hover:bg-accent group-hover:text-white">${n > 1 ? `Ver telas (${n})` : "Ampliar imagem"}</span>
       </button>`
    : `<div class="mb-4 flex aspect-video w-full items-center justify-center border border-ink bg-ink/5 text-sm tracking-widest text-muted" aria-hidden="true">[ IMAGEM DO PROJETO ]</div>`;

  panel.innerHTML = `${media}
    <h3 class="font-display text-4xl uppercase">${p.name}
      ${p.status ? `<span class="ml-2 bg-accent px-2 py-0.5 align-middle font-mono text-xs tracking-widest text-white">${p.status.toUpperCase()}</span>` : ""}</h3>
    <p class="mt-1">${p.text}</p>
    <p class="mt-2 text-sm font-bold tracking-wider text-accent">${p.stack}</p>
    ${p.href && p.href !== "#" ? `<a href="${p.href}" class="mt-3 inline-block border-b-2 border-accent font-bold hover:bg-accent hover:text-white">Ver projeto</a>` : ""}`;
}

tabs.addEventListener("click", (e) => {
  const t = e.target.closest("[role=tab]");
  if (t) show([...tabs.children].indexOf(t));
});

tabs.addEventListener("keydown", (e) => {
  const all = [...tabs.children];
  const cur = all.indexOf(document.activeElement);
  const next = { ArrowDown: cur + 1, ArrowRight: cur + 1, ArrowUp: cur - 1, ArrowLeft: cur - 1, Home: 0, End: all.length - 1 }[e.key];
  if (next === undefined) return;
  e.preventDefault();
  const i = (next + all.length) % all.length;
  all[i].focus();
  show(i);
});

show(0);

const dlg = qs("#gallery");
const gImg = qs("#g-img");
const gCount = qs("#g-count");
const gAlt = qs("#g-alt");
let gList = [];
let gPos = 0;

function drawGallery() {
  const { src, alt } = gList[gPos];
  gImg.src = src;
  gImg.alt = alt;
  gAlt.textContent = alt;
  gCount.textContent = `${gPos + 1} de ${gList.length}`;
  qs("#g-prev").hidden = qs("#g-next").hidden = gList.length < 2;
}

function step(d) {
  gPos = (gPos + d + gList.length) % gList.length;
  drawGallery();
}

panel.addEventListener("click", (e) => {
  if (!e.target.closest("[data-gallery]")) return;
  gList = projects[current].images;
  gPos = 0;
  drawGallery();
  dlg.showModal();
});

qs("#g-prev").addEventListener("click", () => step(-1));
qs("#g-next").addEventListener("click", () => step(1));
qs("#g-close").addEventListener("click", () => dlg.close());
dlg.addEventListener("click", (e) => { if (e.target === dlg) dlg.close(); });
dlg.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") step(1);
  if (e.key === "ArrowLeft") step(-1);
});

if (!matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); }
    });
  }, { threshold: 0, rootMargin: "0px 0px -45% 0px" });
  document.querySelectorAll("[data-reveal]").forEach((el) => { el.classList.add("reveal"); io.observe(el); });
}