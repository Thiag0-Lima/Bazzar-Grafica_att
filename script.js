// CONFIGURAÇÃO: atualize o telefone internacional da empresa antes de publicar.
const WA = '5548999358098'; // conferir antes de publicar
// Atalhos para montar links do WhatsApp e consultar elementos do documento.
const wu = (t) => `https://wa.me/${WA}?text=${encodeURIComponent(t)}`,
  $ = (s, e = document) => e.querySelector(s),
  $$ = (s, e = document) => [...e.querySelectorAll(s)];
// Recursos usados nos efeitos de interação e nas preferências visuais.
const fine = matchMedia('(hover:hover) and (pointer:fine)').matches,
  root = document.documentElement,
  darkScheme = matchMedia('(prefers-color-scheme:dark)');
const motionToggle = $('#motion-toggle'),
  themeToggle = $('#theme-toggle'),
  motionEnabled = () => root.dataset.motion !== 'off';
// Retorna o tema efetivo: escolha manual, quando existir, ou preferência do sistema.
function isDarkTheme() {
  return root.dataset.theme ? root.dataset.theme === 'dark' : darkScheme.matches;
}
// Sincroniza o rótulo e o estado acessível do botão de tema.
function updateThemeToggle() {
  const dark = isDarkTheme();
  themeToggle.setAttribute('aria-pressed', dark);
  themeToggle.textContent = `Tema: ${dark ? 'escuro' : 'claro'}`;
}
// Limpa deslocamentos aplicados em tempo real para evitar que persistam ao desligar o movimento.
function resetMotion() {
  $$('.ly,.ph,.mp,#qf,#hero h1 .ln,.bigw,.mk,.btn,.fab a,.lg').forEach((e) => {
    e.style.translate = '';
    e.style.rotate = '';
    e.style.textIndent = '';
  });
  $$('.pc .pi').forEach((e) => {
    e.style.setProperty('--rx', '0deg');
    e.style.setProperty('--ry', '0deg');
  });
  const fp = $('#fp');
  if (fp) {
    fp.style.removeProperty('--fx');
    fp.style.removeProperty('--fy');
  }
  $('#hd').classList.remove('hide');
}
motionToggle.onclick = () => {
  const enabled = !motionEnabled();
  root.dataset.motion = enabled ? 'on' : 'off';
  motionToggle.setAttribute('aria-pressed', enabled);
  motionToggle.textContent = `Movimento: ${enabled ? 'ligado' : 'desligado'}`;
  if (!enabled) resetMotion();
};
themeToggle.onclick = () => {
  root.dataset.theme = isDarkTheme() ? 'light' : 'dark';
  updateThemeToggle();
};
darkScheme.addEventListener('change', () => {
  if (!root.hasAttribute('data-theme')) updateThemeToggle();
});
updateThemeToggle();
// Atualiza todos os atalhos do WhatsApp usando o número e a mensagem padrão acima.
['hw', 'cw', 'fw'].forEach(
  (i) =>
    ($('#' + i).href = wu('Olá! Vi o site da Bazzar Gráfica Expressa e gostaria de um orçamento.'))
);
// Categorias usadas nos filtros; as chaves devem corresponder ao campo `c` de cada produto.
const CATS = {
  cartao: 'Cartões e convites',
  flyer: 'Flyers e folders',
  lonas: 'Lonas',
  adesivo: 'Adesivos e lacres',
  tag: 'Tags',
};
/* CATÁLOGO: cada produto informa categoria (c), visual (v), nome (n), selo (b),
   preço de referência (pr), descrição (d), especificações (s) e opções (o). */
