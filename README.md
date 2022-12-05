# customers-management

API Rest feita em Nestjs para gerenciamento de clientes

## Instalação e Execução
### Pré condições
1. Possuir o docker instalado na máquina
2. Possuir o docker-compose instalado na máquina
3. Possuir o node e npm instalados na máquina (necessário apenas para execução da aplicação sem o docker)

### Configurações
1. Clone o repositório
2. Navegue até o diretório raiz do repositório pelo terminal
3. Crie um arquivo ```.env``` na raiz do projeto, copie o conteúdo do arquivo ```.env.example``` e cole no ```.env``` recém criado
4. Preencha as variáveis que estão em branco no arquivo .env

### Executando com o Docker
1. Ainda na raiz do projeto, iniciar os containers com o comando abaixo
```
docker-compose up -d
```
2. Pronto! Aplicação estará executando e pronta para receber requisições.

### Executando sem o docker
1. Ainda na raiz do projeto, rodar o comando abaixo para garantir que os containes não estão mais em execução
```
  docker-compose down
```
2. Instalar as dependências do projeto
```
  npm install
```
3. Alterar o valor da env ```REDIS_HOST``` para localhost no arquivo ```.env```
```
REDIS_HOST=localhost
```
4. Iniciar o redis utilizando o comando abaixo
```
  docker-compose up redis
```
5. Iniciar a aplicação utilizando o comando abaixo
```
  npm run start:dev
```
6. Pronto! Aplicação estará executando e pronta para receber requisições.
