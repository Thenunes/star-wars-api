# star-wars-api

#React

Frontend - React
--------------

### Configurar Projeto
```
Alterar variavel apiUrl em src/config.js com a URL do backend

Exemplo:
- apiUrl: 'http://127.0.0.1:8000'
```

### Iniciar Projeto

```
- Install
    npm install
- Run
    npm start
```

Backend - Symfony
--------------

[Download Symfony][4]

### Configurar Projeto
```
Alterar variavel DATABASE_URL em .env

Exemplo:
- DATABASE_URL="mysql://root:@localhost/star_wars_api"

Explicação:
- DATABASE_URL="mysql://{USUARIO}:{SENHA}@{HOST}/star_wars_api"
```

### Iniciar Projeto

```
- Composer
    composer install
- Create Database
    php bin/console doctrine:database:create
- Load Migrations
    php bin/console doctrine:migrations:migrate
- Run
    symfony server:start
```
[4]: https://symfony.com/download