const P = [
  {
    c: 'cartao',
    v: 'card',
    n: 'Cartões de Visita',
    b: 'Em alta',
    pr: '45,00',
    d: 'Sua melhor ferramenta de vendas sempre à mão. A união perfeita entre sofisticação e funcionalidade para destacar você no mercado.',
    s: [
      'Couchê 300g',
      'Lam. fosca',
      'Lam. brilho',
      'Hot stamping',
      'Sem lam.',
      '9×5 cm',
      'Corte reto/pers.',
      'Frente / Verso',
    ],
    o: {
      Acabamento: ['Lam. fosca', 'Lam. brilho', 'Hot stamping', 'Sem laminação'],
      Impressão: ['Apenas frente', 'Frente e verso'],
      Corte: ['Corte reto', 'Corte personalizado'],
    },
  },
  {
    c: 'flyer',
    v: 'fly',
    n: 'Flyer / Folder',
    pr: '60,00',
    d: 'Espaço de sobra para contar sua história. O material ideal para captar a atenção do seu público e converter olhares em vendas.',
    s: [
      '90g / 170g couchê',
      'Laser / Offset',
      '1–2 dobras',
      'A6 / A5 / A4',
      'Tam. pers.',
      'Frente / Verso',
    ],
    o: {
      Papel: ['90g couchê', '170g couchê'],
      Impressão: ['Laser', 'Offset'],
      Tamanho: ['A6', 'A5', 'A4', 'Personalizado'],
      Dobras: ['Sem dobra', '1 dobra', '2 dobras'],
    },
  },
  {
    c: 'lonas',
    v: 'lona',
    n: 'Materiais em Lona',
    b: 'Novidade',
    pr: '55,00',
    d: 'Pronto para instalar e feito para durar. Lona com impressão de alta qualidade e acabamento impecável.',
    s: [
      'Lona 440g',
      'Banner',
      'Backdrop',
      'Quadro de madeira',
      'Roll-up',
      'Faixa com ilhós',
      'Tam. pers.',
    ],
    o: {
      Tipo: ['Banner', 'Backdrop', 'Quadro de madeira', 'Roll-up', 'Faixa com ilhós'],
      Tamanho: ['Personalizado'],
    },
  },
  {
    c: 'adesivo',
    v: 'stk',
    n: 'Etiquetas Adesivas / Vitrines',
    pr: '40,00',
    d: 'Personalize e proteja seus produtos com a resistência do vinil. Etiquetas vibrantes que unem estética e proteção.',
    s: ['Vinil', 'Corte laser', 'Resistente à água', 'Corte pers.', 'Tam. pers.'],
    o: { Material: ['Vinil'], Corte: ['Corte personalizado'], Tamanho: ['Personalizado'] },
  },
  {
    c: 'adesivo',
    v: 'lac',
    n: 'Lacres e Cintas',
    pr: '60,00',
    d: 'O detalhe final que eleva o nível da sua marca. Soluções em vinil e papel para lacrar, envolver e identificar suas embalagens.',
    s: ['Lacres em vinil', 'Cintas em papel', 'Resistente à água', 'Corte pers.', 'Tam. pers.'],
    o: {
      Tipo: ['Lacre em vinil', 'Cinta em papel'],
      Corte: ['Corte personalizado'],
      Tamanho: ['Personalizado'],
    },
  },
  {
    c: 'cartao',
    v: 'inv',
    n: 'Convites e Cartões de Agradecimento',
    pr: '50,00',
    d: 'Transforme momentos especiais em memórias inesquecíveis, com convites e cartões que transmitem todo o carinho.',
    s: ['300g / 170g couchê', 'Corte reto', 'Com ou sem lam.', 'Tam. pers.', 'Frente / Verso'],
    o: {
      Papel: ['300g couchê', '170g couchê'],
      Laminação: ['Com laminação', 'Sem laminação'],
      Impressão: ['Apenas frente', 'Frente e verso'],
    },
  },
  {
    c: 'tag',
    v: 'tag',
    n: 'Tags',
    pr: '35,00',
    d: 'Tags personalizadas para identificar e valorizar seus produtos, em diferentes papéis e formatos.',
    s: ['Couchê / Cartolina / Perolado / Kraft', 'Tam. pers.', 'Corte pers.', 'Frente / Verso'],
    o: {
      Papel: ['Couchê', 'Cartolina', 'Perolado', 'Kraft'],
      Impressão: ['Apenas frente', 'Frente e verso'],
    },
  },
  {
    c: 'cartao',
    v: 'mk',
    n: 'Marca Páginas',
    pr: '60,00',
    d: 'Resistência e sofisticação em cada página. Papéis de alta gramatura, ideais para coleções, eventos ou mimos corporativos.',
    s: ['Couchê / Cartolina / Kraft', 'Tam. pers.', 'Corte pers.', 'Frente / Verso'],
    o: { Papel: ['Couchê', 'Cartolina', 'Kraft'], Impressão: ['Apenas frente', 'Frente e verso'] },
  },
];
// Preencha com os caminhos das fotos para substituir as ilustrações nos cards e no modal.
const PRODUCT_IMAGES = {
  card: '', // Cartões de visita
  fly: '', // Flyer / folder
  lona: '', // Materiais em lona
  stk: '', // Etiquetas adesivas / vitrines
  lac: '', // Lacres e cintas
  inv: '', // Convites e cartões de agradecimento
  tag: '', // Tags
  mk: '', // Marca páginas
};
/* Ilustrações temporárias de cada tipo de produto, usadas enquanto não houver foto real. */
const V = {
  card: (s) =>
    `<div style="width:${s}px;height:${s * 0.58}px;background:linear-gradient(135deg,#ED218E,#8c0a55);color:#fff;padding:14px;font:800 1.3rem/1 var(--fd);text-transform:uppercase;box-shadow:0 22px 28px -12px #0007;border-radius:var(--radius);transform:rotate(-6deg)">Bazzar</div>`,
  fly: (s) =>
    `<div style="width:${s * 0.62}px;height:${s * 0.85}px;background:#fff;box-shadow:0 22px 28px -12px #0007;padding:12px;transform:rotate(5deg)"><div style="height:42%;background:#ED218E"></div><i style="display:block;height:6px;background:#ddd;margin-top:10px"></i><i style="display:block;height:6px;background:#ddd;margin-top:6px;width:60%"></i></div>`,
  lona: (s) =>
    `<div style="width:${s * 0.9}px;height:${s * 0.5}px;background:#101014;border:3px solid #ED218E;color:#fff;display:grid;place-items:center;font:800 1.5rem var(--fd);text-transform:uppercase;box-shadow:0 22px 28px -12px #0007;transform:rotate(-3deg)">Sua mensagem</div>`,
  stk: (s) =>
    `<div style="width:${s * 0.5}px;height:${s * 0.5}px;border-radius:50%;background:radial-gradient(circle at 30% 30%,#ff7ac0,#ED218E 55%,#9b0b58);box-shadow:0 0 0 6px #fff,0 20px 26px -10px #0007;display:grid;place-items:center;color:#fff;font:800 1.2rem var(--fd)">STICKER</div>`,
  lac: (s) =>
    `<div style="width:${s * 0.9}px;height:${s * 0.2}px;background:#ED218E;color:#fff;display:grid;place-items:center;font:800 1rem var(--fd);letter-spacing:.2em;box-shadow:0 18px 24px -10px #0007;transform:rotate(-8deg)">LACRE · LACRE · LACRE</div>`,
  inv: (s) =>
    `<div style="width:${s * 0.55}px;height:${s * 0.75}px;background:#fffdf8;border:6px double #ED218E;display:grid;place-items:center;font:800 1.5rem/1 var(--fd);text-transform:uppercase;text-align:center;box-shadow:0 22px 28px -12px #0007;transform:rotate(4deg)">Você<br>é<br>convidado</div>`,
  tag: (s) =>
    `<div style="width:${s * 0.4}px;height:${s * 0.62}px;background:#d8b98a;clip-path:polygon(0 18%,50% 0,100% 18%,100% 100%,0 100%);display:grid;place-items:end center;padding-bottom:14px;font:800 1.2rem var(--fd);color:#101014;filter:drop-shadow(0 16px 14px #0007)">TAG</div>`,
  mk: (s) =>
    `<div style="width:${s * 0.26}px;height:${s * 0.8}px;background:linear-gradient(#ED218E 55%,#fffdf8 55%);box-shadow:0 22px 28px -12px #0007;transform:rotate(8deg)"></div>`,
};
// Monta os cartões do catálogo e as opções de produto do formulário a partir de P.
const gr = $('#gr');
gr.innerHTML = P.map(
  (
    p,
    k
  ) => `<div class="pc" data-c="${p.c}"><button class="pi" data-k="${k}" aria-label="Ver detalhes de ${p.n}"><div class="vz">${p.b ? `<span class="bdg">${p.b}</span>` : ''}${PRODUCT_IMAGES[p.v] ? `<img src="${PRODUCT_IMAGES[p.v]}" alt="${p.n}" />` : V[p.v](190)}</div>
<div class="pb"><h3>${p.n}</h3><p>${p.d}</p><div class="sp">${p.s
    .slice(0, 5)
    .map((s) => `<span>${s}</span>`)
    .join(
      ''
    )}</div><div class="pf"><div><small>a partir de*</small><b>R$ ${p.pr}</b></div><em>Montar pedido →</em></div></div></button></div>`
).join('');
$('#p').innerHTML =
  '<option value="">Selecione…</option>' +
  P.map((p) => `<option>${p.n}</option>`).join('') +
  '<option>Outro produto personalizado</option>';
