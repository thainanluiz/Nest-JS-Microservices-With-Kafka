# AgendarME API Gateway e Micro Serviço com Kafka

## Visão Geral

Este projeto demonstra uma arquitetura de microserviços usando uma API Gateway que roteia requisições para um serviço de logging, ambos integrados com Kafka.

## Funcionalidades

- **Roteamento de Requisições:** A API Gateway roteia as requisições dos clientes para os respectivos microserviços.
- **Registro de Logs:** A API Gateway registra logs de todas as requisições recebidas e enviadas.
- **Tratamento de Erros:** A API Gateway trata erros de requisições inválidas e responde com mensagens de erro apropriadas.
- **Documentação da API:** A API Gateway fornece documentação da API em formato JSON e UI.
- **Garantia de Entrega:** A API Gateway garante a entrega de requisições para o microserviço de logging mesmo em caso de falhas ou indisponibilidade.

## Tecnologias Utilizadas

- **NestJS**: Framework para desenvolvimento de aplicações server-side escaláveis.
- **Kafka**: Plataforma de streaming distribuído para processamento de eventos em tempo real.
- **Prisma**: ORM para gerenciamento e consulta de banco de dados PostgreSQL.
- **Express**: Middleware para processamento de dados JSON e URL-encoded.
- **Swagger UI**: Documentação da API (disponivel em: [docs](http://localhost:3000/docs)).
- **Swagger JSON**: Documentação da API em formato JSON (disponivel em: [docs-json](http://localhost:3000/docs-json)).
- **Git Flow**: Utilização de branches de develop, feature, release e hotfix para controle de versão.

## Configuração

### Pré-requisitos

- Node.js (v22.6.0)
- PostgreSQL
- Kafka
- Docker (opcional, ele pode ser usado para executar o Kafka, um serviço de monitoramento das mensagens e o PostgreSQL)

### Instalação

1. **Clone o repositório:**

   ```bash
   git clone https://github.com/thainanluiz/Nest-JS-Microservices-With-Kafka example
   cd example
   ```

2. **Instale as dependências em ambos os diretórios:**

   ```bash
   cd api-gateway
   npm install

   cd ms-db-logging
   npm install
   ```

3. **Configure a variável de ambiente:**

   Crie um arquivo `.env` no diretório raiz do micro serviço e adicione a seguinte variável de ambiente:

   ```bash
   DATABASE_URL=sgbd://user:password@host:port/database
   ```

   Se desejar usar outro banco de dados, ajuste a string de conexão no `.env`, execute o passo 4 para criar as tabelas ou prossiga diretamente para o passo 5.

4. **Execute as migrações do banco de dados:**

   ```bash
   npx prisma migrate dev
   ```

5. **Inicie as aplicações:**

   ```bash
   cd api-gateway
   npm run start:dev

   cd ms-db-logging
   npm run start:dev
   ```

## Endpoint da API

### 1. **Criação do Log**

- **Endpoint:** `POST /api/v1/log`
- **Descrição:** Cria um log no banco de dados.
- **Corpo da Requisição:**

  ```json
  {
    "event": "internal_api_testing",
    "emitter": "bruno_api_client", // No caso, eu estou utilizando o Bruno API Client e quero registrar no banco que ele fez a requisição de teste
    "message": "Test message"
  }
  ```

- **Resposta:**

  ```json
  {
    "image_url": "https://firebase.storage.url...",
    "measure_value": 200,
    "measure_uuid": "cm..."
  }
  ```
