# Backend do projeto YourRecipes

## Projeto FullStack para armazenar e mostrar suas receitas preferidas :)

![NPM](https://img.shields.io/npm/l/express)

<p align="center">
 <a href="#objetivo">Objetivo</a> •
 <a href="#tecnologias">Tecnologias</a> • 
 <a href="#funcionalidades">Funcionalidades</a> • 
 <a href="#instalacao">Instalação</a> • 
 <a href="#status">Status</a> • 
 <a href="#autor">Autor</a>
</p>

<h2 id="objetivo">:dart: Objetivo</h2>
O objetivo do projeto é auxiliar pessoas a guardarem com facilidade suas receitas. Eu particularmente gosto bastante de cozinhar, então este projeto serve para resolver o meu problema e me dar mais experiência com a stack MERN. Este projeto está dividido em Backend e Frontend, sendo este ultimo em outro repositório a fim de separar os conceitos e facilitar integração da APi em outros sistemas.

<h2 id="tecnologias">:wrench: Tecnologias</h2>

As seguintes tecnologias foram utilizadas no projeto deste repositório:

- [Node.js](https://nodejs.org/en/)
- [Express](https://expressjs.com/)
- [Mongodb](https://www.mongodb.com/)

<h2 id="funcionalidades">:clipboard: Funcionalidades</h2>

### Usuários

- Realizar cadastro;
- Realizar login;
- Autenticação com JWT

### Receitas

- Cadastrar nova receita;
- Listar receitas do usuário logado;
- Ver detalhes da receita de escolha;
- Editar receitas;
- Deletar receitas;

<h2 id="instalacao">:computer: Instalação</h2>

### Pré-requisitos

Antes de começar, você vai precisar ter o [Git](https://git-scm.com) e o [NPM](https://www.npmjs.com/) instalados em sua máquina, além de uma conta no Amazon AWS com S3 para armazenar as imagens das receitas.

Este projeto está dividido em dois repositórios, cada parte possui um guia com sua respectiva instalação.

### Rodando o backend

```bash
# Clone este repositório
$ git clone https://github.com/Gabriel-Cervo/YourRecipes-Backend-Api

# Acesse a pasta do projeto no terminal/cmd
$ cd YourRecipes-Backend-Api

# Instale as dependências
$ npm install

# Aviso! Antes da execução, é necessário em que haja um arquivo .env contendo as informações do seu amazon S3, de sua database, e um secret_access_token para o JWT.
# Exemplo:
# DATABASE_URL=<LINK_DE_SUA_DATABASE>
# AWS_ACCESS_KEY_ID=<SUA_ACCESS_KEY_ID>
# AWS_SECRET_ACCESS_KEY=<SUA_SECRET_KEY>
# AWS_DEFAULT_REGION=<REGIAO_DO_SEU_S3>
# AWS_BUCKET=<NOME_BUCKET>
# SECRET_ACCESS_TOKEN=<TOKEN_JWT>

# Execute a aplicação no modo de desenvolvimento
$ npm run dev

# O servidor inciará na porta:8080 por padrão - acesse: http://localhost:8080.
# Se desejar utilizar em outra porta, edite a linha 16 no arquivo src/server.js, ou no arquivo .env digite: PORT=<porta_desejada>
```

<h2 id="status">Status: Concluído :heavy_check_mark:</h2>

<h2 id="autor">Autor</h2>
<br />
<a href="https://github.com/Gabriel-Cervo">
 <img style="border-radius: 50%;" src="https://media-exp1.licdn.com/dms/image/C5603AQGiGb8ejwFmCg/profile-displayphoto-shrink_400_400/0?e=1602115200&v=beta&t=76A2c7dwyHM5GpxDX3N9-dN9TQdD6Ae0BkdpGvFTyMU" width="100px;" alt="Joao Gabriel Dourado Cervo"/>
 <br />
 <sub><b>Feito com ❤️ por Gabriel Cervo</b></sub></a>

<br />
<br />

👋🏽 Entre em contato comigo:

[![Linkedin Badge](https://img.shields.io/badge/Gabriel--Cervo-Linkedin-blue?link=https://www.linkedin.com/in/joaogabrielcervo/?style=flat-square&logo=Linkedin)](https://www.linkedin.com/in/joaogabrielcervo)
[![Gmail Badge](https://img.shields.io/badge/Gabriel--Cervo-Email-red?link=mailto:joaogabrieldouradocervo@gmail.com/?style=flat-square&logo=Gmail&logoColor=white)](mailto:joaogabrieldouradocervo@gmail.com)