// Aplica realce e inclinação aos cartões do catálogo quando há mouse/trackpad.
$$('.pc').forEach((c) => {
  const pi = $('.pi', c);
  c.onpointerenter = () => c.classList.add('h');
  c.onpointerleave = () => {
    c.classList.remove('h');
    pi.style.setProperty('--rx', '0deg');
    pi.style.setProperty('--ry', '0deg');
  };
  pi.onfocus = () => c.classList.add('h');
  pi.onblur = () => c.classList.remove('h');
  if (fine)
    c.onpointermove = (e) => {
      if (!motionEnabled()) return;
      const r = c.getBoundingClientRect();
      pi.style.setProperty('--ry', (((e.clientX - r.left) / r.width - 0.5) * 6).toFixed(1) + 'deg');
      pi.style.setProperty('--rx', ((0.5 - (e.clientY - r.top) / r.height) * 6).toFixed(1) + 'deg');
    };
});
const fil = $('#fil');
fil.innerHTML = [['all', 'Todos'], ...Object.entries(CATS)]
  .map(([k, v]) => `<button data-f="${k}" aria-pressed="${k === 'all'}">${v}</button>`)
  .join('');
// Filtra os produtos pela categoria e mantém os botões do filtro sincronizados.
function filt(f) {
  $$('button', fil).forEach((b) => b.setAttribute('aria-pressed', b.dataset.f === f));
  $$('.pc').forEach((c) => {
    const sh = f === 'all' || c.dataset.c === f;
    if (sh && c.hidden) {
      c.hidden = false;
      c.classList.add('x');
      requestAnimationFrame(() => requestAnimationFrame(() => c.classList.remove('x')));
    } else if (!sh && !c.hidden) {
      c.classList.add('x');
      setTimeout(
        () => {
          if (c.classList.contains('x')) c.hidden = true;
        },
        motionEnabled() ? 300 : 0
      );
    }
  });
}
fil.onclick = (e) => {
  const b = e.target.closest('button');
  b && filt(b.dataset.f);
};
$$('footer [data-f]').forEach((a) => (a.onclick = () => filt(a.dataset.f)));
/* Modal do produto: seletor de especificações + WhatsApp */
const md = $('#md');
let cur,
  pick = {},
  lastF;
