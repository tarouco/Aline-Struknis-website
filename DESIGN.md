# Design

<!-- impeccable:design-schema 1 -->

Registrado a partir do que foi construído, não do que foi planejado. Fonte da verdade:
`assets/styles.css`. A página `design-system.html` renderiza cada componente abaixo com o
mesmo CSS que o site usa — quando houver divergência entre este arquivo e aquela página,
a página está certa.

## Mundo visual

Clínica de estética premium brasileira, executada sem ironia e sem torção conceitual. O
site é um consultório, não um funil: nenhum contador regressivo, nenhum amarelo de página
de vendas, nenhuma promessa de número. A autoridade vem do respiro, da serifada de alto
contraste e do fato de que cada seção afirma uma só coisa.

O eixo da composição é a bifurcação clínica — com caneta ou sem caneta — e ela aparece
como duas metades de tela cheia logo abaixo da dobra, não como um filtro escondido.

## Cor

Estratégia: **paleta completa, quatro papéis**. Cor comprometida em escala de página —
o oliva ocupa regiões inteiras, nunca detalhes soltos.

| Papel | Token | Valor | Uso |
|---|---|---|---|
| Fundo | `--paper` | `#F6F3EC` | off-white quente, fundo padrão |
| Fundo alternado | `--paper-sunk` | `#EDE8DD` | faixas de seção |
| Superfície | `--paper-raised` | `#FFFDF8` | cartão, campo, resumo |
| Fio | `--paper-line` | `#DED8C9` | borda de 1px |
| Campo escuro | `--olive-900` `--olive-950` | `#202A20` `#161D16` | seções inteiras, rodapé |
| Ação | `--olive-800` | `#2C382A` | botão primário |
| Foco / texto | `--olive-700` | `#3A4A37` | anel de foco, cursor |
| Apoio no escuro | `--olive-300` | `#B4C2AA` | texto secundário sobre oliva |
| Fio de marca | `--gold-500` | `#A9843F` | régua, sublinhado, borda — nunca texto pequeno |
| Rótulo | `--gold-600` `--gold-300` | `#8A6A2F` `#D9BE84` | 600 sobre papel, 300 sobre oliva |
| Parceira | `--boost-500` `--boost-700` | `#E2571F` `#A33714` | 500 em campo, 700 em botão e texto |
| Tinta | `--ink` `--ink-2` `--ink-3` | `#1A1F19` `#47513F` `#626C58` | 15,1 / 7,5 / 5,0 : 1 no papel |

Regras que não se quebram:

- Texto secundário sai da matiz do fundo, nunca de cinza neutro.
- Dourado a 3,1:1 sobre papel só existe em fio e régua. Rótulo dourado usa `--gold-600`.
- A Boost manda na própria faixa (`.sec--boost`, fundo `#17110E`) e em nenhuma outra.
  Fora dela, laranja só aparece no botão de compra do kit.
- Nenhum par de texto do site fica abaixo de 4,5:1. Verificado por cálculo, não por olho.

## Tipografia

- **Display:** Bodoni Moda variável, peso 500, itálico 400 para ênfase. Hospedada no
  projeto (`assets/fonts/`), sem CDN.
- **Texto e interface:** Hanken Grotesk variável, 400 a 700.
- `--measure: 68ch`; números em `tabular-nums` por padrão.

| Classe | Tamanho | Entrelinha |
|---|---|---|
| `.display-xl` | `clamp(2.5rem, 1rem + 5.2vw, 4.5rem)` | 1.13, tracking -0.025em |
| `.display-l` | `clamp(2rem, 1rem + 3.7vw, 3.6rem)` | 1.08 |
| `.display-m` | `clamp(1.55rem, 1.05rem + 2.1vw, 2.4rem)` | 1.14 |
| `h3` / `.h3` | `clamp(1.06rem, 1rem + .5vw, 1.31rem)` Hanken 650 | 1.3 |
| `.lede` | até `1.25rem`, tinta 2 | 1.6 |
| corpo | `17px` | 1.62 |
| `.small` / `.micro` | `15px` / `13px` | — |
| `.label` | `12px`, maiúsculas, tracking .16em | — |

