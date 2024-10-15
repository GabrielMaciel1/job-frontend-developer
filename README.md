# `News App - Latest Technology News`

Uma aplicação frontend que exibe as últimas notícias sobre tecnologia, permitindo aos usuários buscar artigos por título ou autor.

Optei por utilizar o [pnpm](https://pnpm.io/) como gerenciador de pacotes devido à sua eficiência na instalação de dependências. O pnpm utiliza um sistema de links simbólicos, o que reduz o uso de espaço em disco e acelera a instalação das bibliotecas.

**A aplicação é responsivo**, adaptando-se a diferentes tamanhos de tela para garantir uma boa experiência em dispositivos móveis e web.

## Objetivos do Projeto

- Listar as últimas 20 notícias publicadas em ordem cronológica.
- Permitir busca de artigos por título ou autor.
- Exibir informações como thumbnail, título, descrição, autor, imagem, categoria e fonte.

## Como Rodar o Projeto

Para rodar o projeto, você precisa ter o [Node.js](https://nodejs.org/) instalado. Siga os passos abaixo:

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/GabrielMaciel1/job-frontend-developer.git

## Instalação e Execução
**Instale as dependências:**
 Você pode usar qualquer um dos gerenciadores de pacotes:
```sh 
yarn add
```
ou
```sh 
pnpm install
```



**Inicie o servidor de desenvolvimento**: 
Após a instalação das dependências, inicie o servidor de desenvolvimento:

```sh 
pnpm run dev
```
ou
```sh 
yarn dev
```
**Acesse o aplicativo**: Abra seu navegador e acesse http://localhost:3000 (ou a porta que o Vite especificar no terminal).
## Estrutura do Projeto
```sh 
src/
│
├── components/          # Componentes reutilizáveis do aplicativo
│
├── context/             # Contexto para gerenciar o estado global da aplicação
│
├── hooks/               # Hooks personalizados para lógica de negócio
│
├── routes/              # Rotas do aplicativo
│
├── styles/              # Arquivos de estilo CSS
│
├── utils/               # Funções utilitárias, como formatação de datas
│
└── App.tsx              # Componente principal da aplicação
```



## Dependências
- **Axios**: Para fazer requisições HTTP.

- **React**: Biblioteca principal para construção de interfaces.
- **React-router**: Para gerenciar rotas na aplicação.
-  **Vite**:  Ferramenta de build e servidor de desenvolvimento.


## Observação
**A filtragem por busca está sendo realizada no frontend, em vez de fazer uma nova requisição à API, devido à limitação de requisições que a API disponibiliza.**