// Cria a mensagem do WhatsApp com o produto aberto e as opções escolhidas.
function msg() {
  const ch = Object.entries(pick).map(([k, v]) => `${k}: ${v}`);
  return (
    `Olá! Gostaria de solicitar um orçamento para ${cur.n} da Bazzar Gráfica Expressa.` +
    (ch.length ? `\n\nPreferências:\n- ${ch.join('\n- ')}` : '')
  );
}
// Atualiza o link de orçamento quando o produto ou as preferências mudam.
function upd() {
  $('#mw').href = wu(msg());
}
$('#gr').onclick = (e) => {
  const b = e.target.closest('.pi');
  if (!b) return;
  lastF = b;
  cur = P[b.dataset.k];
  pick = {};
  $('#mt').textContent = cur.n;
  $('#mdsc').textContent = cur.d;
  $('#mv').innerHTML = PRODUCT_IMAGES[cur.v]
    ? `<img src="${PRODUCT_IMAGES[cur.v]}" alt="${cur.n}" />`
    : cur.v === 'card'
      ? `<div class="flip" id="fp" title="Clique para virar" tabindex="0" role="button" aria-label="Virar cartão"><div style="background:linear-gradient(135deg,#ED218E,#8c0a55)">Bazzar<small>CLIQUE PARA VIRAR</small></div><div>Seu<br>contato<br><span style="color:#ED218E">aqui</span></div></div>`
      : V[cur.v](280);
  $('#mg').innerHTML = Object.entries(cur.o)
    .map(
      ([g, os]) =>
        `<div class="gp"><b>${g}</b><div>${os.map((o) => `<button data-g="${g}" aria-pressed="false">${o}</button>`).join('')}</div></div>`
    )
    .join('');
  const fp = $('#fp');
  if (fp) {
    fp.onclick = () => fp.classList.toggle('f');
    fp.onkeydown = (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        fp.click();
      }
    };
    if (fine) {
      $('#mv').onpointermove = (e) => {
        if (!motionEnabled()) return;
        const r = $('#mv').getBoundingClientRect();
        fp.style.setProperty(
          '--fx',
          ((0.5 - (e.clientY - r.top) / r.height) * 14).toFixed(1) + 'deg'
        );
        fp.style.setProperty(
          '--fy',
          (fp.classList.contains('f') ? 180 : 0) +
            ((e.clientX - r.left) / r.width - 0.5) * 18 +
            'deg'
        );
      };
    }
  }
  upd();
  md.classList.add('o');
  $('#mx').focus();
};
$('#mg').onclick = (e) => {
  const b = e.target.closest('button');
  if (!b) return;
  const g = b.dataset.g,
    on = b.getAttribute('aria-pressed') === 'true';
  $$(`button[data-g="${g}"]`).forEach((x) => x.setAttribute('aria-pressed', 'false'));
  if (!on) {
    b.setAttribute('aria-pressed', 'true');
    pick[g] = b.textContent;
  } else delete pick[g];
  upd();
};
// Fecha os detalhes do produto e devolve o foco ao cartão que os abriu.
function mc() {
  md.classList.remove('o');
  lastF && lastF.focus();
}
$('#mx').onclick = mc;
md.onclick = (e) => {
  if (e.target === md) mc();
};
$('#mf').onclick = () => {
  $('#p').value = cur.n;
  const a = pick['Acabamento'] || pick['Laminação'] || pick['Material'] || '',
    s = pick['Tamanho'] || '';
  $('#a').value = a;
  $('#z').value = s;
  const o = Object.entries(pick)
    .filter(([k]) => !['Acabamento', 'Laminação', 'Material', 'Tamanho'].includes(k))
    .map(([k, v]) => `${k}: ${v}`)
    .join('; ');
  $('#o').value = o;
  mc();
  $('#quote').scrollIntoView({ behavior: motionEnabled() ? 'smooth' : 'auto' });
  setTimeout(() => $('#n').focus({ preventScroll: true }), 600);
};
/* GALERIA: itens ilustrativos e lightbox; substitua os títulos/conteúdo pelas fotos reais. */
const lb = $('#lb');
const GALLERY = [
  { title: 'Impressão digital', image: 'imagens/lona.png' },
  { title: 'Refile de materiais', image: 'imagens/guilhotina.png' },
  { title: 'Acabamentos', image: 'imagens/acabamento.png' },
  { title: 'Capa Dura', image: 'imagens/capa dura.jpeg' },

  
  { title: 'Etiquetas adesivas', image: 'imagens/etiqueta.png' },
  { title: 'Cartão de visitas', image: 'imagens/cartao-de-visitas.jpeg' },
  { title: 'Encadernações', image: 'imagens/revista.jpeg' },
  { title: 'Livretos e Revistas', image: 'imagens/livreto.jpeg' },
];
$('#gg').innerHTML = GALLERY
  .map(
    ({ title, image }) =>
      `<button class="gi" data-t="${title}" aria-label="Ampliar: ${title}">${image ? `<img src="${image}" alt="${title}" />` : '<em>Foto real a inserir</em>'}<span>${title}</span></button>`
  )
  .join('');
