# Weather APP

Projeto desenvolvido para praticar a implementação de cache de requisições usando o Redis. O app busca dados de previsão do tempo de uma API externa ([Visual Crossing](https://www.visualcrossing.com/)) e armazena, reduzindo a latência e custos de requisições da API externa.

### Funcionalidades

- Busca de previsão do tempo por cidade
- Cache automático de respostas usando Redis
- Interface visual que mostra se os dados vieram do cache ou da API externa
- Exibição do tempo de resposta para demonstrar a diferença de performance
- Suporte a diferentes unidades de medida (Celsius ou Fahrenheit

### Tecnologias Utilizadas

#### Backend

- Node.js com TypeScript
- Fastify (framework web)
- Redis (sistema de cache)
- Zod (validação de schemas)
- Swagger (documentação da API)

#### Frontend

- React com TypeScript
- Vite
- TailwindCSS
- Context API para gerenciamento de estado

#### Infraestrutura

- Docker e Docker Compose

### Pré-requisitos

- Docker e Docker Compose
- Uma API key do [Visual Crossing](https://www.visualcrossing.com/) (FREE) ou API de sua escolha (pode ocorrer erros devido o app ter sido configurado com base no Visual Crossing)

### Iniciando

#### 1. Clone o repo

```bash
git clone https://github.com/johnliradev/weather
cd weather
```

#### 2. Configure as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
PORT=3333
API_KEY=sua_chave_api_aqui
API_URL=https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/
REDIS_HOST=redis
REDIS_PORT=6379
```

#### 3. Inicie os serviços do Docker

```bash
docker-compose up
```

O comando faz:

- Construir as imagens do Backend e Frontend
- Subir os serviços do Redis, Backend end na porta 3333 e Frontend na porta 5173

### Como Usar

1. **Digite o nome de uma cidade** no campo de busca (ex: São Paulo, New York, Tokyo)

2. **Selecione o período** que deseja visualizar:
      - Hoje
      - Amanhã
      - Próximos 3 dias (a partir de amanhã)
      - Próximos 7 dias (a partir de amanhã)

3. **Clique em "Search Forecast"** para buscar a previsão

4. **Observe os indicadores de cache**:

- "Retrieved from Redis" (roxo): dados vieram do cache
   - "Saved on Redis" (azul): dados foram salvos no cache
   - Tempo de resposta em milissegundos

#### Testando o Cache

Para ver o cache em ação:

1. Faça uma busca por uma cidade (ex: "São Paulo")
2. Observe que a primeira requisição será mais lenta e mostrará "Saved on Redis"
3. Faça a mesma busca novamente
4. Observe que agora será muito mais rápido e mostrará "Retrieved from Redis"

## Como o Cache Funciona

1. Quando uma requisição é feita, o sistema primeiro verifica se os dados existem no Redis usando uma chave única baseada em: `forecast:{cidade}:{data}:{unidade}`
2. Se os dados existirem no cache:
      - Retorna imediatamente do Redis (muito rápido)
      - Marca `fromCache: true` na resposta
3. Se os dados não existirem no cache:
      - Busca da API externa
      - Salva no Redis com TTL de 1 hora (3600 segundos)
      - Retorna os dados
      - Marca `fromCache: false` na resposta
4. Após 1 hora, o cache expira automaticamente e os dados são buscados novamente da API externa

### Observações

- A API tem parâmetros como date 1 e date 2, porém para simplificar é requisitado pelo frontend apenas 8 dias, porém pode ser modificado.
- O cache tem TTL (Time To Live) de 1 hora por padrão
- A chave do cache é baseada na cidade, data atual e unidade de medida
- O frontend mostra visualmente se os dados vieram do cache ou não
