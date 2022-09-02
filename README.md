#  <h1 align="center">Projeto Backend - Trybe Futebol Clube!</h1>
![img](logo-tfc.svg)

## O que foi desenvolvido

O TFC é um site informativo sobre partidas e classificações de futebol!. Desenvolvi um back-end dockerizado para uma aplicação front-end ja implementada.


# Habilidades

Neste projeto, fui capaz de:

- Desenvolver uma aplicação em TypeScript tornando o desenvolvimento mais seguro.

- Utilizar conceitos de POO(Programação Orientada a Objetos) e SOLID.

- Desenvolver um sistema de validação de Usuário Atráves de Login.

- Utilizar o Framework Express.

- Desenvolver uma API RESTful utilizando a arquitetura de software MSC(Model-Service-Controller).

- Criar um banco de dados utilizando a ORM sequelize.

- Criar Migrations e models sequelize com os relacionamentos de tabelas corretamente.

- Utilizar o JSON Web Token.

  O JWT é um padrão (RFC-7519) de mercado que define como transmitir e armazenar objetos JSON de forma compacta e segura entre diferentes aplicações. Os dados nele contidos podem ser validados a qualquer momento pois o token é assinado digitalmente. Trazendo informações verificadas e confiáveis.

- Utilizar a lib JOI para validação de requisições.


## 🛠 Tecnologias

As seguintes ferramentas foram usadas na construção do projeto:

- [TypeScript](https://www.typescriptlang.org/)
- [Nodejs](https://nodejs.org/en/)
- [Express](https://expressjs.com/)
- [Sequelize](https://sequelize.org/)
- [Json Web Tokens](https://jwt.io/)
- [Joi](https://www.npmjs.com/package/joi)
- [MySQL](https://www.mysql.com/)
- [Mocha]()
- [Chai]()
- [Sinon]()
- [Docker]()
- [POO]()
- [SOLID]()

## Instruções para abrir a aplicação
Para rodar está aplicação é necessário ter Git, Docker, Node e o Docker Compose instalados. Docker Compose na versão 1.29 ou superior e o Node na versão 16.

1. Clone o repositório
  * `git clone git@github.com:ramondfalcao/project-tfc.git`
  * Entre na pasta do repositório que você acabou de clonar:
    * `cd project-tfc`

2. Execute os containers Docker
    * `npm run compose:up`

3. Acesse a aplicação Front atráves da porta 3000 no seu navegador.
    * `http://localhost:3000/`

3. Utilize uma das contas para logar na aplicação.
    * Administrador:
    * `email: admin@admin.com`
    * `password: secret_admin`
    * Usuário:
    * `email: user@user.com`
    * `password: secret_user`
---