$$('.gi').forEach(
  (b) =>
    (b.onclick = () => {
      lastF = b;
      $('#lt').textContent = b.dataset.t;
      const image = $('img', b);
      const lightboxImage = $('#lb-image');
      lightboxImage.hidden = !image;
      $('#lb-placeholder').hidden = !!image;
      if (image) {
        lightboxImage.src = image.src;
        lightboxImage.alt = image.alt;
      } else {
        lightboxImage.removeAttribute('src');
      }
      lb.classList.add('o');
      $('#lx').focus();
    })
);
// Fecha a imagem ampliada e restaura o foco ao item selecionado.
function lc() {
  if (lb.classList.contains('o')) {
    lb.classList.remove('o');
    lastF && lastF.focus();
  }
}
$('#lx').onclick = lc;
lb.onclick = (e) => {
  if (e.target === lb) lc();
};
/* Menu, header, reveal, hero */
const hd = $('#hd'),
  mm = $('#mm'),
  bg = $('#bg');
addEventListener('scroll', () => hd.classList.toggle('s', scrollY > 20), { passive: true });
// Abre/fecha o menu móvel e atualiza os atributos de acessibilidade.
function menu(o) {
  mm.classList.toggle('o', o);
  bg.setAttribute('aria-expanded', o);
  mm.setAttribute('aria-hidden', !o);
  document.body.style.overflow = o ? 'hidden' : '';
}
bg.onclick = () => menu(!mm.classList.contains('o'));
$$('a', mm).forEach((a) => (a.onclick = () => menu(false)));
addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    menu(false);
    if (md.classList.contains('o')) mc();
    lc();
  }
});
// Revela blocos ao entrar na tela e anima o progresso da linha do tempo.
const io = new IntersectionObserver(
  (es) =>
    es.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('i');
        if (e.target.id === 'tl') e.target.style.setProperty('--p', '92%');
        io.unobserve(e.target);
      }
    }),
  { threshold: 0.2 }
);
$$('.rv').forEach((e) => io.observe(e));
if (fine) {
  const tb = $('#tb');
  tb.onpointermove = (e) => {
    if (!motionEnabled()) return;
    const r = tb.getBoundingClientRect(),
      x = (e.clientX - r.left) / r.width - 0.5,
      y = (e.clientY - r.top) / r.height - 0.5;
    $$('.ly', tb).forEach((l) => (l.style.translate = `${x * l.dataset.d}px ${y * l.dataset.d}px`));
  };
  tb.onpointerleave = () => $$('.ly', tb).forEach((l) => (l.style.translate = ''));
}
/* FORMULÁRIO: formata o telefone, valida os campos obrigatórios e prepara a mensagem. */
$('#t').oninput = (e) => {
  let v = e.target.value.replace(/\D/g, '').slice(0, 11);
  e.target.value =
    v.length > 6
      ? `(${v.slice(0, 2)}) ${v.slice(2, v.length > 10 ? 7 : 6)}-${v.slice(v.length > 10 ? 7 : 6)}`
      : v.length > 2
        ? `(${v.slice(0, 2)}) ${v.slice(2)}`
        : v;
};
const qf = $('#qf');
qf.oninput = (e) => {
  const f = e.target.closest('.f');
  if (f) {
    f.classList.remove('bad');
    $('.er', f).textContent = '';
  }
};
qf.onsubmit = (e) => {
  e.preventDefault();
  let ok = true;
  const ck = (id, fn, m) => {
    const el = $('#' + id),
      f = el.closest('.f'),
      bad = !fn(el.value.trim());
    f.classList.toggle('bad', bad);
    $('.er', f).textContent = bad ? m : '';
    if (bad && ok) {
      el.focus();
      ok = false;
    }
  };
  ck('n', (v) => v.length > 1, 'Informe seu nome.');
  ck('t', (v) => v.replace(/\D/g, '').length >= 10, 'Informe um WhatsApp com DDD.');
  ck('p', (v) => v, 'Escolha um produto.');
  ck('q', (v) => v, 'Informe a quantidade.');
  if (!ok) return;
  const v = (i) => $('#' + i).value.trim(),
    L = [
      `Olá! Gostaria de solicitar um orçamento para ${v('p')} da Bazzar Gráfica Expressa.`,
      '',
      `*Nome:* ${v('n')}`,
      `*WhatsApp:* ${v('t')}`,
      `*Quantidade:* ${v('q')}`,
    ];
  [
    ['z', 'Tamanho/formato'],
    ['a', 'Acabamento'],
    ['d', 'Prazo pretendido'],
    ['r', 'Arte'],
    ['o', 'Observações'],
  ].forEach(([i, l]) => v(i) && L.push(`*${l}:* ${v(i)}`));
  open(wu(L.join('\n')), '_blank', 'noopener');
  $('#fm').textContent =
    'Abrimos o WhatsApp com sua mensagem pronta. Falta só tocar em “enviar” no aplicativo para a Bazzar receber seu pedido.';
};
/* EFEITOS DE MOVIMENTO: revelação escalonada, progresso da página, parallax e magnetismo.
   As regras de ativação/desativação ficam sincronizadas com o botão de preferências. */