Bodoni tem ascendente e descendente longos: entrelinha abaixo de 1.06 colide em tamanhos
de display. Títulos longos recebem `<br>` manual em vez de confiar na quebra automática.

## Espaço, forma e profundidade

- Escala `--s-1` a `--s-11`: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128, 176.
- Seção: `clamp(56px, 9vw, 128px)` em cima e embaixo. Página `1280px`, goteira
  `clamp(20px, 5vw, 72px)`.
- Raios: 2px selo, 4px campo e placa, 8px cartão, pílula só em botão e etiqueta.
- Três elevações, todas com deslocamento vertical **e** desfoque. Sombra sem deslocamento
  não entra no sistema.
- Sempre mais espaço acima de um título do que abaixo.

## Movimento

Um movimento autoral, não efeitos espalhados: o conteúdo sobe 10px e aparece em 380ms,
com atraso escalonado de 40ms entre no máximo seis irmãos. Curva `cubic-bezier(.16,1,.3,1)`.
Durações do sistema: 180ms (hover, foco), 420ms (aba, sombra), 760ms (passo do
recomendador, barra de progresso).

Nada anima largura ou altura — a barra do recomendador usa `transform: scaleX()`.
Tudo desliga sob `prefers-reduced-motion`, e nada fica invisível se o JavaScript falhar.

## Componentes

`.btn` (primário, `--ghost`, `--light`, `--boost`, `--sm`, `--block`, estados disabled
claros e escuros) · `.link-arrow` · `.tag` e variantes · `.chip` com `aria-pressed` ·
`.input` `.select` `.textarea` `.check` com estados de erro, sucesso e desabilitado ·
`.tabs` / `.tab` com navegação por seta · `.plate` (slot de foto) · `.offer` e
`.offer--feature` · `.phase` · `.notice` · `.summary` e `.addon` · `.path` (bifurcação) ·
`.quiz` (recomendador) · `.result` (antes e depois) · `.table`.

Ícones: desenhados na grade de 24 com traço 1,5 e ponta arredondada, injetados por
`data-icon` a partir do dicionário em `assets/app.js`. Nenhum emoji e nenhum glifo Unicode
faz papel de ícone.

## Placas de imagem

`.plate` é um slot de foto que se vira sozinho: enquanto o arquivo real não existir em
`assets/img/`, a placa desenhada — gradiente oliva, grão e gravura botânica em fio dourado
(`.plate--branch`) — segura a composição e se identifica com uma etiqueta "substituir".
Assim que a foto for salva com o nome esperado, ela assume o lugar sem nenhuma edição de
código. Variantes: padrão (escura), `--light` (sálvia), `--boost` (quente e escura).

## Superfícies do navegador

Seleção de texto, cursor, barra de rolagem, anel de foco, marcador de lista e numerais
tabulares são todos temáticos a partir da paleta. Nenhum padrão de navegador escapa.

## Acessibilidade construída

Corpo nunca abaixo de 17px. Alvo de toque de 44px em botões, campos e chips (links de
rodapé ficam em 34px, acima do mínimo de 24px da WCAG 2.2). Anel de foco visível em todas
as superfícies, com cor própria sobre oliva e sobre a faixa Boost. Hierarquia de títulos
sem saltos. Toda imagem tem texto alternativo; todo campo tem rótulo associado. Mensagem
de erro nomeia o problema e o conserto.

## O que este sistema recusa

Rótulo acima de título (o título carrega o próprio peso) · grade de cartões
ícone + título + texto como estrutura de página · numeração de seção · texto em gradiente ·
vidro e desfoque como decoração · borda colorida grossa em um lado de cartão · sombra dura
sem desfoque · mono como fantasia de "técnico" · preço, número de pacientes, tempo de
carreira ou depoimento inventado.
