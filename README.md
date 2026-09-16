# Souza Acessibilidade — V0

Primeira versão estática do site profissional de Danilo Souza.

## Estrutura

- HTML, CSS e JavaScript sem framework e sem processo de build.
- Compatível com GitHub Pages.
- Domínio configurado em `CNAME`: `souzaacessibilidade.com.br`.
- Google Analytics `G-F6B87YSFC9` carregado somente após consentimento.
- VLibras integrado como recurso complementar.
- `robots.txt`, `sitemap.xml`, página 404, declaração de acessibilidade e política de privacidade incluídos.

## Publicar no GitHub Pages

1. Crie um repositório público chamado `souzaacessibilidade` na conta `dxdad`.
2. Coloque **o conteúdo desta pasta na raiz do repositório** (não a pasta inteira dentro de outra pasta).
3. No GitHub, abra **Settings → Pages**.
4. Em **Build and deployment**, selecione **Deploy from a branch**.
5. Escolha a branch `main` e a pasta `/ (root)`.
6. Salve e aguarde a primeira publicação.
7. Em **Custom domain**, informe `souzaacessibilidade.com.br`. O arquivo `CNAME` já está preparado.
8. Depois, em **Settings → Pages**, considere verificar o domínio personalizado na conta para reduzir o risco de uso indevido por outro repositório.

## DNS do domínio

Para o domínio raiz, configure os registros A recomendados pelo GitHub Pages:

- `185.199.108.153`
- `185.199.109.153`
- `185.199.110.153`
- `185.199.111.153`

Opcionalmente, adicione também os registros AAAA:

- `2606:50c0:8000::153`
- `2606:50c0:8001::153`
- `2606:50c0:8002::153`
- `2606:50c0:8003::153`

Para `www`, use um CNAME apontando para `dxdad.github.io`.

Depois que o DNS propagar e o GitHub emitir o certificado, ative **Enforce HTTPS** em Settings → Pages.

## Teste local rápido

Você pode abrir `index.html` diretamente, mas para simular melhor o ambiente web, na pasta do projeto execute:

```bash
python -m http.server 8000
```

Depois acesse `http://localhost:8000`.

## Próximas revisões sugeridas

- validação visual em desktop e mobile;
- testes com teclado e leitores de tela;
- revisão do recorte final de projetos;
- revisão da identidade visual e do elemento derivado da rubrica;
- validação de todos os links externos;
- submissão ao Selo de Acessibilidade Digital após estabilização.