(() => {
  const sp = document.createElement('div');
  sp.id = 'sp';
  document.body.appendChild(sp);
  const els = $$('.pc,.gi,.st li,.tri div,.cl li,.sp2,.fg>div,.fil button,h2');
  els.forEach((e) => {
    if (e.tagName === 'H2') e.classList.add('hx');
    e.classList.add('pre');
  });
  // Inicia a animação de cada elemento somente quando ele se aproxima da área visível.
  const o = new IntersectionObserver(
    (es) =>
      es.forEach((n) => {
        if (!n.isIntersecting) return;
        const e = n.target,
          i = Math.max(0, [...e.parentElement.children].indexOf(e));
        e.style.setProperty('--d', Math.min(i, 8) * 0.07 + 's');
        e.classList.remove('pre');
        if (motionEnabled()) e.classList.add('go');
        o.unobserve(e);
      }),
    { threshold: 0.15, rootMargin: '0px 0px -6% 0px' }
  );
  els.forEach((e) => o.observe(e));
  let ly = 0;
  addEventListener(
    'scroll',
    () => {
      const y = scrollY,
        h = document.documentElement.scrollHeight - innerHeight;
      sp.style.transform = `scaleX(${h > 0 ? y / h : 0})`;
      hd.classList.toggle(
        'hide',
        motionEnabled() && y > ly && y > 400 && !mm.classList.contains('o')
      );
      ly = y;
    },
    { passive: true }
  );
  if (!motionEnabled()) return;
  // Elementos que recebem deslocamento sutil conforme a posição de rolagem.
  const par = [
    ['.ph', 0.07],
    ['.mp', -0.06],
    ['#qf', -0.04],
    ['#tb', 0.1],
  ].flatMap(([s, k]) => $$(s).map((e) => [e, k]));
  const lns = $$('#hero h1 .ln'),
    bw = $('.bigw'),
    mks = $$('.mk');
  let tk = 0;
  const run = () => {
    tk = 0;
    const vh = innerHeight,
      y = scrollY;
    if (!motionEnabled()) {
      resetMotion();
      return;
    }
    par.forEach(([e, k]) => {
      const r = e.parentElement.getBoundingClientRect();
      if (r.bottom < -200 || r.top > vh + 200) return;
      e.style.translate = `0 ${((r.top + r.height / 2 - vh / 2) * k).toFixed(1)}px`;
    });
    if (y < vh) lns.forEach((l, i) => (l.style.translate = `${(i - 1) * y * 0.09}px 0`));
    if (bw) {
      const r = bw.getBoundingClientRect();
      if (r.top < vh) bw.style.textIndent = `${((r.top - vh) * 0.15).toFixed(0)}px`;
    }
    mks.forEach((m) => (m.style.rotate = (m.getBoundingClientRect().top * 0.1).toFixed(1) + 'deg'));
  };
  addEventListener(
    'scroll',
    () => {
      if (!tk) tk = requestAnimationFrame(run);
    },
    { passive: true }
  );
  run();
  if (fine) {
    $$('.btn,.fab a,.lg').forEach((b) => {
      b.addEventListener('pointermove', (e) => {
        if (!motionEnabled()) return;
        const r = b.getBoundingClientRect();
        b.style.translate = `${((e.clientX - r.left) / r.width - 0.5) * 10}px ${((e.clientY - r.top) / r.height - 0.5) * 8}px`;
      });
      b.addEventListener('pointerleave', () => (b.style.translate = ''));
    });
    $$('.pc').forEach((c) =>
      c.addEventListener('pointermove', (e) => {
        if (!motionEnabled()) return;
        const r = c.getBoundingClientRect();
        c.style.setProperty('--mx', ((e.clientX - r.left) / r.width) * 100 + '%');
        c.style.setProperty('--my', ((e.clientY - r.top) / r.height) * 100 + '%');
      })
    );
  }
})();
