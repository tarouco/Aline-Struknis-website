/* =========================================================================
   ALINE STRUNKIS — comportamento
   Protótipo estático. Sem dependências. Tudo degrada sem JS.
   ========================================================================= */
(function () {
  'use strict';
  document.documentElement.classList.add('js');

  /* --- Ícones: um sistema desenhado, traço 1.5, grade 24 ----------------- */
  var ICONS = {
    arrow: '<path d="M4 12h15M13 6l6 6-6 6"/>',
    check: '<path d="M4.5 12.5l5 5 10-11"/>',
    pen: '<path d="M15.5 4.5l4 4M7 21H3v-4L16.5 3.5a2.1 2.1 0 013 3L6 20z"/>',
    leaf: '<path d="M4 20c0-9 6-14 16-14 0 10-5 15-13 15H4zM4 20c3-5 6-7.5 10-9.5"/>',
    clinic: '<path d="M3 21h18M5 21V8l7-5 7 5v13M10 21v-5h4v5M12 9v4M10 11h4"/>',
    scale: '<path d="M12 3v18M5 21h14M7 8h10l3 7a4 4 0 01-8 0l3-7M4 15l3-7"/>',
    camera: '<path d="M3 8.5A2.5 2.5 0 015.5 6h1.8l1.3-2h6.8l1.3 2h1.8A2.5 2.5 0 0121 8.5v9A2.5 2.5 0 0118.5 20h-13A2.5 2.5 0 013 17.5z"/><circle cx="12" cy="13" r="3.6"/>',
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5.5M12 7.6v.4"/>',
    lock: '<rect x="4.5" y="10.5" width="15" height="10" rx="2"/><path d="M8 10.5V8a4 4 0 018 0v2.5"/>',
    menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
    close: '<path d="M6 6l12 12M18 6L6 18"/>',
    star: '<path d="M12 3.5l2.6 5.5 6 .8-4.4 4.2 1.1 6-5.3-2.9L6.7 20l1.1-6L3.4 9.8l6-.8z"/>',
    users: '<circle cx="9" cy="8" r="3.4"/><path d="M2.8 20a6.2 6.2 0 0112.4 0M16.5 5.2a3.4 3.4 0 010 5.9M18.3 20h2.9a5.6 5.6 0 00-3.4-5.1"/>',
    globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.6 2.7 4 5.7 4 9s-1.4 6.3-4 9c-2.6-2.7-4-5.7-4-9s1.4-6.3 4-9z"/>',
    box: '<path d="M3.5 7.5L12 3l8.5 4.5v9L12 21l-8.5-4.5z"/><path d="M3.5 7.5L12 12l8.5-4.5M12 12v9"/>'
  };
  function icon(name, cls) {
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" ' +
      'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"' +
      (cls ? ' class="' + cls + '"' : '') + '>' + (ICONS[name] || '') + '</svg>';
  }
  document.querySelectorAll('[data-icon]').forEach(function (el) {
    el.innerHTML = icon(el.getAttribute('data-icon')) + el.innerHTML;
  });
  window.asIcon = icon;

  /* --- Slots de foto: some com a placa quando a foto real existir -------- */
  document.querySelectorAll('.plate > img').forEach(function (img) {
    var fallback = function () {
      var plate = img.parentElement;
      if (!plate) return;
      var note = plate.querySelector('.plate__note');
      if (note) note.hidden = false;
      img.remove();
    };
    img.addEventListener('error', fallback, { once: true });
    if (img.complete && img.naturalWidth === 0) fallback();
  });

  /* --- Cabeçalho fixo ---------------------------------------------------- */
  var head = document.querySelector('.site-head');
  if (head) {
    var onScroll = function () { head.dataset.stuck = window.scrollY > 12 ? 'true' : 'false'; };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* --- Menu no celular --------------------------------------------------- */
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.site-nav');
  if (toggle && nav) {
    toggle.innerHTML = icon('menu');
    toggle.addEventListener('click', function () {
      var open = nav.dataset.open === 'true';
      nav.dataset.open = open ? 'false' : 'true';
      toggle.setAttribute('aria-expanded', String(!open));
      toggle.setAttribute('aria-label', open ? 'Abrir menu' : 'Fechar menu');
      toggle.innerHTML = icon(open ? 'menu' : 'close');
    });
  }

  /* --- Revelação: um movimento só, orquestrado --------------------------- */
  var reveals = document.querySelectorAll('[data-reveal]');
  if (reveals.length && 'IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        var sibs = Array.prototype.slice.call(e.target.parentElement.querySelectorAll('[data-reveal]'));
        e.target.style.setProperty('--d', Math.min(sibs.indexOf(e.target), 5) * 40 + 'ms');
        e.target.classList.add('is-in');
        io.unobserve(e.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('is-in'); });
  }

  /* --- Abas -------------------------------------------------------------- */
  document.querySelectorAll('[data-tabs]').forEach(function (group) {
    var tabs = group.querySelectorAll('[role="tab"]');
    function select(id) {
      tabs.forEach(function (t) {
        var on = t.getAttribute('aria-controls') === id;
        t.setAttribute('aria-selected', String(on));
        t.tabIndex = on ? 0 : -1;
        var panel = document.getElementById(t.getAttribute('aria-controls'));
        if (panel) panel.hidden = !on;
      });
    }
    tabs.forEach(function (t, i) {
      t.addEventListener('click', function () { select(t.getAttribute('aria-controls')); });
      t.addEventListener('keydown', function (e) {
        var d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
        if (!d) return;
        e.preventDefault();
        var next = tabs[(i + d + tabs.length) % tabs.length];
        next.focus(); select(next.getAttribute('aria-controls'));
      });
    });
    var hash = location.hash.replace('#', '');
    if (hash && group.querySelector('[aria-controls="' + hash + '"]')) select(hash);
  });

  /* --- Galeria de resultados --------------------------------------------- */
  var filters = document.querySelector('[data-filters]');
  if (filters) {
    var items = document.querySelectorAll('[data-cat]');
    var count = document.querySelector('[data-count]');
    filters.addEventListener('click', function (e) {
      var btn = e.target.closest('.chip');
      if (!btn) return;
      filters.querySelectorAll('.chip').forEach(function (c) { c.setAttribute('aria-pressed', 'false'); });
      btn.setAttribute('aria-pressed', 'true');
      var f = btn.dataset.filter, shown = 0;
      items.forEach(function (it) {
        var on = f === 'todos' || it.dataset.cat.split(' ').indexOf(f) > -1;
        it.hidden = !on; if (on) shown++;
      });
      if (count) count.textContent = shown + (shown === 1 ? ' caso' : ' casos');
    });
  }

  /* --- Recomendador ------------------------------------------------------ */
  var quiz = document.querySelector('[data-quiz]');
  if (quiz) {
    var steps = quiz.querySelectorAll('.quiz__step');
    var result = quiz.querySelector('.quiz__result');
    var bar = quiz.querySelector('.quiz__bar i');
    var back = quiz.querySelector('[data-quiz-back]');
    var counter = quiz.querySelector('.quiz__count');
    var answers = {}, at = 0;

    var PROJECTS = {
      renascer: {
        nome: 'Projeto Renascer',
        prazo: '12 meses · três fases de 60 dias',
        resumo: 'Mentoria longa, com dieta personalizada por fase, suplementação, treino com personal e acompanhamento médico. É o programa de quem quer resolver de uma vez e sustentar o resultado.',
        itens: ['Três fases de 60 dias com plano alimentar refeito a cada fase',
                'Suplementação e produtos manipulados indicados por fase',
                'Treino com personal trainer acompanhando a curva de massa magra',
                'Acompanhamento médico e da equipe multidisciplinar da clínica'],
        href: 'curso.html'
      },
      premium: {
        nome: 'Projeto Strunkis Premium',
        prazo: '60 dias · online, mentoria diária',
        resumo: 'O programa online com mentoria diária no Telegram. Três planos alimentares, mais de 300 receitas e suporte psicológico incluídos.',
        itens: ['Três planos alimentares: obesidade, emagrecimento e definição',
                'Mais de 300 receitas em e-books, incluindo funcionais e vegetarianas',
                'Duas listas de compras e vídeos de compra no mercado',
                'Suporte psicológico e quatro grupos de acompanhamento'],
        href: 'curso.html'
      },
      todos: {
        nome: 'Projeto Strunkis Para Todos',
        prazo: '60 dias · presencial em Porto Alegre',
        resumo: 'Duas consultas presenciais na Clínica Strunkis, com bioimpedância e avaliação antropométrica. Turmas limitadas a 20 pessoas.',
        itens: ['Duas consultas presenciais com a Aline',
                'Bioimpedância e avaliação antropométrica',
                'Plano alimentar, suplementos e produtos manipulados',
                'Livro do Método Strunkis e e-book de receitas'],
        href: 'curso.html'
      }
    };

    function render() {
      steps.forEach(function (s, i) { s.dataset.active = String(i === at); });
      if (bar) bar.style.transform = 'scaleX(' + (at / steps.length) + ')';
      if (back) { back.disabled = at === 0; back.hidden = at === 0; }
      if (counter) counter.textContent = 'Pergunta ' + (at + 1) + ' de ' + steps.length;
      if (result) result.dataset.active = 'false';
    }

    quiz.addEventListener('click', function (e) {
      var opt = e.target.closest('.quiz__opt');
      if (opt) {
        var step = opt.closest('.quiz__step');
        step.querySelectorAll('.quiz__opt').forEach(function (o) { o.setAttribute('aria-pressed', 'false'); });
        opt.setAttribute('aria-pressed', 'true');
        answers[step.dataset.key] = opt.dataset.value;
        window.setTimeout(function () {
          if (at < steps.length - 1) { at++; render(); } else { finish(); }
        }, 260);
        return;
      }
      if (e.target.closest('[data-quiz-back]') && at > 0) { at--; render(); }
      if (e.target.closest('[data-quiz-restart]')) { answers = {}; at = 0;
        quiz.querySelectorAll('.quiz__opt').forEach(function (o) { o.setAttribute('aria-pressed', 'false'); });
        render(); }
    });

    function decide() {
      if (answers.tempo === 'longo' || answers.meta === 'hipertrofia') return 'renascer';
      if (answers.local === 'presencial') return 'todos';
      return 'premium';
    }
    function boostFor() {
      if (answers.caneta === 'sim') {
        return ['Barra proteica Boost — protege a ingestão de proteína nos dias em que a fome some',
                'Bebida funcional Boost — hidratação e eletrólitos para os dias de aplicação'];
      }
      if (answers.meta === 'hipertrofia') {
        return ['Barra proteica Boost — reforço de proteína entre o treino e o almoço',
                'Chocolate funcional Boost 70% — o doce que cabe no plano'];
      }
      return ['Chocolate funcional Boost 70% — o doce que cabe no plano',
              'Mix funcional Boost — fibra e saciedade no lanche da tarde'];
    }

    function finish() {
      steps.forEach(function (s) { s.dataset.active = 'false'; });
      if (bar) bar.style.transform = 'scaleX(1)';
      if (counter) counter.textContent = 'Montando seu protocolo';
      result.dataset.active = 'true';
      result.innerHTML = '<div class="quiz__loading"><span class="spinner"></span>' +
        '<span>Cruzando suas respostas com os protocolos do Método Strunkis…</span></div>';

      window.setTimeout(function () {
        var p = PROJECTS[decide()];
        var trilha = answers.caneta === 'sim'
          ? { nome: 'Trilha com caneta', href: 'protocolo.html#painel-caneta',
              texto: 'Seu plano é montado em volta do fármaco: proteína primeiro, retenção de massa magra e manejo dos dias de menos apetite.' }
          : { nome: 'Trilha sem medicação', href: 'protocolo.html#painel-natural',
              texto: 'Seu plano trabalha saciedade, comportamento e reeducação alimentar, sem depender de fármaco.' };

        result.innerHTML =
          '<article class="rec">' +
            '<div class="rec__head"><span class="tag tag--gold">' + trilha.nome + '</span>' +
            '<span class="tag tag--outline">' + p.prazo + '</span></div>' +
            '<h3 class="display-m">' + p.nome + '</h3>' +
            '<p>' + trilha.texto + '</p><p>' + p.resumo + '</p>' +
            '<ul class="rec__list">' + p.itens.map(function (i) {
              return '<li>' + icon('check') + '<span>' + i + '</span></li>'; }).join('') + '</ul>' +
            '<div class="rule"></div>' +
            '<h4 class="h3">Boost Natural Foods no seu protocolo</h4>' +
            '<ul class="rec__list">' + boostFor().map(function (i) {
              return '<li>' + icon('check') + '<span>' + i + '</span></li>'; }).join('') + '</ul>' +
            '<p class="micro">Sugestão gerada a partir das suas respostas. Não substitui consulta nutricional ' +
            'nem prescrição médica. A indicação final é feita pela Aline na avaliação.</p>' +
            '<div class="flow-gap">' +
              '<a class="btn" href="' + p.href + '">Ver este projeto</a>' +
              '<a class="btn btn--ghost" href="' + trilha.href + '">Entender a trilha</a>' +
              '<button class="btn btn--ghost" type="button" data-quiz-restart>Refazer</button>' +
            '</div>' +
          '</article>';
      }, 900);
    }
    render();
  }

  /* --- Checkout ---------------------------------------------------------- */
  var checkout = document.querySelector('[data-checkout]');
  if (checkout) {
    var BRL = function (n) { return n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }); };
    var base = Number(checkout.dataset.base || 0);
    var addon = checkout.querySelector('[data-addon]');
    var addonPrice = Number((addon && addon.dataset.price) || 0);
    var totalEl = checkout.querySelector('[data-total]');
    var partEl = checkout.querySelector('[data-parcela]');
    var addonLine = checkout.querySelector('[data-addon-line]');

    function sync() {
      var on = addon && addon.checked;
      var total = base + (on ? addonPrice : 0);
      if (addonLine) addonLine.hidden = !on;
      if (totalEl) totalEl.textContent = BRL(total);
      if (partEl) partEl.textContent = '12x de ' + BRL(total / 12);
    }
    if (addon) addon.addEventListener('change', sync);
    sync();
  }

  /* --- Formulários: validação com mensagem que resolve ------------------- */
  document.querySelectorAll('[data-validate]').forEach(function (form) {
    form.setAttribute('novalidate', '');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var firstBad = null;
      form.querySelectorAll('[required]').forEach(function (f) {
        var msg = f.parentElement.querySelector('.field-msg');
        var bad = !f.value.trim() || (f.type === 'email' && !/^[^@\s]+@[^@\s]+\.[^@\s]{2,}$/.test(f.value));
        f.setAttribute('aria-invalid', String(bad));
        if (msg) {
          msg.hidden = !bad;
          msg.textContent = !f.value.trim()
            ? 'Preencha ' + (f.dataset.nome || 'este campo') + ' para continuar.'
            : 'Esse e-mail está incompleto. Confira o trecho depois do @.';
        }
        if (bad && !firstBad) firstBad = f;
      });
      if (firstBad) { firstBad.focus(); return; }
      var done = form.querySelector('[data-success]');
      var btn = form.querySelector('button[type="submit"]');
      if (btn) { btn.disabled = true; btn.textContent = 'Enviando…'; }
      window.setTimeout(function () {
        if (done) { done.hidden = false; done.focus(); }
        if (btn) { btn.textContent = 'Cadastro enviado'; }
        form.querySelectorAll('.field').forEach(function (fd) { fd.hidden = true; });
      }, 700);
    });
  });

  /* --- Ano no rodapé ----------------------------------------------------- */
  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = String(new Date().getFullYear());
  });
})();
