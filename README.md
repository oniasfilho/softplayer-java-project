# softplayer-java-project
Projeto criado de acordo com os requisitos do repo softplayer-java-apply.


#### Informacoes para acesso da aplicacao em nuvem:

- URL: https://frontend.oniasfilho.io/
- Login: softplan
- Senha: 12345
#### repositórios usados na nuvem:
 - https://github.com/oniasfilho/aws_front
 - https://github.com/oniasfilho/aws_back (CODIGO FONTE DA API)

Tecnologias Utilizadas:

  - Spring Framework
  - Hibernate
  - ReactJS


### Checklist de Requisitos

- [x] 1) Back-end | API referente a CRUD de informacoes de uma pessoa.
- [x] 2) Front-end | Foi criado um front-end em ReactJS para consumir a API criada.
- [x] 3) Segurança | O acesso a aplicacao e feito com Spring Security via autenticacao basic
- [ ] 4) Instalacao | Infelizmente notei tarde demais que o quarto requisito exigia que o projeto todo rodasse a partir de uma imagem apenas. Eu criei um container para cada service (postgres, spring e react) e fiz um Compose das 3 imagens.
- [x] 5) Código fonte | ao inserir /source no front (:3000) ou back end (:8080), o usuario e redirecionado para o GitHub.
-
### Extras

* A aplicação rodando em algum ambiente em nuvem:
 Foi feito deploy da aplicacao completa (database, api e front end) na Amazon Web Services, sendo que o entrypoint da mesma se encontra no seguinte endereco: https://frontend.oniasfilho.io/

### Instalacao

Esse projeto precisa de [Node.js](https://nodejs.org/), [Java](https://www.oracle.com/java/technologies/javase-jre8-downloads.html) e [PostgreSQL](https://www.postgresql.org/download/) instalados.

Setup de tables no Postgres:

```sh
psql -u <seu usuario>
CREATE DATABASE softplan_dev ENCODING = 'UTF8';

\c softplan_dev

CREATE TABLE pessoa (
	id serial,
	nome varchar(25) NOT NULL,
	sexo varchar(1),
	email varchar(254),
	data_de_nascimento DATE NOT NULL,
	naturalidade varchar(25),
	nacionalidade varchar(25),
	cpf varchar(11) NOT NULL,
	data_de_criacao DATE ,
	ultima_atualizacao timestamp ,
	primary key(id),
	unique(cpf)
);
```
Setup da API:
Na pasta backEnd do [repo](https://github.com/oniasfilho/aws_back), executar:

```sh
$ mvn clean package install & mvn clean spring-boot:run
```

Setup do Front End:
Na pasta frontEnd, executar:

```sh
$ npm start
```

Para consumir a aplicacao: http://localhost:3000
