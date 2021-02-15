#Symfony 5.0

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
```