# Site Aline Strunkis — protótipo navegável

Protótipo estático (HTML/CSS/JS puro, sem build). Abra `index.html` no navegador ou
publique a pasta inteira em qualquer host estático.

## Páginas

| Arquivo | O que é |
|---|---|
| `index.html` | Home completa: hero, bifurcação de trilhas, método, recomendador com IA, galeria antes/depois, esteira de projetos, faixa Boost, clínica, chamada B2B |
| `protocolo.html` | Página de trilha, com abas "com caneta" e "sem medicação" e tabela comparativa |
| `curso.html` | Página de venda do Projeto Strunkis Premium com checkout e cross-sell do kit Boost |
| `parceiras.html` | Portal B2B da rede de nutricionistas, com revenda Boost e cadastro |
| `design-system.html` | Documentação viva do sistema: tokens, tipografia, componentes e regras |

## Documentos

- `PRODUCT.md` — verdade de produto: público, posicionamento, o que está confirmado e o que
  é placeholder.
- `DESIGN.md` — sistema de design registrado a partir do que foi construído.

## Fotos

Toda foto é um slot. Salve o arquivo em `assets/img/` com o nome que o HTML espera e a placa
desenhada sai de cena sozinha, sem editar código. Nomes esperados:

```
hero.webp            abertura da home
ingredientes.webp    seção do método
clinica.webp         Clínica Strunkis
curso.webp           material do Premium
rede.webp            consultório da rede
protocolo-caneta.webp / protocolo-natural.webp
boost.webp  boost-1.webp  boost-2.webp  boost-3.webp  boost-kit.webp  boost-revenda.webp
caso-1a.webp … caso-6b.webp   antes (a) e depois (b) de cada caso
```

## Antes de publicar

1. Trocar todas as fotos pelos arquivos reais, com autorização de uso de imagem dos casos.
2. Preencher preços (hoje "sob consulta"; o checkout usa valores de exemplo).
3. Informar o número do CRN no rodapé.
4. Fechar nomes, composição e preço da linha Boost.
5. Escolher o meio de pagamento e ligar o checkout.
6. Ligar o recomendador a um modelo de verdade (hoje a lógica é determinística no front).
