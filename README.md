# Bolão Copa 2026

Aplicação web para grupos de amigos disputarem um bolão de palpites sobre partidas da Copa do Mundo de 2026. Cada participante informa os placares previstos para os jogos da rodada atual e acompanha sua posição em um ranking geral calculado a partir dos resultados das partidas.

> Projeto desenvolvido para demonstrar conhecimentos em desenvolvimento full-stack, autenticação, regras de negócio, modelagem relacional, controle de acesso e construção de interfaces com Next.js.

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=20232A)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-7-2D3748?logo=prisma)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-4169E1?logo=postgresql&logoColor=white)](https://www.postgresql.org/)

**Demonstração:** [bolao-copa-nine-eta.vercel.app](https://bolao-copa-nine-eta.vercel.app/)

## Visão geral

O participante cria uma conta ou acessa a aplicação com sua conta Google, consulta os jogos da rodada aberta e envia todos os seus palpites de uma só vez. Depois do envio, os palpites da rodada ficam bloqueados para edição. Quando o administrador informa o placar final de uma partida, o sistema classifica os palpites e atualiza o ranking.

O projeto possui uma área administrativa para cadastrar e editar partidas, definir a rodada atual e registrar os resultados oficiais. A aplicação também inclui páginas para o ranking geral, próximos jogos, histórico de partidas finalizadas e visualização controlada dos palpites dos participantes.

## Funcionalidades

### Participantes

- Cadastro com nome de usuário, e-mail e senha.

- Login por credenciais ou conta Google.

- Visualização da rodada atual e dos próximos jogos.

- Envio de palpites para todos os jogos da rodada em uma única operação.

- Bloqueio automático do envio dez minutos antes do primeiro jogo da rodada.

- Bloqueio de edição após o envio dos palpites.

- Visualização dos palpites de outros participantes somente depois do envio dos próprios palpites da rodada.

- Ranking geral com pontuação e posição de cada participante.

- Consulta de partidas finalizadas e seus resultados.

### Administradores

- Cadastro de partidas com seleções, rodada e data de início.

- Edição de partidas e atualização dos placares oficiais.

- Finalização de partidas para disparar a atualização dos resultados dos palpites.

- Definição manual da rodada atualmente aberta.

- Visualização das partidas organizadas por rodada.

- Controle de acesso baseado no papel `ADMIN`.

## Regras de pontuação

A pontuação é calculada somente para partidas finalizadas que possuem placar oficial. O ranking é ordenado pela quantidade total de pontos de cada participante.

| Resultado do palpite | Condição | Pontos |
| --- | --- | --- |
| `EXACT_SCORE` | O placar previsto é exatamente igual ao placar oficial. | 3 |
| `WINNER` | O participante acerta o vencedor ou o empate, mas erra o placar. | 1 |
| `WRONG` | O resultado previsto não corresponde ao resultado oficial. | 0 |
| `PENDING` | A partida ainda não foi finalizada. | 0 |

Um placar exato vale três pontos e não acumula um ponto adicional pela previsão correta do vencedor ou empate.

## Regras do envio de palpites

O sistema utiliza a primeira partida da rodada como referência para definir o prazo final de envio. O participante precisa enviar um palpite para cada partida da rodada. Envios parciais não são aceitos.

O envio é bloqueado dez minutos antes do início da primeira partida da rodada. Depois que o participante envia todos os palpites, uma nova submissão para a mesma rodada é recusada. A visualização dos palpites de outros usuários também permanece restrita até que o participante conclua o próprio envio.

## Tecnologias utilizadas

| Camada | Tecnologias |
| --- | --- |
| Interface e aplicação | Next.js 16, React 19, TypeScript |
| Estilos e componentes | Tailwind CSS 4, shadcn/ui, Radix UI, Lucide React |
| Formulários e validação | React Hook Form e Zod |
| Autenticação | Auth.js/NextAuth.js, Credentials Provider e Google Provider |
| Segurança de senhas | bcryptjs |
| Persistência | PostgreSQL e Prisma ORM |
| Arquitetura de backend | Server Actions e Route Handlers do Next.js |
| Datas | date-fns |
| Infraestrutura local | Docker Compose |
| Hospedagem demonstrada | Vercel e Neon PostgreSQL |

## Arquitetura do projeto

A aplicação utiliza o App Router do Next.js e separa responsabilidades entre páginas, componentes, Server Actions e services. Os componentes cuidam da apresentação, os schemas validam entradas, as actions coordenam operações do servidor e os services concentram consultas e regras de persistência.

```
.
├── actions/        # Server Actions para autenticação, palpites, partidas e configurações
├── app/            # Rotas, layouts e páginas do Next.js App Router
├── components/    # Componentes de interface e formulários
├── constants/     # Constantes de navegação e configuração visual
├── hooks/          # Hooks reutilizáveis
├── lib/            # Autenticação, ranking e utilitários
├── prisma/         # Schema, migrations e cliente Prisma
├── public/         # Imagens das seleções e arquivos estáticos
├── schemas/        # Schemas de validação com Zod
├── services/       # Acesso a dados organizado por entidade
└── types/          # Tipos compartilhados e extensões da sessão
```

### Entidades principais

O banco de dados é composto por usuários, seleções, partidas, palpites e configurações da rodada atual.

| Entidade | Responsabilidade |
| --- | --- |
| `User` | Armazena participantes, credenciais e papel de acesso. |
| `Team` | Representa as seleções que disputam as partidas. |
| `Match` | Armazena rodada, data, seleções, placar e estado de finalização. |
| `Guess` | Registra o palpite de um usuário para uma partida. |
| `Settings` | Mantém a rodada atualmente aberta para palpites. |

A combinação entre usuário e partida é única na entidade `Guess`. Esse relacionamento impede que o mesmo participante registre mais de um palpite para a mesma partida.

## Rotas principais

| Rota | Acesso | Descrição |
| --- | --- | --- |
| `/login` | Público | Login por credenciais. |
| `/register` | Público | Cadastro de participante. |
| `/` | Autenticado | Página inicial com ranking e próximos jogos. |
| `/guess` | Autenticado | Envio e consulta dos palpites da rodada atual. |
| `/ranking` | Autenticado | Ranking geral dos participantes. |
| `/admin` | Administrador | Gerenciamento de partidas e resultados. |
| `/admin/settings` | Administrador | Definição da rodada atualmente aberta. |

## Fluxo principal

```mermaid
flowchart LR
    A[Usuário cria conta ou faz login] --> B[Consulta a rodada atual]
    B --> C[Informa os placares previstos]
    C --> D{Prazo encerrado?}
    D -- Sim --> E[Envio bloqueado]
    D -- Não --> F[Envia todos os palpites]
    F --> G[Palpites ficam imutáveis]
    G --> H[Administrador registra o placar final]
    H --> I[Partida é finalizada]
    I --> J[Palpites são classificados]
    J --> K[Ranking é recalculado]
```

## Pré-requisitos

Para executar o projeto localmente, instale:

- Node.js 20.x.

- npm.

- Docker e Docker Compose, ou um banco PostgreSQL compatível.

- Credenciais OAuth do Google caso o login social seja utilizado.

## Instalação e execução

### 1. Clone o repositório

```bash
git clone https://github.com/lucas-ribeiro03/bolao.git
cd bolao
```

### 2. Instale as dependências

```bash
npm install
```

O projeto executa `prisma generate` automaticamente no `postinstall`.

### 3. Inicie o PostgreSQL

O repositório inclui um PostgreSQL 15 configurado para desenvolvimento local:

```bash
docker compose up -d
```

A configuração padrão do container é:

| Campo | Valor |
| --- | --- |
| Usuário | `postgres` |
| Senha | `password` |
| Banco | `bolao` |
| Porta | `5432` |

### 4. Configure as variáveis de ambiente

O repositório atual não contém um arquivo `.env.example`. Crie um arquivo `.env` na raiz com, no mínimo, a conexão do banco e as variáveis do Auth.js:

```
DATABASE_URL="postgresql://postgres:password@localhost:5432/bolao"
AUTH_SECRET="uma-chave-secreta-forte"

AUTH_GOOGLE_ID="seu-client-id-do-google"
AUTH_GOOGLE_SECRET="seu-client-secret-do-google"
```

Para usar somente login por credenciais, o banco e `AUTH_SECRET` continuam sendo necessários; as variáveis do Google podem ser omitidas se o Provider do Google não for utilizado no ambiente.

> Nunca versione o arquivo `.env` nem credenciais de provedores externos.

### 5. Aplique as migrations

```bash
npx prisma migrate dev
```

O projeto possui migrations versionadas em `prisma/migrations`. Os dados de seleções e partidas usados no desenvolvimento devem ser cadastrados pelo painel administrativo ou por um script de carga próprio.

### 6. Inicie o servidor

```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000) no navegador.

## Scripts disponíveis

| Comando | Descrição |
| --- | --- |
| `npm run dev` | Inicia o servidor de desenvolvimento. |
| `npm run build` | Gera o build de produção. |
| `npm run start` | Inicia o servidor em modo de produção. |
| `npm run lint` | Executa o ESLint. |
| `npx prisma migrate dev` | Aplica ou cria migrations no ambiente de desenvolvimento. |
| `npx prisma studio` | Abre uma interface visual para consultar o banco. |

## Decisões técnicas demonstradas

A aplicação usa Server Actions para operações de escrita, mantendo a execução das regras de negócio no servidor. A camada de services evita consultas Prisma diretamente nos componentes e organiza o acesso aos dados por entidade.

A autenticação combina Auth.js com o Prisma Adapter, sessões JWT e dois métodos de acesso: credenciais com senha protegida por hash e login social com Google. O papel do usuário é incluído na sessão para controlar o acesso ao painel administrativo.

O ranking é calculado a partir de partidas finalizadas e palpites associados. O modelo de dados utiliza índices por rodada, data, usuário e partida para favorecer consultas frequentes da aplicação.

## Possíveis evoluções

Como próximos passos, o projeto pode evoluir com testes automatizados para as regras de pontuação, uma carga inicial oficial de seleções e partidas, paginação no painel administrativo, desempate documentado no ranking, notificações de resultados e uma pipeline de CI para lint, build e testes.

## Deploy

A demonstração pública está hospedada na [Vercel](https://vercel.com/). O README original informa o uso do [Neon](https://neon.tech/) como provedor PostgreSQL para o ambiente publicado.

## Licença

Este projeto é disponibilizado exclusivamente para demonstração e avaliação. Conforme o arquivo [`LICENSE`](./LICENSE), todos os direitos são reservados ao autor. Não é permitida a cópia, modificação, distribuição ou reutilização do código sem autorização prévia e expressa.

## Autor

Desenvolvido por **Lucas Ribeiro**.

- GitHub: [@lucas-ribeiro03](https://github.com/lucas-ribeiro03)

- Repositório: [bolao](https://github.com/lucas-ribeiro03/bolao)

- Demonstração: [bolao-copa-nine-eta.vercel.app](https://bolao-copa-nine-eta.vercel.app/)

## Referências

[1]: https://nextjs.org/docs "Documentação do Next.js"

[2]: https://www.prisma.io/docs "Documentação do Prisma"

[3]: https://authjs.dev/ "Documentação do Auth.js"

[4]: https://docs.docker.com/compose/ "Documentação do Docker Compose"

[5]: https://vercel.com/docs "Documentação da Vercel"

[6]: https://neon.tech/docs "Documentação do Neon"

As tecnologias e serviços citados nesta documentação podem ser consultados nas referências oficiais [1] [2] [3] [4] [5] [6].
