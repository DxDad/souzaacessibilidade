# Manutenção e continuidade do site Souza Acessibilidade

## 1. Objetivo deste documento

Este documento registra as principais decisões técnicas, editoriais, visuais e de acessibilidade adotadas no site [Souza Acessibilidade](https://souzaacessibilidade.com.br/).

Seu objetivo é orientar futuras manutenções, reduzir o risco de regressões e facilitar a criação de novas páginas, seções e funcionalidades.

O documento não substitui testes práticos. Alterações relevantes devem continuar sendo verificadas em diferentes tamanhos de tela, com teclado e, quando possível, com leitores de tela.

---

## 2. Características gerais do projeto

O site é estático e utiliza:

* HTML;
* CSS;
* JavaScript;
* GitHub como repositório;
* GitHub Pages para publicação;
* domínio próprio `souzaacessibilidade.com.br`.

Não há, atualmente:

* sistema de gerenciamento de conteúdo;
* framework JavaScript;
* gerador de site estático;
* sistema de templates;
* processo automatizado de compilação.

Essa arquitetura torna o projeto relativamente simples, mas exige atenção especial aos elementos que se repetem em várias páginas.

Cabeçalho, menu, barra de recursos de acessibilidade, aviso de cookies, botão do WhatsApp, rodapé e integrações externas podem depender da combinação entre HTML, CSS e JavaScript.

Uma alteração em apenas um desses pontos pode afetar o comportamento do site inteiro.

---

## 3. Estrutura principal de arquivos

A estrutura geral do projeto segue esta lógica:

```
/
├── index.html
├── quem-sou.html
├── entre-a-leitura-e-a-permanencia.html
├── accessops-framework.html
├── formacoes.html
├── projetos.html
├── publicacoes.html
├── atuacao-voluntaria.html
├── cursos.html
├── ferramentas-e-recursos.html
├── contato.html
├── mapa-do-site.html
├── declaracao-de-acessibilidade.html
├── politica-de-privacidade.html
├── 404.html
├── sitemap.xml
├── robots.txt
├── CNAME
├── .nojekyll
└── assets/
    ├── css/
    │   └── styles.css
    ├── js/
    │   ├── main.js
    │   └── preferences-init.js
    └── img/
```

### Arquivos HTML

Cada página possui seu próprio documento HTML. Os elementos compartilhados ainda estão repetidos nesses arquivos.

Ao alterar um componente global, é necessário verificar se a mesma alteração deve ser aplicada a todas as páginas.

### `assets/css/styles.css`

Concentra:

* identidade visual;
* tipografia;
* cores;
* layouts;
* responsividade;
* modos claro e escuro;
* estados de foco;
* componentes;
* menu móvel;
* barra de cookies;
* botão do WhatsApp;
* ajustes para ampliação e telas menores.

Existem regras adicionadas em diferentes momentos do desenvolvimento. Antes de editar uma classe, é importante procurar todas as ocorrências dela, pois uma regra localizada mais abaixo pode sobrescrever outra anterior.

### `assets/js/main.js`

Controla, entre outros comportamentos:

* abertura e fechamento do menu;
* submenu;
* retenção do foco no menu móvel;
* fechamento pelo teclado;
* bloqueio da rolagem da página com o menu aberto;
* restauração da posição da página ao fechar o menu;
* alternância entre os modos claro e escuro;
* ajuste do tamanho da fonte;
* anúncios de estado para tecnologias assistivas;
* aviso de cookies;
* preferências armazenadas;
* criação do atalho flutuante para o WhatsApp.

### `assets/js/preferences-init.js`

É destinado à aplicação antecipada das preferências visuais, evitando mudanças bruscas durante o carregamento da página.

Antes de modificar ou remover esse arquivo, deve-se verificar como o tema e o tamanho da fonte são inicializados em todas as páginas.

---

## 4. Princípios editoriais

O site deve manter uma linguagem:

* profissional;
* direta;
* humana;
* tecnicamente responsável;
* próxima da escrita pessoal de Danilo Souza;
* sem excesso de autopromoção;
* sem aparência de texto publicitário genérico.

A apresentação profissional deve ser sustentada por experiências, projetos, publicações e atividades concretas.

Sempre que possível, os textos devem explicar:

* o que foi realizado;
* em qual contexto;
* qual foi a participação de Danilo;
* por que aquilo é relevante;
* como a experiência se relaciona com acessibilidade, comunicação, educação ou tecnologia.

Devem ser evitados:

* frases excessivamente corporativas;
* elogios genéricos ao próprio trabalho;
* listas de termos técnicos inseridas artificialmente em textos pessoais;
* repetição desnecessária de uma mesma informação;
* páginas ou seções criadas apenas para preencher espaço;
* afirmações que não possam ser verificadas.

Textos pessoais podem conter observações afetivas, reflexões e humor moderado, desde que não prejudiquem a clareza.

---

## 5. Identidade visual

A identidade visual do site é sóbria e editorial.

Os principais elementos são:

* fundo escuro como apresentação padrão;
* modo claro opcional;
* verdes suaves;
* tons terrosos e dourados usados com moderação;
* títulos com aparência editorial;
* rubrica como elemento gráfico da marca;
* espaçamento amplo;
* linhas divisórias discretas;
* poucos elementos decorativos.

Novos componentes devem seguir a aparência dos componentes já existentes.

Antes de criar uma nova classe, verifique se o site já possui um padrão reutilizável, como:

* `.button`;
* `.secondary`;
* `.button-row`;
* `.shell`;
* `.long-section`;
* `.resource-item`;
* `.sr-only`.

Não devem ser criadas variações visuais arbitrárias para botões que exercem funções equivalentes.

---

## 6. Botões e links

### Botões

Use `<button>` quando o elemento executar uma ação na página, por exemplo:

* abrir ou fechar o menu;
* expandir um submenu;
* alterar o tema;
* aumentar ou diminuir a fonte;
* aceitar ou recusar cookies.

Use `<a>` quando o elemento levar a outra página, seção, arquivo ou site.

Um link pode receber aparência de botão por meio de CSS, mas continua sendo semanticamente um link.

### Padronização visual

Botões equivalentes devem manter:

* altura semelhante;
* peso de fonte consistente;
* espaçamento interno equivalente;
* contraste suficiente;
* estado de foco visível;
* comportamento coerente nos modos claro e escuro.

### Texto dos links

O texto visível deve ser curto, mas compreensível.

Prefira:

* `Consultar a publicação`;
* `Conhecer o curso`;
* `Acessar a ferramenta`;
* `Conhecer as formações personalizadas`.

Evite muitos links com textos totalmente genéricos, como:

* `Clique aqui`;
* `Saiba mais`;
* `Acessar`;
* `Ver`.

Quando vários links semelhantes aparecem na mesma página, o contexto pode ser complementado com texto visualmente oculto:

```
<a href="endereco-do-curso">
  Conhecer o curso
  <span class="sr-only"> Nome do curso</span>
</a>
```

O complemento deve formar uma frase natural quando lido em sequência.

Não use `aria-label` apenas para substituir um texto visível que já existe. Isso pode criar diferenças entre aquilo que aparece na tela e aquilo que é anunciado pelo leitor de telas.

O atributo `title` pode oferecer uma informação suplementar, mas:

* não deve ser a única forma de identificar um link;
* não deve repetir literalmente o texto visível;
* não deve ser necessário para compreender o destino.

---

## 7. Hierarquia de títulos

Cada página deve ter apenas um título principal `<h1>`.

Os demais títulos devem seguir uma hierarquia lógica:

* `<h1>`: assunto principal da página;
* `<h2>`: seções principais;
* `<h3>`: subdivisões de uma seção;
* `<h4>`: subdivisões adicionais, quando realmente necessárias.

Não escolha o nível do título pela aparência visual. O tamanho deve ser ajustado por CSS, sem alterar a hierarquia semântica.

Não pule níveis sem necessidade. Um `<h2>` não deve ser seguido diretamente por um `<h4>` apenas porque o `<h4>` parece visualmente mais adequado.

Textos que apresentam ou nomeiam conjuntos relevantes de conteúdo devem ser avaliados como possíveis cabeçalhos.

---

## 8. Imagens e textos alternativos

Toda imagem deve ser classificada como:

* informativa;
* funcional;
* decorativa.

### Imagem informativa

Deve possuir texto alternativo que comunique sua informação relevante.

No caso de capas, infográficos ou imagens que contenham texto, a descrição pode informar:

* título;
* autoria;
* organização dos elementos;
* imagem principal;
* textos relevantes presentes na composição.

O texto alternativo não precisa reproduzir cada detalhe visual, mas deve permitir compreender a função da imagem naquele contexto.

### Imagem funcional

Quando uma imagem estiver dentro de um link ou botão, o texto alternativo deve identificar a função ou o destino do controle.

### Imagem decorativa

Deve usar:

```
alt=""
```

Não remova o atributo `alt`. A ausência do atributo pode fazer o leitor de telas anunciar o nome do arquivo.

### Logo

A marca deve ser identificada como logo de Danilo Souza — Souza Acessibilidade.

Se o nome da marca já estiver disponível como texto adjacente e acessível, deve-se evitar uma repetição excessiva no leitor de telas. A solução deve ser avaliada considerando o conjunto completo do link, da imagem e do texto.

---

## 9. Imagens responsivas e ampliação

Imagens não devem gerar rolagem horizontal desnecessária.

Como regra geral:

```
img {
  max-width: 100%;
  height: auto;
}
```

Imagens de destaque podem receber limites adicionais, mas esses limites devem ser testados com:

* largura normal;
* celular;
* ampliação de 200%;
* telas estreitas;
* orientação vertical e horizontal.

Ao aplicar uma regra para ampliação, não reduza a imagem de modo excessivo. O objetivo é permitir que ela caiba na área visível, não torná-la pequena demais para compreensão.

Propriedades como `max-height`, `width`, `object-fit` e margens automáticas devem ser ajustadas em conjunto.

---

## 10. Link “Ir para o conteúdo”

O link de salto deve continuar sendo um dos primeiros elementos interativos do documento.

Estrutura esperada:

```
<a class="skip-link" href="#conteudo">Ir para o conteúdo</a>

...

<main id="conteudo" tabindex="-1">
```

O link deve:

* entrar na ordem normal de tabulação;
* aparecer visualmente quando recebe foco;
* funcionar com e sem leitor de telas;
* levar o foco ao conteúdo principal;
* não depender de `autofocus`;
* não ser removido da página em telas menores;
* não ser ocultado com `display: none` ou `visibility: hidden`.

O primeiro uso de `Tab` após o carregamento deve alcançar o link antes dos controles de tema e tamanho da fonte.

Caso isso deixe de acontecer, deve-se verificar:

* a ordem dos elementos no HTML;
* alterações de `tabindex`;
* scripts que movam o foco durante o carregamento;
* componentes de terceiros;
* restauração automática de foco pelo navegador ou por extensões.

---

## 11. Menu principal e submenu

### Menu em telas grandes

O menu deve permanecer visível e navegável por teclado.

O item que controla o submenu deve ser um botão e informar seu estado por meio de `aria-expanded`.

### Menu móvel

Quando o menu móvel é aberto:

* o fundo da página deve deixar de rolar;
* a posição anterior da página deve ser preservada;
* o cabeçalho e o botão de fechar devem continuar visíveis;
* o próprio menu pode ter rolagem interna;
* o foco deve permanecer dentro do menu;
* `Tab` e `Shift + Tab` devem circular entre os controles do menu;
* `Escape` deve fechar o menu;
* ao fechar, o foco deve retornar ao botão que abriu o menu;
* a página deve voltar exatamente ao ponto em que estava.

Não se deve simplesmente levar a página ao topo quando o menu for aberto. Isso pode desorientar quem estava lendo uma parte mais abaixo.

Também não se deve permitir que a página ao fundo continue rolando enquanto o menu permanece aberto.

### Submenu

O submenu deve:

* ser aberto por um botão;
* atualizar `aria-expanded`;
* ser alcançável pelo teclado;
* permanecer visualmente dentro da área rolável do menu;
* permitir fechamento pelo mesmo botão;
* não encobrir conteúdo sem oferecer uma forma clara de fechamento.

Ao navegar pelos últimos itens, o navegador deve reposicionar a área visível do menu para acompanhar o foco.

Não aplique rolagem suave forçada ao foco, pois ela pode causar desconforto ou atraso. Prefira o reposicionamento necessário para tornar o item visível.

---

## 12. Modos claro e escuro

A alternância de tema deve:

* funcionar por teclado;
* manter foco visível;
* informar corretamente o estado atual;
* persistir entre páginas;
* preservar contraste adequado;
* não depender apenas de cor para indicar mudança.

O nome do botão deve indicar a ação disponível, por exemplo:

* `Ativar modo claro`;
* `Ativar modo escuro`.

Depois da ativação, uma região com `aria-live` pode anunciar a alteração:

* `Modo claro ativado`;
* `Modo escuro ativado`.

Toda nova cor deve ser verificada nos dois temas.

Isso vale especialmente para:

* textos;
* links;
* botões;
* bordas;
* estados de foco;
* fundos de avisos;
* linhas divisórias;
* botão do WhatsApp;
* barra de cookies.

---

## 13. Controle do tamanho da fonte

Os controles devem possuir nomes acessíveis claros:

* `Diminuir fonte`;
* `Aumentar fonte`.

Não utilize como único nome acessível expressões como `A menos` ou `A mais`.

Ao chegar aos limites, o sistema deve anunciar:

* `Fonte mínima`;
* `Fonte máxima`.

A implementação não deve fazer o foco desaparecer inesperadamente.

Se um botão for desativado, avalie o efeito de `disabled` sobre a navegação por teclado. Em alguns casos, pode ser mais adequado manter o controle focável, impedir uma nova alteração e anunciar que o limite foi atingido.

O tamanho escolhido deve permanecer consistente durante a navegação entre páginas.

Novos componentes devem utilizar unidades relativas sempre que possível, como:

* `rem`;
* `em`;
* `%`;
* `ch`.

Evite depender excessivamente de tamanhos fixos em pixels.

---

## 14. Aviso de cookies e privacidade

O aviso de cookies deve oferecer opções claras para:

* aceitar;
* recusar;
* fechar, quando essa opção fizer parte do comportamento definido.

Os controles devem possuir:

* bordas consistentes;
* foco visível;
* contraste adequado;
* nomes claros;
* ordem lógica de tabulação.

A preferência deve ser armazenada para evitar que o aviso reapareça a cada página.

Scripts de medição não devem ser ativados antes do consentimento quando dependam dessa autorização.

Alterações no aviso devem ser verificadas em conjunto com:

* `main.js`;
* política de privacidade;
* integração de Analytics;
* armazenamento local;
* comportamento ao aceitar e recusar.

---

## 15. Botão do WhatsApp

O atalho utiliza o número:

`+55 11 98858-8232`

O link pode seguir o formato:

`https://wa.me/5511988588232`

O botão deve:

* utilizar o símbolo reconhecível do WhatsApp;
* possuir nome acessível, como `Conversar pelo WhatsApp`;
* ser alcançável por teclado;
* apresentar foco visível;
* funcionar nos modos claro e escuro;
* não encobrir conteúdo importante;
* não competir com o botão do VLibras;
* manter área de acionamento adequada em dispositivos móveis.

Caso seja aberto em uma nova aba, essa informação deve ser comunicada de forma consistente com os demais links externos.

O ícone não deve ser carregado de uma fonte externa sem necessidade. É preferível manter o recurso no próprio projeto ou utilizar um SVG controlado pelo site.

---

## 16. VLibras e componentes externos

O VLibras é um componente externo e pode inserir elementos no documento durante o carregamento.

Alterações no comportamento de foco não devem ser atribuídas automaticamente ao VLibras sem comparação entre páginas e testes controlados.

Quando surgir um problema:

1. identifique o elemento apontado;
2. verifique o HTML gerado;
3. compare com páginas em que o problema não acontece;
4. teste temporariamente sem o componente;
5. determine se o erro vem do site ou do conteúdo injetado.

Não altere scripts globais apenas com base em um alerta automático isolado.

---

## 17. Páginas com listas de recursos

As páginas de cursos, publicações, projetos, ferramentas e recursos devem manter uma estrutura previsível.

Cada item pode apresentar:

* nome;
* descrição;
* plataforma;
* modelo de acesso;
* referência oficial;
* contexto adicional, quando necessário.

Use listas HTML apenas quando houver uma lista real.

Evite envolver cada link em uma lista artificial ou repetir listas internas idênticas, pois alguns leitores de tela podem anunciar informações como “lista com seis itens” antes de cada link.

Quando houver pares de termos e valores, uma lista de descrição pode ser apropriada:

```
<dl class="resource-meta">
  <div>
    <dt>Plataforma</dt>
    <dd>Web</dd>
  </div>
  <div>
    <dt>Acesso</dt>
    <dd>Gratuito</dd>
  </div>
</dl>
```

Em telas pequenas:

* os termos não devem quebrar de forma inadequada;
* os valores precisam ter espaço para reorganização;
* `min-width: 0` pode ser necessário;
* `overflow-wrap: anywhere` deve ser usado apenas onde fizer sentido;
* palavras curtas não devem ser quebradas letra por letra.

---

## 18. Inclusão de cursos, ferramentas e referências

Antes de adicionar um item, confirme:

* nome oficial;
* instituição responsável;
* endereço oficial;
* situação atual da oferta;
* público;
* modelo de acesso;
* descrição compatível com a fonte.

Não copie descrições promocionais integralmente. Produza uma síntese objetiva.

Nas páginas de curadoria, preserve uma ressalva informando que a presença de um item não representa endosso comercial.

Exemplo:

> A página reúne tanto recursos que fizeram parte da minha trajetória quanto ferramentas e referências úteis para consulta. A presença de um item aqui não representa endosso comercial.

Para cursos de autoria ou coautoria de Danilo, use uma seção que deixe essa relação evidente, como `Cursos autorais`.

Para cursos de outras instituições, utilize uma seção distinta, como `Cursos para aprofundamento`.

A carga horária não precisa aparecer nos cards quando não for uma informação essencial para comparar os itens. Ela pode permanecer disponível na página oficial do curso.

---

## 19. Criação de uma nova seção

Antes de inserir uma seção em uma página existente:

1. identifique o objetivo da seção;
2. confirme se o conteúdo não cabe em uma seção atual;
3. determine o nível correto do cabeçalho;
4. verifique se existe um componente visual reutilizável;
5. mantenha o ritmo de espaçamento da página;
6. avalie a ordem da seção em relação às demais;
7. teste a navegação por títulos com leitor de telas;
8. teste ampliação e telas menores.

Estrutura básica:

```
<section class="long-section" aria-labelledby="titulo-da-secao">
  <h2 id="titulo-da-secao">Título da seção</h2>

  <p>Texto de apresentação.</p>
</section>
```

O uso de `aria-labelledby` é opcional quando o título já identifica claramente a seção, mas pode ser mantido quando fizer parte do padrão adotado na página.

Não use `<section>` sem que exista um título ou nome acessível justificável.

---

## 20. Criação de uma nova página

A forma mais segura de criar uma nova página é copiar uma página atual estruturalmente semelhante.

Não utilize como base uma versão antiga armazenada fora do repositório.

### Etapas recomendadas

1. Atualize o repositório local.
2. Escolha a página atual mais parecida com a nova.
3. Duplique o arquivo.
4. Renomeie o arquivo usando letras minúsculas e hífens.
5. Atualize metadados.
6. Preserve os componentes globais atuais.
7. Substitua apenas o conteúdo principal.
8. Inclua a página nos menus necessários.
9. Atualize o mapa do site.
10. Atualize `sitemap.xml`.
11. Verifique links internos.
12. Teste antes do envio ao GitHub.

### Elementos que devem ser atualizados

* `<title>`;
* descrição da página;
* URL canônica, quando utilizada;
* metadados sociais;
* `<h1>`;
* conteúdo principal;
* item ativo do menu;
* trilhas ou links relacionados;
* título e descrição utilizados no mapa do site;
* data do `sitemap.xml`, quando aplicável.

### Elementos que devem ser preservados

* idioma `pt-BR`;
* link “Ir para o conteúdo”;
* barra de preferências;
* cabeçalho;
* menu principal;
* comportamento do submenu;
* `<main id="conteudo" tabindex="-1">`;
* aviso de cookies;
* rodapé;
* botão do WhatsApp;
* VLibras;
* scripts compartilhados;
* classes estruturais;
* foco visível.

---

## 21. Componentes repetidos em todas as páginas

Atualmente, componentes globais estão duplicados nos arquivos HTML.

Isso inclui principalmente:

* link de salto;
* barra de recursos;
* cabeçalho;
* menu;
* submenu;
* rodapé;
* aviso de cookies;
* carregamento de scripts;
* integrações.

Quando um desses componentes for alterado, procure sua ocorrência em todos os arquivos HTML.

No VS Code, pode-se utilizar a busca global:

* Windows/Linux: `Ctrl + Shift + F`;
* macOS: `Command + Shift + F`.

Antes de substituir em massa:

1. examine todas as ocorrências;
2. confirme que o bloco é realmente idêntico;
3. faça a substituição;
4. revise o diff do Git;
5. teste mais de uma página.

Uma possível evolução futura seria utilizar um gerador de site ou sistema de templates. Essa migração só deve ocorrer com planejamento e testes, pois altera significativamente a forma de manutenção.

---

## 22. Metadados, favicon e indexação

O favicon principal deve estar disponível em endereço público estável e com formato reconhecido pelos mecanismos de busca.

Ao trocar o favicon:

* substitua ou atualize o arquivo correto;
* confirme o caminho em todas as páginas;
* evite manter referências conflitantes;
* teste o endereço do arquivo diretamente;
* confira se o servidor retorna o tipo correto;
* mantenha dimensões adequadas e formato quadrado.

Resultados do Google podem continuar mostrando a versão anterior durante algum tempo devido a cache e nova indexação.

A mudança no código não garante atualização imediata no resultado de busca.

Quando necessário:

1. publique o novo arquivo;
2. confirme que ele pode ser aberto diretamente;
3. inspecione a URL no Google Search Console;
4. solicite nova indexação;
5. aguarde o novo rastreamento.

Não utilize o HTML interno da página de resultados do Google como referência para editar o site. A imagem em base64 exibida no resultado é uma cópia processada e armazenada pelo próprio Google.

---

## 23. Responsividade

O site deve ser verificado, no mínimo, em:

* celular estreito;
* celular largo;
* tablet;
* notebook;
* monitor maior;
* ampliação de 200%.

A validação deve observar:

* ausência de rolagem horizontal não intencional;
* menu acessível;
* botões sem cortes;
* títulos sem sobreposição;
* palavras sem quebra inadequada;
* imagens proporcionais;
* tabelas e metadados reorganizados;
* botão do WhatsApp e VLibras sem conflito;
* conteúdo legível nos dois temas;
* foco dentro da área visível.

A ampliação de 200% pode acionar o layout móvel mesmo em computadores. Portanto, o menu móvel deve ser testado também com teclado em desktop ampliado.

---

## 24. Validação de acessibilidade

Ferramentas automáticas ajudam a encontrar problemas, mas não substituem a avaliação humana.

O processo recomendado combina:

* validação automática;
* navegação por teclado;
* ampliação;
* leitor de telas;
* verificação visual;
* análise semântica;
* revisão de conteúdo.

### Teste de teclado

Verifique:

* `Tab`;
* `Shift + Tab`;
* `Enter`;
* `Espaço`;
* `Escape`;
* foco visível;
* ordem lógica;
* menu;
* submenu;
* cookies;
* links;
* controles de tema e fonte;
* botão do WhatsApp.

### Teste com leitor de telas

Verifique:

* título da página;
* regiões;
* hierarquia de cabeçalhos;
* texto alternativo;
* nomes dos links;
* estados expandidos e recolhidos;
* mensagens de alteração de tema e fonte;
* comportamento da barra de cookies;
* leitura de listas;
* identificação de botões;
* indicação de links que abrem nova aba.

### Ferramentas automáticas

Podem ser utilizadas, entre outras:

* AccessMonitor;
* WAVE;
* AMAweb;
* ferramentas de desenvolvimento do navegador;
* verificadores de contraste.

Um alerta automático deve ser investigado no código e no comportamento real antes da correção.

---

## 25. Checklist antes da publicação

### Conteúdo

* [ ] O texto foi revisado.
* [ ] Nomes próprios e instituições estão corretos.
* [ ] Datas foram verificadas.
* [ ] Não há trechos duplicados.
* [ ] Não há informações sensíveis.
* [ ] Os links levam aos destinos esperados.

### Estrutura

* [ ] Existe apenas um `<h1>`.
* [ ] A hierarquia de cabeçalhos está correta.
* [ ] As regiões principais são identificáveis.
* [ ] O idioma está definido como `pt-BR`.
* [ ] O conteúdo principal possui o identificador correto.

### Imagens

* [ ] Todas as imagens possuem `alt`.
* [ ] Imagens decorativas usam `alt=""`.
* [ ] O texto alternativo corresponde à função da imagem.
* [ ] As imagens permanecem responsivas.
* [ ] Não existe rolagem horizontal causada pela imagem.

### Teclado

* [ ] O link “Ir para o conteúdo” é o primeiro foco útil.
* [ ] Todo controle pode ser alcançado.
* [ ] O foco está visível.
* [ ] O menu móvel retém o foco.
* [ ] `Escape` fecha o menu.
* [ ] O foco retorna ao botão do menu.
* [ ] A página volta à posição anterior depois do fechamento.
* [ ] O foco não vai para o conteúdo ao fundo.

### Aparência

* [ ] A página funciona no modo escuro.
* [ ] A página funciona no modo claro.
* [ ] O contraste é suficiente nos dois modos.
* [ ] Os botões seguem o padrão visual.
* [ ] O conteúdo funciona em celular.
* [ ] O conteúdo funciona com ampliação de 200%.

### Integrações

* [ ] O aviso de cookies funciona.
* [ ] Aceitar e recusar produzem o comportamento esperado.
* [ ] O WhatsApp abre o número correto.
* [ ] O VLibras carrega.
* [ ] Não existem erros relevantes no console.

---

## 26. Fluxo de trabalho com Git

Antes de iniciar uma alteração em um computador diferente ou depois de editar arquivos diretamente no GitHub:

```
git status
git switch main
git pull --ff-only origin main
```

Se o repositório estiver limpo, o `pull` deve trazer as alterações sem criar um merge desnecessário.

Depois das alterações:

```
git status
git diff
```

Revise os arquivos modificados.

Em seguida:

```
git add -A
git status
git commit -m "Descrição objetiva da alteração"
git push origin main
```

### Exemplos de mensagens de commit

* `Corrigir comportamento do menu móvel`
* `Ajustar acessibilidade dos controles de navegação`
* `Atualizar conteúdo da página de cursos`
* `Adicionar ferramentas de avaliação de acessibilidade`
* `Revisar textos da página Quem sou`
* `Padronizar botões nos modos claro e escuro`
* `Atualizar documentação de manutenção`

Evite mensagens vagas, como:

* `Alterações`;
* `Correções`;
* `Atualização`;
* `Novo commit`.

Antes de enviar, confirme que arquivos temporários, cópias antigas e pacotes ZIP não foram adicionados por engano.

---

## 27. Publicação no GitHub Pages

O site é publicado a partir da branch `main`.

Arquivos importantes para essa configuração não devem ser removidos sem análise:

* `CNAME`;
* `.nojekyll`;
* `robots.txt`;
* `sitemap.xml`.

Depois do `git push`, aguarde o processamento do GitHub Pages.

Se a página publicada não refletir imediatamente a alteração:

1. confira o commit no GitHub;
2. verifique o status da publicação;
3. recarregue ignorando o cache;
4. teste em janela anônima;
5. confirme se o arquivo alterado é realmente o arquivo utilizado pela página.

---

## 28. Segurança e exposição pública

O repositório e esta documentação podem permanecer públicos, desde que não contenham:

* senhas;
* tokens;
* chaves de API;
* credenciais;
* documentos pessoais;
* laudos médicos;
* dados privados de clientes;
* conversas internas;
* informações contratuais restritas;
* endereços ou contatos que não devam ser divulgados.

Antes de publicar um arquivo, verifique também seus metadados.

Fotos, textos, livro, código e framework não devem receber automaticamente a mesma licença.

A licença do AccessOps Framework deve ser apresentada apenas no contexto correspondente. Não se deve aplicar uma licença global a todo o repositório sem definir separadamente os direitos de:

* código;
* textos autorais;
* fotografias;
* identidade visual;
* livro;
* materiais de terceiros;
* conteúdo do AccessOps Framework.

---

## 29. Decisões que não devem ser revertidas sem nova avaliação

As seguintes decisões resultaram de testes ou problemas já identificados:

* manter o link “Ir para o conteúdo” acessível e visível ao receber foco;
* preservar sua posição antes dos controles de tema e fonte;
* manter nomes claros nos controles de tamanho da fonte;
* anunciar os limites mínimo e máximo;
* manter o foco visível;
* usar botão para abrir o submenu;
* manter o foco preso ao menu móvel enquanto ele estiver aberto;
* impedir a rolagem do conteúdo ao fundo;
* preservar a posição da página quando o menu for aberto e fechado;
* manter o botão de fechamento visível;
* permitir fechamento por `Escape`;
* devolver o foco ao botão que abriu o menu;
* usar textos alternativos contextualizados;
* evitar links excessivamente genéricos;
* evitar `aria-label` que contradiga o texto visível;
* não criar listas artificiais em cada item da página de recursos;
* manter botões consistentes nos modos claro e escuro;
* verificar contraste nos dois temas;
* manter o botão do WhatsApp acessível por teclado;
* atualizar componentes globais em todas as páginas;
* utilizar sempre a versão mais recente do repositório como base.

Se uma alteração exigir mudança em algum desses comportamentos, ela deve ser documentada e novamente validada.

---

## 30. Prioridade em caso de conflito

Quando houver conflito entre uma versão antiga, uma cópia local e o conteúdo do GitHub, considere como referência inicial a versão mais recente da branch `main`.

Antes de recuperar um trecho antigo, verifique se ele não desfaz:

* correções de acessibilidade;
* ajustes editoriais;
* atualizações de conteúdo;
* mudanças no menu;
* melhorias de responsividade;
* correções de contraste;
* integrações mais recentes.

Arquivos antigos podem servir como referência histórica, mas não devem ser usados diretamente para substituir os arquivos atuais.

---

## 31. Evoluções futuras possíveis

Sem constituírem necessidades imediatas, algumas evoluções podem facilitar a continuidade do site:

* adoção de templates para cabeçalho e rodapé;
* geração automatizada de páginas estáticas;
* validação automática de HTML;
* verificação periódica de links quebrados;
* testes automatizados de acessibilidade;
* checklist de publicação no GitHub;
* separação mais clara de componentes CSS;
* documentação específica dos scripts;
* ambiente de pré-visualização antes da publicação.

Qualquer mudança de arquitetura deve preservar:

* URLs existentes;
* conteúdo;
* acessibilidade;
* identidade visual;
* metadados;
* indexação;
* funcionamento sem dependências desnecessárias.

---

## 32. Manutenção deste documento

Este arquivo deve ser atualizado quando houver:

* nova página;
* nova integração;
* alteração estrutural do menu;
* mudança na publicação;
* novo componente global;
* nova decisão editorial importante;
* correção relevante de acessibilidade;
* mudança na organização dos arquivos.

A documentação deve registrar decisões consolidadas, e não cada pequeno ajuste visual.

Quando a alteração for relevante, o commit pode mencionar a documentação junto da implementação:

```
git commit -m "Atualizar menu móvel e documentação de manutenção"
```

---

## 33. Resumo operacional

Antes de editar:

1. atualize a branch `main`;
2. confirme que o diretório está limpo;
3. use como base os arquivos atuais.

Durante a edição:

1. preserve os componentes globais;
2. mantenha a semântica;
3. reutilize padrões visuais;
4. evite alterações fora do escopo;
5. verifique todas as ocorrências de componentes compartilhados.

Antes de publicar:

1. revise o diff;
2. teste teclado;
3. teste celular;
4. teste ampliação;
5. teste os modos claro e escuro;
6. verifique links e imagens;
7. faça commit com mensagem objetiva;
8. envie para a branch `main`;
9. confira a versão publicada.

A continuidade do site depende menos da quantidade de recursos adicionados e mais da preservação de sua coerência editorial, visual, técnica e de acessibilidade.
