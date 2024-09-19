# Projeto WebRTC com Turborepo, Next.js 14 e Fastify

Este projeto é uma aplicação moderna utilizando [Turborepo](https://turborepo.org/), [Next.js 14](https://nextjs.org/), e [Fastify](https://www.fastify.io/) para criar uma solução robusta e escalável com suporte a WebRTC.

## Visão Geral

Este repositório é configurado para suportar desenvolvimento full-stack com uma arquitetura baseada em Turborepo, otimizando a experiência de desenvolvimento e a eficiência do build. A aplicação integra WebRTC para comunicação em tempo real e utiliza Fastify para um backend rápido e eficiente.

## Tecnologias Utilizadas

- **[Next.js 14](https://nextjs.org/)**: Framework React para construção de interfaces de usuário.
- **[Fastify](https://www.fastify.io/)**: Framework web para Node.js, altamente eficiente e extensível.
- **[Turborepo](https://turborepo.org/)**: Ferramenta para monorepos, facilitando o gerenciamento e a construção de projetos múltiplos.
- **[WebRTC](https://webrtc.org/)**: Tecnologia para comunicação em tempo real diretamente nos navegadores.
- **[Vitest](https://vitest.dev/)**: Framework de testes rápido e leve para aplicações JavaScript/TypeScript.

## Estrutura do Projeto

A estrutura do projeto é organizada da seguinte forma:

- `apps/web` - Aplicação frontend utilizando Next.js.
- `apps/server` - Aplicação backend utilizando Fastify.
- `packages` - Pacotes compartilhados e bibliotecas comuns entre frontend e backend.

## Começando

Para iniciar o projeto, siga os passos abaixo:

1. **Clone o Repositório**

    ```bash
    git clone https://github.com/seu-usuario/seu-repositorio.git
    cd seu-repositorio
    ```

2. **Instale as Dependências**

    Navegue até o diretório do projeto e instale as dependências:

    ```bash
    npm install
    # ou
    yarn install
    # ou
    pnpm install
    ```

3. **Inicie o Servidor de Desenvolvimento**

    Para iniciar o servidor de desenvolvimento do frontend e do backend, use:

    ```bash
    npm run dev
    # ou
    yarn dev
    # ou
    pnpm dev
    ```

    Acesse a aplicação no navegador em [http://localhost:3000](http://localhost:3000).

## Testes

Para garantir a qualidade do código, este projeto utiliza Vitest para realizar os testes. Para rodar os testes, execute:

```bash
npm run test
# ou
yarn test
# ou
pnpm test
